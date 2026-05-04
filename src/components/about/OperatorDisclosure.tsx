export function OperatorDisclosure() {
  return (
    <section
      className="section"
      style={{ background: "var(--ink)", color: "var(--bg)" }}
    >
      <div className="container">
        <div
          className="adv-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "clamp(16px, 4vw, 64px)",
            alignItems: "start",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              How KPCA is operated
            </span>
            <div
              className="num"
              style={{ marginTop: 12, color: "rgba(255,255,255,0.45)" }}
            >
              Disclosure
            </div>
          </div>
          <div>
            <h2
              className="h-section"
              style={{
                margin: 0,
                fontSize: "clamp(34px, 4.6vw, 56px)",
                fontWeight: 400,
                color: "var(--bg)",
                maxWidth: 800,
              }}
            >
              Operated by KSTC.
            </h2>

            <div
              className="adv-cols"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(24px, 4vw, 56px)",
                marginTop: 48,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.82)",
                  margin: 0,
                }}
              >
                KPCA&apos;s day-to-day operations are run by KSTC under a
                formal operating agreement. KSTC provides the operational
                infrastructure, programming staff, and convening capacity
                that lets KPCA function as a working association from day
                one.
              </p>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.82)",
                  margin: 0,
                }}
              >
                The arrangement is intentional. Building a private capital
                association from scratch typically takes years of executive
                recruitment and operating overhead before substantive
                programming is possible. By placing KPCA&apos;s operational
                home inside KSTC, the association ships on day one with the
                convening power, the data infrastructure, and the policy
                access that an independent organization would spend its
                first decade building.
              </p>
            </div>

            <div
              className="adv-cols"
              style={{
                marginTop: "clamp(48px, 5vw, 72px)",
                paddingTop: 28,
                borderTop: "1px solid rgba(255,255,255,0.25)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(24px, 4vw, 56px)",
                alignItems: "start",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: 12,
                  }}
                >
                  Governance
                </div>
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 22,
                    lineHeight: 1.4,
                    color: "var(--bg)",
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  Sits with capital members and the board.
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: 12,
                  }}
                >
                  Operations
                </div>
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 22,
                    lineHeight: 1.4,
                    color: "var(--bg)",
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  Sit with KSTC. The two are kept distinct on purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .adv-grid { grid-template-columns: 1fr !important; }
          .adv-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
