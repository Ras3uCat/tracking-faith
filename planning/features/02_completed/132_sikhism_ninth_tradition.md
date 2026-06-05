# Feature 132 — Sikhism: The 9th Tradition

**Status:** Backlog
**Type:** Content Update (Beliefs pillar expansion)
**Pillar:** Beliefs
**URL Slug:** `beliefs` (matrix update) + all four deep-dive views
**Relationship:** Expands the Beliefs Matrix (121) and all four deep-dive articles (122–125) to add Sikhism as a 9th tradition. Not a new page — a systematic update to five existing views. Also updates the nav Beliefs group to note Sikhism's inclusion.

---

## Problem Statement

The Beliefs pillar currently covers 8 traditions. Sikhism is a significant omission:

- **26 million adherents** — the 5th largest religion in the world
- **Distinct views on all five belief topics** that don't map neatly onto any existing row
- **Historically significant** — founded in the Punjab in the 15th century (Guru Nanak, 1469–1539), Sikhism emerged in a Hindu-Muslim context and consciously distinguished itself from both
- **Often misidentified** — Sikhs are regularly confused with Muslims or Hindus in Western contexts; a careful comparative treatment serves the site's mission directly

Sikhism is not a synthesis of Hinduism and Islam (a common misconception). It is a distinct monotheistic tradition with its own scripture (the Guru Granth Sahib), its own concept of God (Waheguru), its own path to liberation (mukti through Nam Simran), and its own eschatology.

---

## The Sikhism Positions (Matrix Content)

### God / The Divine
Waheguru — the Wonderful Lord. Strictly monotheistic. Formless (Nirankar), eternal, all-pervading, beyond gender. The Mul Mantar (the foundational statement of Sikh theology, Guru Granth Sahib 1): "Ik Onkar" — "There is One God." No incarnations, no partners, no intermediaries. Immanent in all creation (Sargun) and simultaneously transcendent beyond it (Nirgun). Closer to Islamic tawhid than to Hindu Brahman, but distinct from both — Waheguru is not impersonal (as in Advaita Hinduism) and not specifically relational through covenant (as in Judaism). He is Sat (truth), Nam (name), Karta Purakh (the doer), Nirbhau (without fear), Nirvair (without enmity).

### Afterlife
The soul (atma) is reborn through samsara based on karma — a shared framework with Hinduism. But the goal is **mukti** (liberation) — union with Waheguru, understood as the soul merging with the divine light, not as the dissolution of a separate self (as in Advaita) but as a loving union. The liberated soul dwells in Sach Khand (the realm of truth) — often described as being in God's presence rather than absorbed into an impersonal absolute. No formal hell in the permanent Christian sense — Narak (hell) is understood as a consequence state within samsara, not an eternal destination.

### Salvation / Liberation
**Nam Simran** — meditation on God's name. Liberation comes through remembering God's name continuously, living righteously (Sewa — selfless service), and receiving the grace of the Guru. **Guru's grace (nadar)** is essential — a person cannot achieve mukti by effort alone; God's grace must initiate and sustain the process. This is the closest Sikhism comes to the Christian concept of grace — it is genuinely necessary, not just supplementary. The Guru Granth Sahib functions as the living Guru after the 10th human Guru (Guru Gobind Singh) declared it the perpetual Guru.

### Sacred Texts
The **Guru Granth Sahib** — the eternal living Guru and the central scripture of Sikhism. Compiled by the 5th Guru (Arjan Dev Ji) in 1604 and finalized by the 10th Guru (Gobind Singh) in 1708. Unique among world scriptures: it includes writings by heterodox mystic poets and Sufi saints (Kabir — a syncretic poet claimed by neither Hinduism nor Islam; Sheikh Farid, a genuine Sufi Qadiri saint) alongside Sikh Gurus — demonstrating its universal reach. It is written in Gurmukhi script. It is treated with profound reverence: housed in the Darbar Sahib (Golden Temple) and in Gurdwaras worldwide, where it is read continuously (Akhand Path) and never placed on the floor.

