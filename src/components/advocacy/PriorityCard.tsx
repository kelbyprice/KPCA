import type { Priority } from "@/payload-types";

type PriorityCardProps = {
  priority: Priority;
  index: number;
  total: number;
};

function formatNumber(n: number | null | undefined, fallback: number): string {
  const value = n ?? fallback;
  return String(value).padStart(2, "0");
}

export function PriorityCard({ priority, index, total }: PriorityCardProps) {
  // 2-column grid: items 0-1 are top row (need bottom border if more rows below),
  // even-indexed cards (0, 2, ...) get a right border.
  const isLeftCol = index % 2 === 0;
  const isTopRow = index < total - (total % 2 === 0 ? 2 : (total % 2));
  // Simplify: items in any row that isn't the last row get bottom border.
  const lastRowStart = total - (total % 2 === 0 ? 2 : 1);
  const hasBottomBorder = index < lastRowStart;

  return (
    <article
      className="priority-card"
      style={{
        padding: "clamp(28px, 3vw, 48px)",
        borderRight: isLeftCol ? "1px solid rgba(255,255,255,0.18)" : "0",
        borderBottom: hasBottomBorder
          ? "1px solid rgba(255,255,255,0.18)"
          : "0",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        minHeight: 320,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 32,
            color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
          }}
        >
          {formatNumber(priority.displayOrder, index + 1)}
        </span>
        {priority.tag && (
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {priority.tag}
          </span>
        )}
      </div>
      <h3
        className="h-section"
        style={{
          margin: 0,
          fontSize: "clamp(22px, 2.2vw, 28px)",
          fontWeight: 400,
          color: "var(--bg)",
        }}
      >
        {priority.headline}
      </h3>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: 15,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.78)",
          margin: 0,
        }}
      >
        {priority.body}
      </p>
    </article>
  );
}
