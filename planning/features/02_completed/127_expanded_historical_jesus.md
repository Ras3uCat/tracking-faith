# Feature 127 — Expanded Historical Jesus

**Status:** Backlog
**Type:** Content Page (expansion / companion)
**Pillar:** The Jesus
**URL Slug:** `jesus-expanded`
**Dependencies:** Feature 120 (Archaeological Evidence) must be live before the Pilate Stone cross-link in Section 1 is activated.
**Relationship:** Companion to the existing Historical Jesus view (`jesus`). That page covers the core case for Jesus's historicity — Josephus, Tacitus, the criterion of embarrassment. This page goes deeper on three topics that deserve their own treatment: the trial, the language he spoke, and the full independent-source landscape. Cross-links to `jesus`, `canon`, and `beliefs-jesus`.

---

## Problem Statement

The existing Historical Jesus page establishes that Jesus was a real historical person and covers the core non-biblical attestation. Three questions come up repeatedly from curious readers that the current page doesn't fully answer:

1. **The trial** — Who actually had jurisdiction? Was it the Sanhedrin, Pilate, or both? What were the charges, and do they make sense historically?
2. **The language** — Jesus spoke Aramaic. The Gospels were written in Greek. What gets lost, changed, or sharpened in translation? (The existing page touches this briefly but doesn't go deep.)
3. **The independent sources** — Josephus, Tacitus, Pliny the Younger, Mara bar Serapion, the Talmudic references — a full treatment of what each source says, what it confirms, and what its limitations are.

---

## Content Outline

### Section 1 — The Trial

- **Jurisdiction problem:** The Sanhedrin had religious authority; Pilate had the power of capital punishment (ius gladii). Both had to be involved for an execution to be legal. This dual-jurisdiction structure is historically plausible and is confirmed by Josephus's description of how Roman Judea functioned.
- **The charges:** The Sanhedrin charge was blasphemy (claiming divine authority — "Son of God" in a messianic sense). The Roman charge was sedition — claiming to be "King of the Jews," a political title that implied insurrection. The shift between charges as Jesus moved from the Sanhedrin to Pilate is historically coherent.
- **Pilate's role:** The Pilate Stone (Feature 120) confirms his title as Prefect. Josephus and Philo both describe Pilate as cruel and politically calculating. The Gospel accounts of his hesitation are consistent with a governor managing a volatile province during Passover (when Jerusalem's population could swell to 10× normal).
- **Punishment as evidence:** The method of execution matters. The Jewish penalty for blasphemy was stoning; crucifixion was a specifically Roman punishment for sedition. The fact that Jesus was crucified — not stoned — is itself evidence that the Roman political charge (claiming kingship) is what ultimately carried the sentence, not the Sanhedrin's religious charge.
- **The date problem:** The Synoptics place the Last Supper on Passover night; John places the crucifixion on Passover eve. Scholars remain divided. Both chronologies have internal logic. The disagreement is real and should not be flattened.

### Section 2 — The Language

- **Aramaic as mother tongue:** Aramaic was the vernacular of Galilee in the 1st century. Jesus's Aramaic phrases in the Gospels (Talitha koum, Ephphatha, Eloi Eloi lema sabachthani, Abba, Maranatha) are preserved in transliteration — evidence that the Greek authors were working from Aramaic tradition. (Cross-link to Historical Jesus page's existing Aramaic section.)
- **Hebrew as liturgical language:** Luke 4:16–20 describes Jesus reading the Isaiah scroll in a synagogue — almost certainly in Hebrew, the language of Torah reading. 1st-century Galilee was likely trilingual: Aramaic (vernacular), Hebrew (liturgical and scholarly), and Greek (commercial). The "bilingual?" question understates the complexity.
- **Greek as possibility:** The cities of the Decapolis and coastal trade routes were Greek-speaking. Jesus operated near them. Some scholars (notably James Dunn) argue he may have been bilingual. This is a minority scholarly view but not fringe.
- **Translation effects:** Key theological terms shift when moved from Aramaic to Greek. "Son of Man" (bar nasha in Aramaic) was an everyday idiom meaning "a person / I / someone like me." In Greek, rendered as "ho huios tou anthropou," it becomes a title with eschatological weight. The Gospel of Thomas, in Coptic, often preserves sayings in forms that appear less theologically developed — possibly closer to the Aramaic originals.
- **What gets lost:** Puns, wordplay, and poetic rhythm that are inherent to Aramaic do not survive in Greek. The "You are Peter (Petros) and on this rock (petra)" wordplay only works in Greek — it would not have been said in Aramaic. Scholars use this to argue about authenticity and source.

