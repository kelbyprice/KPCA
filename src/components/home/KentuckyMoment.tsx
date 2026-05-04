export function KentuckyMoment() {
  return (
    <section
      className="section"
      style={{
        background: "var(--ink)",
        color: "var(--bg)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            gap: "clamp(16px, 4vw, 56px)",
            alignItems: "start",
          }}
          className="km-grid"
        >
          <div style={{ paddingTop: 8 }}>
            <span
              style={{
                fontFamily: "var(--sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
              }}
            >
              Why now
            </span>
            <div
              className="num"
              style={{ marginTop: 12, color: "rgba(255,255,255,0.45)" }}
            >
              06
            </div>
          </div>

          <div>
            <h2
              className="h-section"
              style={{
                fontSize: "clamp(36px, 5vw, 68px)",
                margin: 0,
                color: "var(--bg)",
                fontWeight: 400,
                maxWidth: "16ch",
              }}
            >
              Something is being built in Kentucky. KPCA is how we get
              organized.
            </h2>

            <blockquote
              style={{
                margin: "clamp(40px, 5vw, 64px) 0",
                paddingLeft: 28,
                borderLeft: "1px solid rgba(255,255,255,0.4)",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.4,
                fontWeight: 300,
                color: "rgba(255,255,255,0.92)",
                maxWidth: 860,
                textWrap: "pretty",
              }}
            >
              &ldquo;Capital, companies, and opportunity don&apos;t stop at
              state lines. But the work of building an ecosystem does have a
              home — and Kentucky&apos;s belongs here.&rdquo;
            </blockquote>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(24px, 4vw, 56px)",
                marginTop: 24,
              }}
              className="km-cols"
            >
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.78)",
                  margin: 0,
                }}
              >
                Kentucky has spent the last decade producing more companies,
                more capital, and more conviction than its national reputation
                reflects. What it has not had — until now — is an organized
                voice that can speak for the whole investment community: the
                funds, the angels, the family offices, the corporate arms, and
                the established Kentucky companies whose futures depend on what
                gets built next.
              </p>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.78)",
                  margin: 0,
                }}
              >
                KPCA is that voice. Not a chamber. Not a club. The organized
                home for the people putting capital and conviction behind
                Kentucky&apos;s next chapter.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .km-grid { grid-template-columns: 1fr !important; }
          .km-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
