# Feature 131 — Herculaneum & the Vesuvius Challenge

**Status:** Backlog
**Type:** Content Page
**Pillar:** Evidence
**URL Slug:** `herculaneum`
**Relationship:** Evidence pillar — second article. Companion to Archaeological Evidence (120), which introduces the Herculaneum Scrolls in its "What's Still Being Searched" section. This page gives it the full treatment it deserves. Cross-links to `archaeology`, `lost-books` (Q Source — another partially recoverable lost text), and `bible-versions` (DSS and textual transmission).

---

## Problem Statement

The Archaeological Evidence page introduces the Herculaneum Scrolls in a single paragraph. They deserve their own article. The Vesuvius Challenge (2023–ongoing) is one of the most significant developments in ancient text recovery in decades, and it is actively evolving — new text is being read from previously sealed scrolls as this is written. A dedicated page allows the site to cover the discovery, the technology, the findings so far, and the potential biblical/early Christian connection in full.

This page will need periodic updates as the Vesuvius Challenge progresses.

---

## Content Outline

### Section 1 — The Villa of the Papyri

- **What it is:** A large private villa on the outskirts of Herculaneum, buried by Mt. Vesuvius in 79 AD. Discovered in the 18th century during the Bourbon excavations of Naples.
- **The library:** The villa contained approximately 1,800 carbonized papyrus scrolls — the only intact library to survive from antiquity. The scrolls were so thoroughly carbonized that attempting to unroll them physically caused them to disintegrate. Early attempts destroyed hundreds before scholars stopped.
- **The collection so far:** Mostly Epicurean philosophy — particularly works by Philodemus of Gadara, a Greek philosopher who lived at the villa. About half the scrolls have been "read" (in various states of completeness) using conventional methods. The other half remain sealed.
- **The owner:** Likely Lucius Calpurnius Piso Caesoninus, father-in-law of Julius Caesar. Piso was a patron of Philodemus. The library reflects his philosophical interests. This raises the intriguing question: might other parts of the villa's library — potentially more eclectic — remain unexcavated?

### Section 2 — The Vesuvius Challenge

- **The breakthrough:** In 2019, researchers at the University of Kentucky (Brent Seales and team) demonstrated that machine learning could detect ink from X-ray scans of rolled scrolls without physically opening them. The technique is called "virtual unwrapping."
- **The competition:** In March 2023, the Vesuvius Challenge launched publicly — a prize competition ($1M+ in prizes) for reading text from the Herculaneum Scrolls using X-ray CT scans. The scans were made available publicly.
- **First results (2023):** The first prize-winning submission (December 2023) read over 2,000 characters from a single carbonized scroll — the first new text read from a Herculaneum scroll in over 200 years. The text discusses Epicurean philosophy (whether pleasure is the highest good). A word was identified: πορφύρας (porphyras) — "purple." Researchers identified the scroll as likely by Philodemus.
- **Ongoing:** As of 2026, the Vesuvius Challenge continues. Multiple teams are competing. Increasing amounts of text are being read. The full contents of hundreds of still-sealed scrolls remain unknown.

### Section 3 — The Biblical / Early Christian Possibility

- **Why it matters for this site:** Philodemus of Gadara was active in roughly the same era and geographic region as early Christianity. Gadara is one of the cities of the Decapolis — the same Greek-speaking urban zone Jesus is recorded visiting (Mark 5:1, the Gadarene demoniac). The cultural and intellectual world Philodemus occupied overlapped with the world Jesus operated in.
- **What might be there:** Scholars speculate that the unread scrolls might include:
  - Works of lost Greek philosophers (Aristotle's lost dialogues, Stoic texts)
  - Historical accounts of the period (Livy, lost sections of Polybius)
  - Any early Christian or Jewish texts that circulated in Roman households in the 1st century
- **The honest caveat:** The villa's owner was a Epicurean patron. Epicurean philosophy and early Christianity were intellectually antagonistic. A direct early Christian text in this collection is unlikely but not impossible. The greater value is the possibility of historical texts that provide context for the 1st-century Mediterranean world — the world of Jesus and Paul.
- **Q Source connection:** If Q existed as a written document (Feature 119), and it was circulating in the Greek-speaking world in the mid-1st century, physical copies presumably existed. The conditions that preserved scrolls at Qumran and Herculaneum existed elsewhere. Q has not been found — but that is an argument from absence, not impossibility.

### Section 4 — The Technology

- **X-ray CT scanning:** The sealed scrolls are scanned with high-energy X-rays that penetrate the carbonized material without destroying it. The scans produce 3D volumetric data.
- **Virtual unwrapping:** The 3D scan is computationally "unrolled" by modeling the scroll's physical geometry — essentially peeling the layers apart in software.
- **Ink detection:** Ancient Herculaneum ink is carbon-based — it has almost the same X-ray signature as the carbonized papyrus, making it nearly invisible. Machine learning models trained to detect subtle density differences have cracked this problem.
- **The open data:** All CT scan data is publicly available at scrolls.world. Any researcher or team can attempt to read the scrolls.

### Section 5 — What Remains

- The Villa of the Papyri excavation was only partial. The ground plan suggests additional rooms that haven't been excavated — potentially including other parts of the library, or storage rooms with additional scrolls.
- The 300+ still-sealed scrolls for which CT scans exist.
- Scrolls that were partially destroyed in 18th-century unrolling attempts but may retain readable text in fragments.

---

## Design Notes

- Reuse `data-reveal` / `data-reveal-delay` animation system
- Timeline treatment for the discovery and Vesuvius Challenge history: existing `.tl` / `.timeline` classes
- Technology section: prose with pull-quote treatment for the key breakthrough
- "What Remains" section: checklist/list treatment
- **Note:** This page will require periodic updates as Vesuvius Challenge results come in. Flag in the spec.
- No new JS dependencies

---

## Acceptance Criteria

- [ ] Villa of the Papyri described: location, burial, discovery, current collection state
- [ ] Vesuvius Challenge explained: the 2019 breakthrough, the 2023 prize competition, first results
- [ ] Biblical/early Christian possibility addressed honestly — with calibrated speculation and honest caveat
- [ ] Technology section covers CT scanning, virtual unwrapping, and ink detection
- [ ] Q Source cross-link present (Feature 119)
- [ ] "What remains" section covers unexcavated rooms, sealed scrolls, and fragment potential
- [ ] Cross-links to `archaeology`, `lost-books`, and `bible-versions`
- [ ] View section added with `data-view="herculaneum"`
- [ ] All sections animate in with `data-reveal` on scroll
- [ ] Spec flagged for periodic updates as Vesuvius Challenge progresses

---

## Open Questions

- Should this page have a "last updated" date displayed, given it covers actively evolving research?
- The scrolls.world open data means technically-inclined readers could contribute to the Vesuvius Challenge. Should we link directly to the challenge and encourage reader participation?
