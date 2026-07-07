# 139 — AdSense Related-Content Section

## Problem
The site currently has no monetization. User wants to add ads, but the brand (scholarly, "not pushy, respectful, peaceful" scripture/mythology comparison site — see `client.json` `PERSONALITY`) rules out banner ads and clickbait content-recommendation networks (Taboola/Outbrain style).

## Goal
Add a Google AdSense **Matched Content** unit — a native "related reading" grid — at the end of each article view. This format was chosen specifically because it renders as curated related content rather than a conspicuous ad, fitting the brand better than display/banner formats.

## Architecture note (read before touching this)
The site actually deployed to trackingfaith.com is the **static HTML/CSS/JS site** at `execution/frontend/static/index.html`, not the Flutter app at `execution/frontend/app/`. Confirmed via commit `63f363c` ("fix: deploy static site instead of Flutter app"), which changed `.github/workflows/deploy.yml` to publish `execution/frontend/static` as-is via `peaceiris/actions-gh-pages@v4` — no build/template step, no `client.json` wiring. Any implementation here is a direct HTML/CSS/JS edit; do not build this against the Flutter app.

## Prerequisites (blocking implementation)
- [ ] Create the "Matched Content" ad unit in the AdSense dashboard: **Ads → By ad unit → +ᐩ → Matched content**. This produces a `data-ad-slot` ID.
- [ ] Confirm trackingfaith.com is added and **approved** under **Sites** in the AdSense dashboard (AdSense won't serve on unapproved sites).
- Publisher ID is already known: `ca-pub-2957728777156225` (client gave it without the `ca-` prefix — must be added in the actual script/attributes).

## Placement — decided: end of each article, not the footer
Two footer-based options were considered first (in-flow inside `.foot__cols`, or reworking the footer's fixed-position/scroll-reveal mechanism to create real below-footer space) and rejected in favor of a better spot: **the end of each article's content**, immediately after the existing hand-curated "Related" cross-link block.

Every substantive content view (`data-view="jesus"`, `"nephilim"`, `"flood-myths"`, `"apocrypha"`, etc. — ~19 total, see `grep -n 'data-view=' index.html`) already ends with a `.bv-crosslink` block (e.g. `index.html:3365-3372`) offering manually-picked related-article links, right before the closing `</div></section>`. The Matched Content unit goes directly after that block, in every article view.

Why this beats the footer:
1. **Matched Content needs contextual relevance to work** — Google's algorithm matches recommendations to the surrounding page content. A global footer identical on every page (including the homepage) gives it nothing to match against; at the end of a specific article, it can surface genuinely relevant related reading.
2. **It's in-flow** — no interaction with the footer's `position: fixed` scroll-reveal animation (`styles-effects.css:565-576`, `effects.js:386-420`), so that entire risk disappears.
3. **It extends an existing pattern** rather than bolting on something new — the site already does manual "related content" via `.bv-crosslink`; this is the algorithmic complement to it.

Tradeoff: this means ~19 insertions (one per article view) instead of one global insertion in the footer. Each insertion is identical, so it's mechanical, not risky — but it touches more places in `index.html`.

## Required accompanying change (not optional)
`execution/frontend/static/index.html:3790` (privacy policy view) currently states: *"This site does not use tracking cookies or third-party analytics."* This becomes false once AdSense ships (it sets cookies for ad personalization/measurement). Update this copy as part of this feature — shipping the ad without it is a compliance gap, not a follow-up nice-to-have.

## Implementation sketch
No build/template step exists for this static site, so this is a direct HTML edit — no platform-view bridging or config plumbing needed:
- AdSense loader script (add once, in `<head>` alongside the existing Google Fonts `<link>` at `index.html:17`):
  ```html
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2957728777156225" crossorigin="anonymous"></script>
  ```
- The Matched Content unit itself, inserted once per article view, directly after each `.bv-crosslink` block and before the view's closing `</div></section>`:
  ```html
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-2957728777156225"
       data-ad-slot="[SLOT_ID]"
       data-ad-format="autorelaxed"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  ```
  The same slot ID is reused across all ~19 article views — this is standard AdSense practice (one ad unit, many pages), not a per-article slot.
- Style the surrounding container with existing CSS custom properties — `--paper`/`--paper-2` (background), `--ink-mute`/`--gold` (an optional "Related reading" label, distinct from the existing "Related" crosslink label to avoid duplicate headings), `--gutter`/`--section-y` (spacing) — per the token set in `styles.css:5-27`. No new hardcoded colors.
- GDPR/consent management is explicitly **out of scope** for this entry. AdSense's EU consent requirement depends on visitor geography, not business location, so it can't be ruled out just because this is a US-based client. Flag as a likely follow-up (e.g. a Google-approved CMP like Funding Choices) if EU traffic becomes material — do not build it here.

## Files involved
- `execution/frontend/static/index.html` — one insertion per article view (~19 total, after each `.bv-crosslink` block), privacy policy section (~3790), `<head>` script tag
- `execution/frontend/static/styles.css` — a small new class for the ad container's spacing/background, using existing custom properties (no new colors)

## Acceptance Criteria
- [ ] Ad unit slot ID obtained and site approved in AdSense dashboard
- [ ] AdSense loader script added once to `<head>`, loads with no console errors
- [ ] Matched Content unit renders at the end of every article view (after `.bv-crosslink`, before the view's closing tag), each using the same ad slot ID
- [ ] Home, privacy, and not-found views are unaffected (no ad unit on non-article views)
- [ ] Privacy policy copy (`index.html:~3790`) updated to reflect that third-party ad cookies are now in use
- [ ] Styling uses existing CSS custom properties, no new hardcoded colors/spacing
