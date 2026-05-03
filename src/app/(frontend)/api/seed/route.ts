// One-shot seeding endpoint. Idempotent: clears each collection first.
// Disabled in production via NODE_ENV check. Triggered manually via curl.
import { getPayload } from "payload";
import config from "@payload-config";
import { runSeed } from "@/payload/seed";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seeding is disabled in production." },
      { status: 403 },
    );
  }

  // Cheap shared-secret guard so the route isn't hit by accident.
  const auth = req.headers.get("x-seed-secret");
  if (!process.env.PAYLOAD_SECRET || auth !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const counts = await runSeed(payload);
  return NextResponse.json({ ok: true, counts });
}
