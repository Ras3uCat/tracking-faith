# QA Report — 138 WCAG AA Contrast Audit

- **Status:** PARTIAL
- **Date:** 2026-06-05
- **Tool:** axe-core 4.11.4 via @axe-core/cli (headless Chrome 149)
- **Environment:** `http://localhost:8081/index.html` (python3 -m http.server, default palette)
- **Palette tested:** default (light parchment) — ink/sepia/oxblood not yet tested

---

## Summary

| Category | Count |
|---|---|
| Violations (auto-confirmed) | 1 |
| Incomplete / needs manual review | 2 rules, 46 nodes |
| Passes | 42 |

---

## Violations (must fix)

### [MODERATE] `landmark-complementary-is-top-level`
`<aside class="featured__aside">` is nested inside another landmark element. WCAG requires complementary landmarks to be top-level (not inside `<main>`, `<article>`, etc.).

**Fix:** Either move the `<aside>` outside the wrapping landmark, or change it to a `<div>` if it doesn't semantically represent complementary content.

---

## Incomplete — needs manual action

### [SERIOUS] `aria-hidden-focus` (3 nodes)
axe flagged these as needing manual verification — elements marked `aria-hidden="true"` that may contain focusable children:

1. `<nav class="nav__mobile-panel" aria-hidden="true">` — mobile nav panel. If it contains `<a>` or `<button>` elements, those must not be focusable when the panel is hidden. Fix: add `tabindex="-1"` to all focusable children, or use `inert` attribute on the panel when closed.
2. `<div class="plate__art" aria-hidden="true">` (×2) — manuscript art containers. Check for focusable descendants; `aria-hidden` on a container does not automatically remove focusability.

### [SERIOUS] `color-contrast` (43 nodes — cannot auto-resolve)
axe returned `fg=None, bg=None, ratio=0` for all 43 nodes. This is a known limitation: axe-core in headless mode cannot resolve CSS custom properties (`var(--ink)`, `var(--paper)`, etc.) to computed color values.

**Manual review required.** Open the page in Chrome with the axe DevTools browser extension — it runs in a live rendering context and resolves CSS variables correctly. Affected elements span the full page:
- Nav links and group labels
- Hero lede, CTA button, hero credibility line
- Timeline dates/era labels (`.tl-date`, `.tl-era`)
- Footer copy, email input, subscribe button, privacy link
- `brand__sub` subheading

Highest-risk variables per `styles.css` (light palette):
- `--ink-mute: #6b5d4d` on `--paper: #f4ede0` — used for `.brand__sub`, captions, muted labels
- `--gold-deep: #8a651d` on `--paper: #f4ede0` — used for links, CTAs

---

## Next Steps

1. **Fix `aside` landmark** — either hoist it or convert to `<div>`.
2. **Fix `aria-hidden-focus`** — add `inert` or `tabindex="-1"` to focusable children of hidden panels.
3. **Run axe DevTools browser extension** in Chrome on `file:///...index.html` to get resolved contrast ratios — headless cannot do this.
4. **Re-run this script** after fixes to confirm violation count drops to 0.
5. Repeat audit for remaining palettes: `ink` (dark), `sepia`, `oxblood`.
