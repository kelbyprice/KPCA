import { SectionHeader } from "@/components/atoms/SectionHeader";

const CARDS = [
  {
    n: "01",
    verb: "Coordinate",
    head: "Connect ideas, capital, and industry adopters.",
    body: "We bring capital providers and Kentucky companies into the same room — formally, repeatedly, on terms that produce actual opportunities and productivity growth.",
  },
  {
    n: "02",
    verb: "Advocate",
    head: "Advance policy that keeps Kentucky competitive.",
    body: "We speak with one voice on the policy environment for private capital in the Commonwealth — tax treatment, fund formation, public co-investment, and the federal-state interfaces that determine whether Kentucky punches above its weight or below it.",
  },
  {
    n: "03",
    verb: "Develop",
    head: "Scale the volume and sophistication of the ecosystem.",
    body: "Professional development, shared learning, and the practical infrastructure that turns an ecosystem from a list of firms into a working community.",
  },
];

export function WhatWeDo() {
  return (
    <section className="section" id="what-we-do">
      <div className="container">
        <SectionHeader
          eyebrow="What we do"
          kicker="03"
          title="Three things, done seriously."
        />

        <div style={{ borderTop: "1px solid var(--rule-strong)" }}>
          {CARDS.map((c) => (
            <article
              key={c.n}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1.1fr 1.4fr",
                gap: "clamp(16px, 4vw, 56px)",
                padding: "clamp(36px, 4vw, 56px) 0",
                borderBottom: "1px solid var(--rule)",
                alignItems: "start",
              }}
              className="wwd-row"
            >
              <div className="num" style={{ fontSize: 13, paddingTop: 10 }}>
                {c.n}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 16,
                  }}
                >
                  {c.verb}
                </div>
                <h3
                  className="h-section"
                  style={{
                    fontSize: "clamp(28px, 2.8vw, 38px)",
                    margin: 0,
                    fontWeight: 400,
                    maxWidth: "18ch",
                  }}
                >
                  {c.head}
                </h3>
              </div>
              <div className="body-prose" style={{ paddingTop: 6 }}>
                {c.body}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .wwd-row { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
