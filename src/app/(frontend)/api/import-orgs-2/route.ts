// One-shot bulk import: 22 capital firms (2026-05-04 batch 2).
// Sourced from startuplouisville.com/funding, gap-filled against the existing
// directory. Insert-only — re-running creates duplicates. Delete after run.
//
// Spot-check flagged: HalfCourt Capital and Meritus Ventures were extracted
// as Pittsburgh PA from a Louisville-funding source page. May need correction
// in the admin UI.

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
  { name: "Access Ventures", type: "Fund", city: "Louisville", state: "KY", website: "https://accessventures.org", note: "Impact investment firm deploying capital for inclusive economic growth." },
  { name: "Heartland Ventures", type: "Fund", city: "Cincinnati", state: "OH", website: "https://heartlandvc.com", note: "Connects tech startups with 800+ industrial operators for capital and customer introductions." },
  { name: "Bluegrass Alpha Partners", type: "Private Equity", city: "Louisville", state: "KY", website: "https://bluegrassalpha.com", note: "Focuses on lower middle-market businesses in transportation, manufacturing, and services." },
  { name: "HalfCourt Capital", type: "Fund", city: "Pittsburgh", state: "PA", website: "https://halfcourt.vc", note: "AI-focused venture capital across healthcare, enterprise software, robotics, biotech, and fintech." },
  { name: "Meritus Ventures", type: "Fund", city: "Pittsburgh", state: "PA", website: "https://meritusventures.com", note: "Venture capital focused on Appalachian and rural technology startups." },
  { name: "River Hill Capital", type: "Private Equity", city: "Louisville", state: "KY", website: "https://riverhillcapital.com", note: "Invests in healthcare, technology, and business services." },
  { name: "Crimson Hill", type: "Fund", city: "Louisville", state: "KY", website: "https://crimsonhillllc.com", note: "Venture fund focused on emerging energy technology investments." },
  { name: "DS9 Capital", type: "Fund", city: "Louisville", state: "KY", website: "https://ds9capital.com", note: "Invests in insurance and healthcare technology startups." },
  { name: "Refinery Ventures", type: "Fund", city: "Cincinnati", state: "OH", website: "https://refinery.com", note: "Invests in early-stage technology companies." },
  { name: "Drive Capital", type: "Fund", city: "Columbus", state: "OH", website: "https://drivecapital.com", note: "Invests in Midwest startups from seed to growth stage." },
  { name: "CID Capital", type: "Private Equity", city: "Louisville", state: "KY", website: "https://cidcap.com", note: "Invests in lower middle-market companies." },
  { name: "High Alpha", type: "Venture Studio", city: "Indianapolis", state: "IN", website: "https://highalpha.com", note: "Conceives, launches, and scales enterprise cloud companies." },
  { name: "Boomerang Ventures", type: "Fund", city: "Indianapolis", state: "IN", website: "https://boomerang.vc", note: "Venture fund accessible to Louisville-area startups." },
  { name: "Gravity Ventures", type: "Fund", city: "Indianapolis", state: "IN", website: "https://gravityventures.com", note: "Invests in early-stage startups." },
  { name: "Patoka Capital", type: "Growth Equity", city: "Louisville", state: "KY", website: "https://patokacapital.com", note: "Growth equity investor in lower middle-market businesses." },
  { name: "Outlander Labs", type: "Venture Studio", city: "Atlanta", state: "GA", website: "https://outlanderlabs.com", note: "Venture studio and fund investing in Southeast startups." },
  { name: "Airwing Ventures", type: "Fund", city: "Lexington", state: "KY", website: "https://airwing.vc", note: "Invests in early-stage startups." },
  { name: "Porter Sablan Capital", type: "Fund", city: "Louisville", state: "KY", website: "https://portersablancapital.com", note: "Provides capital and strategic advice to founder-led early-stage companies." },
  { name: "Global Equity Ventures", type: "Fund", city: "Lexington", state: "KY", website: "https://globalequityvc.com", note: "Venture capital firm." },
  { name: "H Venture Partners", type: "Fund", city: "Cincinnati", state: "OH", website: "https://h.ventures", note: "Venture capital firm." },
  { name: "MKS Ventures", type: "Venture Studio", city: "Louisville", state: "KY", website: "https://mks.ventures", note: "Venture studio building real estate technology and AI companies." },
  { name: "TYP64", type: "Firm", city: "Louisville", state: "KY", website: "https://typ64.com", note: "Partners with established businesses to modernize operations through data and technology." },
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
