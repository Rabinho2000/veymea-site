# AGENTS.md — Coding Agent Rules for Veymea

## Visual system (non-negotiable)

**Before making ANY visual or frontend UI change, read `VISUAL.md` in full.**

`VISUAL.md` is the single source of truth for the Veymea design system. It
defines brand principles, colour tokens, typography, type scale, spacing,
grid, buttons, links, forms, image treatment, dark/light sections, quiz visual
language, navigation, section patterns, iconography, logo usage, responsive
rules, accessibility, motion principles, animation durations/easing, and the
list of things explicitly forbidden.

Never introduce a new visual pattern, colour, spacing convention, typography
style, border radius, button style, or animation language without checking
whether the existing system already solves the problem. If the design system
itself is intentionally modified, update `VISUAL.md` in the same change.

---

## Stack & hosting constraints

This project runs on **vinext** (Next.js on Cloudflare Workers) and deploys to
**ChatGPT Sites**. Do not replatform. Do not break compatibility with the
existing vinext / ChatGPT Sites deployment.

- Keep `vite.config.ts`, `.openai/hosting.json`, and the Cloudflare worker
  entry intact in spirit.
- Cloudflare D1 + Drizzle is the database layer.
- Tailwind is available but the design system is implemented with CSS custom
  properties in `app/globals.css`. Prefer semantic tokens over utility classes
  for brand-critical styling.
- Brevo is the email/marketing integration. Never expose `BREVO_API_KEY` to the
  browser. All Brevo calls are server-side.

---

## Architecture

```
app/            — routes (pages)
components/     — UI components, grouped by domain
content/        — quiz questions, profiles, brand copy, SEO (no JSX logic)
lib/            — quiz scoring, Brevo client, commerce abstraction, db helpers
db/             — Drizzle schema
worker/         — Cloudflare Worker entry + API routes
VISUAL.md       — design system (read before any UI change)
AGENTS.md       — this file
```

Keep content, scoring, UI, APIs, integrations, database, and the visual system
logically separated. Do not put quiz questions or scoring logic inside React
components. Do not hard-code product data into marketing components.

---

## Commerce

The site is not a store yet. A commerce abstraction lives in `lib/commerce/`.
The `CommerceProvider` interface is vendor-neutral. A `MockCommerceProvider` is
the default. A `ShopifyCommerceProvider` can be added later without changing
the frontend. Never require Shopify credentials for the marketing site to work.

---

## Content language

The public site is **Portuguese from Portugal (pt-PT)**. Never use Brazilian
Portuguese. Keep content architecture sufficiently separated that `/en` can be
added later without a full rewrite, but do not build a full i18n system now.

---

## Code quality

- Prefer clear, reusable components. Avoid one huge component. Avoid excessive
  abstraction for trivial components.
- Use TypeScript types properly. Avoid `any` unless genuinely unavoidable.
- Import every symbol you reference.
- Leave the tree clean: delete replaced code; no orphaned files, dead exports,
  or commented-out blocks.
- Do not add error handling for scenarios that cannot happen. Validate at
  system boundaries (user input, external APIs).

---

## Testing

Before finishing a task, run:

```bash
npm run lint
npm run build
npm test
```

Fix errors. Do not claim an integration works if credentials are missing. Do
not invent successful API responses.
