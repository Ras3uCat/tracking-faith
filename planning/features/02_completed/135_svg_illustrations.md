# Feature 135 — SVG Illustrations: Visual Identity for Content Gaps

**Status:** Backlog
**Type:** Visual / UI Enhancement
**Effort:** Medium (4 distinct scopes, fully inline SVG — no external assets required)
**Relationship:** Independent. Can ship in any order; no dependency on other active features.

---

## Problem Statement

The site has strong photographic coverage for archaeological content (12 artifact photos) but relies entirely on text for four high-visibility areas where real photographs either don't exist or aren't appropriate. These gaps degrade visual hierarchy, reduce scannability, and leave structural elements (the five pillar cards, tradition labels in the beliefs matrix) looking incomplete.

**Where photos can't substitute:**
- Abstract concepts (pillars of inquiry, traditions as categories) have no photographable subject
- Comparative columns in parallel stories need visual markers, not photos of cuneiform tablets
- A language distribution map for 1st-century Palestine requires a diagram, not a photo

---

## SVG Architecture

Use a `<symbol>/<use>` sprite pattern throughout. Define every icon once in a `<defs>` block near the top of `<body>`:

```html
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-jesus" viewBox="0 0 24 24">…</symbol>
  <symbol id="icon-bible" viewBox="0 0 24 24">…</symbol>
  …
</svg>
```

Reference at each call site with `<use href="#icon-jesus">`. This keeps the HTML readable, eliminates duplication (tradition icons may be reused across beliefs matrix and future filter UIs), and makes icon updates a single-point change. Total SVG markup target: ~100–150 lines of path data, down from 400–600 for full inline.

---

## Four Scopes

---

### Scope 1 — Directory Pillar Card Icons

**Location:** `index.html` — the five `.dir__card` elements in `section.directory`

**Gap:** Five entry-point cards (The Jesus, The Bible, Beliefs, Mythology, Evidence) have no visual element — just pillar name, description text, and article links. These are the primary navigation surface for new visitors.

**Proposed treatment:** One small inline SVG icon per card, rendered at ~40×40px, placed above the `.dir__pillar` label. Icons use `currentColor` so they inherit the card's text color and work in both light and dark contexts.

| Pillar | Icon concept |
|---|---|
| The Jesus | Lamp / torch (inquiry and illumination — neutral scholarly register) |
| The Bible | Scroll with two rollers |
| Beliefs | Eight-spoked wheel (dharma wheel — neutral cross-tradition symbol) |
| Mythology | Stylized wave (flood archetype) |
| Evidence | Chisel striking stone / archaeological trowel |

> **Note:** The Jesus icon must not use a cross or any single-tradition sacred symbol. The lamp/torch frames the pillar as an inquiry into history, not devotion — consistent with the site's scholarly voice.

**Implementation:** Add `<svg class="dir__icon" aria-hidden="true"><use href="#icon-jesus"></use></svg>` (etc.) inside each `.dir__card` before `.dir__pillar`. Add `.dir__icon` CSS: `width: 40px; height: 40px; margin-bottom: var(--space-xs); color: var(--gold);`.

---

### Scope 2 — Parallel Stories Tradition Flags

**Location:** `index.html` — `.compare__flag` elements with `data-flag` attributes on Flood comparison columns

**Current state:** Only the Flood tab in `data-view="parallels"` has compare columns with `data-flag` attributes. Four values exist: `data-flag="sumer"`, `"hebrew"`, `"greek"`, `"vedic"`. The Watchers/Nephilim, Virgin Birth, and Dying & Rising chip buttons in that section link to separate article views (`data-view="nephilim"`, `data-view="dying-rising-gods"`) — they do not have compare-column layouts yet. Flag icon implementation targets existing flags only.

**Proposed treatment:** A small SVG emblem specific to each cultural tradition, rendered inline before the text label inside `.compare__flag`. Keep them abstract/geometric — not iconographic appropriations of sacred symbols.

**Existing `data-flag` values (implement now):**

