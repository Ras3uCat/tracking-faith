# 115 — Inner Page Motion & Animation

**Status:** Completed  
**Date:** 2026-05-22  
**Type:** FLOW — motion layer extension

---

## Problem

The landing page had a full animation suite (particles, scramble, sticky scroll, SVG path, parallax, marquee, footer reveal). The four inner pages — Historical Jesus, Parallel Stories, Canon Formation, and Excluded Texts — were either fully static or had only token effects, creating a jarring experience gap on navigation.

Two root causes:

1. `router.js:activate()` never called any effects re-init after switching views.
2. Inner page HTML had no `data-reveal` / `data-reveal-delay` attributes, so `initReveal()`'s IntersectionObserver had nothing to watch on those pages.

---

## Solution

Used the existing animation infrastructure entirely — no new libraries added.

---

## Files Changed

### `execution/frontend/static/index.html`

Added `data-reveal` and `data-reveal-delay` attributes to elements across all four inner views. The IntersectionObserver registered at boot fires automatically when a view's `hidden` attribute is removed on navigation.

| View | Elements marked |
|------|----------------|
| Historical Jesus | `article__head` header, `sources` aside |
| Parallel Stories | `article__head` header, 4 `compare__col` articles (delays 0–3), `commentary` section |
| Canon Formation | `article__head` header, 6 `tl` timeline articles (delays 0–5) |
| Excluded Texts | `article__head` header, 6 `lib` list items (delays 0–5) |

Also added `data-tab="flood/watchers/virgin-birth/dying-rising"` to the Parallel Stories toolbar buttons, wiring them for the tab animation.

### `execution/frontend/static/effects.js`

- **`initMarquee()`** — added `dataset.marqueeReady` guard to prevent content from doubling if `bootAll()` is called more than once.
- **`initParallelsTab()`** (new) — attaches a click listener to the Parallel Stories tab toolbar (guarded by `dataset.tabReady`). On tab click: fades columns out over 200ms, swaps visible `[data-compare]` content sets, then staggers columns back in at 60ms intervals. No-ops if the toolbar isn't in the DOM.
- **`reactivate()`** (new) — a safe-to-call-on-every-navigation subset of `bootAll()`. Runs only `initReveal()` (idempotent) and `initParallelsTab()` (guarded). Does NOT re-run particles, scramble, marquee, or other once-only inits.
- **`window.TF_Effects`** — extended from `{ boot }` to `{ boot, reactivate }`.

### `execution/frontend/static/router.js`

Added one line after `window.scrollTo()` in `activate()`:

```js
if (window.TF_Effects) window.TF_Effects.reactivate();
```

### `execution/frontend/static/styles-effects.css`

- **Delay levels 4 & 5** — added `transition-delay: .32s` and `.40s` selectors, extending the stagger range from 3 levels (240ms max) to 5 levels (400ms max), needed for 6-item stagger on Canon and Excluded Texts.
- **Aramaic table row stagger** — CSS keyframe `aramaic-row-in` (translateX fade-in from left) triggered by `[data-reveal].is-in .aramaic tbody tr`, with per-row delays from 280ms–680ms. Rows unpack sequentially after their parent section reveals.
- **`.compare__col`** — `will-change: opacity, transform` for GPU-composited tab transitions.
- **`.lib li` hover** — gold color transition on hover (`--gold` token).
- **Reduced-motion override** — `[data-reveal].is-in .aramaic tbody tr { animation: none }` added to the existing `prefers-reduced-motion` block.

---

## Motion Budget Per Page

| Page | Effect |
|------|--------|
| Historical Jesus | Header fade-up on arrival · Section prose reveals as user scrolls · Aramaic table rows stagger left-slide · Sources aside fade-up |
| Parallel Stories | Header + 4 columns stagger in (0–240ms) on arrival · Tab click crossfades columns out/in · Commentary fades up on scroll |
| Canon Formation | Header fade-up · 6 timeline cards cascade in (0–400ms) as user scrolls the timeline |
| Excluded Texts | Header fade-up · 6 list items stagger in (0–400ms) on arrival |

---

## Notes

- The Parallel Stories tab animation is fully wired but only the Flood comparison content exists in the HTML. When content for Watchers/Virgin Birth/Dying & Rising is authored, wrap each set in `<div data-compare="[key]">` and the tab animation will pick it up automatically.
- The Canon Formation page has no SVG path element (only the home teaser section does). Timeline animation is stagger-reveal only.
- All effects continue to respect `window.TF_EFFECTS === false` and `prefers-reduced-motion`.
