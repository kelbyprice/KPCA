import { SectionHeader } from "@/components/atoms/SectionHeader";

export type FeaturedCompany = {
  name: string;
  description: string;
  sector: string;
  city: string;
};

type MemberCompaniesProps = {
  companies: FeaturedCompany[];
};

export function MemberCompanies({ companies }: MemberCompaniesProps) {
  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="section" id="kentucky-companies">
      <div className="container">
        <SectionHeader
          eyebrow="Kentucky companies"
          kicker="07"
          title="Real founders. Real products. Real Kentucky communities."
          lede="A sample of companies built and backed by KPCA capital members."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--rule-strong)",
            borderLeft: "1px solid var(--rule)",
          }}
          className="companies-grid"
        >
          {companies.map((c) => (
            <article
              key={c.name}
              className="card-hover"
              style={{
                padding: "clamp(20px, 2vw, 32px)",
                borderRight: "1px solid var(--rule)",
                borderBottom: "1px solid var(--rule)",
                background: "var(--bg)",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 18,
              }}
            >
              <div>
                <h4
                  className="h-section"
                  style={{ margin: 0, fontSize: 22, fontWeight: 500 }}
                >
                  {c.name}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--ink-2)",
                    margin: "12px 0 0",
                  }}
                >
                  {c.description}
                </p>
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  display: "flex",
                  gap: 14,
                  paddingTop: 14,
                  borderTop: "1px solid var(--rule)",
                }}
              >
                <span>{c.sector}</span>
                <span style={{ color: "var(--muted-2)" }}>·</span>
                <span>{c.city}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1080px) {
          .companies-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .companies-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
