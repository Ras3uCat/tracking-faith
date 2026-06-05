# 138 — WCAG AA Contrast Audit

## Problem
The site uses a custom dark theme. No systematic contrast check has been run against WCAG AA standards:
- Normal text: must meet 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): must meet 3:1
- UI components (borders, icons, focus rings): must meet 3:1

This is the last open accessibility task from Feature 115 (`115_tier3_polish.md`).

## Goal
Zero contrast failures reported by automated tooling (axe DevTools or Lighthouse). If using Lighthouse, score ≥ 90.

## Implementation

### 1. Automated Audit
The site is opened as a local file (`file:///...`). Lighthouse CLI and Chrome DevTools Lighthouse both require `http://`, so serve it first:

```bash
cd execution/frontend/static
python3 -m http.server 8080
# site: http://localhost:8080/index.html
npx lighthouse http://localhost:8080 --only-categories=accessibility --output=json
```

Alternatively, the **axe DevTools** browser extension works directly on a `file://` URL — no server needed. Run it from the DevTools panel on the open tab.

### 2. Identify Failures
The site has four active palette variants — audit **each one separately** (toggle via `data-palette` attribute on `<html>`):
- `default` (light parchment): `--paper: #f4ede0`, `--ink-mute: #6b5d4d`
- `ink` (dark): `--paper: #14110d`, `--ink-mute: #97896c`
- `sepia`: `--paper: #fbf6ec`, `--ink: #2a1d12`
- `oxblood`: `--paper: #f1ebe0`, `--ink: #2d1410`

High-probability failure areas (check `styles.css` CSS variables):
- `var(--ink-mute)` text against `var(--paper)` — used for `.brand__sub`, `.hero__cred`, `.iconbtn__hint`, captions, metadata; check all four palettes separately
- `var(--ink-soft)` on `.nav__group-items a` inactive states
- `var(--gold-deep)` link color (`#8a651d` light / `#b8893d` dark) — used for body links, `.dir__link`, `.hero__cred a`, `.plate figcaption a`, and citation anchors; high-probability 4.5:1 failure in the light palette
- `::placeholder` text in footer email input (`var(--ink-mute)`)
- `var(--gold)` focus ring — must meet 3:1 against adjacent background per WCAG 1.4.11

### 3. Fix Failures
For each failing element:
- Identify the CSS rule setting the color
- Calculate the adjusted value to meet 4.5:1 (use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/))
- Update the CSS variable or scoped rule in `styles.css`

Prefer adjusting the CSS variable if it's used site-wide; scope a specific override only if the variable is intentionally different elsewhere.

### 4. Re-run Audit
Verify no regressions: re-run Lighthouse and confirm accessibility score ≥ 90.

## Acceptance Criteria
- [ ] Lighthouse accessibility audit reports score ≥ 90
- [ ] Zero WCAG AA contrast failures (4.5:1 normal text, 3:1 large/UI) across all four palette variants
- [ ] `var(--ink-mute)` text passes 4.5:1 in default, ink, sepia, and oxblood palettes
- [ ] `var(--gold-deep)` link color passes 4.5:1 in all palette variants
- [ ] `.nav__group-items a` inactive state passes in all palette variants
- [ ] `[data-cite]` anchor link colors pass in all palette variants
- [ ] `::placeholder` text in footer email input passes in all palette variants
- [ ] `var(--gold)` focus ring meets 3:1 contrast against `var(--paper)` and `var(--paper-2)` in both light and dark palettes (WCAG 1.4.11)
- [ ] No regressions to keyboard navigation or focus ring visibility (already verified in Feature 115)

## Files
- `execution/frontend/static/styles.css` (primary — CSS variables and scoped color rules)
- `execution/frontend/static/styles-effects.css` (secondary — check any colored text in effect layers)
- `execution/frontend/static/index.html` (read-only — reference only to identify element context)
