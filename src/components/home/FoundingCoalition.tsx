import { SectionHeader } from "@/components/atoms/SectionHeader";

export type FoundingMember = {
  name: string;
  kind: "capital" | "industry";
};

type FoundingCoalitionProps = {
  members: FoundingMember[];
};

export function FoundingCoalition({ members }: FoundingCoalitionProps) {
  if (members.length === 0) {
    return null;
  }

  const capitalCount = members.filter((m) => m.kind === "capital").length;
  const industryCount = members.filter((m) => m.kind === "industry").length;
  const cols = 6;

  return (
    <section
      className="section"
      style={{
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="Founding coalition"
          kicker="04"
          title="A coalition of Kentucky's most active investors and most strategically positioned companies."
          lede="Founding members shape KPCA's first chapter — the policy positions, programming priorities, and ecosystem standards that will define private capital in Kentucky for the next decade."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            border: "1px solid var(--rule)",
            background: "var(--bg)",
          }}
          className="logo-grid"
        >
          {members.map((m, i) => (
            <div
              key={`${m.name}-${i}`}
              style={{
                aspectRatio: "5 / 3",
                borderRight:
                  (i + 1) % cols === 0 ? "0" : "1px solid var(--rule)",
                borderBottom: i < cols ? "1px solid var(--rule)" : "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "repeating-linear-gradient(135deg, var(--rule) 0 1px, transparent 1px 9px)",
                position: "relative",
              }}
              title={m.name}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 12,
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted-2)",
                }}
              >
                {m.kind}
              </div>
              <div
                style={{
                  background: "var(--bg)",
                  padding: "8px 14px",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(13px, 1.2vw, 18px)",
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  border: "1px solid var(--rule-strong)",
                  textAlign: "center",
                  textWrap: "balance",
                  maxWidth: "85%",
                }}
              >
                {m.name}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--muted)",
            textTransform: "uppercase",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span>
            {capitalCount} capital · {industryCount} industry
          </span>
          <span>Roster confirmed quarterly</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .logo-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .logo-grid > div:nth-child(3n) { border-right: 0 !important; }
          .logo-grid > div:nth-child(-n+9) { border-bottom: 1px solid var(--rule) !important; }
        }
        @media (max-width: 480px) {
          .logo-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .logo-grid > div { border-right: 1px solid var(--rule) !important; border-bottom: 1px solid var(--rule) !important; }
          .logo-grid > div:nth-child(2n) { border-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
