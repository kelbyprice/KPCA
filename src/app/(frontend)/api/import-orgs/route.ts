// One-shot bulk import: 27 capital firms (2026-05-04 batch).
// Runs only against non-prod NODE_ENV by default; the shared-secret header
// gate matches /api/seed. Insert-only — re-running creates duplicates.
// Delete this file after the import succeeds.
//
// Note: existing seed.ts wipes the `organizations` collection before
// re-inserting, so running `npm run seed` after this import will erase
// these rows. Don't run seed against prod.

import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ImportRow = {
  name: string;
  type: string;
  city: string;
  state: string;
  website?: string;
  note?: string;
};

const BATCH: ImportRow[] = [
  { name: "XLerateHealth", type: "Accelerator", city: "Louisville", state: "KY", website: "https://xleratehealth.com", note: "National 12-week healthcare startup accelerator headquartered in Louisville with a second site in Flint, MI, focused on commercializing life-science and digital-health innovations." },
  { name: "Future Labs Capital", type: "Fund", city: "Louisville", state: "KY", website: "https://futurelabscapital.com", note: "Louisville/Jeffersonville-based VC investing in early-stage quantum computing and AI startups, with a strategic partnership with MIT CSAIL." },
  { name: "Strike Ventures", type: "Fund", city: "Louisville", state: "KY", website: "https://strike.ventures", note: "Louisville VC affiliated with Venture First, investing in early-stage software and software-enabled companies with deep operator support." },
  { name: "Muir Station Capital", type: "Family Office", city: "Lexington", state: "KY", note: "Lexington, KY family-office investment vehicle (linked to the Beck family/Greentree Enterprises) with limited public profile." },
  { name: "Kloiber Foundation", type: "Family Office", city: "Lexington", state: "KY", website: "https://kloiberfoundation.org", note: "Lexington, KY private foundation that funds K-12 STEM/technology education and also makes strategic investments in education-focused initiatives." },
  { name: "Joseph W. Craft III Foundation", type: "Family Office", city: "Lexington", state: "KY", note: "Private foundation of coal executive Joe Craft (Alliance Resource Partners CEO) directing philanthropic capital and grants toward education, Kentucky communities, and economic-opportunity causes." },
  { name: "C.E. and S. Foundation", type: "Family Office", city: "Louisville", state: "KY", website: "https://cesfoundation.com", note: "Louisville-based private foundation (Brown family) funding Education, Global Competency, and Urban Environment initiatives." },
  { name: "Unbridled Ventures", type: "Fund", city: "Louisville", state: "KY", website: "https://unbridled.vc", note: "Louisville, KY angel/early-stage fund led by Darren King, investing in tech, healthcare, and media/entertainment startups." },
  { name: "Thornton Capital", type: "Fund", city: "Louisville", state: "KY", website: "https://thorntoncapital.com", note: "Louisville family office (founded by former Thorntons CEO Matt Thornton) making long-term investments across real estate, venture capital, and private equity." },
  { name: "VisionTech Angels", type: "Angel network", city: "Indianapolis", state: "IN", website: "https://visiontech-partners.com", note: "Indianapolis-based angel network (multi-chapter across Indiana and Ohio) actively investing in early-growth Midwest startups in life sciences, SaaS, IoT, and agtech." },
  { name: "Radicle Capital", type: "Family Office", city: "Louisville", state: "KY", website: "https://radiclecapital.com", note: "Louisville, KY impact-focused investment firm that provides patient capital to early-stage companies generating social and environmental returns." },
  { name: "Neace Ventures", type: "Family Office", city: "Louisville", state: "KY", website: "https://neaceventures.com", note: "Louisville-based private investment company and family fund (founded by John Neace) acquiring heritage F&B and CPG brands within a Louisville-centered hub-and-spoke model." },
  { name: "Lightship Capital", type: "Fund", city: "Cincinnati", state: "OH", website: "https://lightship.capital", note: "Cincinnati-based early-stage VC (founded by Brian Brackeen and Candice Matthews Brackeen) backing underrepresented Midwest founders in CPG, e-commerce, AI, and health tech." },
  { name: "Pioneer Ventures", type: "Fund", city: "Richmond", state: "KY", website: "https://pioneerventurefund.com", note: "Richmond, KY private investment fund (an AIA Network affiliate) investing in startups tied to Eastern Kentucky University's region and ecosystem." },
  { name: "CincyTech", type: "Fund", city: "Cincinnati", state: "OH", website: "https://cincytechusa.com", note: "Cincinnati-based public-private seed-stage VC (founded 2007) backing innovative life-science and digital companies in Southwest Ohio and the broader Midwest." },
  { name: "M25", type: "Fund", city: "Chicago", state: "IL", website: "https://m25vc.com", note: "Chicago-based early-stage VC investing exclusively in Midwest-headquartered tech startups, ranked the most active investor in the region." },
  { name: "Elevate Ventures", type: "Fund", city: "Indianapolis", state: "IN", website: "https://elevateventures.com", note: "Indianapolis-headquartered venture development firm and Indiana's most active early-stage VC, partnering with the IEDC to fund pre-seed, seed, and Series A Indiana companies." },
  { name: "Allos Ventures", type: "Fund", city: "Indianapolis", state: "IN", website: "https://allosventures.com", note: "Indianapolis-based early-stage VC investing in B2B SaaS companies across the Midwest at the seed/Series A stage (also powers Sixty8 Capital)." },
  { name: "Lunsford Capital", type: "Family Office", city: "Louisville", state: "KY", website: "https://lunsfordcapital.com", note: "Louisville private investment company chaired by Bruce Lunsford (founder of Vencor/Ventas), investing across healthcare, technology, entertainment, and real estate." },
  { name: "LaunchTN", type: "Fund", city: "Nashville", state: "TN", website: "https://launchtn.org", note: "Tennessee public-private partnership operating the $70M InvestTN equity fund and supporting startups statewide with capital, commercialization, and connections." },
  { name: "KTECH Capital", type: "Family Office", city: "Covington", state: "KY", website: "https://ktechcapital.com", note: "Bellevue, KY/Kiawah Island, SC private family holding company (founded by Joe Klunk) providing seed and growth equity to tech-savvy entrepreneurial businesses." },
  { name: "LEVO Capital", type: "Fund", city: "Louisville", state: "KY", website: "https://levocapital.com", note: "Louisville, KY VC (founded 2011) making early-stage investments in small-to-medium businesses (notable exit: Evenly, acquired by Square)." },
  { name: "6ixth Event", type: "Family Office", city: "Louisville", state: "KY", website: "https://go6ixthevent.com", note: "Louisville-based crypto-first founders' fund investing in early-stage decentralized-tech and fintech companies, headquartered at the LongTail Building." },
  { name: "Narwhal Ventures", type: "Family Office", city: "Louisville", state: "KY", website: "https://gonarwhalventures.com", note: "Louisville crypto-first family office (also at the LongTail Building) backing decentralized tech, distributed work, and unconventional founders." },
  { name: "Queen City Angels", type: "Angel network", city: "Cincinnati", state: "OH", website: "https://qca.com", note: "Cincinnati-based angel network (founded 2000) — one of the oldest and most active in the Midwest — with ~191 accredited investors backing early-stage growth companies." },
  { name: "Ingram Family Office", type: "Family Office", city: "Nashville", state: "TN", note: "Nashville-based single-family office managing the Ingram family's wealth (built via Ingram Industries — barge transport, books, and media) across multiple asset classes." },
  { name: "Castellan Group", type: "Family Office", city: "Louisville", state: "KY", website: "https://castellangroup.com/", note: "Independent Registered Investment Advisor and multi-family office founded in 2018 that provides comprehensive wealth management for ultra-high-net-worth families." },
];

export async function POST(req: Request) {
  const auth = req.headers.get("x-seed-secret");
  if (!process.env.PAYLOAD_SECRET || auth !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await getPayload({ config });

  let created = 0;
  const failures: { name: string; error: string }[] = [];

  for (const row of BATCH) {
    try {
      await payload.create({
        collection: "organizations",
        data: {
          name: row.name,
          kind: "capital",
          type: row.type,
          city: row.city,
          state: row.state,
          website: row.website,
          note: row.note,
          featuredOnHome: false,
        },
      });
      created++;
    } catch (err) {
      failures.push({ name: row.name, error: (err as Error).message });
    }
  }

  return NextResponse.json({
    ok: failures.length === 0,
    created,
    attempted: BATCH.length,
    failures,
  });
}
