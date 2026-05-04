import { getPayload } from "payload";
import config from "@payload-config";

import type { Priority } from "@/payload-types";

import { PageTitle } from "@/components/atoms/PageTitle";
import { Eyebrow } from "@/components/chrome/Eyebrow";
import { PriorityCard } from "@/components/advocacy/PriorityCard";

async function loadPriorities(): Promise<Priority[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "priorities",
      sort: "displayOrder",
      limit: 20,
    });
    return res.docs as Priority[];
  } catch (err) {
    console.error("Failed to load priorities from Payload:", err);
    return [];
  }
}

export default async function AdvocacyPage() {
  const priorities = await loadPriorities();

  return (
    <main className="page-fade" data-screen-label="05 Advocacy">
      <PageTitle
        eyebrow="Policy"
        title="Advocacy."
        subtitle="An organized voice for Kentucky's investment community on the policy environment that determines whether Kentucky competes — or watches."
        num={5}
        total={6}
      />

      {/* The case */}
      <section className="section">
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
              <Eyebrow>The case</Eyebrow>
              <div className="num" style={{ marginTop: 12 }}>
                01 / 02
              </div>
            </div>
            <div>
              <h2
                className="h-section"
                style={{
                  margin: 0,
                  fontSize: "clamp(34px, 4.6vw, 60px)",
                  fontWeight: 400,
                  maxWidth: 920,
                }}
              >
                Why Kentucky needs an organized capital voice —{" "}
                <em
                  style={{ fontStyle: "italic", color: "var(--accent)" }}
                >
                  now
                </em>
                .
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
                <p className="body-prose" style={{ margin: 0 }}>
                  Kentucky&apos;s private capital community has grown faster
                  than the public conversation about it. Funds have been
                  raised. Angels have organized. Family offices have
                  allocated. Companies have been built. What has not existed,
                  until now, is a single body that can speak for the
                  community on policy questions that determine whether the
                  next decade of Kentucky&apos;s early-stage investment
                  activity outpaces the last one.
                </p>
                <p className="body-prose" style={{ margin: 0 }}>
                  KPCA is that body. Capital members govern; industry members
                  add weight. Together, the coalition speaks for
                  Kentucky&apos;s investment community in Frankfort, in
                  Washington, and in every regional and national conversation
                  about where capital flows, why it flows there, and what it
                  produces.
                </p>
              </div>

              <blockquote
                style={{
                  margin: "clamp(48px, 6vw, 80px) 0 0",
                  paddingLeft: 28,
                  borderLeft: "1px solid var(--rule-strong)",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  lineHeight: 1.4,
                  fontWeight: 300,
                  color: "var(--ink)",
                  maxWidth: 860,
                  textWrap: "pretty",
                }}
              >
                &ldquo;Capital, companies, and opportunity don&apos;t stop at
                state lines. The work of organizing them does have a home —
                and Kentucky&apos;s belongs here.&rdquo;
              </blockquote>
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

      {/* Priorities */}
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
              marginBottom: "clamp(48px, 5vw, 72px)",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Where KPCA focuses
              </span>
              <div
                className="num"
                style={{
                  marginTop: 12,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                02 / 02
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
                Four priorities. The first is specific. The rest hold up
                across cycles.
              </h2>
            </div>
          </div>

          <div
            className="priority-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {priorities.map((p, i) => (
              <PriorityCard
                key={p.id}
                priority={p}
                index={i}
                total={priorities.length}
              />
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.45,
              fontWeight: 300,
              color: "rgba(255,255,255,0.92)",
              margin: "clamp(48px, 6vw, 80px) 0 0",
              maxWidth: 920,
              textWrap: "pretty",
            }}
          >
            KPCA is that voice. Not a chamber. Not a club. The organized home
            for Kentucky&apos;s investment community in the rooms where the
            policy and capital decisions of the next decade get made.
          </p>
        </div>
        <style>{`
          @media (max-width: 820px) {
            .priority-grid { grid-template-columns: 1fr !important; }
            .priority-card { border-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,0.18) !important; }
            .priority-card:last-child { border-bottom: 0 !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
