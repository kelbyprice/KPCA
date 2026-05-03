# KPCA Content Model

Mapping every prototype data array to a Payload collection, global, or hardcoded static. Drives the initial Payload schema.

## Decisions baked in

- **Editor audience:** ~1–3 KSTC staff. Lean toward less granularity — only expose CMS fields for content that genuinely changes.
- **Marketing copy** (hero headlines, body paragraphs, eyebrows): kept in code unless flagged below. Editing = git commit + deploy. Acceptable given the small editor team.
- **List/repeating content** (members, events, priorities, leadership, tiers): all goes in collections so KPCA staff edit through Payload admin.
- **Page-level metadata** (SEO title/desc, hero headlines): one Payload **Global** per page.

---

## Collections

### `members` — capital + industry directory

Source: `MEMBER_CAPITAL` + `MEMBER_INDUSTRY` (members.jsx). Also drives `HOME_FOUNDING` (founding coalition logo strip on home).

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | "Keyhorse Capital", "Brown-Forman" |
| `kind` | select: capital / industry | required |
| `type` | text | Capital: "Fund", "Angel network", "Family Office", "CVC". Industry: omit. |
| `sector` | text | Industry only: "Spirits & Beverage", "Healthcare", etc. |
| `city` | text | required |
| `state` | text | default "KY" — supports out-of-state industry members per eligibility-broadening copy |
| `note` | textarea | optional — currently used on a couple capital members ("Manager of the Kentucky Enterprise Fund.") |
| `website` | url | optional |
| `logo` | upload (Media) | future — currently shown as `LOGO` placeholder |
| `displayOrder` | number | manual sort within directory |
| `featuredOnHome` | checkbox | drives `HOME_FOUNDING` strip — was hardcoded subset of capital + industry |
| `tier` | relationship → `capitalTiers` or `industryTiers` | optional — for showing tier badges later |
| `clerkOrgId` | text, hidden | populated via Clerk webhook once we wire auth |

**Relationships:** `members.tier`

### `events`

Source: `UPCOMING` + `PAST` (events.jsx). One collection — past vs. upcoming derived by `date`.

| Field | Type | Notes |
|---|---|---|
| `title` | text, required | "Founding Member Convening" |
| `date` | date, required | use date type for sorting/filtering — render currently does string formatting |
| `city` | text | required |
| `state` | text | default "KY" |
| `audience` | select: capital / industry / both / public | required |
| `description` | textarea | required |
| `featured` | checkbox | hero treatment on events page (currently the next upcoming with `featured: true`) |
| `rsvpUrl` | url | future — link to event registration |
| `coverImage` | upload | future |

**Derived views:**
- "Upcoming" = `date >= today`, sorted ascending
- "Past" = `date < today`, sorted descending

### `priorities` — advocacy positions

Source: `PRIORITIES` (advocacy.jsx).

| Field | Type | Notes |
|---|---|---|
| `headline` | text, required | "Innovation Act 2.0 and the next chapter…" |
| `body` | textarea, required | the description paragraph |
| `tag` | text | "Legislative · 2027 cycle" — drives the chip label |
| `displayOrder` | number | 01 / 02 / 03 / 04 — derived from this |

### `leadership`

Source: `LEADERSHIP` (about.jsx). Three "rows" in the prototype = three groupings.

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | "Kelby Price", or "Member-elected" / "Independent counsel" for placeholders |
| `kpcaRole` | text | "Founding Chair, KPCA" — KPCA-specific role; many entries have none |
| `externalRole` | text | "Managing Partner", "VP", "Founder" — title at their firm |
| `affiliation` | text | "Keyhorse Capital", "HG Ventures" — firm name (or "To be elected — June 2026" for placeholders) |
| `bio` | textarea | optional — many entries empty |
| `photo` | upload | future |
| `group` | select: officers / board / open-seats | row 1 / row 2 / row 3 |
| `displayOrder` | number | manual sort within group |
| `isOpenSeat` | checkbox | flags placeholder entries |
| `clerkUserId` | text, hidden | once auth is live, link to Clerk user for real board members |

### `companies` — portfolio companies

