export function HonestyCallout() {
  return (
    <aside
      className="honesty-grid"
      style={{
        margin: "clamp(48px, 6vw, 80px) 0 0",
        padding: "clamp(36px, 4vw, 56px)",
        background: "var(--ink)",
        color: "var(--bg)",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "clamp(24px, 3vw, 40px)",
        alignItems: "start",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--serif)",
          fontSize: 80,
          lineHeight: 0.7,
          color: "rgba(255,255,255,0.4)",
          fontStyle: "italic",
          paddingTop: 12,
        }}
      >
        &ldquo;
      </div>
      <div>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(22px, 2.4vw, 32px)",
            lineHeight: 1.4,
            fontWeight: 300,
            fontStyle: "italic",
            margin: 0,
            textWrap: "pretty",
            maxWidth: 760,
          }}
        >
          You don&apos;t have to invest to benefit from this ecosystem &mdash;
          you just have to show up and stay connected.
        </p>
        <div
          style={{
            marginTop: 24,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          &mdash; KPCA mission doc &middot; the deal, plainly
        </div>
      </div>
      <style>{`
        @media (max-width: 540px) {
          .honesty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </aside>
  );
}
