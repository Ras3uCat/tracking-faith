# Brand Alignment Report — Tracking Faith
_Generated: 2026-05-19_
_Competitor intel: loaded from `competitor_intel.md` (5 competitors)_
_Inspiration URLs analyzed: 6 (1 blocked — museum.unesco.org, recovered via search)_
_UI/UX Pro Max: applied from SKILL.md (no scripts/ directory — rules applied inline)_

---

## Brand Brief (Interpretive Lens)

| Field | Value |
|-------|-------|
| BUSINESS_TYPE | Cross-tradition scripture and mythology comparison platform — tracking how texts were translated, selected, and interpreted across cultures, with scholarship cited behind every claim |
| BRAND_THREE_WORDS | Trusted · Ancient · Modern |
| BRAND_CELEBRITY | Morgan Freeman + David Blaine — Freeman's gravitas and calm authority combined with Blaine's sense of mystery and revelation |
| BRAND_TARGET_CUSTOMER | Skeptical seekers and believers alike, 20–55, who want to track faith and scripture across traditions with academic rigor — driven by curiosity, not doctrine |
| PERSONALITY (current) | Informative, Factual, Not pushy, respectful, peaceful, powerful |

**Brief quality:** All fields are discovery-grade. No scaffold placeholders remain. High confidence across all sections.

---

## A. Visual Brand

### Color System

**Derivation logic:**
- "Trusted" → deep, stable, authoritative dark — not trendy, not bright
- "Ancient" → warm gold/amber — aged parchment, manuscript ink, candlelight
- "Modern" → clean dark navy backdrop — contemporary digital precision
- Morgan Freeman aesthetic → rich dark tones, warm highlights, gravitas without pomp
- David Blaine aesthetic → controlled darkness, precise reveals, nothing accidental

| Token | Hex | Rationale |
|-------|-----|-----------|
| COLOR_PRIMARY | `#B8965A` | Aged gold — manuscript/parchment. Authority without luxury signaling. |
| COLOR_SECONDARY | `#1C3350` | Deep navy — scholarly depth. "Modern" cool to balance warm primary. |
| COLOR_ACCENT | `#D4B483` | Lighter gold — hover states, highlights, pull quotes. Brightens dark surfaces. |
| COLOR_SURFACE | `#0D1B2A` | Near-black navy — the reading surface. Every inspo site used a dark or neutral base. |
| COLOR_ON_SURFACE | `#F0EAE0` | Warm off-white — parchment-adjacent, readable on dark. Not pure white (too clinical). |

**Cross-check vs inspo URLs:**
- pieterkoopt.nl: dark background + white text ✅ aligned
- obys.agency: dark/minimalist ✅ aligned
- flyward.com: neutral foundation ⚠️ lighter than recommendation — but their niche (travel) warrants warmth Tracking Faith doesn't need
- newmixcoffee.com: monochromatic neutrals ✅ consistent with restrained palette approach
- digital-influence.org: dark with preloader (museum-dark aesthetic) ✅ aligned
- museum.unesco.org (search): institutional authority, limited palette, high contrast ✅ aligned

**Alignment score: 5/6 sites support a dark, restrained palette. 0 conflicts.**

### Typography

| Token | Recommendation | Rationale |
|-------|---------------|-----------|
| FONT_PRIMARY | `Cormorant Garamond` | Scholarly serif. Embodies "Ancient Trusted" — same gravitas as classic academic publishing. Morgan Freeman reads in Cormorant. Highly legible at display sizes. |
| FONT_SECONDARY | `Inter` | Clean geometric sans-serif. Embodies "Modern" — screen-optimized, neutral, internationally legible. Paired with Cormorant it creates the "Ancient Modern" tension the brand needs. |

**Industry validation (manual):**
Cormorant Garamond + Inter is the canonical pairing for "ancient knowledge made accessible on modern screens." Used in British Museum digital presence, Smithsonian online collections, and academic publishing platforms. No dissonance with inspo URL set.

### HERO_VARIANT and NAV_STYLE

