import type { Member } from "@/payload-types";

import { SectionHeader } from "@/components/atoms/SectionHeader";
import { StripePlaceholder } from "@/components/atoms/StripePlaceholder";

type DirectorySectionProps = {
  eyebrow: string;
  title: string;
  lede: string;
  members: Member[];
  alt?: boolean;
};

export function DirectorySection({
  eyebrow,
  title,
  lede,
  members,
  alt = false,
}: DirectorySectionProps) {
  return (
    <section
      className="section"
      style={{
        background: alt ? "var(--bg-elev)" : "var(--bg)",
        borderTop: alt ? "1px solid var(--rule)" : "0",
      }}
    >
      <div className="container">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />

        <div
          className="dir-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--rule-strong)",
            borderLeft: "1px solid var(--rule)",
          }}
        >
          {members.map((m) => {
            const typeLabel =
              m.kind === "industry" ? m.sector ?? "" : m.type ?? "";
            return (
              <article
                key={m.id}
                className="card-hover"
                style={{
                  padding: "clamp(20px, 2vw, 28px)",
                  borderRight: "1px solid var(--rule)",
                  borderBottom: "1px solid var(--rule)",
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  // Per-card bg keyed off member.kind: industry cards always
                  // get the elevated bg, regardless of which tab is active.
                  // On Capital and Industry tabs this is a no-op (cards match
                  // the section). On the "All" tab it provides subtle
                  // differentiation — and gives users a visual continuity
                  // signal when switching from Capital/Industry into All.
                  background:
                    m.kind === "industry" ? "var(--bg-elev)" : "var(--bg)",
                }}
              >
                <StripePlaceholder height={68} label="LOGO" />
                <div style={{ flex: 1 }}>
                  <h4
                    className="h-section"
                    style={{ margin: 0, fontSize: 22, fontWeight: 500 }}
                  >
                    {m.name}
                  </h4>
                  {m.note && (
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "var(--ink-2)",
                        margin: "8px 0 0",
                      }}
                    >
                      {m.note}
                    </p>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    paddingTop: 12,
                    borderTop: "1px solid var(--rule)",
                  }}
                >
                  {typeLabel && <span>{typeLabel}</span>}
                  {typeLabel && m.city && (
                    <span style={{ color: "var(--muted-2)" }}>·</span>
                  )}
                  {m.city && <span>{m.city}</span>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) { .dir-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .dir-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
