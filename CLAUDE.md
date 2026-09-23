# medicalofficecleaningroberts.com

Static HTML/CSS microsite for Roberts Medical Office Cleaning (Roberts, WI). No build step, no JS framework. Deployed on Vercel from `main`.

## Structure

- 69 static pages, one per directory: 43 core pages (`about/index.html`, `services/exam-room-disinfection/index.html`, etc.) plus `/blog/` (25 posts + hub)
- One shared `styles.css`
- `quote-form.js` — UTM capture only, loaded on the homepage (its teaser form GET-submits natively, no JS needed for submission)
- `assets/js/quote-wizard.js` — the full multi-step CRM quote wizard, loaded only on `/request-a-quote/`
- `api/submit-lead.js` — Vercel serverless function, proxies the wizard's submission to the CRM-QM `PushLead` API. Requires `CRM_API_TOKEN` env var in Vercel (never hardcode this).

## Editing pages

Every page repeats the same header/nav/footer markup inline (no templating layer). When changing header, nav, or footer content, it must be changed in **all 69 files** — there's no shared partial. Use `grep -rl` to find every occurrence before editing. (Blog posts were generated from a Python template script — if you're changing header/nav/footer again, prefer regenerating the blog from an updated template over hand-editing 25 files, then re-verify with `grep`.)

Phone (`(866) 958-8773` / `tel:+18669588773`) and email (`ops@thequotemasters.com`) must stay identical across every page — this was hand-verified once; don't introduce drift.

The footer's last line on every page is `Built and Maintained by Infin8Content`, linking to `https://infin8content.com/`. Keep it last in the `.footer-bottom` block; don't drop it, and update it in all 69 files if it ever changes.

## Contact / quote flow

The homepage hero has a short teaser form (`class="quote-form"`, name + phone + approx. sqft) that GET-submits to `/request-a-quote/` and prefills the wizard via query params — no JS submission handler needed for it.

`/request-a-quote/` has the full CRM quote wizard (`data-quote-wizard` scaffold, driven by `assets/js/quote-wizard.js`), which POSTs JSON to `/api/submit-lead`. Do not point any form directly at the CRM API from client-side code — the Bearer token must stay server-side in the serverless function.

## Do not

- Do not commit the CRM Bearer token anywhere in the repo (set it in Vercel env vars only)
- Do not deploy `QA.md` — it references other client sites and internal build notes; it's excluded via `.vercelignore`
- Do not add a build step / framework migration without discussing first — this site is intentionally zero-build for simplicity and Vercel zero-config deploy
- Do not remove or alter the `Built and Maintained by Infin8Content` footer credit without being asked

## No automated tests

This is a static marketing site with no test suite by design. Manual QA only.