Source: `HOME_COMPANIES` (home.jsx). Companies built/backed by capital members; **distinct** from `members`.

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | "DesiCorp", "Helix Bioworks" |
| `description` | textarea | one-line value prop |
| `sector` | text | "Advanced Materials", "Fintech", etc. |
| `city` | text | "Lexington", "Berea" |
| `state` | text | default "KY" |
| `website` | url | future |
| `featured` | checkbox | shown in home page "Real founders. Real products." strip |
| `backedBy` | relationship → `members` (multi) | optional — which capital members backed them |

### `capitalTiers`

Source: `CAPITAL_TIERS` (membership.jsx).

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | "Founding", "Individual", "Firm*" |
| `dues` | text | "$50 / yr", "$250 / yr + $50 each add'l professional", "By invitation" |
| `voting` | text | "1.5×", "1×" |
| `board` | text | "Eligible" |
| `dealFlow` | select: standard / priority / lead | |
| `firmDisplay` | select: yes / no | |
| `footnoteAnchor` | text | "*" if this tier has a footnote anchor |
| `displayOrder` | number | |

### `industryTiers`

Source: `INDUSTRY_TIERS` (membership.jsx).

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | "Founding", "Strategic", "Standard" |
| `dues` | text | |
| `sectorBriefings` | text | "All sectors", "Up to 3 sectors", "1 sector" |
| `pilotPathways` | select: standard / priority | |
| `summitAccess` | select: reserved / general | |
| `displayOrder` | number | |

### `benefits`

Source: `CAPITAL_BENEFITS` + `INDUSTRY_BENEFITS` (membership.jsx) — full descriptions. **Home teasers** (`HOME_CAPITAL_BENEFITS` + `HOME_INDUSTRY_BENEFITS`) stay hardcoded — they're tight 1-liners that rarely change and don't justify CMS overhead.

| Field | Type | Notes |
|---|---|---|
| `kind` | select: capital / industry | required |
| `label` | text, required | "Voice", "Proximity" |
| `body` | textarea, required | full description (membership page) |
| `displayOrder` | number | |

---

## Globals (singletons)

### `nav`

Source: `NAV_ITEMS` (chrome.jsx).
- `items[]` — array of `{ id, label, href }`

Probably hardcoded forever. Including as a Global only because if/when we add a route or rename "Members" to "Directory" it shouldn't require a code change.

### `footer`

Source: chrome.jsx footer columns.
- `tagline`, `mailingAddress`, `email`, `socialLinks[]`, `columns[] (title, items[])`

### `newsletter`

Source: chrome.jsx newsletter section.
- `headline`, `body`, `successMessage`, `formId` (when we wire to a real provider)

### Page Globals

One Global per page for SEO + key copy. Examples:

#### `homePage`
- `metaTitle`, `metaDescription`, `ogImage`
- `heroEstablished` ("Est. 2026"), `heroLocation` ("Lexington"), `heroCoords` ("38.04°N / 84.50°W")
- `heroLine1` ("Kentucky's next decade"), `heroLineEm` ("capital & innovation"), `heroLine2` ("is being shaped now.")
- `heroSubline` ("KPCA is how the people building it stay organized.")
- `heroCtaLabel` ("Become a member")
- `bridgeQuote` ("Capital is half the equation. The companies it backs need customers — and Kentucky has them.")
- `closingHeadline`, `closingSubline` — section 08

#### `membershipPage`
- `metaTitle`, `metaDescription`
- `tabPickerHeadlineCapital` ("Capital members → voice")
- `tabPickerHeadlineIndustry` ("Industry members → proximity")
- `capitalSectionHeadline`, `capitalBody[]` (paragraphs)
- `industrySectionHeadline`, `industryBody[]` (paragraphs)
- `industryEligibilityCopy` (the broadening paragraph we added)
- `honestyCallout` ("You don't have to invest to benefit…")

#### `membersPage`
- `metaTitle`, `metaDescription`
- `pageEyebrow`, `pageTitle`, `pageSubtitle`
- `defaultTab` ("capital" | "industry" | "all")

#### `eventsPage`, `advocacyPage`, `aboutPage`
- Same pattern: meta + hero + section copy. Detail TBD when porting each page.

---

## Hardcoded / static (lives in code)

These don't justify CMS overhead — they change rarely, are highly designed, or are structural:

