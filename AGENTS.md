<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# KPCA project notes

## What this is

The Kentucky Private Capital Association website — Next.js 16 (App Router) + Payload v3 in a single project. Payload v3 lives **inside** the same Next.js app via `withPayload(nextConfig)` and a `(payload)` route group. There's no separate Payload server.

## Stack

- **Next.js 16** App Router, React 19, TypeScript
- **Payload v3** (CMS + admin UI) — Postgres adapter via `@payloadcms/db-postgres`
- **Supabase** Postgres (production database)
- **Clerk** — public-facing member auth + Organizations (firms). Wired in Phase 2.
- **Clerk Billing** — Stripe-backed dues subscriptions. Wired in Phase 2.
- **Vercel** hosting, **GitHub** source.

## Layout

```
src/
├── payload.config.ts       — Payload root config; reads collections from src/payload/
├── payload/
│   └── collections/        — Payload collection definitions (Users so far)
└── app/
    ├── (frontend)/         — Public website (members of the public + members)
    ├── (payload)/          — Payload admin UI + REST/GraphQL API
    │   ├── admin/[[...segments]]/
    │   ├── api/[...slug]/
    │   ├── api/graphql/
    │   ├── api/graphql-playground/
    │   ├── importMap.js    — auto-generated (do not edit by hand)
    │   ├── layout.tsx      — Payload's RootLayout wrapper
    │   └── custom.scss     — Payload admin UI theming
    └── favicon.ico
```

The two route groups (`(frontend)` and `(payload)`) keep Payload's admin layout / CSS away from the public site without affecting URLs.

## Auth model

- **Payload's native auth** (`Users` collection) gates `/admin`. ~3–5 KSTC staff members.
- **Clerk** owns public-facing member identity (capital members, industry members, board users). Once wired, Clerk webhook → upsert to a `members` collection in Payload (mirrors identity for content authorship & relations).

Don't replace Payload's admin auth with Clerk. Two user systems, deliberately separate.

## Reference materials

- [content-model.md](content-model.md) — every prototype data array mapped to a Payload collection / global / static. The source of truth for the Payload schema.
- [prototype-extracted/](prototype-extracted/) — runnable design reference (gitignored, lives locally only). Open `index.html` via `python3 -m http.server 5173` from inside that dir.
- [extract-bundle.js](extract-bundle.js) — script that produced `prototype-extracted/` from the original `KPCA Website _standalone_.html` bundle.

## Conventions

- **Collections** live at `src/payload/collections/` — one file per collection, named PascalCase matching their slug.
- **Globals** (singletons like `nav`, `footer`) live at `src/payload/globals/` once we add them.
- **Frontend pages** are server components by default. Client components only where needed (interactive tabs, forms).
- **Editor copy** that lives in collections/globals is fetched via `payload.find()` from server components.
- **Static marketing copy** (headlines, body paragraphs that rarely change) stays hardcoded in JSX. Don't push everything into the CMS.

## Commands

```
npm run dev              # next dev --webpack (frontend + admin)
npm run build            # production build (needs DATABASE_URI to compile)
npm run generate:types   # regenerate src/payload-types.ts from collections
npm run seed             # bulk-seed prototype data via /api/seed (dev-only)
npm run payload          # Payload CLI (migrations, etc.)
```

## Why we run webpack instead of Turbopack

Payload's CLI (tsx) requires explicit `.js` extensions on relative imports in `payload.config.ts` under `"type": "module"` (Node ESM rules). Bundlers then need to resolve `.js → .ts` source. Webpack does this via `extensionAlias` in next.config.ts. Turbopack doesn't yet support per-extension alias resolution, so dev runs on webpack. Production `next build` is webpack-based by default already.

If/when Turbopack adds extensionAlias support, drop `--webpack` from the dev script.

## Why generate:types output looks truncated when piped

If you run `npm run generate:types | tail -N`, the pipe closes early and SIGPIPEs the Payload CLI before it writes the file. Always redirect to a file (`> /tmp/log`) or omit the pipe.

## Don'ts

- Don't edit `src/app/(payload)/admin/importMap.js` by hand — regenerate via `payload generate:importmap`.
- Don't add Tailwind without a discussion — current design is a bespoke CSS-variable theme ported from the prototype.
- Don't commit `prototype-extracted/` or the original `.html` bundle (both gitignored).
- Don't drop `"type": "module"` from package.json — Payload's CLI requires it.
- Don't drop the `.js` extensions on relative imports in `payload.config.ts` — Payload's CLI requires them.
