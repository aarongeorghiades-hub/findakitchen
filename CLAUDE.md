# FindAKitchen — Developer Notes

A UK directory and guide site for **temporary kitchen hire** — the units people
hire when their permanent kitchen is out of action (renovation, fire, flood,
burst pipe, or a commercial refurbishment).

Live site: https://findakitchen.co.uk

---

## Stack and hosting

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Fully static.** Every route is prerendered at build time from JSON files in
  `src/data/`. **No database, no API routes, no email pipeline, no cron, no
  environment variables.** `npm run build` needs nothing but this repo and npm.
- **Railway** hosting — project `lavish-courage`, region `us-west2`
- **Repo:** https://github.com/aarongeorghiades-hub/findakitchen — `main` branch
- Railway **auto-deploys on push** to `main`
- **Deploy target is Railway only.** Do not introduce another host or any
  external service — the site is deliberately dependency-free.

## Content lives in `src/data/`

Content changes are edits to JSON files, not database writes:

| File | Feeds |
|---|---|
| `providers.json` | `/providers`, `/providers/<slug>`, and the provider cards on the home, commercial, insurance-claims and location pages |
| `kitchen-types.json` | `/kitchen-types`, `/kitchen-types/<slug>` |
| `regions.json` | `/temporary-kitchen-hire/<slug>` |
| `seo-pages.json` | `/blog/<slug>`, `/guides/<slug>`, `/compare/<slug>` |

Row order in `providers.json` is load-bearing: the "related providers" block
reads the file's natural order, and the listing pages sort by `id`. Preserve
the existing order when editing.

### Provider contact data

`providers.json` carries each provider's **public** contact routes — `website`,
`phone`, `trustpilot_url`, and `email` as a fallback where a provider has no
website. These render on `/providers/<slug>` and on the directory cards; they
are the site's primary call to action, since the site takes no enquiries
itself.

**Never add** street address, postcode, Companies House identifiers, social
links, or any individual's name to this file. That exclusion is deliberate.

Providers asking to be amended or removed are pointed at
`providers@findakitchen.co.uk` from the `/providers` index.

## Site contact addresses

- `hello@findakitchen.co.uk` — general enquiries; `/get-quotes` is a static
  page with a mailto link, not a form
- `providers@findakitchen.co.uk` — listing amendments and removals
- `privacy@findakitchen.co.uk` — data requests, cited in the privacy policy

## Colour scheme

Defined as CSS variables in `src/app/globals.css` (with matching Tailwind
tokens in `tailwind.config.ts`):

- **Background** — `--cream` `#FAF7F2`
- **Body text** — `--charcoal` `#1C1C1A`
- **Primary action / CTA** — `--clay` `#C2593A` (terracotta/orange)
- **Secondary accent** — `--sage` `#4A7C59`
- **Tertiary accent** — `--amber` `#D4830A`

Legacy teal/amber/slate Tailwind tokens (`primary`, `accent`, `slate`) still
exist but are used only for incidental UI (e.g. input focus rings) — they are
not the brand palette.

## URLs and redirects

URLs are load-bearing for SEO. **Do not rename or remove a route.** If a page
is retired, add a permanent redirect in `next.config.mjs` rather than letting
the URL 404 — that file already holds the redirects for every page retired so
far, including several merged duplicate guides and provider profiles.

## Conventions

- Dynamic segments set `dynamicParams = false` and are fully prerendered via
  `generateStaticParams`; unknown slugs 404 rather than rendering on demand.
- No page may claim the site performs an action on a visitor's behalf —
  matching, routing, passing details to providers, or replying within a stated
  time. It does none of those. Copy should describe what the site actually
  does: list providers and let the visitor contact them directly.
- No analytics, cookies, or third-party scripts. The privacy policy says so
  explicitly, so adding any would make it inaccurate.