### Section 3 — The Independent Sources

Full treatment of each:

| Source | Date | What it says | Limitations |
|---|---|---|---|
| Josephus — Antiquities 18.3.3 (Testimonium Flavianum) | c. 93–94 AD | Describes Jesus as "a wise man," his crucifixion under Pilate, and his followers' continued existence | Almost certainly interpolated by later Christian copyists — the original probably existed but was more neutral |
| Josephus — Antiquities 20.9.1 | c. 93–94 AD | References "James the brother of Jesus who was called Christ" — widely considered authentic | Confirms a "Jesus called Christ" existed; doesn't describe Jesus directly |
| Tacitus — Annals XV.44 | c. 116 AD | "Christus, from whom the name had its origin, suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus" | Roman historian writing 80 years after the fact; likely drawing on Roman archives or Christian sources |
| Pliny the Younger — Letters X.96 | c. 112 AD | Describes Christians in Bithynia singing hymns "to Christ as to a god" | Confirms the movement's existence and practice; says nothing about Jesus the person |
| Mara bar Serapion | Late 1st–3rd century AD (date disputed) | Refers to the Jews killing "their wise king" and their subsequent exile | Not explicitly named; identification with Jesus is probable but not certain |
| Talmudic references | Various (Baraita passages, likely 2nd century) | Refers to "Yeshu" — traditions about a sorcerer executed on Passover eve | Hostile tradition that confirms execution; details differ from Gospel accounts |
| Lucian of Samosata — *The Death of Peregrinus* | c. 165 AD | Refers to "the man who was crucified in Palestine" as the founder of the Christian movement | Late and indirect; Lucian is satirizing Christians, not reporting history — but the crucifixion in Palestine is treated as a known fact |

---

## Design Notes

- Companion page: add a cross-link from the existing `jesus` view to `jesus-expanded`
- Register `jesus-expanded` in `router.js` alongside the existing `jesus` route
- **SEO:** `<title>The Trial, Language, and Sources of Jesus — Tracking Faith</title>` / `<meta name="description" content="A deep dive into the trial of Jesus, the Aramaic-to-Greek translation gap, and the full landscape of independent historical sources.">` / canonical: `/jesus-expanded`
- **Trial section layout:** Do not use `.timeline` — the trial is jurisdictional, not chronological. Use a two-column flow diagram (Sanhedrin [blasphemy] → Pilate [sedition] → Execution) or a styled `<aside>` with jurisdiction labels. The `.tl` class would misrepresent the structure.
- **Testimonium Flavianum callout:** Use `<aside class="callout">` to distinguish the probable Josephan original (neutral reference to Jesus's wisdom and crucifixion) from the Christian interpolations ("if indeed one should call him a man," "he was the Messiah," resurrection language). This is a resolved design decision, not an open question.
- Sources table: `.bv-table` / `.scroll-table` pattern (7 rows — verify horizontal scroll on mobile)
- Reuse `data-reveal` / `data-reveal-delay` animation system
- No new JS dependencies

---

## Acceptance Criteria

- [ ] Trial section covers jurisdiction, charges, Pilate's role, and the date discrepancy
- [ ] Language section covers Aramaic as mother tongue, translation effects, and key shifted terms
- [ ] All 6 independent sources covered with date, content, and limitation
- [ ] Cross-links to `jesus`, `canon`, `beliefs-jesus`, and `archaeology` (Pilate Stone)
- [ ] View section added to `index.html` with `data-view="jesus-expanded"`
- [ ] Cross-link from existing `jesus` view added
- [ ] `jesus-expanded` registered in `router.js`
- [ ] SEO title, meta description, and canonical URL present in the view's `<head>` block
- [ ] Sources table (7 rows) scrolls horizontally on mobile without layout break
- [ ] All sections animate in with `data-reveal` on scroll

---

## Open Questions

*None — all design decisions resolved above.*
