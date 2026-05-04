import Link from "next/link";
import { Eyebrow } from "@/components/chrome/Eyebrow";
import { Arrow } from "@/components/atoms/Arrow";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        borderBottom: "1px solid var(--rule)",
        overflow: "hidden",
      }}
    >
      <div
        className="container"
        style={{
          paddingTop: "clamp(80px, 12vw, 180px)",
          paddingBottom: "clamp(72px, 10vw, 140px)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            gap: "clamp(16px, 4vw, 56px)",
            alignItems: "start",
          }}
          className="hero-grid"
        >
          <div style={{ paddingTop: 18 }}>
            <Eyebrow noRule>Est. 2026 · Lexington</Eyebrow>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              <div>38.04°N</div>
              <div>84.50°W</div>
            </div>
          </div>

          <div>
            <h1
              className="display"
              style={{
                fontSize: "clamp(44px, 7.4vw, 116px)",
                margin: 0,
                fontWeight: 400,
                lineHeight: 1.04,
              }}
            >
              Kentucky&apos;s next decade
              <br />
              of{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontFamily: "var(--serif)",
                  fontWeight: 400,
                }}
              >
                capital &amp; innovation
              </em>
              <br />
              is being shaped now.
            </h1>

            <div
              style={{
                marginTop: "clamp(36px, 4vw, 56px)",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 32,
                alignItems: "end",
                paddingTop: 28,
                borderTop: "1px solid var(--rule)",
              }}
              className="hero-foot"
            >
              <p
                className="lede"
                style={{
                  fontSize: "clamp(20px, 2vw, 28px)",
                  margin: 0,
                  maxWidth: 720,
                  fontWeight: 300,
                }}
              >
                KPCA is how the people building it stay organized.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="#capital" className="btn">
                  <span>Become a member</span>
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-foot { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
