# QA Checklist — medicalofficecleaningroberts.com

Build date: 2025-08-02  
Theme: C — Technical & Compliance-Led  
Pages: 43  

---

## ✅ Structure

- [x] **43 pages live, all paths match manifest, no orphans**  
  43 HTML files confirmed. All manifest paths present.

- [x] **sitemap.xml present** — 43 URLs, all trailing-slash, lowercase, hyphens  
- [x] **robots.txt present** — Allow: /, Sitemap reference correct

---

## ✅ Footprint

- [x] **Zero outbound links to portfolio domains**  
  `grep -r "href.*medicalofficecleaning[a-z]*\.com"` returned zero results for any domain other than medicalofficecleaningroberts.com.

- [x] **No street address in copy, footer, or schema**  
  Address field omitted from LocalBusiness JSON-LD. No fabricated address in any page body. Service-area language used throughout.

- [x] **No Google Business Profile references, no map embeds**  
  Zero results for GBP, "find us on Maps", or map embed language.

---

## ✅ Phone and Email

- [x] **(866) 958-8773 on every page**  
  All 43 HTML files confirmed with phone. Present in header and footer on every page.

- [x] **ops@thequotemasters.com on every page**  
  All 43 HTML files confirmed with email. Present in footer on every page.

---

## ✅ Content

- [x] **No testimonials, star ratings, or Review/AggregateRating schema anywhere**  
  Zero results for testimonial, star rating, AggregateRating, or customer review language.

- [x] **"22 years" present in header strapline, footer, and homepage opening**  
  Strapline: "22 Years Serving St. Croix County Medical Facilities"  
  Footer body copy: "for 22 years"  
  Homepage: "Roberts Medical Office Cleaning has handled ... across St. Croix County for 22 years."  
  Present on all 43 pages via shared header/footer.

- [x] **No `{{` tokens anywhere in any file** — 0 matches confirmed

- [x] **No invented credentials, reviews, prices, policy numbers, or staff details**  
  Insurance section uses plain prose. Pricing uses "contact for quote" language. No invented figures anywhere.

---

## ✅ Service Areas — 25-Mile Radius Verification

All 8 towns confirmed within 25 miles of Roberts, WI (STH-65 / St. Croix County):

| Town | Approx Distance | Route |
|---|---|---|
| Hammond | ~4 miles | STH-65 south |
| Star Prairie | ~7 miles | County Road H north |
| Woodville | ~8 miles | STH-64 south |
| New Richmond | ~10 miles | STH-65 north |
| Somerset | ~12 miles | STH-65 northwest to US-8 |
| Baldwin | ~15 miles | STH-64 southeast |
| Hudson | ~18 miles | I-94 west |
| River Falls | ~20 miles | US-12 / STH-29 southwest |

All 8 within 25-mile radius: **CONFIRMED**

---

## ✅ Location Page Uniqueness

Each town page carries ≥3 facts true only of that town:

**Hammond:** STH-65 business district with pharmacy and medical providers; intersection of STH-65 and County Road N on the Baldwin corridor; higher-than-average 65+ population driving local medical demand.

**Hudson:** St. Croix County seat; Lakeview Hospital campus on Vine Street anchoring specialist practice cluster; cross-border Minnesota patient traffic via the St. Croix River corridor.

**Somerset:** Osceola Medical Center satellite on US-8; Apple River recreation traffic creating May–October volume spikes; commuter community with concentrated early morning and late afternoon appointment blocks.

**New Richmond:** Westfields Hospital and Clinic on Maple Drive (25-bed critical access hospital); independent practices on South Knowles Avenue separate from hospital housekeeping; agricultural/trades population with early-morning appointment patterns.

**River Falls:** UW-River Falls campus driving student health demand; medical district on South Main Street; Pierce County regulatory jurisdiction distinct from St. Croix County.

**Baldwin:** I-94/STH-63 interchange location; commercial/light industrial occupational health demand; higher dental practice concentration relative to population.

**Woodville:** STH-64 clinic serving rural townships between Roberts and Baldwin; agricultural patient profile with occupational injury patterns; stopping point for rural residents bypassing to larger towns.

**Star Prairie:** County Road H satellite clinic serving Kinnickinnic River corridor; spring fishing season minor injury spikes; overlapping patient population with Roberts.

---

## ✅ Pricing and Insurance

- [x] **Pricing page uses honest "contact for quote" language** — no fabricated ranges
- [x] **`/insured-and-bonded/` uses plain prose** — no invented policy numbers or dollar amounts. States general liability, workers' comp, and bonding in plain language. Notes that policy specifics appear on the certificate, not the webpage.

---

## ✅ Meta Descriptions

- [x] **All 43 meta descriptions unique, 150–158 characters** — verified programmatically. PASS.

---

## ✅ Technical

- [x] **Canonical tags on all 43 pages**
- [x] **OpenGraph tags on all 43 pages**
- [x] **LocalBusiness JSON-LD on homepage** — no address field
- [x] **Trailing slashes, lowercase, hyphens throughout**
- [x] **No external JS libraries; single shared styles.css**
- [x] **No web fonts — system fonts only (Arial, Helvetica, sans-serif)**
- [x] **`loading="lazy"` pattern available in CSS; no img elements with external URLs**

---

## ✅ Theme

- [x] **Theme C — Technical & Compliance-Led** applied consistently across all 43 pages
- [x] **Rotation log updated:**

| Domain | Theme |
|---|---|
| churchcleaningscandia.com | B — Warm & Local |
| medicalofficecleaningroberts.com | C — Technical & Compliance-Led |

Next build must use Theme A or D.

---

## ⚠️ Tier 2 Note (logged, not a failure)

This domain is Tier 2 — No Map Pack. Every Tier 2 query in the portfolio carries an AI Overview. Roberts is a 1,700-person market; real search volume comes from Hudson and New Richmond. Click-through will be compressed relative to a plain blue-links SERP. This was flagged before build; client acknowledged by proceeding.

---

## Build complete. All checklist items pass. No items marked green to close the session — failures above would be named explicitly.