- All section visual layout (headings, kickers, eyebrows used as design elements)
- `HOME_CAPITAL_BENEFITS` + `HOME_INDUSTRY_BENEFITS` — home teaser bullets (full versions live in `benefits` collection for /membership)
- "Three things, done seriously" content (Connect / Advocate / Develop) on home — narrative beats, not list data
- "What we do" prose, bridge quote alternatives, kicker numbers, page-numbering ("4 of 6")
- All copyright-sensitive structural copy (mission, vision)

These get exposed to CMS later if/when it actually matters.

---

## Implementation notes

1. **Single `members` collection (vs. separate capital/industry):** unified makes filtering "all members" trivial. The `kind` discriminator handles the type/sector divergence; field visibility in Payload admin can be conditioned on `kind`.

2. **Tiers as separate collections:** `CapitalTiers` and `IndustryTiers` have genuinely different fields (voting/board vs. briefings/pilots). Forcing them into one collection with optional fields obscures the schema. Two collections, both small (3 rows each), is clearest.

3. **Seed data:** prototype arrays become the seed for first deploy. I'll write a `payload-seed.ts` that bulk-inserts everything from the JSX arrays so the production site launches with the same content as the prototype.

4. **Clerk integration timing:** `clerkOrgId` and `clerkUserId` fields stay optional/hidden until Clerk is wired (Phase 2). Doesn't block initial scaffold or content launch.

5. **Stripe / billing via Clerk Billing:** member dues are managed in Clerk Billing once it's wired — Payload doesn't track dues separately, just references Clerk subscription state via the `clerkOrgId` link. No `dues` field on `members` collection.

6. **Date type for events:** prototype uses string formatting ("Jul 14, 2026"). Switch to actual `Date` for sorting and "upcoming vs. past" filtering. Format on the frontend.

7. **Member directory filters mentioned but unbuilt:** "filtering, search, sector focus, HQ location/region, Hub affiliation" — fields are in the schema (`type`, `sector`, `city`, `state`) so future filtering UI will have real data to work with. Don't need to build the filter UI for v1.

---

## Resolved decisions

1. **Hubs are county-driven.** Each Kentucky county maps to a Hub. Members get hub affiliation derived from their county, not assigned directly. Add a `hubs` collection (Hubs likely have their own metadata — name, lead organizer, description) and a `county` field on `members`. Hub on a member is computed via county → hub lookup. Need a `counties` seed (120 KY counties) — small, can be static reference data or a tiny `counties` collection.

2. **Tier badges are admin-only for now.** Don't expose tier on public member cards. Revisit if KPCA wants public "Founding member" / similar visibility later.

3. **Elected board seats become Clerk users with elevated roles.** Once elected (June 2026), board members are Clerk users with a `board` role. The board needs in-system "sign-off" capability — voting on motions, approving association actions — with **power multipliers** (Founding board members vote at 1.5×). Meaningfully more than simple role permissions; it's a governance/workflow feature.

   **Implementation sketch:** Clerk owns identity + role tag (`board`, `chair`, `staff`, `member`); Payload owns voting workflow — likely a `motions` or `signoffs` collection with member relations + power-weighted aggregation. Power weight derives from the member's tier (Founding = 1.5×). `members` collection mirrors Clerk users with their tier + computed vote weight. Build in Phase 3, after auth + content launch.

   Schema additions (Phase 3):
   - `motions` collection: title, body, status (open/passed/failed), proposedBy (member), votes (relation to `votes` or inline array)
   - `votes` either inline on motions or own collection: motion, member, choice (yea/nay/abstain), weight (snapshot at vote time), timestamp
   - `members.role` (mirrored from Clerk): "member" | "board" | "chair" | "staff"
   - `members.voteWeight` (computed): 1.5 if Founding, 1.0 otherwise

## Schema additions from resolved decisions

Adding to the collection list:

### `hubs`

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | "Bluegrass Hub", "Northern Kentucky Hub" |
| `description` | textarea | optional |
| `leadOrganizer` | relationship → `members` (or `users`) | |
| `counties` | relationship → `counties` (multi) | which KY counties feed into this hub |

### `counties` (KY's 120 counties)

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | "Fayette", "Jefferson" |
| `hub` | relationship → `hubs` | each county belongs to exactly one hub |

### Updates to existing schemas

- **`members`** add: `county` (relationship → `counties`)
- **`members`** virtual/derived: `hub` (computed from `members.county.hub`)
