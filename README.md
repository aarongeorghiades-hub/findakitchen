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

`providers.json` deliberately holds **no provider contact details** — no phone,
email, website, address, postcode or company number. No page has ever rendered
them, and the only forward path to a provider is `/get-quotes`.

Enquiries arrive by email at **hello@findakitchen.co.uk** (`/get-quotes` is a
mailto link).

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
`next.config.mjs` rather than letting the URL 404.
