import type { Benefit, IndustryTier } from "@/payload-types";

import { SectionHeader } from "@/components/atoms/SectionHeader";
import { BenefitsList } from "@/components/membership/BenefitsList";
import { TierTable } from "@/components/membership/TierTable";
import { CTAFooter } from "@/components/membership/CTAFooter";
import { HonestyCallout } from "@/components/membership/HonestyCallout";

type IndustrySectionProps = {
  benefits: Benefit[];
  tiers: IndustryTier[];
};

const INDUSTRY_FOOTNOTE =
  "Tiers and dues finalized with the board prior to launch.";

function formatPilotPathways(value: string | null | undefined): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatSummitAccess(value: string | null | undefined): string {
  if (value === "reserved") return "Reserved seats";
  if (value === "general") return "General admission";
  return "";
}

export function IndustrySection({ benefits, tiers }: IndustrySectionProps) {
  const rows = tiers.map((t) => [
    t.name,
    t.dues ?? "",
    t.sectorBriefings ?? "",
    formatPilotPathways(t.pilotPathways),
    formatSummitAccess(t.summitAccess),
  ]);

  const benefitItems = benefits.map((b) => ({ label: b.label, body: b.body }));

  return (
    <section
      id="industry"
      className="section"
      style={{
        background: "var(--bg-elev)",
        borderTop: "1px solid var(--rule)",
        scrollMarginTop: 80,
      }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="Industry members — staying proximate to what's being built"
          kicker="B"
          title="If you run an established Kentucky company, you have a reason to be in this room."
        />

        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 64px)",
            paddingBottom: "clamp(48px, 6vw, 80px)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <div className="body-prose">
            <p>
              Industry members are Kentucky companies whose business benefits
              from an active innovation economy in their sector &mdash; but who
              are not, themselves, deploying capital. A logistics company that
              wants visibility into freight technology. A utility paying
              attention to grid software. A consumer brand watching the next
              wave of distribution and commerce platforms. A century-old
              Kentucky manufacturer whose category is being rewritten by
              adjacent technology.
            </p>
            <p>
              Industry members do not vote on association governance. That is
              the deal: capital members govern, industry members stay informed.
              What industry members get is the room &mdash; proximity to
              Kentucky&apos;s most active investors and the founders they back,
              structured access to early-stage technology in their sectors, and
              a credible seat in the Commonwealth&apos;s innovation
              conversation.
            </p>
            <p>
              Eligibility extends beyond Kentucky-headquartered companies.
              Established regional strategics with material Kentucky operations
              &mdash; manufacturing, distribution, supply chains, or customer
              concentration &mdash; qualify as well. The test is whether your
              business depends on what gets built here, not where your HQ sits.
            </p>
          </div>
          {benefitItems.length > 0 && (
            <BenefitsList
              items={benefitItems}
              title="Industry membership"
              tint="industry"
            />
          )}
        </div>

        <HonestyCallout />

        {rows.length > 0 && (
          <TierTable
            title="Industry member tiers"
            eyebrow="Dues and benefits"
            columns={[
              "Tier",
              "Annual dues",
              "Sector briefings",
              "Pilot pathways",
              "Summit access",
            ]}
            rows={rows}
            note={INDUSTRY_FOOTNOTE}
          />
        )}

        <CTAFooter
          label="Apply for industry membership"
          href="/membership#industry"
        />
      </div>
      <style>{`
        @media (max-width: 880px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