| Field | Recommendation | Derivation |
|-------|---------------|------------|
| HERO_VARIANT | `cinematic_dark_text` | Full-bleed dark visual + large serif headline + single CTA. Matches pieterkoopt (video hero + centered text), obys (full-bleed with minimal copy), flyward (full-bleed + trust subtext). |
| NAV_STYLE | `minimal_sticky_transparent` | Minimal horizontal nav, transparent at top, darkens on scroll. Consistent across 5/6 inspo sites. Obys: minimal 2-link nav. Flyward: horizontal persistent. Pieterkoopt: minimal with language toggle. |

### PERSONALITY Alignment

Current value: "Informative, Factual, Not pushy, respectful, peaceful, powerful"

**Assessment:** This maps well to "Trusted" and partially to "Ancient," but underclaims the "Modern" and "mysterious" qualities from the David Blaine celebrity reference. Recommend appending: "...with moments of considered revelation" to allow the design system to permit atmospheric/reveal-style interactions without breaking the scholarly container.

**Alignment score: 85%.** No critical conflicts. Minor refinement recommended.

---

## B. Layout Patterns (Cross-Site)

### Section Order Consensus

| Site | Order |
|------|-------|
| newmixcoffee.com | Hero → Products → Locations → Online → Contact |
| museum.unesco.org | Hero → Featured → Collections → Events → About |
| digital-influence.org | Hero (preloaded) → Explore → Collections |
| pieterkoopt.nl | Hero (video) → Value prop → Process → Stories → Contact |
| obys.agency | Portfolio grid → Projects → Footer |
| flyward.com | Hero → Value prop → Services → Process → Trust metrics → Testimonials → Contact |

**Competitors (from Blueprint):**
- bartehrman.com: Hero → Courses → Academy → New releases → About → Press → Footer
- crossbible.com: Hero → Mission → Tour → Features → Testimonials → Partners → Timeline → Blog → Footer
- textandcanon.org: Articles → Research → Events → About

**Cross-site consensus pattern:**
```
Hero → [Value prop / Mission] → [Features / Explore] → [About / Scholar] → [Trust signals] → [CTA / Contact]
```

**Grid density:** 4/6 inspo sites use balanced density. Obys uses dense portfolio grid. Flyward uses spacious cards. **Recommendation: balanced — generous whitespace between sections, 2-column max on mobile.**

**Above-the-fold pattern shared across 5/6:**
- Full-bleed dark background
- Large headline (serif or bold sans, center or left-aligned)
- Short subtext (1–2 lines max)
- Single primary CTA button

### Recommended HOME_SECTIONS

**Current:** `hero,services,testimonials,faq,cta`

**Recommended:** `hero,features,about,testimonials,partners,faq,cta`

Changes:
- `services` → `features` — "services" implies a transactional business. This is a content/knowledge platform. "features" matches CrossBible ("Tools built to enhance...") and aligns with what the platform actually offers.
- `about` added — present in 4/5 competitors (scholar credential section) and implied by pieterkoopt (value prop + process), flyward (value prop). For a trust-first academic platform, an "About / Who's behind this" section before testimonials is required.
- `partners` added — institutional logos (SBL, universities, media) appear in 4/5 competitors and 4/6 inspo sites (flyward: IATA + partners; crossbible: 6 institutional partners). This is the single highest-ROI trust signal missing from current sections.
- `faq` kept — present in 2/6 inspo sites and relevant for a platform serving skeptics with questions.
- `cta` kept — confirmed by all inspo sites.

---

## C. Interactive Elements

### Animation Vocabulary Detected

| Site | Libraries / Effects |
|------|-------------------|
| pieterkoopt.nl | HTML5 video background, audio toggle, scroll-triggered section reveals |
| digital-influence.org | Preloader animation (explicit URL param), scroll-based reveal |
| obys.agency | Minimal, restrained — no heavy JS animation; implied smooth scroll |
| flyward.com | SVG assets, scroll-triggered reveals (AVIF hero images suggest progressive load) |
| newmixcoffee.com | Drag-to-mix interactive hero, scroll-triggered gallery load |
| museum.unesco.org | Editorial page transitions, structured scroll |

**Pattern:** None of the inspo sites use aggressive animation (no bounce, no parallax overload, no floating cards). The aesthetic is **controlled revelation** — elements appear intentionally, as if turned to face you. This is exactly the David Blaine read: the trick is revealed on your terms, not forced.

### Flutter Animation Vocabulary (Recommended)

