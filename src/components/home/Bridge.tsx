export function Bridge() {
  return (
    <section
      style={{
        background: "var(--bg-elev)",
        borderTop: "1px solid var(--rule-strong)",
        borderBottom: "1px solid var(--rule-strong)",
        padding: "clamp(60px, 8vw, 120px) 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 200px) 1fr",
            gap: "clamp(16px, 4vw, 64px)",
            alignItems: "center",
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
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              ⟶ Bridge
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(28px, 4vw, 52px)",
              lineHeight: 1.18,
              fontWeight: 300,
              margin: 0,
              color: "var(--ink)",
              maxWidth: "26ch",
              textWrap: "balance",
              letterSpacing: "-0.01em",
            }}
          >
            Capital is half the equation. The companies it backs need customers
            — and Kentucky has them.
          </p>
        </div>
      </div>
    </section>
  );
}
