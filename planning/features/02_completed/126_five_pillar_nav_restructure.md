# Feature 126 — Five Pillar Site Restructure

**Status:** Backlog
**Type:** Site Architecture / Navigation Redesign
**URL Slug:** N/A (structural change, not a content page)
**Relationship:** Prerequisite for all Beliefs pillar articles (121–125). Unblocked by Features 117–120 (Bible pillar content). Depends on Feature 113 (launch blockers) being resolved first.

---

## Problem Statement

The site launched with 6 content pages organized in a flat nav. With the backlog now containing 13 additional pages across five distinct content modes, the flat nav is unscalable. A visitor arriving at the site today cannot tell that it covers comparative religion (Beliefs), mythology (Parallel Stories), or physical archaeology — those categories are invisible in the current navigation.

The 5-pillar architecture that has emerged from the content planning gives the site a clear editorial identity: each pillar has a distinct angle, a distinct question it answers, and a distinct audience need. The nav and home page need to reflect this structure.

**Constraint:** This feature adds structure without removing anything currently live. Existing views, routes, and home page content are preserved. The restructure is additive — new nav groupings, new home page section, new routes as content is published.

---

## The Five Pillars

Each pillar is defined by its **angle** — the specific question it asks — and its **content mode** — the type of evidence and analysis it uses. These distinctions matter: a reader who wants to know "what do Muslims believe about the afterlife?" belongs in Beliefs; a reader who wants to know "is there archaeological evidence for King David?" belongs in Evidence; a reader who wants to know "why do so many cultures have a flood myth?" belongs in Mythology.

---

### Pillar 1: The Jesus

**The angle:** The person. Who was Jesus of Nazareth — historically, comparatively, and across traditions that claim or contextualize him?

**The question it answers:** Who was this man, and how is he understood across the traditions that engage with him?

**Content mode:** Historical biography, independent-source analysis, textual criticism, cross-tradition Christology.

**What makes it distinct:**
- The Bible pillar is about the *document*. The Jesus pillar is about the *person* the documents describe — separate question, separate evidence base.
- The Beliefs pillar treats Jesus as one topic (Feature 125) within a broad comparative framework. The Jesus pillar goes deeper: the language he spoke, the trial that killed him, the independent records that confirm he existed.
- Evidence overlaps here (Pilate Stone, Caiaphas Ossuary) but Evidence covers all of scripture broadly. The Jesus pillar is laser-focused on one figure.

**Published content:**
- Historical Jesus → `jesus`

**Planned content:**
- Jesus Across Traditions → `beliefs-jesus` (Feature 125) *(shared with Beliefs pillar — cross-linked from both)*

---

### Pillar 2: The Bible

**The angle:** The text. How was the Bible assembled? What was included, excluded, lost, or suppressed — and why? How has it changed across time, language, and tradition?

**The question it answers:** Where did this book come from, and what didn't make it in?

**Content mode:** Textual criticism, manuscript history, canon debates, translation comparison, scribal tradition.

**What makes it distinct:**
- The Jesus pillar uses the text as a source. The Bible pillar treats the text as the *subject*.
- Evidence works in physical objects. The Bible pillar works in manuscripts, codices, and scribal traditions — the text's own transmission history.
- Mythology reaches outward into cross-cultural parallels. The Bible pillar stays focused on the Judeo-Christian textual tradition and its internal debates (which books belong, which translations are faithful, what was cut).
- Beliefs draws doctrines *from* texts. The Bible pillar asks how those texts came to be, who decided what belonged, and what was left behind.

**Published content:**
- Canon Formation → `canon`
- Bible Version Comparison → `bible-versions` (Feature 116, QA pending)
- Excluded Texts → `excluded` *(stub — will be superseded by Feature 118)*

**Planned content:**
- The Apocrypha → `apocrypha` (Feature 117)
- Nag Hammadi & the Gnostic Library → `nag-hammadi` (Feature 118) *(replaces `excluded` stub)*
- Lost Books → `lost-books` (Feature 119)

---

### Pillar 3: Beliefs

**The angle:** The doctrines. What do the world's major living religions actually claim about the fundamental questions?

**The question it answers:** What do the major world religions believe — about God, the afterlife, salvation, sacred texts, and Jesus — and how do those beliefs differ?

