import Link from "next/link";
import { Arrow } from "@/components/atoms/Arrow";

export type Benefit = {
  label: string;
  body: string;
};

type MembershipPitchProps = {
  id: string;
  eyebrow: string;
  kicker: string;
  headline: string;
  paragraphs: string[];
  benefits: Benefit[];
  cta: string;
  ctaHref: string;
  inverted?: boolean;
  honest?: string;
  tintedBenefits?: "capital" | "industry" | null;
};

export function MembershipPitch({
  id,
  eyebrow,
  kicker,
  headline,
  paragraphs,
  benefits,
  cta,
  ctaHref,
  inverted = false,
  honest,
  tintedBenefits = null,
}: MembershipPitchProps) {
  const fg = inverted ? "var(--bg)" : "var(--ink)";
  const fgMuted = inverted ? "rgba(255,255,255,0.78)" : "var(--ink-2)";
  const fgDim = inverted ? "rgba(255,255,255,0.5)" : "var(--muted)";
  const accentColor = inverted ? "rgba(255,255,255,0.9)" : "var(--accent)";

  const onCard = !!tintedBenefits;
  const cardBg =
    tintedBenefits === "industry"
      ? "oklch(32% 0.06 195)"
      : tintedBenefits === "capital"
        ? "oklch(28% 0.07 245)"
        : null;
  const cardFg = onCard ? "#FFFFFF" : null;
  const cardDim = onCard ? "rgba(255,255,255,0.55)" : null;
  const cardRule = onCard ? "rgba(255,255,255,0.16)" : null;
  const cardAccent = onCard
    ? tintedBenefits === "industry"
      ? "oklch(82% 0.10 190)"
      : "oklch(78% 0.12 235)"
    : null;

  return (
    <section
      className="section"
      id={id}
      style={{
        background: inverted ? "var(--ink)" : "transparent",
        color: fg,
        borderTop: inverted ? "0" : "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 200px) 1fr",
            gap: "clamp(16px, 4vw, 64px)",
            alignItems: "start",
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
          className="section-header-grid"
        >
          <div>
            <span
              style={{
                fontFamily: "var(--sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: fgDim,
                fontWeight: 500,
              }}
            >
              {eyebrow}
            </span>
            <div className="num" style={{ marginTop: 12, color: fgDim }}>
              {kicker}
            </div>
          </div>
          <div>
            <h2
              className="h-section"
              style={{
                fontSize: "clamp(34px, 4.4vw, 56px)",
                margin: 0,
                maxWidth: "22ch",
                fontWeight: 400,
                color: fg,
              }}
            >
              {headline}
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 200px) 1fr",
            gap: "clamp(16px, 4vw, 64px)",
            alignItems: "start",
          }}
          className="section-header-grid"
        >
          <div />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr minmax(0, 280px)",
              gap: "clamp(28px, 4vw, 72px)",
              alignItems: "start",
            }}
            className="pitch-cols"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1.1em" }}
            >
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: fgMuted,
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div
              style={{
                background: onCard && cardBg ? cardBg : "transparent",
                color: onCard && cardFg ? cardFg : "inherit",
                padding: onCard
                  ? "clamp(20px, 2.4vw, 32px) clamp(22px, 2.6vw, 36px)"
                  : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: onCard && cardDim ? cardDim : fgDim,
                  marginBottom: 20,
                }}
              >
                {eyebrow === "Capital members"
                  ? "Capital membership"
                  : "Industry membership"}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  borderTop: `1px solid ${
                    onCard && cardRule ? cardRule : "var(--rule-strong)"
                  }`,
                  paddingTop: 8,
                }}
              >
                {benefits.map((b, i) => (
                  <li
                    key={`${id}-${b.label}-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 14,
                      padding: "5px 0",
                    }}
                    className="benefit-row"
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: 14,
                        lineHeight: 1,
                        color: onCard && cardDim ? cardDim : "var(--muted)",
                      }}
                    >
                      •
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontStyle: "italic",
                        fontSize: 18,
                        color: onCard && cardAccent ? cardAccent : "var(--ink)",
                      }}
                    >
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {honest && (
          <div
            style={{
              marginTop: "clamp(40px, 5vw, 64px)",
              display: "grid",
              gridTemplateColumns: "minmax(160px, 200px) 1fr",
              gap: "clamp(16px, 4vw, 64px)",
            }}
            className="section-header-grid"
          >
            <div />
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.4vw, 30px)",
                fontWeight: 300,
                lineHeight: 1.4,
                color: fg,
                margin: 0,
                paddingLeft: 24,
                borderLeft: `2px solid ${accentColor}`,
                maxWidth: 880,
                textWrap: "pretty",
              }}
            >
              {honest}
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: "clamp(48px, 6vw, 80px)",
            display: "grid",
            gridTemplateColumns: "minmax(160px, 200px) 1fr",
            gap: "clamp(16px, 4vw, 64px)",
          }}
          className="section-header-grid"
        >
          <div />
          <div>
            <Link
              href={ctaHref}
              className="btn"
              style={
                inverted
                  ? {
                      background: "var(--bg)",
                      color: "var(--ink)",
                      borderColor: "var(--bg)",
                    }
                  : undefined
              }
            >
              <span>{cta}</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .pitch-cols { grid-template-columns: 1fr !important; }
          .benefit-row { grid-template-columns: 60px 1fr !important; }
          .benefit-row > div:nth-child(3) { grid-column: 2 / 3 !important; margin-top: 8px; }
        }
      `}</style>
    </section>
  );
}
