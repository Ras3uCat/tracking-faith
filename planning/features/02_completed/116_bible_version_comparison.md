# Feature 116 — Bible Version Comparison

**Status:** Active — Implementation complete, pending QA
**Type:** Content Page
**Pillar:** The Bible
**URL Slug:** `bible-versions`
**Relationship:** Companion to Canon Formation — forms the first two articles in The Bible pillar. Cross-link both pages. Next in the pillar: The Apocrypha (117), Nag Hammadi (118), Lost Books (119).

---

## Problem Statement

Readers encounter confusing differences when switching between Bible versions — passages present in their KJV that are footnoted or absent in NIV, or books their Catholic Bible includes that their Protestant Bible doesn't. There is no single resource on the site that explains *what* differs, *who* decided, and *why*. This feature fills that gap.

**This is distinct from Canon Formation.** Canon Formation explains how books were selected in the 1st–5th centuries AD. This page explains how those books are translated and transmitted differently across modern versions — a different question, same audience.

---

## Three-Layer Comparison Model

### Layer 1: Canon-Level (Book Inclusion by Tradition)

| Tradition | Book Count | Extra Books vs. Protestant 66 |
|---|---|---|
| Protestant (KJV, NIV, ESV, NASB, NLT) | 66 | — baseline — |
| Catholic (NABRE, Jerusalem Bible, Douay-Rheims) | 73 | Tobit, Judith, 1 Maccabees, 2 Maccabees, Wisdom, Sirach, Baruch |
| Eastern Orthodox | 76–78 | + 1 Esdras, Prayer of Manasseh, Psalm 151, 3 Maccabees |
| Ethiopian Orthodox | 81–84 (contested) | + 1 Enoch, Jubilees, 4 Baruch, and others |

**Why:** Catholic and Orthodox traditions use the Septuagint (Greek OT, ~250 BC) as their OT source, which included the Deuterocanonical books. Protestant Reformers (Luther, 1517) removed them on two grounds: (1) textual — these books survived only in Greek, not the original Hebrew; (2) theological — specific doctrines Protestants rejected (purgatory, prayers for the dead) were supported by these books, particularly 2 Maccabees 12:41–45. The Council of Trent (1546) formally enshrined the Deuterocanonicals as canonical in the Catholic Church, cementing the split. The Ethiopian Orthodox canon was never subjected to Reformation-era pruning and preserves the oldest and broadest canon; the exact book count varies by source (81–84) and is not uniformly settled.

---

### Layer 2: Passage-Level (Textual Variants — New Testament)

Passages present in KJV that NIV, ESV, and modern critical editions bracket, footnote, or omit:

| Passage | Name | KJV | NKJV | NIV / ESV / NASB |
|---|---|---|---|---|
| Mark 16:9–20 | Long Ending of Mark | Included | Included (footnoted) | Bracketed with footnote |
| John 7:53–8:11 | Pericope Adulterae (woman caught in adultery) | Included | Included (footnoted) | Bracketed with footnote |
| 1 John 5:7–8 | Comma Johanneum (Trinitarian formula) | Included | Included (bracketed) | Omitted entirely |
| Acts 8:37 | Philip's baptism dialogue | Included | Included (footnoted) | Omitted (footnoted in some) |
| Luke 22:43–44 | Angel strengthening Jesus in Gethsemane | Included | Included (footnoted) | Bracketed |
| Romans 8:1 | Extended doxology clause | Longer | Longer (footnoted) | Shorter |
| Matthew 6:13 | Lord's Prayer doxology | Included | Included (footnoted) | Omitted |

**Note on Comma Johanneum (1 John 5:7–8):** This is the most extreme case. The passage appears in zero Greek manuscripts before the 14th century AD — it originated in Latin manuscripts and was inserted back into late Greek copies. Erasmus initially excluded it from his Greek NT (1516); external pressure caused him to add it in the 1522 edition, which became the basis for the Textus Receptus and ultimately the KJV. The NKJV includes it but explicitly footnotes its absence from early manuscripts.

**Why these differ — manuscript traditions:**

Three distinct Greek NT manuscript families produce different texts:

1. **Textus Receptus** (TR) — a compiled Greek text by Erasmus (1516), drawing on Byzantine manuscripts dating to ~12th century AD. Basis for KJV, NKJV. Includes all disputed passages.

2. **Critical Text** (Nestle-Aland/UBS) — compiled from the oldest surviving manuscripts, including:
   - **Codex Sinaiticus** (~350 AD, discovered 1844 at Mt. Sinai by Tischendorf) — lacks Long Ending of Mark, Pericope Adulterae, Comma Johanneum
   - **Codex Vaticanus** (~325 AD) — same absences
   - **Ancient papyri** (P45, P46, P66, P75 — 2nd–3rd century AD) — oldest surviving NT fragments; support Critical Text readings
   Basis for NIV, ESV, NASB, NLT, NRSV.

