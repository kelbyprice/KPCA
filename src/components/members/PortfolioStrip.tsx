import type { Company } from "@/payload-types";

import { SectionHeader } from "@/components/atoms/SectionHeader";

type PortfolioStripProps = {
  companies: Company[];
};

export function PortfolioStrip({ companies }: PortfolioStripProps) {
  if (companies.length === 0) {
    return null;
  }

  return (
    <section
      className="section"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="Portfolio"
          kicker="03"
          title="What our capital members are backing."
          lede="Kentucky companies built with capital from KPCA members."
        />

        <div
          className="dir-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--rule-strong)",
            borderLeft: "1px solid var(--rule)",
          }}
        >
          {companies.map((c) => (
            <div
              key={c.id}
              style={{
                padding: 24,
                borderRight: "1px solid var(--rule)",
                borderBottom: "1px solid var(--rule)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 140,
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Portfolio
              </span>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
