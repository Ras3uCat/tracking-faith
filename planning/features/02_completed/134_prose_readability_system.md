# 134 — Prose Readability System: Bullets, Lists & Structure

## Problem
Article and pillar pages (`execution/frontend/static/index.html`) are visually dense — long paragraphs with no visual rhythm. Information is preserved but hard to scan. No standardized approach to when to use bullets, numbered lists, callouts, or subheadings — each view was built ad-hoc.

## Goal
Break up wall-of-text prose with a **consistent, applied-across-all-views content taxonomy**. Every article uses the same rules for when to bullet, when to callout, when to subheading. Result: visual rhythm, scannability, information preserved.

**Explicit constraint:** Home page (`data-view="home"`) is off-limits. No changes there.

## Content Taxonomy

| Element | When | Tag / Class |
|---|---|---|
| **Bullet list** | 3–8 parallel, unordered items (attributes, examples, features, causes, types) | `<ul>` inside `.prose` |
| **Numbered list** | Ordered sequences, ranked findings, step-by-step | `<ol>` inside `.prose` |
| **Key Points box** | Opening 3–5 takeaways summarizing a long section | `.prose__key-points` (new class) |
| **Callout** | Key scholarly consensus, important context, surprising fact | `.callout` (reuse existing) |
| **Contextual note** | Caveats, minority views, "some scholars argue" | `.zoro-callout` (reuse existing) |
| **Pull quote** | One powerful sentence — section opener or memorable close | `.pull` (reuse existing) |
| **Margin note** | Short clarification of specific term within prose | `.prose__note` (reuse existing) |
| **H3 subheading** | Major sub-topic within a `§` section (2+ paragraphs of depth) | `<h3>` inside `.prose` |
| **H4 subheading** | Granular topic within H3, or variant case (optional, sparse) | `<h4>` inside `.prose` |

## Implementation

### 1. CSS Additions (`execution/frontend/static/styles.css`)

Add after line 935 (after `.pull` rule):

```css
/* Prose lists */
.prose ul,
.prose ol {
  font-size: 19px;
  line-height: 1.65;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.prose ul {
  list-style: none;
  padding-left: 1.75rem;
}

.prose ul li::before {
  content: '▪';
  color: var(--gold);
  font-size: 14px;
  margin-right: 0.75rem;
  margin-left: -1rem;
  /* Pseudo-element bullet invisible to screen readers; semantic <li> provides list context */
}

.prose ol {
  list-style: decimal;
  padding-left: 2rem;
}

.prose li {
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

/* Prose subheadings */
.prose h3 {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-family: 'DM Sans', system-ui, sans-serif;
}

.prose h4 {
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 0.025em;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-family: 'DM Sans', system-ui, sans-serif;
}

/* Key Points summary box */
.prose__key-points {
  border-left: 3px solid var(--gold);
  padding: 1.5rem;
  margin: 2rem 0;
  background-color: rgba(88, 227, 239, 0.04);
}

.prose__key-points__title {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0;
  margin-bottom: 1rem;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-weight: 600;
  color: var(--gold);
}

.prose__key-points ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.prose__key-points li {
  margin-bottom: 0.75rem;
  font-size: 16px;
}

/* Mobile responsiveness */
@media (max-width: 680px) {
  .prose ul,
  .prose ol {
    font-size: 17px;
    padding-left: 1.25rem;
  }
  
  .prose ul {
    padding-left: 1.5rem;
  }
  
  .prose ul li::before {
    font-size: 12px;
    margin-left: -0.85rem;
  }
  
  .prose h3 {
    font-size: 20px;
    margin-top: 1.5rem;
  }
  
  .prose h4 {
    font-size: 16px;
    margin-top: 1.25rem;
  }
  
  .prose__key-points {
    padding: 1.25rem;
    margin: 1.5rem 0;
  }
  
  .prose__key-points__title {
    font-size: 13px;
    margin-bottom: 0.75rem;
  }
}
```

### 2. HTML Application Pass (`execution/frontend/static/index.html`)

Target: 18 article/pillar views (all `data-view` except `home`, `excluded`, `not-found`).

