# 113 — Tier 1: Launch Blockers

## Context
Five issues that prevent the site from functioning correctly in production. All are either missing credentials that block backend features or a form submission that silently swallows user input.

## Security Note
`ANTHROPIC_API_KEY`, `RESEND_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are **edge-function-only secrets**.
- Set via `supabase secrets set KEY=value` — NOT as dart-defines in `client.json`.
- `client.json` is compiled into the Flutter web JS bundle via `--dart-define-from-file` (`prepare.sh:24`). Any key there is publicly extractable.
- Remove all three from `client.json` and `client.json.example`. Keep only client-safe values (e.g., `SITE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`).

## Dependencies (suggested order)
1. `SITE_URL` — auth redirects and OG canonicals depend on it; set first.
2. `RESEND_KEY` / `FROM_EMAIL` — required to verify the newsletter form fix sends email.
3. `ANTHROPIC_API_KEY` — can be set any time; unblocks chat independently.
4. `SUPABASE_SERVICE_ROLE_KEY` — unblocks digest/reminder/push edge functions.
5. Newsletter form wire-up — can proceed once RESEND is in place.

## Tasks

- [ ] **SITE_URL**: Set production domain in `client.json` once hosting is chosen. Also update the Supabase project dashboard under **Auth > URL Configuration > Site URL** and **Redirect URLs**. Needed for auth redirects and OG canonical links.
  - **Done when:** Auth post-login redirect lands on the correct route; OG canonical tag renders the production URL.

- [ ] **RESEND_KEY + FROM_EMAIL** (edge function secret): Run `supabase secrets set RESEND_KEY=... FROM_EMAIL=...`. Do not add to `client.json`. Unblocks `send-contact` and `send-monthly-digest` edge functions.
  - **Done when:** Contact form submission triggers a received email at the destination address.

- [ ] **ANTHROPIC_API_KEY** (edge function secret): Run `supabase secrets set ANTHROPIC_API_KEY=...`. Do not add to `client.json`. Required for the `chat` edge function. Only relevant when `CHATBOT_ENABLED=true`.
  - **Done when:** Chat widget returns a response in production.

- [ ] **SUPABASE_SERVICE_ROLE_KEY** (edge function secret): Run `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...`. Do not add to `client.json` — the service role key bypasses all RLS and would be publicly extractable if compiled into the bundle.
  - **Done when:** Digest edge function completes a run without 401/403.

- [x] **client.json cleanup**: Remove `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_KEY`, and `ANTHROPIC_API_KEY` fields from `client.json` and `client.json.example`. These fields should never have been dart-defines.

- [x] **Newsletter form (`static/index.html` ~line 823)**: Removed `onsubmit="return false"`. Wired submit handler to `_sb.from('newsletter_subscribers').insert({ email })`. Inline feedback: success, already-subscribed (23505), generic error. Button disabled during in-flight request.
  - Known gap (deferred): double opt-in / confirmation email required under GDPR/CAN-SPAM. When RESEND_KEY is set, add `status: 'pending'` insert + trigger `send-contact` edge function for confirmation.

## Blocked — Needs Your Action

The four remaining tasks require credentials or hosting decisions that only you can provide:

| Task | What's needed |
|------|---------------|
| **SITE_URL** | Choose production domain → update `client.json` + Supabase dashboard (Auth > URL Configuration > Site URL & Redirect URLs) |
| **RESEND_KEY + FROM_EMAIL** | Resend account key → `supabase secrets set RESEND_KEY=... FROM_EMAIL=...` |
| **ANTHROPIC_API_KEY** | Anthropic key → `supabase secrets set ANTHROPIC_API_KEY=...` |
| **SUPABASE_SERVICE_ROLE_KEY** | Supabase project settings → `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...` |

Once any of these are set, come back to this file and check off the task.

## Files
- `execution/frontend/app/client.json`
- `execution/frontend/app/client.json.example`
- `execution/frontend/static/index.html` (newsletter form, approx line 820–830)
