# FindAKitchen

UK guide to hiring a temporary kitchen when your permanent one is out of action.
Live at **https://findakitchen.co.uk**, hosted on **Railway** (auto-deploys on
push to `main`).

## This site is fully static

Every page is prerendered at build time from JSON files committed in this repo.
There is **no database, no API routes, no email pipeline, no cron, and no
environment variables**. `npm run build` needs nothing but this repo and npm.

If a build ever fails or a page looks wrong, the cause is in this repo — there
is no external service to check.

## Content lives in `src/data/`

| File | What it feeds |
|---|---|
| `providers.json` | `/providers`, `/providers/<slug>`, and the provider cards on the home, commercial, insurance-claims and location pages |
| `kitchen-types.json` | `/kitchen-types` and `/kitchen-types/<slug>` |
| `regions.json` | `/temporary-kitchen-hire/<slug>` |
| `seo-pages.json` | `/blog/<slug>`, `/guides/<slug>`, `/compare/<slug>` |

To change site content, edit the relevant JSON file and push. Railway rebuilds
and redeploys.

Row order in `providers.json` is load-bearing — the "related providers" block
reads the file's natural order, and the listing pages sort by `id`. Preserve it.

### Provider contact data

`providers.json` carries each provider's **public** contact routes: `website`,
`phone`, `trustpilot_url`, and `email` as a fallback where a provider has no
website. These render on the provider pages and directory cards, and are the
site's primary call to action.

**Never add** street address, postcode, Companies House identifiers, social
links, or any individual's name — that exclusion is deliberate. Providers
asking to be amended or removed are pointed at `providers@findakitchen.co.uk`
from the `/providers` index.

## Contact addresses

- `hello@findakitchen.co.uk` — general enquiries (`/get-quotes` is a static page
  with a mailto link, not a form)
- `providers@findakitchen.co.uk` — listing amendments and removals
- `privacy@findakitchen.co.uk` — data requests, cited in the privacy policy

## Commands

```bash
npm install
npm run dev     # local dev server on :3000
npm run build   # production build — prerenders every route
npm run start   # serve the build
npm run lint
```

## Adding or retiring a page

URLs are load-bearing for SEO. If you retire a page, add a permanent redirect in
`next.config.mjs` rather than letting the URL 404 — that file already holds the
redirects for every page retired so far.

Dynamic segments set `dynamicParams = false` and are fully prerendered via
`generateStaticParams`, so an unknown slug 404s rather than rendering on demand.

The site has no analytics, cookies or third-party scripts, and the privacy
policy says so explicitly — adding any would make it inaccurate.
