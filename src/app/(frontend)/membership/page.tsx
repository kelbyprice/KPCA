import { getPayload } from "payload";
import config from "@payload-config";

import type { Benefit, CapitalTier, IndustryTier } from "@/payload-types";

import { PageTitle } from "@/components/atoms/PageTitle";
import { CapitalSection } from "@/components/membership/CapitalSection";
import { IndustrySection } from "@/components/membership/IndustrySection";
import { MembershipTabs } from "@/components/membership/MembershipTabs";

type MembershipData = {
  capitalBenefits: Benefit[];
  industryBenefits: Benefit[];
  capitalTiers: CapitalTier[];
  industryTiers: IndustryTier[];
};

async function loadMembershipData(): Promise<MembershipData> {
  try {
    const payload = await getPayload({ config });

    const [
      capitalBenefitsRes,
      industryBenefitsRes,
      capitalTiersRes,
      industryTiersRes,
    ] = await Promise.all([
      payload.find({
        collection: "benefits",
        where: { kind: { equals: "capital" } },
        sort: "displayOrder",
        limit: 20,
      }),
      payload.find({
        collection: "benefits",
        where: { kind: { equals: "industry" } },
        sort: "displayOrder",
        limit: 20,
      }),
      payload.find({
        collection: "capitalTiers",
        sort: "displayOrder",
        limit: 20,
      }),
      payload.find({
        collection: "industryTiers",
        sort: "displayOrder",
        limit: 20,
      }),
    ]);

    return {
      capitalBenefits: capitalBenefitsRes.docs as Benefit[],
      industryBenefits: industryBenefitsRes.docs as Benefit[],
      capitalTiers: capitalTiersRes.docs as CapitalTier[],
      industryTiers: industryTiersRes.docs as IndustryTier[],
    };
  } catch (err) {
    console.error("Failed to load membership data from Payload:", err);
    return {
      capitalBenefits: [],
      industryBenefits: [],
      capitalTiers: [],
      industryTiers: [],
    };
  }
}

export default async function MembershipPage() {
  const { capitalBenefits, industryBenefits, capitalTiers, industryTiers } =
    await loadMembershipData();

  return (
    <main className="page-fade" data-screen-label="02 Membership">
      <PageTitle
        eyebrow="Membership"
        title="Membership."
        subtitle="KPCA exists for two kinds of members. Pick the one that describes you, then keep reading."
        num={2}
        total={6}
      />

      <MembershipTabs
        capitalSection={
          <CapitalSection benefits={capitalBenefits} tiers={capitalTiers} />
        }
        industrySection={
          <IndustrySection
            benefits={industryBenefits}
            tiers={industryTiers}
          />
        }
      />
    </main>
  );
}