| Flag value | Emblem concept |
|---|---|
| `sumer` | Cuneiform wedge mark (abstract chevron cluster) |
| `hebrew` | Simple menorah silhouette (7-branched, minimal) |
| `greek` | Wave meander border fragment |
| `vedic` | Simple lotus outline |

**Proposed future flag values (define in `FLAG_ICONS` map, no HTML target yet):**

| Flag value | Emblem concept |
|---|---|
| `christian` | Chi-Rho or simple cross |
| `norse` | Triquetra knot |
| `egyptian` | Ankh outline |
| `zoroastrian` | Flame symbol |
| `akkadian` | Alias for `sumer` (same emblem) |

**Implementation:** Inject SVG into `.compare__flag` elements via a `FLAG_ICONS` JS object keyed by flag value — not a switch statement, so future flags require only a new key. Pattern:

```js
var FLAG_ICONS = { sumer: '<svg …>', hebrew: '<svg …>', … };
document.querySelectorAll('.compare__flag[data-flag]').forEach(function(el) {
  var icon = FLAG_ICONS[el.dataset.flag];
  if (icon) el.insertAdjacentHTML('afterbegin', icon);
});
```

When Watchers/Nephilim or Dying & Rising views are later refactored into compare-column format, add their `data-flag` attributes and the icons will resolve automatically.

---

### Scope 3 — Beliefs Matrix Tradition Column Headers

**Location:** `index.html` — dynamically rendered `#bm-table` via JS. Tradition column headers are plain text strings.

**Gap:** The beliefs matrix spans 9 traditions across 5 topics — it's a dense table. Column headers are text only. With 9 columns, traditions become hard to track while reading. Icons would anchor each tradition visually without adding column width.

**Traditions (9 total — `TRADITIONS` array, `index.html:3532`):** Protestant Christianity · Catholic Christianity · Eastern Orthodox · Islam · Judaism · Hinduism · Buddhism · Sikhism · Taoism

**Proposed treatment:** A 24×24px SVG icon per tradition, rendered above the tradition name in the `<th>` cell. Same `currentColor` approach so it adapts to table header styling.

| Tradition key | Icon concept |
|---|---|
| `protestant` | Open book (Bible) |
| `catholic` | Papal cross (triple-barred) |
| `orthodox` | Byzantine cross |
| `islam` | Crescent moon |
| `judaism` | Star of David |
| `hinduism` | Simple Om glyph outline |
| `buddhism` | Eight-spoked dharma wheel |
| `sikhism` | Khanda (double-edged sword + chakkar) |
| `taoism` | Yin-yang circle |

**Implementation:** Add a `TRADITION_ICONS` map (tradition key → `<use href="#icon-{key}">` SVG string) in the beliefs matrix JS block. When the `<th>` is generated, prepend `<span class="bm-th-icon" aria-hidden="true">${TRADITION_ICONS[key]}</span>` before the text label. Add `.bm-th-icon { display: block; width: 24px; height: 24px; margin: 0 auto var(--space-2xs); }` to styles.

---

### Scope 4 — Historical Jesus Language Map

**Location:** `index.html` — Section §1 "The languages of first-century Galilee"

**Gap:** The section describes four language zones in 1st-century Palestine (Aramaic across Galilee/Judea, Hebrew in scholarly/synagogue contexts, Greek along Decapolis cities, Latin from the occupying army). This is currently a bullet list. A geographic diagram would make the spatial argument immediate — you can see why a Galilean carpenter and a Roman governor needed interpreters.

**Proposed treatment:** An inline SVG diagram (not a real map — a schematic) showing:
- A simplified outline of the region (Jordan River, Sea of Galilee, Dead Sea as recognizable anchors)
- Four color/pattern zones with language labels
- Key place names: Galilee, Judea, Decapolis, Jerusalem
- A small legend

Rendered at full prose column width (~100%), height ~280px. Uses the site's existing palette (`var(--ink)`, `var(--gold)`, `var(--paper)`). No external image file — entirely inline `<svg>` markup inserted after the bullet list in §1 and before §2.