**Content mode:** Comparative religion, structured cross-tradition doctrinal analysis, descriptive not prescriptive.

**Editorial stance:** We map belief systems as they understand themselves. We do not rank traditions or adjudicate between them. Where traditions have internal diversity, we use the mainstream or historically dominant position with a note that variation exists.

**Traditions covered (v1):** Protestant Christianity · Catholic Christianity · Eastern Orthodox · Islam · Judaism · Hinduism · Buddhism · Taoism

**What makes it distinct:**
- The Bible pillar is Judeo-Christian-centric. Beliefs covers Islam, Hinduism, Buddhism, and Taoism on equal footing — traditions that don't derive from the Bible at all.
- Mythology covers largely historical traditions (Greek, Norse, Egyptian, Mesopotamian). Beliefs covers traditions with hundreds of millions of *living* adherents.
- The Jesus pillar goes deep on one figure. The Beliefs pillar uses Jesus as one of five topics in a structured cross-tradition matrix.
- Evidence asks what physical objects confirm. Beliefs asks what doctrines claim.

**Published content:** None yet.

**Planned content:**
- The Beliefs Matrix (pillar hub) → `beliefs` (Feature 121)
- Afterlife Across Traditions → `beliefs-afterlife` (Feature 122)
- The Nature of God Across Traditions → `beliefs-god` (Feature 123)
- Salvation & Liberation Across Traditions → `beliefs-salvation` (Feature 124)
- Jesus Across Traditions → `beliefs-jesus` (Feature 125)

---

### Pillar 4: Mythology

**The angle:** The archetypes. Flood myths, dying-rising gods, virgin births, sacred trees, trickster figures — the recurring narrative patterns that appear across cultures separated by centuries and oceans.

**The question it answers:** Why do the same stories keep appearing in cultures that never met, and what does that tell us about the biblical narratives that share the same patterns?

**Content mode:** Comparative mythology, Jungian archetypes, ancient Near Eastern texts, cross-cultural narrative analysis.

**What makes it distinct:**
- The Bible pillar treats biblical narrative as the subject. Mythology *contextualizes* biblical narrative inside a much broader cross-cultural pattern — Genesis's flood next to Gilgamesh's; the virgin birth next to Horus and Dionysus.
- Beliefs covers living, practiced religious communities. Mythology primarily covers traditions that are largely historical: Greek, Norse, Egyptian, Mesopotamian, pre-Columbian.
- The Jesus pillar asks about a historical person. Mythology asks about recurring *narrative archetypes* — not whether any one figure existed, but why the same story keeps appearing independently.
- Evidence asks what physical objects confirm. Mythology asks what stories reveal about shared ancient memory and the human psyche.

**Published content:**
- Parallel Stories → `parallels`

