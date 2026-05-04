/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Payload } from "payload";

// Idempotent seed for KPCA prototype data.
// Inserts in dependency order: counties → hubs → tiers → benefits → members → companies → events → priorities → leadership.
// Re-run safe: clears each collection at the start.
//
// Run via the dev server's POST /api/seed route — see src/app/(frontend)/api/seed/route.ts.
// (Running this file directly via `tsx`/`payload run` hits a Node 20.20 + tsx + undici 7
// CJS/ESM loader bug that double-loads undici symbols. The dev server's runtime works.)

// ---------- Source data (from prototype-extracted/assets/*.jsx) ----------

// Counties referenced in prototype data — Kentucky has 120 total; seeding only the ones cities map to.
// Mapping: city → county (Lexington=Fayette, Louisville=Jefferson, Covington=Kenton, Bowling Green=Warren,
// Owensboro=Daviess, Berea=Madison, Paducah=McCracken, Pikeville=Pike, Frankfort=Franklin, Georgetown=Scott).
const COUNTIES = [
  "Fayette",
  "Jefferson",
  "Kenton",
  "Warren",
  "Daviess",
  "Madison",
  "McCracken",
  "Pike",
  "Franklin",
  "Scott",
];

const CITY_TO_COUNTY: Record<string, string> = {
  Lexington: "Fayette",
  Louisville: "Jefferson",
  Covington: "Kenton",
  "Bowling Green": "Warren",
  Owensboro: "Daviess",
  Berea: "Madison",
  Paducah: "McCracken",
  Pikeville: "Pike",
  Frankfort: "Franklin",
  Georgetown: "Scott",
};

const HUBS = [
  { name: "Bluegrass Hub", description: "Central Kentucky — Lexington and surrounding counties.", counties: ["Fayette", "Madison", "Franklin", "Scott"] },
  { name: "Greater Louisville Hub", description: "Louisville metro.", counties: ["Jefferson"] },
  { name: "Northern Kentucky Hub", description: "Cincinnati-adjacent Northern KY.", counties: ["Kenton"] },
  { name: "Western Kentucky Hub", description: "Bowling Green, Owensboro, Paducah corridor.", counties: ["Warren", "Daviess", "McCracken"] },
  { name: "Eastern Kentucky Hub", description: "Appalachian Eastern KY.", counties: ["Pike"] },
];

const CAPITAL_TIERS = [
  { name: "Founding", dues: "By invitation", voting: "1.5×", board: "Eligible", dealFlow: "priority", firmDisplay: "yes" },
  { name: "Individual", dues: "$50 / yr", voting: "1×", board: "Eligible", dealFlow: "standard", firmDisplay: "no" },
  { name: "Firm", dues: "$250 / yr + $50 each add'l professional", voting: "1×", board: "Eligible", dealFlow: "standard", firmDisplay: "yes", footnoteAnchor: "*" },
];

const INDUSTRY_TIERS = [
  { name: "Founding", dues: "By invitation", sectorBriefings: "All sectors", pilotPathways: "priority", summitAccess: "reserved" },
  { name: "Strategic", dues: "$20,000 / yr", sectorBriefings: "Up to 3 sectors", pilotPathways: "priority", summitAccess: "reserved" },
  { name: "Standard", dues: "$5,000 / yr", sectorBriefings: "1 sector", pilotPathways: "standard", summitAccess: "general" },
];

const CAPITAL_BENEFITS: Array<[string, string]> = [
  ["Voice", "Vote on association direction, eligibility for board service, and standing in every advocacy conversation."],
  ["Opportunity", "Connectivity to Kentucky founders and companies sourced through KPCA programs and member networks."],
  ["Policy", "Direct input on KPCA's positions on tax, fund formation, public co-investment, and federal-state interfaces."],
  ["Convening", "Member-only gatherings and topical working groups."],
  ["Visibility", "Access to and inclusion in published research, press positioning, and the Kentucky capital market's institutional narrative."],
];

const INDUSTRY_BENEFITS: Array<[string, string]> = [
  ["Proximity", "Structured exposure to early-stage companies in your sector, before they show up in trade press."],
  ["Sector briefings", "Curated landscape reviews of Kentucky innovation activity in your industry."],
  ["Pilot pathways", "Introductions to founders building products you might explore, adopt, license, or partner with."],
  ["Convening", "Industry summits and topical roundtables alongside capital members."],
  ["Visibility", "Recognition as a strategically engaged Kentucky company in a moment when that leadership matters most."],
];

