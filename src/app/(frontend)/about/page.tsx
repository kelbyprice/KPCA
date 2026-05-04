import { getPayload } from "payload";
import config from "@payload-config";

// ISR: regenerate at most every 60s so admin edits to Payload-driven content
// appear without a redeploy. Move to on-demand revalidation when needed.
export const revalidate = 60;

import type { Leadership } from "@/payload-types";

import { PageTitle } from "@/components/atoms/PageTitle";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { BoxedStatement } from "@/components/about/BoxedStatement";
import { LeadershipGrid } from "@/components/about/LeadershipGrid";
import { OperatorDisclosure } from "@/components/about/OperatorDisclosure";
import { ContactBlock } from "@/components/about/ContactBlock";

const GROUP_ORDER: Leadership["group"][] = ["officers", "board", "open-seats"];

async function loadLeadership(): Promise<Leadership[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "leadership",
      sort: "displayOrder",
      limit: 50,
    });
    return res.docs as Leadership[];
  } catch (err) {
    console.error("Failed to load leadership from Payload:", err);
    return [];
  }
}

export default async function AboutPage() {
  const leadership = await loadLeadership();

  // Order by group (officers → board → open-seats), preserving displayOrder within each group.
  const ordered = GROUP_ORDER.flatMap((group) =>
    leadership.filter((p) => p.group === group),
  );

  return (
    <main className="page-fade" data-screen-label="06 About">
      <PageTitle
        eyebrow="About"
        title="About KPCA."
        subtitle="The organized home for private capital and early-stage innovation in Kentucky — what we are, who runs it, and why it exists now."
        num={6}
        total={6}
      />

      {/* Mission + Vision */}
      <section className="section">
        <div className="container">
          <div
            className="mv-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(20px, 3vw, 40px)",
            }}
          >
            <BoxedStatement
              eyebrow="Mission"
              body={
                <>
                  <p>
                    KPCA is a unified voice of Kentucky&apos;s investment
                    community, bringing together venture funds, angels,
                    family offices, strategic corporate capital, and anyone
                    who supports investment in early-stage innovation in the
                    Commonwealth.
                  </p>
                  <p>
                    KPCA advocates for and supports an ecosystem that
                    produces stronger companies, more opportunities, and
                    increased visibility and competitiveness for Kentucky.
                  </p>
                </>
              }
            />
            <BoxedStatement
              eyebrow="Vision"
              dark
              body={
                <p style={{ fontStyle: "italic" }}>
                  An economically transformed Kentucky capable of competing
                  as a leading hub for innovation and productivity growth.
                </p>
              }
            />
          </div>
        </div>
        <style>{`
          @media (max-width: 820px) { .mv-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Who we are */}
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
            eyebrow="Who we are"
            kicker="01"
            title="The organized home for private capital and early-stage innovation in Kentucky."
          />
          <div
            className="two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(24px, 4vw, 56px)",
            }}
          >
            <p className="body-prose" style={{ margin: 0 }}>
              The Kentucky Private Capital Association is the organized home
              for private capital and early-stage innovation in Kentucky.
              Capital members — seed investors, venture funds, angels, family
              offices, and corporate venture arms — form the governing
              constituency. Industry members are established Kentucky
              companies who join not to deploy capital, but to stay proximate
              to the innovation being built in their sectors: potential
              adopters, licensing partners, and informed stakeholders in
              Kentucky&apos;s economic future.
            </p>
            <p className="body-prose" style={{ margin: 0 }}>
              We claim Kentucky, and we recognize that capital, companies,
              and opportunity don&apos;t stop at state lines.
            </p>
          </div>
        </div>
        <style>{`
          @media (max-width: 820px) { .two-col { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Leadership"
            kicker="02"
            title="Leadership."
          />
          <LeadershipGrid entries={ordered} />
        </div>
      </section>

      {/* Operator disclosure */}
      <OperatorDisclosure />

      {/* Contact */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Contact" kicker="03" title="Contact." />
          <ContactBlock />
        </div>
      </section>
    </main>
  );
}
