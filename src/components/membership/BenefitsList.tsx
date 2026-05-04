type BenefitItem = {
  label: string;
  body: string;
};

type BenefitsListProps = {
  items: BenefitItem[];
  title: string;
  tint: "capital" | "industry";
};

export function BenefitsList({ items, title, tint }: BenefitsListProps) {
  const cardBg =
    tint === "industry" ? "oklch(32% 0.06 195)" : "oklch(28% 0.07 245)";
  const cardFg = "#FFFFFF";
  const cardMuted = "rgba(255,255,255,0.82)";
  const cardDim = "rgba(255,255,255,0.55)";
  const cardRule = "rgba(255,255,255,0.16)";
  const cardAccent =
    tint === "industry" ? "oklch(82% 0.10 190)" : "oklch(78% 0.12 235)";

  return (
    <div
      style={{
        background: cardBg,
        color: cardFg,
        padding: "clamp(24px, 2.6vw, 36px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: cardDim,
          marginBottom: 24,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: `1px solid ${cardRule}`,
        }}
      >
        {items.map((item) => (
          <li
            key={item.label}
            className="benefit-row"
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: 24,
              padding: "20px 0",
              borderBottom: `1px solid ${cardRule}`,
              alignItems: "start",
            }}
          >
            <div
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 18,
                color: cardAccent,
              }}
            >
              {item.label}.
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: cardMuted,
              }}
            >
              {item.body}
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @media (max-width: 540px) {
          .benefit-row { grid-template-columns: 1fr !important; gap: 6px !important; }
        }
      `}</style>
    </div>
  );
}