const HOME_FEATURED_NAMES = new Set([
  "Keyhorse Capital",
  "Kentucky Enterprise Fund",
  "Bluegrass Angels",
  "Render Capital",
  "Connetic Ventures",
  "Awesome Inc Fund",
  "Brown-Forman",
  "Humana",
  "Lexmark",
  "Yum! Brands",
  "Papa Johns",
  "Churchill Downs",
]);

const MEMBER_CAPITAL = [
  { name: "Keyhorse Capital", type: "Fund", city: "Lexington", note: "Manager of the Kentucky Enterprise Fund." },
  { name: "Kentucky Enterprise Fund", type: "Fund", city: "Lexington", note: "Public-private seed-stage fund." },
  { name: "Bluegrass Angels", type: "Angel network", city: "Lexington", note: "" },
  { name: "Render Capital", type: "Fund", city: "Louisville", note: "" },
  { name: "Connetic Ventures", type: "Fund", city: "Covington", note: "" },
  { name: "Awesome Inc Fund", type: "Fund", city: "Lexington", note: "" },
  { name: "Mountain Laurel Ventures", type: "Family Office", city: "Louisville", note: "" },
  { name: "Falls City Capital", type: "Family Office", city: "Louisville", note: "" },
  { name: "Bourbon Capital Partners", type: "Fund", city: "Lexington", note: "" },
  { name: "Commonwealth Angels", type: "Angel network", city: "Lexington", note: "" },
  { name: "Derby City Ventures", type: "CVC", city: "Louisville", note: "" },
  { name: "Cardinal Capital", type: "Fund", city: "Bowling Green", note: "" },
];

const MEMBER_INDUSTRY = [
  { name: "Brown-Forman", sector: "Spirits & Beverage", city: "Louisville" },
  { name: "Humana", sector: "Healthcare", city: "Louisville" },
  { name: "Lexmark", sector: "Enterprise Tech", city: "Lexington" },
  { name: "Yum! Brands", sector: "Consumer / QSR", city: "Louisville" },
  { name: "Papa Johns", sector: "Consumer / QSR", city: "Louisville" },
  { name: "Churchill Downs", sector: "Hospitality & Gaming", city: "Louisville" },
  { name: "Toyota Manufacturing KY", sector: "Manufacturing", city: "Georgetown" },
  { name: "Lexington Clinic", sector: "Healthcare", city: "Lexington" },
  { name: "L&N Federal Credit Union", sector: "Financial Services", city: "Louisville" },
];

const HOME_COMPANIES = [
  { name: "DesiCorp", desc: "Specialty thermal coatings used in defense and aerospace applications.", sector: "Advanced Materials", city: "Lexington" },
  { name: "FlyWire / WEARWARE", desc: "Wearable safety sensors that reduce injury rates for industrial and warehouse workers.", sector: "Industrial Tech", city: "Louisville" },
  { name: "Kanbol", desc: "Compliance software for community banks and credit unions.", sector: "Fintech", city: "Bowling Green" },
  { name: "Beltways", desc: "Logistics network connecting regional carriers to mid-market shippers across the Midwest.", sector: "Logistics", city: "Louisville" },
  { name: "Level 6 Cybersecurity", desc: "Managed detection and response for hospitals and rural healthcare systems.", sector: "Cybersecurity", city: "Owensboro" },
  { name: "Nichefire", desc: "AI-driven cultural intelligence used by global brands to spot consumer signal early.", sector: "Consumer Insights", city: "Louisville" },
  { name: "Helix Bioworks", desc: "Biological feedstocks for sustainable bourbon and beverage production.", sector: "Bio-Industrial", city: "Berea" },
  { name: "Riverbend Robotics", desc: "Automation for distillery and food-processing lines across Kentucky.", sector: "Robotics", city: "Paducah" },
  { name: "Hollerway", desc: "Last-mile freight tooling built for Appalachian and rural carrier networks.", sector: "Freight Tech", city: "Pikeville" },
];

