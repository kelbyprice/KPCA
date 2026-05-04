import Link from "next/link";
import { Arrow } from "@/components/atoms/Arrow";
import { SectionHeader } from "@/components/atoms/SectionHeader";

type ClosingCardProps = {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  accent: "capital" | "industry";
};

function ClosingCard({ tag, title, body, cta, href, accent }: ClosingCardProps) {
  const colors =
    accent === "capital"
      ? {
          bg: "oklch(28% 0.07 245)",
          fg: "#FFFFFF",
          muted: "rgba(255,255,255,0.78)",
          rule: "rgba(255,255,255,0.2)",
          chip: "oklch(72% 0.12 235)",
        }
      : {
          bg: "oklch(32% 0.06 195)",
          fg: "#FFFFFF",
          muted: "rgba(255,255,255,0.78)",
          rule: "rgba(255,255,255,0.2)",
          chip: "oklch(78% 0.10 190)",
        };

  return (
    <Link
      href={href}
      className="card-hover"
      style={{
        background: colors.bg,
        color: colors.fg,
        padding: "clamp(28px, 3.5vw, 56px)",
        cursor: "pointer",
        position: "relative",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 20,
          borderBottom: `1px solid ${colors.rule}`,
          marginBottom: 32,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: colors.chip,
          }}
        >
          {tag}
        </span>
      </div>

      <h3
        className="h-section"
        style={{
          fontSize: "clamp(38px, 4.6vw, 60px)",
          margin: 0,
          fontWeight: 400,
          color: colors.fg,
          maxWidth: "16ch",
          fontStyle: "italic",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: 16,
          lineHeight: 1.65,
          color: colors.muted,
          margin: "28px 0 36px",
          flex: 1,
          maxWidth: 480,
        }}
      >
        {body}
      </p>

      <div
        style={{
          paddingTop: 24,
          borderTop: `1px solid ${colors.rule}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--sans)",
            fontSize: 14,
            fontWeight: 500,
            color: colors.fg,
            display: "inline-flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          {cta} <Arrow />
        </span>
      </div>
    </Link>
  );
}

export function ClosingCTA() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="Become a member"
          kicker="08"
          title="Two ways in. Both essential."
          lede="KPCA exists for the people deploying capital into Kentucky's early-stage economy and the established companies who benefit from staying proximate to what's being built. Pick the one that fits."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(20px, 2vw, 32px)",
          }}
          className="closing-grid"
        >
          <ClosingCard
            tag="Capital members"
            title="Voice."
            body="Vote on direction. Sit on the board. Shape the policy and programming agenda that defines private capital in Kentucky."
            cta="Apply for capital membership"
            href="/membership#capital"
            accent="capital"
          />
          <ClosingCard
            tag="Industry members"
            title="Stay proximate."
            body="Stay close to the innovation in your sector. Adopt, license, partner — or simply know what is coming before it arrives."
            cta="Apply for industry membership"
            href="/membership#industry"
            accent="industry"
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .closing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