For each view, follow this decision tree:
1. **Scan for inline lists** — paragraphs listing 3+ comma-separated items or sentences starting "First…, Second…, Third…". Convert to `<ul>` or `<ol>`.
2. **Identify section summary openings** — paragraphs introducing a long section (5+ following items, claims, or sub-sections). Wrap as `.prose__key-points` with `<div class="prose__key-points__title">Key Points</div>` + `<ul>`.
3. **Promote buried callouts** — caveats or important context currently embedded in `<p>` tags should move to `.callout` or `.zoro-callout` blocks. (See `styles.css` lines ~910–934 for existing callout definitions.)
4. **Add H3/H4 subheadings** — break up 2+ consecutive paragraph sequences with a subheading if they share a topic.

**Decision tree for inline → list conversion:**
- Does the paragraph contain 3+ items separated by commas or "and"? → `<ul>`
- Are the items ordered/ranked or step-by-step? → `<ol>`
- Does the paragraph summarize 5+ following sub-points? → `.prose__key-points` with bullet list

Focus on high-value views first (most text-heavy):
- `jesus` (Historical Jesus)
- `apocrypha` (Apocrypha overview)
- `beliefs-afterlife`, `beliefs-god`, `beliefs-salvation`, `beliefs-jesus` (Beliefs matrix)
- `jesus-expanded` (Historical Jesus Deep Dive)
- `dying-rising-gods`, `flood-myths` (Mythic parallels)
- `archaeology` (Archaeological Evidence)

Example transformation:

**Before:**
```html
<section class="prose" data-reveal>
  <p>The term "apocrypha" refers to several categories of texts. The Catholic Deuterocanon includes
     Tobit, Judith, Wisdom, Sirach, Baruch, and 1–2 Maccabees. The Eastern Orthodox canon expands this.
     The Ethiopian Orthodox include even more. These texts were written between the 3rd century BCE and 1st century CE.</p>
</section>
```

**After:**
```html
<section class="prose" data-reveal>
  <div class="prose__key-points">
    <div class="prose__key-points__title">Key Points</div>
    <ul>
      <li>Catholic canon adds Deuterocanon: Tobit, Judith, Wisdom, Sirach, Baruch, 1–2 Maccabees</li>
      <li>Eastern Orthodox include additional texts beyond Catholic canon</li>
      <li>Ethiopian Orthodox canon is the most expansive of the three traditions</li>
      <li>These texts date 3rd century BCE to 1st century CE</li>
    </ul>
  </div>
</section>
```

### 3. Mobile Responsiveness
- Verify `.prose ul` / `.prose ol` indentation is legible at 375px width (mobile breakpoint is ~680px; lists collapse gracefully)
- `.prose__key-points` background and border remain visible on small screens
- Callout/zoro-callout widths scale correctly with viewport

## Acceptance Criteria
- [ ] All `.prose ul` and `.prose ol` have consistent styling and spacing
- [ ] At least 8 of the 18 article views contain at least one list (bullet or numbered)
- [ ] At least 5 views contain at least one `.prose__key-points` box
- [ ] No section contains 4+ consecutive paragraphs without a visual break (list, subheading, callout, or key-points box)
- [ ] Home page (`data-view="home"`) is unchanged
- [ ] Mobile layout (375px–680px) is readable and accessible for lists, callouts, and key-points
- [ ] Taxonomy is documented in the feature file so future content additions follow the same rules

## Notes
- Content is already inline HTML (no dynamic injection). The pass is a one-time refactor of `index.html`, with CSS support added to `styles.css`.
- Reuse existing `.callout` / `.zoro-callout` / `.pull` / `.prose__note` classes where possible (defined in `styles.css` lines ~910–934). Only add new CSS for lists, subheadings, and key-points box.
- After all 18 views are updated, perform a full-page visual pass to verify consistency: ensure gold bullets match existing callout accents, spacing flows naturally, and typography hierarchy is clear.
- Updated key-points title class is `.prose__key-points__title` (not `h3`) to avoid cascade conflicts.
- `execution/frontend/static/router.js` and other non-HTML/-CSS files do not change.