### Jesus
Not a figure in Sikh theology or scripture. Sikhism emerged in a milieu aware of both Hinduism and Islam; Christianity was less present in 15th-century Punjab. Jesus is not referenced in the Guru Granth Sahib. Some Sikh scholars in the modern era have noted that Jesus's teachings on love, service, and humility resonate with Sikh values — comparative observations, not doctrine.

---

## Implementation Plan

This is a systematic update to five existing views, not a new page:

All five updates must ship together. Deploying the matrix update before the deep-dive sections will expose a Sikhism tab in the filter that leads to empty/missing content.

1. **`beliefs` (matrix)** — Add a 9th row for Sikhism to the `<tbody>` of the `.bm-table`. Insert after the Islam row (traditions ordered chronologically by founding: Hinduism → Judaism → Buddhism → Zoroastrianism → Christianity → Islam → Sikhism → Bahá'í → Taoism, or match whatever ordering the existing table uses — confirm before implementing). Update the TRADITIONS array in the tab-filter JS; add `'sikhism'` and `'Sikhism': 'Sikhism'` to `TRADITION_LABELS`.
2. **`beliefs-afterlife`** — Add a Sikhism section. Update comparison table to include Sikhism row.
3. **`beliefs-god`** — Add a Sikhism section. Note: confirm whether this view has a comparison table (in addition to the fault-lines synthesis) and update accordingly.
4. **`beliefs-salvation`** — Add a Sikhism section. Update comparison table and synthesis.
5. **`beliefs-jesus`** — Add a brief Sikhism note alongside the Hinduism/Buddhism/Taoism combined section.
6. **Nav accordion** — Update the Beliefs group entry to reflect Sikhism's inclusion (exact wording: see Open Questions below — resolve before implementing).

---

## Design Notes

- No new CSS required — existing `.bv-section`, `.trad-claim`, `.prose`, `.bv-table` patterns apply
- Matrix tab filter JS: add `'sikhism'` to the `TRADITIONS` array and `'Sikhism': 'Sikhism'` to `TRADITION_LABELS`
- The Sikhism sections should follow the same structure as existing tradition sections: `.trad-claim` pull-quote + `.prose` body
- No new JS dependencies

---

## Acceptance Criteria

- [ ] Sikhism row added to the Beliefs Matrix with all 5 cells populated
- [ ] Sikhism section added to all 4 deep-dive articles (afterlife, god, salvation, jesus)
- [ ] Matrix tab filter JS updated to include Sikhism
- [ ] Comparison tables in afterlife and salvation updated to include Sikhism row
- [ ] "Jesus" entry for Sikhism is honest: not referenced in scripture; comparative observations noted as individual, not doctrinal
- [ ] "Ik Onkar" and Mul Mantar explained in the God section
- [ ] Nam Simran and nadar (grace) explained in the Salvation section
- [ ] Guru Granth Sahib described in the Sacred Texts matrix cell
- [ ] Cross-links within the existing articles remain functional after updates
- [ ] `<meta description>` for the four deep-dive pages updated to mention Sikhism where relevant

---

## Open Questions

These must be resolved before moving this feature to `01_active/`.

- **Matrix intro table:** Should Sikhism be added to the traditions-overview section at the top of the Beliefs Matrix page as the 9th tradition? **Decision needed:** yes or no. If yes, confirm the section element/selector to update.
- **Nav accordion wording:** When Sikhism ships, should the Beliefs nav entry silently read "9 traditions" (clean, no noise) or call out the addition explicitly (e.g., "Now includes Sikhism")? **Recommendation:** update silently to "9 traditions" — the callout belongs in a changelog, not the nav.
- **Kabir callout:** The GGS's inclusion of Kabir and Farid is a compelling editorial note — it complicates the "Sikhism is separate from Islam" framing in a productive way. **Decision needed:** include as a prose aside in the Sacred Texts matrix cell, or save for a future expanded article?
