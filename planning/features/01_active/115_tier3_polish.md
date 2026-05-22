# 115 — Tier 3: Polish & Accessibility

## Context
Low-urgency improvements for accessibility compliance and UX polish. None are blocking launch but should be addressed before the site is promoted publicly.

## Dependencies
- **Double opt-in** → blocked on Tier 1 `RESEND_KEY` being set (`113_tier1_blockers.md`)
- **"Propose a parallel" button** → requires client decision (contact drawer vs. `mailto:`) before implementation

## Tasks

- [ ] **`prefers-reduced-motion`**: Wrap all particle, text-scramble, and sticky-scroll animations in a `@media (prefers-reduced-motion: reduce)` guard. Disable or replace with a static/fade fallback. WCAG 2.1 SC 2.3.3.
  - **Done when:** With OS reduced-motion enabled, no particle animation, scramble effect, or parallax scroll motion plays. Page content remains visible and readable.

- [ ] **Commit untracked static assets**: `manifest.json`, `robots.txt`, `sitemap.xml`, `og_image.png`, `og_image.svg` are all untracked and will not deploy. Stage and commit them.
  - **Done when:** `git status` shows no untracked files under `execution/frontend/static/`.

- [ ] **Skip-to-content link**: Add `<a href="#main-content" class="sr-only focusable">Skip to content</a>` as the first element in `<body>`. Add `id="main-content"` to the first content section. Style `.sr-only` with the standard clip pattern.
  - **Done when:** Tab from address bar lands on the skip link first; activating it moves focus to `#main-content`.

- [ ] **WCAG AA contrast audit**: Run automated contrast check (e.g., axe DevTools or Lighthouse accessibility audit) against the dark-themed UI. Fix any elements below 4.5:1 for normal text, 3:1 for large text/UI components.
  - **Done when:** Lighthouse accessibility score ≥ 90 with no contrast failures reported.

- [ ] **Keyboard navigation / focus ring audit**: Tab through the full page and verify: focus order is logical, all interactive elements are reachable, focus rings are visible (not hidden by `outline: none`), and no keyboard traps exist in modals or drawers.
  - **Done when:** Full keyboard navigation completes without focus loss or trap.

- [ ] **`<html lang="en">`**: Confirm the `lang` attribute is set on the root `<html>` element.
  - **Done when:** `<html lang="en">` present in `index.html`.

- [ ] **"Propose a parallel" button**: Decide: wire to contact/citation drawer or a `mailto:` link. Currently has no target (`static/index.html` approx line 541). Client must confirm which before implementation.
  - **Done when:** Button navigates to the agreed target without a console error or dead click.

- [ ] **Social URLs in client.json**: Fill in `INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL`, `YOUTUBE_URL`. If any account doesn't exist yet, set the value to `""` and verify the nav suppresses that icon. Document which are intentionally absent so blank values aren't mistaken for bugs.
  - **Done when:** All social nav items either link to a live account or are hidden when the URL is empty.

- [ ] **Newsletter email placeholder**: Change `placeholder="you@somewhere"` to `placeholder="your@email.com"` in `static/index.html` approx line 824.
  - **Done when:** Input placeholder reads `your@email.com`.

- [ ] **Double opt-in / confirmation email**: Add `status: 'pending'` to newsletter insert. Trigger `send-contact` edge function to send a confirmation email. Blocked until Tier 1 `RESEND_KEY` is set.
  - **Done when:** New subscriber receives a confirmation email; `status` column updates to `'confirmed'` on link click.

- [ ] **Privacy policy link for newsletter**: Newsletter collection is live (Tier 1). Add a visible "privacy policy" link near the subscribe form. A placeholder policy page is acceptable for launch.
  - **Done when:** A clickable privacy policy link is present adjacent to the newsletter form.

- [ ] **Citation link aria-labels**: Citation `<a data-cite="...">` links are announced as generic "link" to screen readers. Add `aria-label="Open source citation"` or dynamically set label from citation title via JS.
  - **Done when:** Screen reader announces a descriptive label (not just "link") for each citation anchor.

## Files
- `execution/frontend/static/index.html`
- `execution/frontend/static/manifest.json`
- `execution/frontend/static/robots.txt`
- `execution/frontend/static/sitemap.xml`
- `execution/frontend/static/assets/og_image.png`
- `execution/frontend/static/assets/og_image.svg`
- `execution/frontend/app/client.json`
