# Handoff — medicalofficecleaningroberts.com

## Status: BLOCKED ON ENV VAR — not yet READY TO LAUNCH

Site is pushed to `origin/main` and will build on Vercel. The one remaining blocker is manual and outside this session's access: **`CRM_API_TOKEN` must be set in the Vercel project's environment variables**, or every quote-form submission will fail with a 500. Once that's set and one real test lead is confirmed landing in the CRM, this can move to READY TO LAUNCH.

## What this is

Static HTML/CSS microsite for Roberts Medical Office Cleaning (Roberts, WI). 43 pages, no build step, no JS framework. Deployed on Vercel, repo already connected to the Vercel project — pushing to `main` triggers a production deploy.

## Stack

- Plain HTML + one shared `styles.css`
- One shared client-side script: `quote-form.js` (UTM capture + async form submit)
- One Vercel serverless function: `api/submit-lead.js` (Node, auto-detected by Vercel — no config needed beyond `vercel.json` headers)

## Contact form → CRM integration

Both quote forms (`index.html` hero, `request-a-quote/index.html`) POST via `fetch` to `/api/submit-lead`, which proxies to the CRM-QM `PushLead` endpoint (`https://thequotemasters.com/crm_api/api.php?action=push_lead`).

The CRM Bearer token is **never in client code**. It's read server-side from the `CRM_API_TOKEN` environment variable inside `api/submit-lead.js`.

**Required action before launch:** set `CRM_API_TOKEN` in the Vercel project's Environment Variables (Production + Preview) to the token provided in the CRM-QM API docs. Without it, `/api/submit-lead` returns HTTP 500.

The GetFaq CRM endpoint was **not** wired up — the `/faq/` page content is static copy, per scope (no request to make FAQ dynamic).

### Payload mapping

Form field → CRM payload:
- `name` → split into `customer.first_name` / `customer.last_name`
- `facility` → `customer.company_name`
- `phone`, `email` → `customer.phone` (digits/+ only), `customer.email`
- `service` + `notes` → concatenated into `customer.notes`
- `industry` is hardcoded to `23` (medical/dental — matches the sample payload in the CRM docs)
- `questions` / `appointments` are sent empty (no questionnaire or scheduling UI on this site)
- `utm_source` is derived client-side (see below) and passed through

### UTM tracking

`quote-form.js` captures `utm_source/medium/campaign/term/content` from the query string on page load, persists them in `sessionStorage` (so they survive navigation to `/request-a-quote/` from a landing page), and sends `utm_source` (or the referrer hostname, or `"direct"` as fallback) with the lead payload.

## Testing status

**No automated testing was performed** (explicitly out of scope for this build — static marketing site, no test suite). Manual verification done:
- All 43 internal links resolve to real files
- Phone/email/business-name consistent across all pages
- No placeholder/lorem-ipsum/template-token content remaining
- No secrets committed (CRM token only referenced via `process.env`)
- sitemap.xml and robots.txt verified correct

**Not tested:** the live `/api/submit-lead` → CRM round trip. This needs a real submission test once `CRM_API_TOKEN` is set in Vercel, before calling the form "verified working."

## Deployment

No CLI deploy needed — repo is already linked to a Vercel project. `git push origin main` triggers production deploy automatically.

## Pre-launch checklist

- [ ] Set `CRM_API_TOKEN` in Vercel env vars (Production + Preview)
- [ ] Submit a real test lead through `/request-a-quote/` after deploy and confirm it lands in the CRM
- [ ] Confirm `QA.md` is not publicly reachable post-deploy (excluded via `.vercelignore` — verify by requesting `/QA.md` after deploy, expect 404)

## Known internal notes

`QA.md` (build QA checklist) references an internal client-site rotation scheme naming another portfolio domain. It's excluded from the Vercel deploy via `.vercelignore` — keep it that way; it's an internal build artifact, not site content.