**Planned content (not yet spec'd):**
- Nephilim & the Watchers (deeper treatment of 1 Enoch / Book of Giants)
- Dying-Rising Gods (expanded standalone deep-dive)
- Flood Myths (standalone article, expanding beyond the Parallels section)
- Trickster Figures / Sacred Trees / other archetype deep-dives

---

### Pillar 5: Evidence

**The angle:** The physical record. Artifacts, inscriptions, coins, bones, tunnels — things you can touch, carbon-date, and hold in a museum.

**The question it answers:** What does the archaeological record independently confirm — or fail to confirm — about the people and events described in scripture?

**Content mode:** Archaeology, epigraphy, numismatics, physical artifact analysis. Honest about both confirmation and absence of evidence.

**What makes it distinct:**
- The Bible pillar works in manuscripts. Evidence works in objects pulled from the ground independently of any scribal tradition.
- The Jesus pillar draws from textual sources (Josephus, Tacitus, the Gospels). Evidence asks what exists *outside* any text — the Pilate Stone confirms Pilate whether or not the Gospels mention him.
- Beliefs works with doctrinal claims. Evidence explicitly distinguishes between what archaeology *can* confirm and what it cannot (the Exodus, the global Flood, the Resurrection).
- Mythology examines narrative. Evidence examines artifact.

**Published content:** None yet.

**Planned content:**
- Archaeological Evidence → `archaeology` (Feature 120)
- Vesuvius Challenge / Herculaneum Scrolls (could expand Feature 120 or become standalone)

---

## Full Content Map

```
HOME
│
├── THE JESUS
│   ├── Historical Jesus                [live]          jesus
│   └── Jesus Across Traditions         [backlog 125]   beliefs-jesus
│
├── THE BIBLE
│   ├── Canon Formation                 [live]          canon
│   ├── Bible Version Comparison        [active 116]    bible-versions
│   ├── Excluded Texts (stub)           [live → retire] excluded
│   ├── The Apocrypha                   [backlog 117]   apocrypha
│   ├── Nag Hammadi & Gnostic Library   [backlog 118]   nag-hammadi
│   └── Lost Books                      [backlog 119]   lost-books
│
├── BELIEFS
│   ├── The Beliefs Matrix (hub)        [backlog 121]   beliefs
│   ├── Afterlife Across Traditions     [backlog 122]   beliefs-afterlife
│   ├── The Nature of God               [backlog 123]   beliefs-god
│   ├── Salvation & Liberation          [backlog 124]   beliefs-salvation
│   └── Jesus Across Traditions         [backlog 125]   beliefs-jesus
│
├── MYTHOLOGY
│   ├── Parallel Stories                [live]          parallels
│   └── [future specs TBD]
│
└── EVIDENCE
    ├── Archaeological Evidence         [backlog 120]   archaeology
    └── [future specs TBD]
```

---

## Route Naming Convention

The current router is DOM-driven — it reads `data-view` attributes, no explicit route registry. Sub-path parsing (e.g., `/beliefs/afterlife`) would require a router rewrite. **The simplest approach: keep all routes flat with a pillar prefix.**

All new routes follow the pattern `{pillar}-{article}` or simply `{article}` for pillar hubs:

| View | Route | Notes |
|---|---|---|
| Historical Jesus | `jesus` | Unchanged |
| Jesus Across Traditions | `beliefs-jesus` | Shared between Jesus + Beliefs pillars |
| Canon Formation | `canon` | Unchanged |
| Bible Version Comparison | `bible-versions` | Unchanged |
| Excluded Texts | `excluded` | Keep until Feature 118 ships; then redirect |
| The Apocrypha | `apocrypha` | |
| Nag Hammadi | `nag-hammadi` | |
| Lost Books | `lost-books` | |
| Beliefs Matrix | `beliefs` | Pillar hub |
| Afterlife | `beliefs-afterlife` | |
| Nature of God | `beliefs-god` | |
| Salvation | `beliefs-salvation` | |
| Parallel Stories | `parallels` | Unchanged |
| Archaeological Evidence | `archaeology` | |

**No router code changes required** — each new view is added via `data-view` attribute; routing is automatic.

---

## Nav Design

### Option A — CSS-only hover dropdown
Each pillar label is a link; hover reveals a dropdown list of sub-articles. No JS.

**Problem:** Hover menus are broken on touch devices. Not accessible without JS.

### Option B — Click-toggle accordion (Recommended)
Each pillar is a `<div class="nav__group">` containing a `<button class="nav__group-label">` and a `<ul class="nav__group-items">`. Clicking the label toggles an `aria-expanded` attribute; CSS shows/hides the list based on that attribute.

**JS cost:** ~15 lines of vanilla JS. No dependency.
**Benefit:** Works on touch; screenreader-accessible; progressive-enhanceable.

### Mobile behavior
Nav collapses to a hamburger at `<768px`. Each pillar group expands/collapses independently within the mobile menu. Same JS handles both desktop and mobile toggle states.

### Implementation sketch

```html
<nav class="nav">
  <div class="nav__group" data-pillar="jesus">
    <button class="nav__group-label" aria-expanded="false">The Jesus</button>
    <ul class="nav__group-items">
      <li><a data-nav="jesus">Historical Jesus</a></li>
      <li><a data-nav="beliefs-jesus">Across Traditions</a></li>
    </ul>
  </div>
  <!-- repeat for each pillar -->
</nav>
```

```css
.nav__group-items { display: none; }
.nav__group[aria-expanded="true"] .nav__group-items { display: block; }
/* or use max-height transition for animation */
```

```js
document.querySelectorAll('.nav__group-label').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});
```

The active pillar group auto-expands when the matching view is active (router sets a `data-active-pillar` attribute on `<body>`, CSS handles the rest).

---

## Home Page Directory Section

A new `#directory` section is **appended** to the existing home view — nothing in the current home page is removed.

**Layout:** 5 cards in a CSS grid (2–3 columns desktop, 1 column mobile). Each card:
- Pillar name (large display type)
- One-sentence description of the angle
- List of published articles (linked) + coming-soon articles (muted, no link)
- "Explore →" link to the pillar hub or first article

This section is the primary navigation surface for new visitors who don't know where to start.

---

## Footer Update

Replace the flat "Modules" list in the footer with the same 5-pillar grouping. Each group is a `<dl>` with the pillar name as `<dt>` and article links as `<dd>`. No new CSS classes required — reuse existing footer layout.

---

## `excluded` View Migration

The live `excluded` stub (6 placeholder entries) stays live until Feature 118 (`nag-hammadi`) ships. At that point:
1. The new `nag-hammadi` view replaces it as the primary content.
2. The `excluded` view gets a redirect notice: "This content has moved → Nag Hammadi & the Gnostic Library."
3. The old nav item is removed and replaced with `nag-hammadi` under The Bible pillar.

---

## Page Architecture (this feature's deliverables)

1. **Nav redesign** — Replace flat nav with 5-pillar grouped accordion nav. Existing nav items remain; they are reorganized into pillar groups. ~15 lines new JS, new `.nav__group` CSS classes.

2. **Home page directory section** — New `#directory` section appended to home view. 5-pillar card grid. Published articles linked; backlog articles shown as coming soon.

3. **Footer update** — Flat module list restructured into 5 grouped columns.

4. **Route naming convention documented** — No router code changes; convention governs how all future `data-view` attributes are named.

5. **`excluded` migration plan** — Noted but not executed until Feature 118 ships.

---

## Design Notes

- Nav groups: extend existing `.nav` CSS. New classes: `.nav__group`, `.nav__group-label`, `.nav__group-items`. Use existing `var(--gold)` for active pillar label.
- Directory cards: adapt existing `.card` / `.cards` pattern. Pillar name in `var(--display)` font. Coming-soon items use `var(--ink-soft)` and no underline.
- No new JS dependencies beyond the 15-line toggle script.
- Animate directory section in with `data-reveal` on scroll.
- The active view's pillar group should be auto-expanded in the nav (requires `router.js` to set a data attribute on `<body>` when switching views).

---

## Acceptance Criteria

- [ ] Nav displays 5 pillar groups (The Jesus, The Bible, Beliefs, Mythology, Evidence)
- [ ] Each published article is reachable via the new grouped nav
- [ ] Active pillar group auto-expands when a view in that pillar is active
- [ ] Mobile nav collapses to hamburger; pillar groups expand/collapse independently
- [ ] Home page directory section appended (existing home content unchanged)
- [ ] All 5 pillars represented in directory with correct published/coming-soon states
- [ ] Footer reflects 5-pillar grouping
- [ ] All existing routes (`jesus`, `parallels`, `canon`, `bible-versions`, `excluded`) still work
- [ ] `excluded` view remains accessible until Feature 118 ships
- [ ] Route naming convention (`beliefs-afterlife`, `beliefs-god`, etc.) documented and applied to all backlog feature specs
- [ ] No new JS dependencies beyond the accordion toggle script
- [ ] Directory section animates in with `data-reveal` on scroll

---

## Dependencies

- **Blocks:** Features 121–125 (Beliefs pillar articles) — they need the nav structure to route correctly
- **Blocked by:** Feature 113 (launch blockers) should be resolved first; this is a significant UI change
- **Independent of:** Features 117–120 (Bible pillar content) — those can ship before or after

---

## Open Questions

- Should the Beliefs pillar hub (`/beliefs`, Feature 121) be implemented before or after the nav restructure? It makes more sense to launch both together.
- Should pillar labels in the nav be links themselves (pointing to the hub page) or non-link toggles? If the Beliefs hub doesn't exist yet, a link to `/beliefs` would 404.
- Should "coming soon" articles in the directory section include estimated dates, or just a muted label?
- The Mythology pillar has only one live article (`parallels`). Should it appear in the nav immediately (with "more coming soon") or only once a second article ships?
- Feature 125 (Jesus Across Traditions) belongs to both The Jesus and Beliefs pillars. Does it appear in both nav groups, or just Beliefs (with a cross-link from The Jesus section)?