const UPCOMING = [
  { title: "Founding Member Convening", date: "Jul 14, 2026", city: "Covington", audience: "capital", desc: "Inaugural gathering of KPCA's founding capital members. Agenda finalization, board election, and Q3–Q4 programming roadmap.", featured: true },
  { title: "Industry Summit — Healthcare Track", date: "Jul 28, 2026", city: "Louisville", audience: "industry", desc: "Sector deep-dive for industry members in healthcare, payor, and provider operations. Six early-stage companies will present." },
  { title: "Innovation Act 2.0 — Frankfort Briefing", date: "Aug 04, 2026", city: "Covington", audience: "both", desc: "Closed briefing for Kentucky legislators and KPCA members on the policy landscape ahead of the 2027 reauthorization cycle." },
  { title: "Capital Members Quarterly", date: "Sep 22, 2026", city: "Lexington", audience: "capital", desc: "Quarterly governance meeting. Working-group reports, deal-flow review, and member-led research presentations." },
];

const PAST_EVENTS = [
  { title: "Capital and Innovation Policy Workshop", date: "Mar 04, 2026", city: "Covington", audience: "public", desc: "KPCA founding members met to develop legislative recommendations and align on the association's policy posture for the 2026 session and beyond." },
  { title: "Capital Coalition Roundtable", date: "Jan 09, 2026", city: "Louisville", audience: "public", desc: "Pre-formation roundtable that scoped KPCA's mission, governance model, and constituency boundaries." },
  { title: "Bourbon, Bourbons & Capital", date: "Dec 09, 2025", city: "Lexington", audience: "public", desc: "An evening of conversation among Kentucky's investment community at the close of the year." },
];

const PRIORITIES = [
  { n: 1, head: "Innovation Act 2.0 and the next chapter of Kentucky's innovation statute.", body: "KPCA supports modernizing the Commonwealth's innovation legislation to expand the pool of qualifying capital, enable competitive incentive structures, and strengthen the public-private interfaces that have produced Kentucky's existing portfolio.", tag: "Legislative · 2027 cycle" },
  { n: 2, head: "Capital formation and tax policy.", body: "Treatment of fund formation, carried interest, and pass-through investment vehicles at both state and federal level — and Kentucky's competitive position relative to peer states on each.", tag: "Tax · State + Federal" },
  { n: 3, head: "Federal-state alignment.", body: "Kentucky's interface with federal capital programs — SSBCI, SBIR, EDA, and the next generation of place-based federal innovation funding — and the state-level mechanisms that determine whether federal dollars produce Kentucky outcomes.", tag: "Federal programs" },
  { n: 4, head: "Ecosystem infrastructure.", body: "Public-private mechanisms — co-investment vehicles, evergreen state funds, and the operational architecture that determines whether Kentucky's innovation economy produces companies that stay or companies that leave.", tag: "Long-term capital" },
];

// Leadership rows: row 1 = officers, row 2 = board, row 3 = open seats.
const LEADERSHIP: Array<{
  name: string;
  externalRole: string;
  affiliation: string;
  bio: string;
  group: "officers" | "board" | "open-seats";
  isOpenSeat?: boolean;
  kpcaRole?: string;
}> = [
  // Row 1 — Founding leadership (officers)
  { name: "Kelby Price", externalRole: "Managing Partner, Keyhorse Capital", affiliation: "Keyhorse Capital", bio: "Manages the Kentucky Enterprise Fund and the Commonwealth's KSBCI early-stage growth fund. Thirty years building Kentucky companies and the capital that backs them.", group: "officers", kpcaRole: "Founding Chair, KPCA" },
  { name: "Dave Knox", externalRole: "Operating Director", affiliation: "Shinkle Ventures", bio: "", group: "officers" },
  { name: "Dallas Browning", externalRole: "TBD", affiliation: "TBD", bio: "", group: "officers" },
  { name: "Dana Bowers", externalRole: "Founder", affiliation: "Venminder", bio: "", group: "officers" },

  // Row 2 — Founding board
  { name: "Caleb Cobane", externalRole: "VP", affiliation: "Appalachian Regional Healthcare (ARH)", bio: "", group: "board" },
  { name: "Ginger Rothrock", externalRole: "Managing Partner", affiliation: "HG Ventures", bio: "", group: "board" },
  { name: "Curtis Warfield", externalRole: "President", affiliation: "Windham Advisors", bio: "", group: "board" },
  { name: "Vik Chadha", externalRole: "Managing Partner", affiliation: "Scalable Ventures", bio: "", group: "board" },

  // Row 3 — Open seats
  { name: "Member-elected", externalRole: "Board seat (capital)", affiliation: "To be elected — June 2026", bio: "Capital members will elect at-large directors at the founding convening.", group: "open-seats", isOpenSeat: true },
  { name: "Member-elected", externalRole: "Board seat (industry)", affiliation: "To be elected — June 2026", bio: "Industry members will appoint non-voting advisory directors at the founding convening.", group: "open-seats", isOpenSeat: true },
  { name: "Member-elected", externalRole: "Board seat (industry)", affiliation: "To be elected — June 2026", bio: "Industry members will appoint non-voting advisory directors at the founding convening.", group: "open-seats", isOpenSeat: true },
  { name: "Independent counsel", externalRole: "Outside general counsel", affiliation: "TBA", bio: "Engaged before launch to review governance, operating agreement, and disclosures.", group: "open-seats", isOpenSeat: true },
];

