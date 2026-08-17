# medicalofficecleaningroberts.com

Static HTML/CSS microsite for Roberts Medical Office Cleaning (Roberts, WI). No build step, no JS framework. Deployed on Vercel from `main`.

## Structure

- 43 static pages, one per directory (`about/index.html`, `services/exam-room-disinfection/index.html`, etc.)
- One shared `styles.css`, one shared `quote-form.js`
- `api/submit-lead.js` — Vercel serverless function, proxies quote-form submissions to the CRM-QM `PushLead` API. Requires `CRM_API_TOKEN` env var in Vercel (never hardcode this).

## Editing pages

Every page repeats the same header/nav/footer markup inline (no templating layer). When changing header, nav, or footer content, it must be changed in **all 43 files** — there's no shared partial. Use `grep -rl` to find every occurrence before editing.

Phone (`(866) 958-8773` / `tel:+18669588773`) and email (`ops@thequotemasters.com`) must stay identical across every page — this was hand-verified once; don't introduce drift.

## Contact form

Two pages have `<form class="quote-form">`: the homepage hero and `/request-a-quote/`. Both are handled by the shared `quote-form.js`, which posts JSON to `/api/submit-lead`. Do not point the form directly at the CRM API from client-side code — the Bearer token must stay server-side in the serverless function.

## Do not

- Do not commit the CRM Bearer token anywhere in the repo (set it in Vercel env vars only)
- Do not deploy `QA.md` — it references other client sites and internal build notes; it's excluded via `.vercelignore`
- Do not add a build step / framework migration without discussing first — this site is intentionally zero-build for simplicity and Vercel zero-config deploy

## No automated tests

This is a static marketing site with no test suite by design. Manual QA only.
