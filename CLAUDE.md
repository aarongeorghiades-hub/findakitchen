# FindAKitchen — Project Context

UK web platform that helps people find and book a **temporary kitchen** when their permanent kitchen is out of action. Guide-led service (not a neutral directory) that educates the visitor on their situation and routes them through a quote wizard.

Live site: https://findakitchen.co.uk

---

## Stack and hosting

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Supabase** — project ref `tipqtvxwqzhqakpfcjzx`
- **Railway** hosting — project `lavish-courage`, region `us-west2`
- **Repo:** https://github.com/aarongeorghiades-hub/findakitchen — `main` branch
- Railway **auto-deploys on push** to `main`
- **HARD RULE: Railway only. NEVER mention or use Vercel under any circumstance.**

## Market and product

- Two markets, **domestic-weighted**:
  - **B2C** — homeowners (insurance claims, renovations, fire / flood / burst-pipe situations)
  - **B2B** — loss adjusters, restoration firms, insurers
- **NOT a neutral directory** — a guide-led service that educates the visitor and routes them through a quote wizard.
- Hero positioning: **"Your kitchen is out of action. We'll fix that."**

### Colour scheme

Defined as CSS variables in `src/app/globals.css` (with matching Tailwind tokens in `tailwind.config.ts`):

- **Background** — `--cream` `#FAF7F2`
- **Body text** — `--charcoal` `#1C1C1A`
- **Primary action / CTA** — `--clay` `#C2593A` (terracotta/orange)
- **Secondary accent** — `--sage` `#4A7C59`
- **Tertiary accent** — `--amber` `#D4830A`
- Legacy teal/amber/slate Tailwind tokens (`primary`, `accent`, `slate`) still exist but are used only for incidental UI (e.g. input focus rings) — **not** the brand palette.

## Referral strategy (lead gen)

- **Primary channel: loss adjuster direct relationships** — Sedgwick, Crawford & Company, Davies Group, Woodgate & Clark, McLarens, QuestGates, plus regional independents.
- **Loss assessors (claimant-side):** Aspray, Morgan Clark.
- **Restoration / disaster recovery firms:** Belfor UK, Polygon UK, Rainbow International, ServiceMaster Restore, Munters.
- **Insurers (longer-term):** Aviva, AXA, Allianz, Direct Line, LV=, Hiscox, NFU Mutual, Zurich UK, RSA, Ageas, Saga, Admiral.

### Hard exclusions (do not propose, do not resurrect)

- **General contractors, builders, kitchen fitters, kitchen installers** — permanently dropped from referral strategy. Cowboy risk. CEO directive.
- **Kitchen showroom retailers** (Wren, Howdens, Magnet) — excluded by extension (their channel is fitters).
- `/trade-partners` page deleted 2026-06-04 — trade-partner strategy permanently dropped (cowboy risk). Do not propose rebuilding.

### Parked items (not active, do not propose)

- **Google Ads** — parked until free channels prove out and referral fees are £150+ per lead or commission-based.
- **Meta / Facebook Ads** — secondary, not active.
- **OpenClaw automation** — overkill at current stage.
- **Food safety compliance SaaS** — researched and parked.

## Revenue model

Lead generation. Targeting **£150+ per qualified lead**, or **10–15% commission** of total hire value.

## Working style

- **Aaron = CEO.** Non-technical. Strategic decisions only.
- **Claude (chat) = Project Manager.** Drives implementation, writes CC prompts, tracks workflow.
- **Claude Code (this) = sole deployer.** Commits and pushes to GitHub; Railway auto-deploys.
- SQL blocks contain **SQL only**. CC prompts contain **prompt text only**. Never mix prose into code blocks.
- All deliverables (docs, prompts) go via **downloadable files**, not inline.