// ---------- Helpers ----------

function parseEventDate(s: string): Date {
  // Examples: "Jul 14, 2026", "Aug 04, 2026". Native Date parses these fine, but normalize to UTC noon.
  const d = new Date(`${s} 12:00:00 UTC`);
  if (Number.isNaN(d.valueOf())) {
    throw new Error(`Could not parse event date: ${s}`);
  }
  return d;
}

// ---------- Seed ----------

export type SeedCounts = {
  counties: number;
  hubs: number;
  capitalTiers: number;
  industryTiers: number;
  benefits: number;
  organizations: number;
  companies: number;
  events: number;
  priorities: number;
  leadership: number;
};

export const runSeed = async (payload: Payload): Promise<SeedCounts> => {
  // Wipe in reverse-dependency order.
  const collectionsToWipe = [
    "leadership",
    "priorities",
    "events",
    "companies",
    "organizations",
    "benefits",
    "industryTiers",
    "capitalTiers",
    "hubs",
    "counties",
  ] as const;

  for (const slug of collectionsToWipe) {
    await payload.delete({ collection: slug, where: { id: { exists: true } } });
  }
  payload.logger.info("Cleared existing docs.");

  // 1. Counties (no deps).
  const countyDocs: Record<string, string | number> = {};
  for (const name of COUNTIES) {
    const doc = await payload.create({ collection: "counties", data: { name } });
    countyDocs[name] = doc.id;
  }
  payload.logger.info(`Seeded ${Object.keys(countyDocs).length} counties.`);

  // 2. Hubs — and update counties with hub backref.
  const hubDocs: Record<string, string | number> = {};
  for (const hub of HUBS) {
    const countyIds = hub.counties.map((c) => countyDocs[c]).filter(Boolean);
    const doc = await payload.create({
      collection: "hubs",
      data: {
        name: hub.name,
        description: hub.description,
        counties: countyIds as any,
      },
    });
    hubDocs[hub.name] = doc.id;

    // Backfill counties.hub.
    for (const countyName of hub.counties) {
      const cid = countyDocs[countyName];
      if (cid != null) {
        await payload.update({
          collection: "counties",
          id: cid as any,
          data: { hub: doc.id as any },
        });
      }
    }
  }
  payload.logger.info(`Seeded ${Object.keys(hubDocs).length} hubs.`);

  // 3. Capital tiers.
  let capitalTierCount = 0;
  for (let i = 0; i < CAPITAL_TIERS.length; i++) {
    const t = CAPITAL_TIERS[i];
    await payload.create({
      collection: "capitalTiers",
      data: { ...t, displayOrder: i + 1 } as any,
    });
    capitalTierCount++;
  }
  payload.logger.info(`Seeded ${capitalTierCount} capital tiers.`);

  // 4. Industry tiers.
  let industryTierCount = 0;
  for (let i = 0; i < INDUSTRY_TIERS.length; i++) {
    const t = INDUSTRY_TIERS[i];
    await payload.create({
      collection: "industryTiers",
      data: { ...t, displayOrder: i + 1 } as any,
    });
    industryTierCount++;
  }
  payload.logger.info(`Seeded ${industryTierCount} industry tiers.`);

  // 5. Benefits.
  let benefitCount = 0;
  for (let i = 0; i < CAPITAL_BENEFITS.length; i++) {
    const [label, body] = CAPITAL_BENEFITS[i];
    await payload.create({
      collection: "benefits",
      data: { kind: "capital", label, body, displayOrder: i + 1 },
    });
    benefitCount++;
  }
  for (let i = 0; i < INDUSTRY_BENEFITS.length; i++) {
    const [label, body] = INDUSTRY_BENEFITS[i];
    await payload.create({
      collection: "benefits",
      data: { kind: "industry", label, body, displayOrder: i + 1 },
    });
    benefitCount++;
  }
  payload.logger.info(`Seeded ${benefitCount} benefits.`);

  // 6. Organizations (member firms — capital + industry).
  let organizationCount = 0;
  for (let i = 0; i < MEMBER_CAPITAL.length; i++) {
    const m = MEMBER_CAPITAL[i];
    const countyName = CITY_TO_COUNTY[m.city];
    const countyId = countyName ? countyDocs[countyName] : undefined;
    await payload.create({
      collection: "organizations",
      data: {
        name: m.name,
        kind: "capital",
        type: m.type,
        city: m.city,
        state: "KY",
        note: m.note || undefined,
        displayOrder: i + 1,
        featuredOnHome: HOME_FEATURED_NAMES.has(m.name),
        county: countyId as any,
      },
    });
    organizationCount++;
  }
  for (let i = 0; i < MEMBER_INDUSTRY.length; i++) {
    const m = MEMBER_INDUSTRY[i];
    const countyName = CITY_TO_COUNTY[m.city];
    const countyId = countyName ? countyDocs[countyName] : undefined;
    await payload.create({
      collection: "organizations",
      data: {
        name: m.name,
        kind: "industry",
        sector: m.sector,
        city: m.city,
        state: "KY",
        displayOrder: i + 1,
        featuredOnHome: HOME_FEATURED_NAMES.has(m.name),
        county: countyId as any,
      },
    });
    organizationCount++;
  }
  payload.logger.info(`Seeded ${organizationCount} organizations.`);

  // 7. Companies.
  let companyCount = 0;
  for (let i = 0; i < HOME_COMPANIES.length; i++) {
    const c = HOME_COMPANIES[i];
    await payload.create({
      collection: "companies",
      data: {
        name: c.name,
        description: c.desc,
        sector: c.sector,
        city: c.city,
        state: "KY",
        featured: true,
      },
    });
    companyCount++;
  }
  payload.logger.info(`Seeded ${companyCount} companies.`);

  // 8. Events.
  let eventCount = 0;
  for (const e of UPCOMING) {
    await payload.create({
      collection: "events",
      data: {
        title: e.title,
        date: parseEventDate(e.date).toISOString(),
        city: e.city,
        state: "KY",
        audience: e.audience as any,
        description: e.desc,
        featured: Boolean(e.featured),
      },
    });
    eventCount++;
  }
  for (const e of PAST_EVENTS) {
    await payload.create({
      collection: "events",
      data: {
        title: e.title,
        date: parseEventDate(e.date).toISOString(),
        city: e.city,
        state: "KY",
        audience: e.audience as any,
        description: e.desc,
        featured: false,
      },
    });
    eventCount++;
  }
  payload.logger.info(`Seeded ${eventCount} events.`);

  // 9. Priorities.
  let priorityCount = 0;
  for (const p of PRIORITIES) {
    await payload.create({
      collection: "priorities",
      data: { headline: p.head, body: p.body, tag: p.tag, displayOrder: p.n },
    });
    priorityCount++;
  }
  payload.logger.info(`Seeded ${priorityCount} priorities.`);

  // 10. Leadership.
  let leadershipCount = 0;
  const groupCounters: Record<string, number> = { officers: 0, board: 0, "open-seats": 0 };
  for (const l of LEADERSHIP) {
    groupCounters[l.group] = (groupCounters[l.group] || 0) + 1;
    await payload.create({
      collection: "leadership",
      data: {
        name: l.name,
        kpcaRole: l.kpcaRole,
        externalRole: l.externalRole || undefined,
        affiliation: l.affiliation || undefined,
        bio: l.bio || undefined,
        group: l.group,
        displayOrder: groupCounters[l.group],
        isOpenSeat: Boolean(l.isOpenSeat),
      },
    });
    leadershipCount++;
  }
  payload.logger.info(`Seeded ${leadershipCount} leadership entries.`);

  payload.logger.info("Seed complete.");

  return {
    counties: Object.keys(countyDocs).length,
    hubs: Object.keys(hubDocs).length,
    capitalTiers: capitalTierCount,
    industryTiers: industryTierCount,
    benefits: benefitCount,
    organizations: organizationCount,
    companies: companyCount,
    events: eventCount,
    priorities: priorityCount,
    leadership: leadershipCount,
  };
};
