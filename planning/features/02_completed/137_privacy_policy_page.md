# 137 — Privacy Policy Page

## Problem
The newsletter section includes a "privacy policy" link (added in Feature 115) that points to `/privacy`, but no corresponding route or view exists. Clicking it loads the 404 view.

This is a compliance gap: if the site collects emails (newsletter), it must link to a real privacy policy accessible to users.

## Goal
A minimal but real privacy policy page accessible at `data-view="privacy"`. Content covers the data the site actually collects (email via newsletter), how it's used, and how to unsubscribe. No legal boilerplate is needed beyond what's accurate for this site.

## Implementation

### 1. Fix existing privacy link (`execution/frontend/static/index.html:3816`)

The router is hash-based. The existing link must use `#privacy`, not `/privacy`:
```html
<!-- Before -->
<a href="/privacy" class="foot__link">privacy policy</a>
<!-- After -->
<a href="#privacy" data-nav="privacy" class="foot__link">privacy policy</a>
```

### 2. Add View (`execution/frontend/static/index.html`)

Insert before the `not-found` section. Follow the standard article pattern (`.article` > `.article__head` > `.article__body` > `.prose`):

```html
<section class="view" data-view="privacy" data-screen-label="Privacy Policy" hidden>
  <article class="article">
    <nav class="crumbs"><a href="#home" data-nav="home">Home</a> <span>/</span> <em>Privacy Policy</em></nav>
    <header class="article__head" data-reveal>
      <span class="kicker">Legal · Site Policy</span>
      <h1 class="article__title">Privacy Policy</h1>
      <div class="article__byline">
        <span><em>Last updated</em> · <span class="mono">05 JUN 2026</span></span>
      </div>
    </header>
    <div class="article__body">
      <section class="prose" data-reveal>
        <h2>What we collect</h2>
        <p>...</p>
        <!-- remaining sections -->
      </section>
    </div>
  </article>
</section>
```

**Notes:**
- No `router.js` changes needed — the router auto-discovers `data-view` sections.
- Contact email: `hello@trackingfaith.com` (confirmed in HTML footer; `client.json` has `FROM_EMAIL: "FILL_IN"`).
- The crumbs nav satisfies back-navigation (AC #5) since `history.replaceState` makes browser back unreliable.

## Acceptance Criteria
- [x] Clicking the privacy policy link in the newsletter section navigates to the privacy view
- [x] Direct URL `#privacy` loads the view without 404
- [x] Content accurately reflects: what's collected (email only), how it's used (newsletter), unsubscribe method, no cookies/tracking
- [x] View is styled consistently with other article views (`.article` / `.prose` pattern)
- [x] Back navigation returns to home via breadcrumb (`history.replaceState` makes browser back unreliable)

## Files
- `execution/frontend/static/index.html` — fix existing href + add privacy section
