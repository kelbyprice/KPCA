// One-shot bulk import: 11 capital firms (2026-05-04 batch 3).
// Insert-only — re-running creates duplicates. Delete after run.
//
// Excluded from source list:
//   - Access Ventures: already in DB from batch 2
//   - Confluent Health: portfolio company, not an investor
// Flagged: Saunders Capital described in past tense in source — may be defunct.

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
  { name: "KSC Ventures", type: "Private Equity", city: "Danville", state: "KY", website: "https://kscventure.com", note: "Private equity firm investing in trade service businesses across Central Kentucky." },
  { name: "WM Investments", type: "Asset Manager", city: "Lexington", state: "KY", website: "https://wm-investments.com", note: "Asset management firm investing across venture, private equity, and real estate in the U.S." },
  { name: "Blue Equity", type: "Private Equity", city: "Louisville", state: "KY", website: "https://blueequity.com", note: "Private equity firm investing across oil and gas, media, sports and entertainment, hospitality, logistics, and last-mile fulfillment." },
  { name: "MiddleGround Capital", type: "Private Equity", city: "Lexington", state: "KY", website: "https://middleground.com", note: "Registered investment adviser focused on B2B industrials, manufacturing, and specialty distribution across North America and Europe." },
  { name: "AFI Ventures", type: "Fund", city: "Louisville", state: "KY", website: "https://afi-ventures.com", note: "Venture capital firm focused on legal-technology companies." },
  { name: "Benim Capital", type: "Fund", city: "Louisville", state: "KY", website: "https://benimcapital.com", note: "Growth expansion firm that also manages properties across Kentucky." },
  { name: "Room & Pillar", type: "Family Office", city: "Louisville", state: "KY", website: "https://roomandpillar.com", note: "Family office investing in early-stage insurance technology and property technology companies." },
  { name: "Venture First", type: "Fund", city: "Louisville", state: "KY", website: "https://venturefirst.com", note: "Venture capital firm based in Louisville, Kentucky." },
  { name: "Tri State Angel Investment Group", type: "Angel network", city: "Ashland", state: "KY", website: "https://tristateangelinvestment.com", note: "Angel network investing across the Kentucky–Ohio–West Virginia tri-state region." },
  { name: "0924 Investments", type: "Family Office", city: "Louisville", state: "KY", website: "https://0924investmentsllc.com", note: "Family office investing in early-childhood education businesses and private equity / angel opportunities." },
  { name: "Saunders Capital", type: "Family Office", city: "Louisville", state: "KY", website: "https://saunderscapital.com", note: "Private equity firm based in Louisville, Kentucky." },
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
