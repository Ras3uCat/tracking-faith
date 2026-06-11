# Feature: Search Bar

## Status
Backlog — search button exists in nav (`#search-btn`) but is disabled in `router.js` with "Search coming soon".

## Goal
Let visitors type a query and instantly find relevant content across all 20 view sections of the site.

## Scope
Static-site only (`execution/frontend/static/`). No backend required — all content is already in the DOM.

---

## Approach: Client-Side Full-Text Search

Index the text content of all `[data-view]` sections at page load using a lightweight JS search library (Fuse.js ~24 KB gzipped, no build step, CDN importable). Results link directly to the matching view.

### Data Flow
1. On `DOMContentLoaded`, iterate `document.querySelectorAll('.view[data-view]')` and build a search corpus:
   ```js
   { id, view, label, excerpt }  // one entry per section (or per <h2>/<h3> heading)
   ```
2. User opens search modal → types query (debounced 150ms) → Fuse.js returns ranked matches → render result list with match highlighting.
3. Clicking a result calls `router.activate(view)` (already exported) and closes the modal.

### Fuse.js Configuration
Always specify `keys` explicitly — without it Fuse searches `id`/`view` identifiers and pollutes results:
```js
const SEARCH_THRESHOLD = 0.35; // tight threshold for precise theological terms
const fuse = new Fuse(corpus, {
  keys: ['label', 'excerpt'],
  threshold: SEARCH_THRESHOLD,
  includeMatches: true, // needed for match highlighting
});
```
The default threshold (`0.6`) is too loose for this domain — "gnosis" would match "Genesis".

### Excerpt Rendering (XSS Safety)
Excerpts **must** be inserted via `textContent` or `createTextNode`, never `innerHTML`. Highlighted match ranges (from `includeMatches`) are applied by building DOM nodes programmatically, not by injecting HTML strings.

### Granularity Options
- **Section-level** (20 results max) — simple, fast. One result per `data-view`.
- **Heading-level** (~100+ results) — surface specific topics within long articles. Walk `h2`/`h3` elements, capture the next 200 chars as excerpt.

Recommended: heading-level. The sections are long; users searching "Nag Hammadi codices" should land inside the section, not just on it.

---

## UI

### Search Modal
- Triggered by `#search-btn` click (re-enable in router.js, remove disabled state).
- Full-width overlay with centered `<input>` — consistent with the site's editorial aesthetic.
- `Escape` or backdrop click to close; focus returns to `#search-btn` on close.
- Result count line above results: "3 results for 'gnosticism'".
- Results render as a scrollable list of cards: `[screen label] — excerpt` with matched terms wrapped in `<mark>`.
- No results state: "Nothing matched. Try a shorter term."

### Keyboard
- `/` hotkey opens search (developer convention); `Cmd+K` / `Ctrl+K` as secondary (user expectation from Notion/Linear/etc.).
- `ArrowUp`/`ArrowDown` navigate results, `Enter` selects.
- `Tab` cycles within the modal (focus trap — does not escape to page behind).

### Accessibility
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-label="Search"`.
- Input: `aria-controls` pointing at results list id; `aria-autocomplete="list"`.
- Results list: `role="listbox"`; each item `role="option"` with `aria-selected`.
- `aria-live="polite"` region announces result count after each query.

---

## Files to Create / Modify

| File | Change |
|------|--------|
| `static/search.js` | New — corpus builder, Fuse.js wrapper, modal controller, debounce, match highlighter |
| `static/index.html` | Add `<script src="search.js">` before `</body>`; add search modal HTML scaffold (with ARIA attributes) |
| `static/styles.css` | Add `.search-modal`, `.search-input`, `.search-results`, `.search-result-item`, `mark` highlight styles |
| `static/router.js` | Remove the `// search coming soon` disabled block (locate by comment anchor, not line numbers) |

---

## Dependencies
- **Fuse.js** — loaded from CDN, no build step needed. Use the **full** build (not `fuse.basic`) to support `includeMatches` for highlighting.
  ```html
  <script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
  ```

---

## Acceptance Criteria
- [ ] Typing 3+ characters returns results within 100ms
- [ ] Results show screen label + excerpt (first 120 chars of matching heading context)
- [ ] Matched terms are visually highlighted (`<mark>`) in the excerpt
- [ ] Result count line ("N results for '…'") updates after each query
- [ ] Clicking a result navigates to the correct view and closes modal
- [ ] `Escape` closes modal; focus returns to `#search-btn`
- [ ] `Tab` key does not escape the modal while it is open (focus trap)
- [ ] `/` key and `Cmd+K`/`Ctrl+K` open the modal
- [ ] `↑` / `↓` navigate results; `Enter` selects the focused result
- [ ] Works on mobile (full-screen modal, large tap targets)
- [ ] No results state displays clearly
- [ ] Screen reader announces result count on update (`aria-live`)
- [ ] Search button is no longer disabled / greyed out

---

## Out of Scope
- Server-side search (Algolia, Supabase full-text)
- Searching Bible Gateway links or external resources
- Search history / analytics