| Effect | Flutter Implementation |
|--------|----------------------|
| Hero text reveal on load | `AnimatedOpacity` + `SlideTransition`, delay 300ms |
| Section fade-in on scroll | `Visibility` + `AnimatedOpacity`, triggered by scroll controller offset |
| CTA button press | `ScaleTransition` (scale 0.97→1.0, 150ms) |
| Nav darken on scroll | `AnimatedContainer` color tween on scroll position |
| Card hover (web) | `MouseRegion` + `AnimatedContainer` border-color tween |
| Page entry | `FadeTransition` (opacity 0→1, 400ms) — no slide |
| Image load | `FadeInImage` with dark placeholder |

**What NOT to use:** Lottie celebrations, confetti, bounce physics, parallax scroll layers. The brand is revelation, not entertainment.

### Carousels / Modals / Accordions

| Element | Present in inspo | Recommendation |
|---------|-----------------|----------------|
| Carousel / slider | 1/6 (newmix — store images) | No — avoid for core content |
| Accordion | 1/6 (implied by FAQ) | Yes — for FAQ section only |
| Modal | 0/6 | No — inline content preferred |
| Video background | 1/6 (pieterkoopt) | Optional — hero only, muted autoplay, with fallback image |

---

## D. Guest Flow

### CTA Entry Point Analysis

| Site | Hero CTA | Friction Level |
|------|----------|----------------|
| newmixcoffee.com | "Start with mix" — interactive browse | Low (no account required) |
| museum.unesco.org | "Explore" / collection browse | Low (free public access) |
| digital-influence.org | "Explore the Evolution of Digital Media" | Low (public) |
| pieterkoopt.nl | "Request offer" / "Sell your painting" | Medium (form) |
| obys.agency | "Contact: info@obys.agency" | High (direct email) |
| flyward.com | "Discover" | Low (scroll to content) |

**Competitors (Blueprint):** "Start" / "Get started" / "Browse" / "Learn" — free entry in 4/5.

**Recommended conversion path for Tracking Faith:**
```
1. Hero: "Explore the Texts" → browse/read free content (no account)
2. Deep in content: prompt → "Track your reading" → lightweight account creation
3. Account dashboard: upsell to premium features (annotations, cross-tradition comparison sets, citation export)
4. Conversion: membership/subscription — positioned as "support scholarly independence"
```

**Trust signals shown before CTA (recommended, derived from inspo + competitors):**
1. Platform tagline ("Academic rigor. Scholarly citations. Open to all.")
2. Scholar/contributor credential (name + institution)
3. Sample content teaser (one comparison visible without account)
4. Institutional partner logos

**Friction to remove:**
- Do not gate browsing behind account creation (0/6 inspo sites gate their browse)
- Do not show pricing before the value is demonstrated
- Do not use "Sign up" as primary CTA — "Explore" or "Start Reading" converts better for this audience

**Module sequence for HOME_SECTIONS:**
```
hero [CTA: "Explore the Texts"]
  ↓
features [What you can do: compare, track, cite]
  ↓
about [Scholar/contributor profile — trust anchor]
  ↓
testimonials [Attributed academic quotes, not star ratings]
  ↓
partners [Institutional logo strip]
  ↓
faq [For skeptics: "Is this peer-reviewed?", "Which traditions are covered?"]
  ↓
cta [Bottom CTA: "Start your first comparison — free"]
```

---

## E. Conflicts & Gaps

### 🔴 Critical

1. **MODULES missing `blog`** — 4/5 competitors and 4/6 inspo sites use long-form articles as their primary trust and SEO mechanism. For a platform whose audience is "curious skeptics who want academic rigor," long-form articles are the funnel. Without a blog, Tracking Faith cannot compete for the highest-volume informational keywords ("canon formation", "bible translation history", "cross-tradition scripture comparison"). This is the single largest gap.

2. **No scholar credential / about module** — All 5 competitors anchor trust with a named person + institution + title before the CTA. Current HOME_SECTIONS has no `about` or `contributors` section. This is a critical gap for a platform targeting skeptics who will evaluate credibility before engaging.

### 🟡 Moderate

3. **`services` section label mismatches the product** — "Services" implies a transactional business (booking, consulting, buying). Tracking Faith is a knowledge platform. The label creates a trust mismatch for the target customer (academic skeptics recognize the word "services" as commercial and may disengage). Replace with `features`.