3. **Majority Text** (MT) — based on the statistical majority of surviving Greek manuscripts (~5,000+). Similar to Textus Receptus in most places but not identical. Referenced in NKJV margin notes. Some conservative scholars argue that majority = most preserved = most reliable.

**The textual criticism consensus:** absent from the oldest manuscripts = likely a later scribal addition, not original. The TR manuscripts are more numerous but later; the Critical Text manuscripts are fewer but centuries older.

---

### Layer 2b: Passage-Level (Textual Variants — Old Testament)

OT textual differences are less visible to readers but theologically significant:

| Passage | Name | KJV / ESV | NRSV | Why It Matters |
|---|---|---|---|---|
| Isaiah 7:14 | The Messianic Sign | "virgin" (almah) | "young woman" | Whether the verse predicts a virgin birth turns on translation of the Hebrew word *almah* (young woman of marriageable age). KJV/ESV follow the Septuagint's Greek rendering (*parthenos*, virgin); NRSV returns to the Hebrew |
| Psalm 22:16 | The Piercing | "they pierced my hands and feet" | "like a lion, my hands and feet" | Turns on one letter difference in the Hebrew (*kaaru* vs. *ka'ari*). A Messianic reading requires the "pierced" rendering; some Hebrew manuscripts read "like a lion" |

**Dead Sea Scrolls context:** The DSS (discovered 1947) are the oldest surviving OT manuscripts, predating the Masoretic Text copies used by translators by ~1,000 years. Crucially, they largely *validated* the MT — the Great Isaiah Scroll (DSS) matches the MT almost word-for-word, showing extraordinary manuscript fidelity across a millennium. Where DSS and MT diverge, modern translations note the variation.

---

### Layer 3: Translation Philosophy

| Philosophy | Method | Representatives | Tradeoff |
|---|---|---|---|
| Formal equivalence | Word-for-word | KJV, NKJV, NASB, ESV | Preserves source language structure; can feel archaic or stilted in English |
| Dynamic equivalence | Thought-for-thought | NIV, NLT, CEV | Reads more naturally; translator makes interpretive word choices |
| Paraphrase | Author's interpretation | The Message | Maximum readability; furthest from source text; one person's rendering |

Translation philosophy affects every verse — not just disputed ones. ESV and NIV share the same manuscript base (Critical Text) but read very differently because of this philosophical difference. NASB and NKJV share the same formal-equivalence goal but derive from different manuscript families.

---

## Who Made These Decisions

| Version | Year | Body | Manuscript Basis | Key Decisions |
|---|---|---|---|---|
| KJV | 1611 | 54 scholars, commissioned by King James I | Textus Receptus | Included all disputed passages; no modern textual-critical methodology |
| Douay-Rheims | 1609 | English College at Douay | Latin Vulgate + Septuagint | Catholic; includes Deuterocanonicals |
| ASV | 1901 | American revision committee | Critical text | First English Bible to adopt critical text; became basis for RSV and NASB |
| RSV | 1952 | National Council of Churches | Critical text | Revision of ASV; first widely adopted Protestant version using critical text; bracketed disputed passages; sparked significant controversy |
| NASB | 1971 (rev. 1995, 2020) | Lockman Foundation | Critical text | Most formally equivalent modern version; preferred in academic study |
| NIV | 1978 (rev. 2011) | Committee on Bible Translation (CBT), 100+ scholars | Nestle-Aland/UBS | Footnoted or bracketed disputed passages; 2011 revision introduced gender-inclusive language |
| NKJV | 1982 | Thomas Nelson, 130 scholars | Textus Receptus (Majority Text in notes) | Modernized KJV English while preserving TR manuscript basis; includes disputed passages with footnotes acknowledging their manuscript absence |
| NLT | 1996 | Tyndale House, 90 scholars | Critical text | Dynamic equivalence; accessibility-first |
| ESV | 2001 | Crossway, 100+ scholars | Critical text | Revision of RSV; formal equivalence; conservative evangelical positioning |
| NRSV | 1989 | National Council of Churches | Critical text | Revision of RSV; gender-inclusive throughout; standard for academic, mainline Protestant, and some Catholic use |
| NABRE | 1970 (rev. 2011) | United States Conference of Catholic Bishops | Septuagint + critical text | Catholic; includes Deuterocanonicals; detailed scholarly apparatus |
| The Message | 2002 | Eugene Peterson (single author) | Critical text | Paraphrase, not translation; one scholar's interpretive rendering; NavPress |

---

## Page Architecture

### Sections (in order)

1. **Introduction** — Why versions differ: three root causes (manuscript tradition, translation philosophy, canonical tradition). 2 paragraphs max. Link to the Glossary for unfamiliar terms.

2. **Canon Comparison** — Book-level grid. Columns: Book Name | Protestant | Catholic | E. Orthodox | Ethiopian Orthodox. Rows grouped by OT / NT / Deuterocanonical. Tab filter by tradition on mobile; full grid on desktop.

3. **Disputed Passages — NT** — One card per passage: passage reference + name, three-column comparison (KJV | NKJV | NIV/ESV), manuscript evidence summary, plain-language explanation of why modern versions flagged it. Link each passage reference to BibleGateway parallel view for full text.

4. **Disputed Passages — OT** — Smaller section; two passages (Isaiah 7:14, Psalm 22:16). Same card format. Note DSS context.

5. **Translation Philosophy Spectrum** — Visual spectrum bar: formal equivalence ↔ paraphrase, with version markers. Each version node expands a brief description on click/tap.

6. **Who Decided? Timeline** — Key events in order:
   - 250 BC — Septuagint compiled (Greek OT; includes Deuterocanonicals)
   - 397 AD — Council of Carthage affirms Western canon
   - 1516 — Erasmus compiles first printed Greek NT (later becomes Textus Receptus)
   - 1517 — Protestant Reformation; Luther removes Deuterocanonicals
   - 1546 — Council of Trent; Catholic Church formally enshrines Deuterocanonicals
   - 1611 — KJV published
   - 1844 — Codex Sinaiticus discovered at Mt. Sinai by Tischendorf
   - 1881 — Westcott & Hort publish first modern critical Greek NT (foundation for all modern critical translations)
   - 1901 — ASV published (first English Bible on critical text)
   - 1947 — Dead Sea Scrolls discovered; validate Masoretic Text accuracy
   - 1952 — RSV published
   - 1978 — NIV published
   - 1982 — NKJV published
   - 1989 — NRSV published
   - 2001 — ESV published

7. **Glossary** — Inline or collapsible at bottom. Terms to define: Textus Receptus, Majority Text, Critical Text, Masoretic Text, Septuagint, Deuterocanonical, Apocrypha, formal equivalence, dynamic equivalence, pericope, manuscript, codex, papyrus, textual criticism.

8. **Cross-link block** — "Want to understand how the canon was formed in the first place?" → Canon Formation page

---

## Design Notes

- Reuse the existing `data-reveal` / `data-reveal-delay` animation system from `effects.js` — no new JS infrastructure needed
- Timeline cards: same cascade stagger pattern as Canon Formation (delay levels 0–5)
- Comparison tables: tab-filtered on mobile (select tradition/version), horizontal scroll fallback
- Disputed passage cards: three-column layout (KJV | NKJV | NIV/ESV) on desktop; stacked + version tabs on mobile
- BibleGateway links: open in new tab; format as `biblegateway.com/passage/?search=Mark+16%3A9-20&version=KJV,NIV,ESV` for pre-loaded parallel view
- Scripture quotations: include brief attribution line per card ("KJV — public domain. NIV © Biblica. ESV © Crossway.")
- No new JS dependencies

---

## Copyright & Attribution

- **KJV** — public domain; quote freely
- **NKJV** — © Thomas Nelson; short quotations fair use; credit required
- **NIV** — © Biblica; up to 500 verses fair use with credit; no more than 25% of any one book
- **ESV** — © Crossway; up to 1,000 verses fair use with credit
- **NASB** — © Lockman Foundation; credit required for any quotation
- **NRSV** — © National Council of Churches; credit required
- **NLT** — © Tyndale House; credit required
- **The Message** — © NavPress; credit required

For disputed passage cards, quote only the specific disputed verse(s) — well within fair use for all versions. Attribution line on each card.

---

## Acceptance Criteria

- [ ] All 4 canon traditions documented with accurate book counts (note uncertainty on Ethiopian Orthodox)
- [ ] NT disputed passages table includes KJV, NKJV, and NIV/ESV columns
- [ ] OT textual variants section covers Isaiah 7:14 and Psalm 22:16
- [ ] All 12 versions documented in the "Who Decided" table
- [ ] Three manuscript traditions explained: Textus Receptus, Critical Text, Majority Text
- [ ] Timeline includes all 14 events listed above
- [ ] Glossary covers all 13 listed terms
- [ ] Translation philosophy spectrum includes at minimum: KJV, NKJV, NASB, ESV, NIV, NLT, The Message
- [ ] Each disputed passage card links to BibleGateway parallel view
- [ ] Scripture quotations carry per-card attribution lines
- [ ] Cross-link to Canon Formation page present and functional
- [ ] All sections animate in with `data-reveal` on scroll
- [ ] Tables are mobile-responsive (tabs or horizontal scroll)
- [ ] Page added to `router.js` at slug `/bible-versions`
- [ ] Page linked from Canon Formation page and/or site navigation

---

## Open Questions

- Where does this page live in navigation — under a "Canon" section, or a top-level "Bible Versions" entry?
