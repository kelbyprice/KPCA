import { SectionHeader } from "@/components/atoms/SectionHeader";

type PreviewCardProps = {
  kind: string;
  title: string;
  dek: string;
  tag: string;
  meta: string;
};

function PreviewCard({ kind, title, dek, tag, meta }: PreviewCardProps) {
  return (
    <article
      style={{
        background: "var(--bg)",
        border: "1px solid var(--rule-strong)",
        padding: "clamp(24px, 2.8vw, 36px)",
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
          alignItems: "center",
          paddingBottom: 16,
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {kind}
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            padding: "4px 10px",
            border: "1px solid var(--rule-strong)",
          }}
        >
          {tag}
        </span>
      </div>

      {kind === "Field notes" && (
        <div className="stripe-placeholder" style={{ height: 140 }}>
          <span>FIELD NOTES IMAGE</span>
        </div>
      )}

      <div style={{ flex: 1 }}>
        <h4
          className="h-section"
          style={{
            fontSize: "clamp(22px, 2vw, 28px)",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            margin: "14px 0 0",
            textWrap: "pretty",
          }}
        >
          {dek}
        </p>
      </div>

      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          paddingTop: 16,
          borderTop: "1px solid var(--rule)",
        }}
      >
        {meta}
      </div>
    </article>
  );
}

export function StreamsPreview() {
  return (
    <section
      className="section"
      style={{
        background: "var(--bg-elev)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="Field notes + Dispatch"
          kicker="05"
          title="What our members are seeing first."
          lede="KPCA publishes two streams. Field notes — reported stories on Kentucky companies, Kentucky capital, and the partnerships producing real outcomes. Dispatch — briefings on the policy, market, and ecosystem developments our members need to know."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 200px) 1fr",
            gap: "clamp(16px, 4vw, 64px)",
            alignItems: "start",
          }}
          className="section-header-grid"
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Coming this fall
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(20px, 2.5vw, 36px)",
            }}
            className="streams-grid"
          >
            <PreviewCard
              kind="Field notes"
              title="Reported stories from inside Kentucky's ecosystem."
              dek="Founders, deals, and the partnerships producing real outcomes — covered with the depth of a beat reporter, not the gloss of a press release."
              tag="Reported"
              meta="First story this fall"
            />
            <PreviewCard
              kind="Dispatch"
              title="Member briefings on what's moving and why."
              dek="Policy shifts, market signal, and ecosystem developments distilled for people deploying capital and running companies in the Commonwealth."
              tag="Briefing"
              meta="Weekly cadence at v1.5"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .streams-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
