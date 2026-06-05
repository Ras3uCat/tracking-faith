# 136 — Quick Bug Fixes: Newsletter Feedback Styles + Footer Dead Links

## Problem
Two small bugs make the site feel broken to users:

1. **Newsletter feedback is silent.** The submit handler (index.html ~line 3954) sets CSS classes `newsletter-msg--ok`, `newsletter-msg--info`, and `newsletter-msg--err` on the feedback element, but none of these classes have rules in `styles.css`. Success, duplicate, and error responses all look identical — no color change, no visual confirmation.

2. **Footer links go nowhere.** "Submit a parallel" and "Contact the editors" (~line 3804) navigate to `data-view="contact"` which doesn't exist in `router.js`. Clicking them loads the 404 view.

## Goal
Both bugs resolved in a single small pass:
- Newsletter feedback messages render with distinct visual treatment (success = gold/green, error = red, info = muted)
- Footer links navigate to sensible existing targets

## Implementation

### 1. Newsletter Feedback CSS (`execution/frontend/static/styles.css`)

Add three rules below the existing `.newsletter-form` block:

```css
#newsletter-msg.newsletter-msg--ok  { color: var(--gold); }
#newsletter-msg.newsletter-msg--err { color: #e05c5c; }
#newsletter-msg.newsletter-msg--info { color: var(--text-secondary); }
```

### 2. Footer Dead Links (`execution/frontend/static/index.html` ~line 3804)

- **"Submit a parallel"** → change `data-view="contact"` to `data-view="mythology"` (most semantically relevant)
- **"Contact the editors"** → change to `href="mailto:hello@trackingfaith.com"` (or whatever contact email is in `client.json`; use `target="_blank"` + `rel="noopener"`)

Check `execution/frontend/app/client.json` for the contact email key before hardcoding.

## Acceptance Criteria
- [ ] Newsletter subscribe with a fresh email → gold feedback text appears ("You're subscribed!")
- [ ] Newsletter subscribe with an existing email → muted gray text appears
- [ ] Newsletter subscribe with no email / network error → red text appears
- [ ] Footer "Submit a parallel" → navigates to Mythology page, no 404
- [ ] Footer "Contact the editors" → opens mail client with correct address

## Files
- `execution/frontend/static/styles.css`
- `execution/frontend/static/index.html`
- `execution/frontend/app/client.json` (read-only, to confirm contact email)
