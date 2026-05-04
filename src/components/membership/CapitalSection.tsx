import type { Benefit, CapitalTier } from "@/payload-types";

import { SectionHeader } from "@/components/atoms/SectionHeader";
import { BenefitsList } from "@/components/membership/BenefitsList";
import { TierTable } from "@/components/membership/TierTable";
import { CTAFooter } from "@/components/membership/CTAFooter";

type CapitalSectionProps = {
  benefits: Benefit[];
  tiers: CapitalTier[];
};

const CAPITAL_FOOTNOTE =
  "*Firm tier includes one investment professional and one vote; each additional pro is $50 / yr and adds one vote. Firms can register non-voting accounts (chiefs of staff, associates, IR, operations, admin) at no additional cost.";

function capitalize(s: string | null | undefined): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatTierName(t: CapitalTier): string {
  return t.footnoteAnchor ? `${t.name}${t.footnoteAnchor}` : t.name;
}

export function CapitalSection({ benefits, tiers }: CapitalSectionProps) {
  const rows = tiers.map((t) => [
    formatTierName(t),
    t.dues ?? "",
    t.voting ?? "",
    t.board ?? "",
    capitalize(t.dealFlow ?? ""),
    capitalize(t.firmDisplay ?? ""),
  ]);

  const benefitItems = benefits.map((b) => ({ label: b.label, body: b.body }));

  return (
    <section
      id="capital"
      className="section"
      style={{ scrollMarginTop: 80 }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="Capital members — the governing constituency"
          kicker="A"
          title="If you write checks into Kentucky's early-stage companies, this is your association."
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
              Capital membership is defined by what you do, not what you call
              yourself. Venture funds, angel investors, family offices with
              allocation to private capital, and corporate venture arms all
              qualify. An entrepreneur who actively angel invests joins as a
              capital member. A Kentucky-headquartered corporation with a
              venture arm joins as a capital member.
            </p>
            <p>
              Capital members form KPCA&apos;s governing constituency: voting
              rights on association direction, eligibility for the board, and a
              seat at every policy and programming conversation that shapes the
              ecosystem.
            </p>
          </div>
          {benefitItems.length > 0 && (
            <BenefitsList
              items={benefitItems}
              title="Capital membership"
              tint="capital"
            />
          )}
        </div>

        {rows.length > 0 && (
          <TierTable
            title="Capital member tiers"
            eyebrow="Dues, voting, benefits"
            columns={[
              "Tier",
              "Annual dues",
              "Voting weight",
              "Board eligibility",
              "Deal flow",
              "Firm display",
            ]}
            rows={rows}
            note={CAPITAL_FOOTNOTE}
          />
        )}

        <CTAFooter
          label="Apply for capital membership"
          href="/membership#capital"
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
