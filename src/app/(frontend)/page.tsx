import { getPayload } from "payload";
import config from "@payload-config";

// ISR: regenerate at most every 60s so admin edits to Payload-driven content
// appear without a redeploy. Move to on-demand revalidation when needed.
export const revalidate = 60;

import type { Company, Organization } from "@/payload-types";

import { Hero } from "@/components/home/Hero";
import { Bridge } from "@/components/home/Bridge";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import {
  FoundingCoalition,
  type FoundingMember,
} from "@/components/home/FoundingCoalition";
import { StreamsPreview } from "@/components/home/StreamsPreview";
import { KentuckyMoment } from "@/components/home/KentuckyMoment";
import {
  MemberCompanies,
  type FeaturedCompany,
} from "@/components/home/MemberCompanies";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import {
  MembershipPitch,
  type Benefit,
} from "@/components/home/MembershipPitch";

const HOME_CAPITAL_BENEFITS: Benefit[] = [
  {
    label: "Voice",
    body: "Vote, board eligibility, and a voice in every policy conversation.",
  },
  {
    label: "Opportunity",
    body: "Curated introductions to Kentucky founders and co-investment opportunities.",
  },
  {
    label: "Policy",
    body: "Direct input on tax, fund formation, and federal-state policy.",
  },
  {
    label: "Convening",
    body: "Quarterly member gatherings and an annual capital meeting.",
  },
  {
    label: "Visibility",
    body: "A seat in the institutional narrative of Kentucky capital.",
  },
];

const HOME_INDUSTRY_BENEFITS: Benefit[] = [
  {
    label: "Proximity",
    body: "Early exposure to companies being built in your sector.",
  },
  {
    label: "Sector briefings",
    body: "Curated landscape reviews of innovation in your industry.",
  },
  {
    label: "Pilot pathways",
    body: "Introductions to founders building products you might adopt or partner with.",
  },
  {
    label: "Convening",
    body: "Industry summits and topical roundtables alongside capital members.",
  },
  {
    label: "Visibility",
    body: "Recognition as a strategically engaged Kentucky company.",
  },
];

async function loadHomeData(): Promise<{
  founding: FoundingMember[];
  companies: FeaturedCompany[];
}> {
  try {
    const payload = await getPayload({ config });

    const [membersRes, companiesRes] = await Promise.all([
      payload.find({
        collection: "organizations",
        where: { featuredOnHome: { equals: true } },
        limit: 12,
        sort: "displayOrder",
      }),
      payload.find({
        collection: "companies",
        where: { featured: { equals: true } },
        limit: 9,
      }),
    ]);

    const founding: FoundingMember[] = (membersRes.docs as Organization[]).map(
      (m) => ({
        name: m.name,
        kind: m.kind,
      }),
    );

    const companies: FeaturedCompany[] = (companiesRes.docs as Company[]).map(
      (c) => ({
        name: c.name,
        description: c.description ?? "",
        sector: c.sector ?? "",
        city: c.city ?? "",
      }),
    );

    return { founding, companies };
  } catch (err) {
    console.error("Failed to load home data from Payload:", err);
    return { founding: [], companies: [] };
  }
}

export default async function HomePage() {
  const { founding, companies } = await loadHomeData();

  return (
    <main className="page-fade">
      <Hero />

      <MembershipPitch
        id="capital"
        eyebrow="Capital members"
        kicker="01"
        headline="If you're deploying capital into Kentucky's early-stage economy, this is your association."
        paragraphs={[
          "KPCA is the organized home for the funds, angels, family offices, and corporate venture arms backing what gets built in the Commonwealth. Capital members form the governing constituency — voting on association direction, eligible for board service, and at the table for every policy and programming decision that shapes Kentucky's investment environment.",
          "Most state-level capital communities never get organized. They stay informal, social, and structurally invisible to the policy and federal funding conversations that determine whether the next decade looks like the last one. KPCA is the alternative.",
        ]}
        benefits={HOME_CAPITAL_BENEFITS}
        tintedBenefits="capital"
        honest="You don't have to be based in Kentucky. You just have to be willing to invest."
        cta="Apply for capital membership"
        ctaHref="/membership#capital"
      />

      <Bridge />

      <MembershipPitch
        id="industry"
        eyebrow="Industry members"
        kicker="02"
        headline="If you run a Kentucky company, the innovation being built around you is your business."
        paragraphs={[
          "Industry membership is for established Kentucky companies who join not to deploy capital, but to stay close to what's being built in their sectors. Logistics companies watching freight technology. Utilities paying attention to grid software. Consumer brands tracking the next wave of distribution. Manufacturers whose categories are being rewritten by adjacent technology. The companies that show up early to what's coming have an advantage over the ones that learn about it from trade press.",
          "Industry members do not vote on association governance. That is the deal: capital members govern, industry members stay informed and proximate. What industry members get is the room — structured access to Kentucky's most active investors and the founders they back, sector-specific intelligence on early-stage activity in their industries, and pilot pathways to companies building products they might adopt, license, or partner with.",
        ]}
        benefits={HOME_INDUSTRY_BENEFITS}
        tintedBenefits="industry"
        honest="You don't have to invest to benefit from this ecosystem. You just have to show up and stay connected."
        cta="Apply for industry membership"
        ctaHref="/membership#industry"
      />

      <WhatWeDo />
      <FoundingCoalition members={founding} />
      <StreamsPreview />
      <KentuckyMoment />
      <MemberCompanies companies={companies} />
      <ClosingCTA />
    </main>
  );
}
