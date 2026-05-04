// Clerk → Payload webhook receiver. Mirrors Clerk identity into the People
// and Organizations collections.
//
// Source-of-truth split:
//   Clerk           → identity (email, name, MFA, social login, password)
//   Payload People  → role, organization affiliation, application status
//   Payload Orgs    → editorial firm row + clerkOrgId pivot
//
// Mapping:
//   user.created                       → upsert people by clerkUserId (defaults: role=member, applicationStatus=pending)
//   user.updated                       → patch email/firstName/lastName only
//   user.deleted                       → hard-delete by clerkUserId
//   organization.created               → log only (firms are seeded; admin manually links via clerkOrgId)
//   organization.updated               → if linked row exists, patch name
//   organization.deleted               → null clerkOrgId on linked row, keep the row
//   organizationMembership.created     → set people.organization (resolved via clerkOrgId)
//   organizationMembership.deleted     → null people.organization
//
// Auth: svix signature verified against CLERK_WEBHOOK_SECRET. The Clerk
// middleware matcher already exempts /api/*, so no auth-context conflicts.
//
// Errors that warrant retry (5xx) are reserved for infrastructure failures
// (DB unreachable, secret missing). Soft mismatches — webhook arriving for
// an unlinked Clerk Org, or a membership before the user.created replays —
// return 200 with a warning so Clerk doesn't retry forever.

import { Webhook } from "svix";
import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ClerkEmailAddress = {
  id: string;
  email_address: string;
};

type ClerkUserData = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  primary_email_address_id?: string | null;
  email_addresses?: ClerkEmailAddress[];
};

type ClerkDeletedData = { id: string; deleted: boolean };

type ClerkOrgData = {
  id: string;
  name: string;
};

type ClerkMembershipData = {
  organization: { id: string };
  public_user_data?: { user_id: string };
};

type ClerkEvent =
  | { type: "user.created"; data: ClerkUserData }
  | { type: "user.updated"; data: ClerkUserData }
  | { type: "user.deleted"; data: ClerkDeletedData }
  | { type: "organization.created"; data: ClerkOrgData }
  | { type: "organization.updated"; data: ClerkOrgData }
  | { type: "organization.deleted"; data: ClerkDeletedData }
  | { type: "organizationMembership.created"; data: ClerkMembershipData }
  | { type: "organizationMembership.deleted"; data: ClerkMembershipData }
  | { type: string; data: unknown };

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET not configured." },
      { status: 500 },
    );
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: "Missing svix headers." },
      { status: 400 },
    );
  }

  const body = await req.text();
  const wh = new Webhook(secret);

  let event: ClerkEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkEvent;
  } catch {
    return NextResponse.json(
      { error: "Invalid signature." },
      { status: 401 },
    );
  }

  const payload = await getPayload({ config });

  try {
    switch (event.type) {
      case "user.created":
      case "user.updated":
        await upsertPerson(
          payload,
          event.data as ClerkUserData,
          event.type === "user.created",
        );
        break;
      case "user.deleted":
        await deletePerson(payload, (event.data as ClerkDeletedData).id);
        break;
      case "organization.created":
        payload.logger.info(
          `Clerk org created: ${(event.data as ClerkOrgData).id} — link manually via clerkOrgId.`,
        );
        break;
      case "organization.updated":
        await updateOrgName(payload, event.data as ClerkOrgData);
        break;
      case "organization.deleted":
        await unlinkOrg(payload, (event.data as ClerkDeletedData).id);
        break;
      case "organizationMembership.created":
        await setMembership(payload, event.data as ClerkMembershipData, true);
        break;
      case "organizationMembership.deleted":
        await setMembership(payload, event.data as ClerkMembershipData, false);
        break;
      default:
        payload.logger.info(`Clerk webhook ignored: ${event.type}`);
    }
  } catch (err) {
    payload.logger.error(
      `Clerk webhook handler failed for ${event.type}: ${(err as Error).message}`,
    );
    return NextResponse.json(
      { error: "Handler failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

async function upsertPerson(
  payload: PayloadInstance,
  data: ClerkUserData,
  isNew: boolean,
): Promise<void> {
  const primaryEmail = resolvePrimaryEmail(data);
  if (!primaryEmail) {
    payload.logger.warn(
      `Clerk user ${data.id} has no primary email address — skipping.`,
    );
    return;
  }

  const existing = await payload.find({
    collection: "people",
    where: { clerkUserId: { equals: data.id } },
    limit: 1,
  });

  const identityFields = {
    email: primaryEmail,
    firstName: data.first_name ?? undefined,
    lastName: data.last_name ?? undefined,
  };

  if (existing.docs.length > 0) {
    await payload.update({
      collection: "people",
      id: existing.docs[0].id,
      data: identityFields,
    });
    return;
  }

  // New row — only set role/applicationStatus on initial create. user.updated
  // events for unknown Clerk IDs (replays, missed user.created) also fall
  // through here; treat them as first-time creates.
  await payload.create({
    collection: "people",
    data: {
      clerkUserId: data.id,
      ...identityFields,
      role: "member",
      applicationStatus: "pending",
    },
  });

  if (!isNew) {
    payload.logger.warn(
      `user.updated for unknown Clerk user ${data.id} — created as new pending member.`,
    );
  }
}

async function deletePerson(
  payload: PayloadInstance,
  clerkUserId: string,
): Promise<void> {
  await payload.delete({
    collection: "people",
    where: { clerkUserId: { equals: clerkUserId } },
  });
}

async function updateOrgName(
  payload: PayloadInstance,
  data: ClerkOrgData,
): Promise<void> {
  const linked = await payload.find({
    collection: "organizations",
    where: { clerkOrgId: { equals: data.id } },
    limit: 1,
  });
  if (linked.docs.length === 0) {
    payload.logger.info(
      `Clerk org ${data.id} updated but not linked to any Payload row.`,
    );
    return;
  }
  await payload.update({
    collection: "organizations",
    id: linked.docs[0].id,
    data: { name: data.name },
  });
}

async function unlinkOrg(
  payload: PayloadInstance,
  clerkOrgId: string,
): Promise<void> {
  await payload.update({
    collection: "organizations",
    where: { clerkOrgId: { equals: clerkOrgId } },
    data: { clerkOrgId: null },
  });
}

async function setMembership(
  payload: PayloadInstance,
  data: ClerkMembershipData,
  add: boolean,
): Promise<void> {
  const clerkUserId = data.public_user_data?.user_id;
  const clerkOrgId = data.organization?.id;
  if (!clerkUserId || !clerkOrgId) {
    payload.logger.warn(
      `Membership event missing user or org id: user=${clerkUserId} org=${clerkOrgId}`,
    );
    return;
  }

  let organizationId: number | null = null;
  if (add) {
    const orgRes = await payload.find({
      collection: "organizations",
      where: { clerkOrgId: { equals: clerkOrgId } },
      limit: 1,
    });
    if (orgRes.docs.length === 0) {
      payload.logger.warn(
        `Membership created for unlinked Clerk org ${clerkOrgId} — person not assigned.`,
      );
      return;
    }
    organizationId = orgRes.docs[0].id as number;
  }

  await payload.update({
    collection: "people",
    where: { clerkUserId: { equals: clerkUserId } },
    data: { organization: organizationId },
  });
}

function resolvePrimaryEmail(data: ClerkUserData): string | null {
  const primaryId = data.primary_email_address_id;
  const addresses = data.email_addresses ?? [];
  if (primaryId) {
    const match = addresses.find((e) => e.id === primaryId);
    if (match) return match.email_address;
  }
  return addresses[0]?.email_address ?? null;
}