**Label treatment at narrow viewports:** At ≥768px, label language zones directly on the SVG. At <768px, use abbreviated zone markers (A / H / G / L) plus a visible legend below the map — implemented via a CSS media query on `.lang-map .zone-label` or a `<switch>` element. Labels must not overlap at 320px minimum.

**Accessibility:** The map carries informational content and must be accessible:

```html
<svg class="lang-map" role="img" aria-labelledby="lang-map-title">
  <title id="lang-map-title">Approximate language distribution, 1st century CE</title>
  …
</svg>
```

**Implementation note:** Inline SVG cannot be "disabled" by the browser — the fallback concern is accessibility readers, addressed above.

---

## Files to Modify

| File | Change |
|---|---|
| `execution/frontend/static/index.html` | Add `<defs>` sprite block; add icon `<use>` refs to 5 `.dir__card` elements; add language map after §1 bullet list in Historical Jesus article; add `FLAG_ICONS` JS injection for Parallels flags |
| `execution/frontend/static/styles.css` | Add `.dir__icon`, `.bm-th-icon`, `.lang-map` CSS rules; add `.lang-map` responsive label rules |
| `execution/frontend/static/index.html` (beliefs JS block) | Add `TRADITION_ICONS` map; update `<th>` generation to include icon span |

Total new markup: ~100–150 lines of SVG path data (sprite pattern) + ~30 lines of JS + ~20 lines of CSS.

---

## Sequencing Recommendation

Build in this order (each is independent but this maximizes visible impact per session):

1. **Scope 1** — Directory icons. Highest-visibility, home page, simplest implementation.
2. **Scope 2** — Parallels flags (Flood tab only). Data attribute hook already exists; low JS lift.
3. **Scope 3** — Beliefs matrix icons. Requires touching the JS generation code.
4. **Scope 4** — Language map. Most complex SVG; isolated to one article section.

---

## Acceptance Criteria

- [ ] Each of the 5 directory pillar cards displays a distinct SVG icon above its pillar label
- [ ] The Jesus pillar icon uses a lamp/torch or equivalent neutral symbol — no cross or single-tradition sacred glyph
- [ ] Icons render in `var(--gold)` and scale correctly at all viewport widths
- [ ] Every `.compare__flag` element with a recognized `data-flag` value displays an inline SVG emblem
- [ ] Flag icons display correctly for all 4 existing Flood tab flags (`sumer`, `hebrew`, `greek`, `vedic`)
- [ ] `FLAG_ICONS` JS map is keyed by string (not a switch) so future flags require only a new entry
- [ ] Beliefs matrix `<th>` cells display a 24px tradition icon above the tradition name
- [ ] All 9 traditions in the beliefs matrix have a distinct icon (including Sikhism)
- [ ] Language map SVG is inserted after the §1 bullet list in the Historical Jesus article
- [ ] Map is readable at mobile widths (≥320px); labels don't overlap — abbreviated labels + legend used at <768px
- [ ] Language map SVG has `role="img"`, `aria-labelledby`, and an inner `<title>` element
- [ ] All decorative icons (Scopes 1–3) have `aria-hidden="true"` on their `<svg>` element
- [ ] All SVGs use `currentColor` or site CSS variables — no hardcoded hex values in SVG markup
- [ ] All icons defined once via `<symbol>` in a `<defs>` sprite block; referenced with `<use href="…">`
- [ ] No external image files added (all SVG is inline)
- [ ] No new JS dependencies introduced

---

## Design Constraints

- All SVGs must be abstract/geometric — avoid iconographic appropriation of actively sacred symbols where possible (e.g., prefer a stylized form over a direct religious glyph)
- The Beliefs matrix icons are the most sensitive area: use neutral, scholarly-register symbols rather than devotional imagery
- The Jesus pillar icon must not use a cross — it frames an inquiry pillar, not a devotional one
- Icon weight should match the site's existing typographic weight — thin strokes (`stroke-width: 1.5`) rather than filled blobs
- The language map is a schematic, not a historically precise cartographic projection — label it "Approximate language distribution, 1st century CE" to set expectations
