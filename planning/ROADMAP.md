# Tracking Faith — Site Roadmap
**Updated:** 2026-05-31

## Vision
A rigorously researched, editorially honest reference site covering biblical scholarship, comparative religion, mythology, and archaeological evidence. Content is descriptive, not prescriptive — mapping what traditions claim and what evidence shows, without adjudicating between them.

## Site Architecture — Five Pillars

| Pillar | Angle | Live Articles | Backlog |
|---|---|---|---|
| **The Jesus** | The person | Historical Jesus, Expanded Historical Jesus | — |
| **The Bible** | The text | Canon Formation, Bible Versions, Apocrypha, Nag Hammadi, Lost Books | — |
| **Beliefs** | The doctrines | Beliefs Matrix, Afterlife, Nature of God, Salvation, Jesus Across Traditions, Sikhism | — |
| **Mythology** | The archetypes | Parallel Stories, Nephilim & the Watchers, Dying-Rising Gods, Flood Myths | — |
| **Evidence** | The physical record | Archaeological Evidence, Herculaneum / Vesuvius Challenge | — |

Feature specs live in `planning/features/`. Active work in `01_active/`, queue in `00_backlog/`, shipped in `02_completed/`.

---

## Currently Active

| # | Feature | Status |
|---|---|---|
| 113 | Tier 1: Launch Blockers | In progress — 2/6 criteria complete. **Must resolve before any new work.** |
| 115 | Tier 3: Polish & Accessibility | In progress — 7/10 criteria complete. Blocked items: WCAG audit (needs browser), "Propose a parallel" (awaiting client decision), double opt-in (blocked on RESEND_KEY). |

---

## Phase 1 — Clear the Active Board ✓

1. **113** — Launch blockers. 4 criteria open (credentials, broken form). Production gate.
2. **116 QA** — ✅ Passed. Moved to `02_completed/` 2026-05-31.
3. **115** — Polish pass. 7/10 complete; 3 items blocked/pending client.

---

## Phase 2 — Bible Pillar Depth ✅ Complete
*Shipped 2026-05-31.*

| Order | # | Feature | Slug | Status |
|---|---|---|---|---|
| 4 | 117 | The Apocrypha | `apocrypha` | ✅ Shipped |
| 5 | 118 | Nag Hammadi & the Gnostic Library | `nag-hammadi` | ✅ Shipped — retired `excluded` stub |
| 6 | 119 | Lost Books: The Bible's Missing Bibliography | `lost-books` | ✅ Shipped |

---

## Phase 3 — Evidence Pillar Foundation ✅ Complete
*Shipped 2026-05-31.*

| Order | # | Feature | Slug | Status |
|---|---|---|---|---|
| 7 | 120 | Archaeological Evidence | `archaeology` | ✅ Shipped |

---

## Phase 4 — Nav Restructure ✅ Complete
*Shipped 2026-05-31.*

| Order | # | Feature | Status |
|---|---|---|---|
| 8 | 126 | Five Pillar Nav Restructure | ✅ Shipped — accordion nav, home directory, footer grouping, mobile hamburger, router pillar-tracking |

---

## Phase 5 — Beliefs Pillar ✅ Complete
*Shipped 2026-05-31. All 5 articles live; all 40 matrix cells populated; nav Beliefs group fully linked.*

| Order | # | Feature | Slug | Status |
|---|---|---|---|---|
| 9 | 121 | The Beliefs Matrix | `beliefs` | ✅ Shipped — 8×5 grid, tab filter, 40 cells |
| 10 | 122 | Afterlife Across Traditions | `beliefs-afterlife` | ✅ Shipped |
| 11 | 125 | Jesus Across Traditions | `beliefs-jesus` | ✅ Shipped |
| 12 | 123 | The Nature of God Across Traditions | `beliefs-god` | ✅ Shipped |
| 13 | 124 | Salvation &amp; Liberation Across Traditions | `beliefs-salvation` | ✅ Shipped |

---

## Phase 6 — Expanded Content ✅ Complete
*Shipped 2026-05-31. All 5 new content views live; nav updated; router mapped.*

| Order | # | Feature | Pillar | Slug | Status |
|---|---|---|---|---|---|
| 14 | 127 | Expanded Historical Jesus | The Jesus | `jesus-expanded` | ✅ Shipped — trial, language, 7 independent sources |
| 15 | 128 | Nephilim & the Watchers | Mythology | `nephilim` | ✅ Shipped — 1 Enoch, Azazel in Leviticus, NT thread |
| 16 | 129 | Dying-Rising Gods | Mythology | `dying-rising-gods` | ✅ Shipped — Osiris, Dionysus, Adonis, Tammuz, Baal; Mithras & Attis debunked |
| 17 | 130 | Flood Myths | Mythology | `flood-myths` | ✅ Shipped — 7-culture table, 3 explanations, geology |
| 18 | 131 | Herculaneum / Vesuvius Challenge | Evidence | `herculaneum` | ✅ Shipped — AI X-ray imaging, villa, 2,000-year-old scrolls |
| 19 | 132 | Sikhism — 9th Tradition | Beliefs | `beliefs` (matrix + deep-dives) | ✅ Shipped — 1 row + 4 sections; Waheguru, nam simran, nadar |
| 20 | 133 | Zoroastrianism Honorable Mentions | Site-wide | N/A (inline callouts) | ✅ Shipped — 5 boxes in beliefs-afterlife, beliefs-god, beliefs-salvation, beliefs-jesus, archaeology |

---

## Guardrails

- No new JS dependencies (each feature's design notes specify reusing existing patterns)
- All new views use `data-view="slug"` — router is DOM-driven, no registration step
- All cross-links use flat slugs (`beliefs-afterlife`, not `/beliefs/afterlife`)
- `data-reveal` / `data-reveal-delay` scroll animation on all new sections
- Existing home page content is never removed — only added to
- `excluded` view stays live until Feature 118 ships, then gets a redirect notice