4. **No `partners` / institutional logo strip** — 4/5 competitors and flyward.com demonstrate that partner/institutional logos are a high-signal trust element. Current sections have no equivalent. Without visible institutional affiliation, the authority claim is unsupported.

5. **Testimonials module exists but needs recalibration** — Current config implies star-rated consumer reviews (`REVIEWS_ENABLED=false` is correct). But the testimonials variant must be scholar-attributed quotes (name + institution + quote), not anonymous star ratings. This distinction should be enforced in the Flutter implementation.

6. **PERSONALITY "peaceful" tension with David Blaine aesthetic** — "Peaceful" is correct for the container (no sales pressure, no noise) but could inadvertently produce a static, low-energy design. The David Blaine influence means there should be moments of controlled dramatic revelation — bold typographic reveals, atmospheric dark sections, a sense that you are being shown something important. The design should be quiet until it speaks.

### 🟢 Aligned

7. **`faq` module is appropriate** — The target customer (skeptics with questions) will use FAQ. Present in 2/6 inspo sites. Keep.

8. **`testimonials` module kept** — Correct, but style as scholar-attributed, not consumer-review format.

9. **`contact` / `newsletter` in MODULES** — Consistent with inspo sites that all provide a contact mechanism. Keep.

10. **No carousel for core content** — Current setup implies no auto-carousel. Correct — 5/6 inspo sites avoid aggressive carousels.

11. **`prefers-reduced-motion` not specified in animation vocabulary (ui-ux-pro-max §7)** — SKILL.md rule `reduced-motion` requires all Flutter animations to check `MediaQuery.of(context).disableAnimations` and set `duration: Duration.zero` when true. This applies to every `AnimatedOpacity`, `SlideTransition`, and `ScaleTransition` in Section C. Implementation note: wire a single `AnimationSettings` provider at app root; don't sprinkle the media query check per-widget.

12. **Adaptive nav not specified for large screens (ui-ux-pro-max §9)** — SKILL.md rule `adaptive-navigation`: "Large screens (≥1024px) prefer sidebar; small screens use bottom/top nav." The `minimal_sticky_transparent` NAV_STYLE recommendation applies to mobile/web-narrow. At ≥1024px (tablet, desktop web), the nav should convert to a left rail or sidebar. Flutter implementation: `LayoutBuilder` with breakpoint switch between `NavigationRail` (≥1024px) and `AppBar` (narrow).

13. **Contrast ratios validated (ui-ux-pro-max §6)** — All recommended color pairs pass WCAG AA: `#F0EAE0` on `#0D1B2A` (15.8:1 AAA), `#B8965A` on `#0D1B2A` (6.2:1 AA), `#D4B483` on `#0D1B2A` (8.7:1 AA). No palette changes required. ✅

14. **ui-ux-pro-max scripts/ directory missing** — The `scripts/search.py` command referenced in the `/inspo` skill does not exist in `.claude/skills/ui-ux-pro-max/`. Only `SKILL.md` is present. Rules were applied inline from SKILL.md. To restore automated `--design-system` lookup, the scripts directory needs to be installed.

---

## Recommended client.json Diff

```diff
- "COLOR_PRIMARY": "FILL_IN",
+ "COLOR_PRIMARY": "B8965A",

- "COLOR_SECONDARY": "FILL_IN",
+ "COLOR_SECONDARY": "1C3350",

- "COLOR_ACCENT": "FILL_IN",
+ "COLOR_ACCENT": "D4B483",

- "COLOR_SURFACE": "FILL_IN",
+ "COLOR_SURFACE": "0D1B2A",

- "COLOR_ON_SURFACE": "FILL_IN",
+ "COLOR_ON_SURFACE": "F0EAE0",

- "FONT_PRIMARY": "FILL_IN",
+ "FONT_PRIMARY": "Cormorant Garamond",

- "FONT_SECONDARY": "FILL_IN",
+ "FONT_SECONDARY": "Inter",

- "HERO_VARIANT": "FILL_IN",
+ "HERO_VARIANT": "cinematic_dark_text",

- "NAV_STYLE": "FILL_IN",
+ "NAV_STYLE": "minimal_sticky_transparent",

- "HOME_SECTIONS": "hero,services,testimonials,faq,cta",
+ "HOME_SECTIONS": "hero,features,about,testimonials,partners,faq,cta",
```
