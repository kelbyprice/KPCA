import { getPayload } from "payload";
import config from "@payload-config";

import type { Company, Organization } from "@/payload-types";

import { PageTitle } from "@/components/atoms/PageTitle";
import { MembersTabs } from "@/components/members/MembersTabs";

type MembersData = {
  members: Organization[];
  companies: Company[];
};

async function loadMembersData(): Promise<MembersData> {
  try {
    const payload = await getPayload({ config });

    const [membersRes, companiesRes] = await Promise.all([
      payload.find({
        collection: "organizations",
        sort: "displayOrder",
        limit: 100,
      }),
      payload.find({
        collection: "companies",
        where: { featured: { equals: true } },
        sort: "displayOrder",
        limit: 12,
      }),
    ]);

    return {
      members: membersRes.docs as Organization[],
      companies: companiesRes.docs as Company[],
    };
  } catch (err) {
    console.error("Failed to load members data from Payload:", err);
    return { members: [], companies: [] };
  }
}

export default async function MembersDirectoryPage() {
  const { members, companies } = await loadMembersData();

  return (
    <main className="page-fade" data-screen-label="03 Members">
      <PageTitle
        eyebrow="The directory"
        title="Members."
        subtitle="Who shows up. What they do. Where they sit in the Commonwealth."
        num={3}
        total={6}
      />

      <MembersTabs members={members} companies={companies} />
    </main>
  );
}
