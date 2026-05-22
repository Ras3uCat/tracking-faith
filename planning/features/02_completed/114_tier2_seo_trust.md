# 114 — Tier 2: SEO, Trust & Usability

## Context
Items that affect how the site appears to search engines and social platforms, plus visible prototype-era tells that undermine trust with real visitors.

## Pre-Conditions (Client Must Supply)
- `SITE_URL` — required before OG tags, canonical, or JSON-LD can be finalized
- `OG_IMAGE` URL — required for social share cards
- `SHORT_NAME` — required for PWA manifest
- `TIMEZONE` — required for digest/notification features
- Contact/address data (`FROM_EMAIL`, `PHONE`, `STREET`, `CITY`, `STATE`, `ZIP`, `COUNTRY`, `HOURS_JSON`) — required before `EducationalOrganization` JSON-LD; use `WebSite`-only schema until available
- Social URLs (`INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL`, `YOUTUBE_URL`) — hide footer social links until populated

## Tasks

### SEO / Meta
- [x] **OG tags**: Added `og:title`, `og:description`, `og:image`, `og:url`, `og:type`. Image uses LOGO_URL as placeholder — replace `og:image` with a proper 1200×630 image when ready.
- [x] **Twitter Card**: Added `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- [x] **Description + canonical**: Added `<meta name="description">` and `<link rel="canonical" href="https://trackingfaith.com">`.
- [x] **JSON-LD structured data**: Added `WebSite` schema. Upgrade to `EducationalOrganization` once contact/address fields in client.json are populated.
- [x] **Favicon**: Added PNG favicon (`assets/logo-transparent.png`). Upgrade to SVG (`type="image/svg+xml"`) when an SVG asset is available.
- [x] **robots.txt**: Created `static/robots.txt` — allows all crawlers, references `/sitemap.xml`.
- [x] **sitemap.xml**: Created `static/sitemap.xml` with root URL. Hash-fragment routes omitted (Google does not index `#`-based URLs).

### PWA
- [x] **manifest.json**: Created `static/manifest.json` (name, short_name, icons, display: standalone, theme_color: #B8965A). Added `<link rel="manifest">` to `<head>`.

### Prototype Tells
- [x] **"MVP" kicker label**: Removed " · MVP" from Featured Module kicker.
- [x] **Footer dead links**: Wired "Citation policy" to `data-drawer="citations-manifesto"`. Wired "Submit a parallel" and "Contact the editors" to `data-nav="contact"`. Removed "Editorial standards" (no content). Fixed "Read our citation policy →" in drawer footer (was also `href="#"`).
- [x] **Search button stub**: Replaced `alert()` with disabled state — `disabled`, `opacity: 0.4`, `cursor: not-allowed`, `title="Search coming soon"`.
- [x] **EDITMODE markers**: Removed `/*EDITMODE-BEGIN*/` and `/*EDITMODE-END*/` markers from `window.TF_DEFAULTS` block (no build step was consuming them).
- [x] **Social footer links**: Confirmed — no social icon links exist in the HTML. The `INSTAGRAM_URL` / `FACEBOOK_URL` etc. in client.json are not rendered anywhere. No action needed.

### Optional Upgrade
- [x] **404 view**: Added `data-view="not-found"` section with kicker "404", headline, subtext, and "← Back to home" link. Updated router.js fallback to route unknown hashes to this view instead of silently showing home.

### Config (client.json)
- [x] **SITE_URL**: Set to `"https://trackingfaith.com"`.
- [x] **SHORT_NAME**: Set to `"Tracking Faith"`.
- [x] **TIMEZONE**: Set to `"America/Chicago"`.
- [x] **SEO_DESCRIPTION**: Updated from keyword-stuffed value to editorial copy (155 chars).
- [x] **OG_IMAGE**: Generated brand-consistent 1200×630 OG image (`assets/og_image.svg` + `og_image.png` via Inkscape). Wired into `og:image` and `twitter:image`. Gemini API key stored in client.json for future image-gen runs. Note: Imagen 4.0 requires paid Google AI plan — image generated via SVG + Inkscape as fallback.
- [x] **Social URLs**: Confirmed N/A — no social accounts. No social icon links exist anywhere in the HTML.

## Files
- `execution/frontend/static/index.html`
- `execution/frontend/static/router.js`
- `execution/frontend/app/client.json`
- `execution/frontend/static/manifest.json` ← new
- `execution/frontend/static/robots.txt` ← new
- `execution/frontend/static/sitemap.xml` ← new
