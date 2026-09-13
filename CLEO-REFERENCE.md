# Reference teardown — web.meetcleo.com

Measured live at 1920×991 on 2026-09-10. Every value below is read off the
running page (computed styles), not estimated from screenshots.

Cleo is an AI money assistant. The whole visual system is built around that:
**every surface is shaped like a message bubble.** That is the single idea
the rest of the design hangs off.

---

## 1. The measured system

### Colour — warm brown, never black

| Value | Hex | Role | Uses |
|---|---|---|---|
| `rgb(71,32,28)` | **#47201C** | primary ink — deep warm brown | 1,033 |
| `rgb(255,255,255)` | **#FFFFFF** | inverted text, card grounds | 747 |
| `rgb(41,18,16)` | **#291210** | deeper brown, used at 10–20% alpha for surfaces | — |
| `rgb(248,246,242)` | **#F8F6F2** | cream page ground | — |
| `rgb(172,155,152)` | **#AC9B98** | muted mauve-grey | — |

Secondary text is the same brown at **50% alpha**, not a separate grey. No
pure black anywhere. Accent warmth comes from peach/orange **photography and
gradients**, not from a UI accent colour.

### Type — two licensed faces, light weights

- **PPNeueMontreal** (Pangram Pangram) — everything
- **SimplonMono** (Swiss Typefaces) — eyebrow labels only

| px | Weight | Leading | Role |
|---|---|---|---|
| 48 | 300 | 1.08 | section statements |
| 32 | 300 / 400 | 1.13 | headlines |
| 24 | 300 / 450 | 1.17 | sub-headlines |
| 20 | 300 / 450 | 1.20 | large body |
| 16 | 400 | 1.50 | body (169 uses — the workhorse) |
| 14 | 450 | 1.14 | **SimplonMono** eyebrow labels, uppercase |
| 11 | 300 | — | micro |

Display tops out at **48px**, which is the surprise — this is a product page,
not an editorial one. Hierarchy comes from weight and colour, not scale.
Letter-spacing is `normal` everywhere. No bold above 450.

### Radius — the identity

| Value | Uses | Where |
|---|---|---|
| 88px | 23 | pill buttons, tab switchers |
| 30px | 22 | media cards, testimonial cards |
| 64px | 14 | large panels |
| 50% | 17 | circular icon buttons |
| 20px | 12 | small surfaces |
| **`20px 24px 24px 0px`** | 8 | **speech bubble — square bottom-left** |
| **`32px 32px 32px 0px`** | 6 | **speech bubble, larger** |

The asymmetric radii are the signature. One square corner reads as a chat
tail. Nothing on the page is a hard rectangle.

---

## 2. Section patterns (the reusable vocabulary)

1. **Scroll-scrubbed hero** — a sticky `<canvas>` inside a 2,478px-tall
   section. A photoreal 3D phone rises and rotates into frame over a blurred
   landscape as you scroll; headline sits white, top-left. Driven by virtual
   scroll (wheel events), not `window.scrollY`.
2. **Full-bleed media card** — rounded 30px, edge-to-edge photography or
   video of real people, dark gradient scrim, white text top-left: mono
   eyebrow → headline → pill button.
3. **Split media/text** — large rounded media on one side (~60%), text
   stack on the other: mono eyebrow, 32px headline, 16px body at 50% alpha,
   pill button. Alternates side to side down the page.
4. **Centred two-line statement** — 48px, centred, on cream. The second line
   animates from peach to full brown, word by word, as it enters view. Also
   blurs in. This is the page's one recurring motion signature.
5. **Floating pill tab switcher** — dark translucent pill overlaid on media,
   3 options, active state filled.
6. **Testimonial carousel** — white 30px cards, each a halftone dot-matrix
   portrait on a peach gradient beside a quote, attribution in mono. Circular
   prev/next buttons.
7. **FAQ as a chat thread** — questions are speech bubbles with `+` / `×`
   toggles; answers appear as grey message bubbles. The FAQ *is* a
   conversation, which is the product.
8. **Feature grid** — rounded video tiles on a peach radial-gradient ground,
   mono eyebrow above.

Total page: **15,858px ≈ 16 screens.**

---

## 3. What does not transfer to Zenith — read before building

This project already hit this exact wall once, with the kononenkogroup.com
reference (see `STRUCTURE.md` §4.5). The answer is the same one.

### 3.1 The fonts are commercial licences
PPNeueMontreal and SimplonMono are both paid, per-domain. They cannot be
copied across. Either licence them or substitute — a geometric/neo-grotesque
at weight 300–400 plus any mono for the eyebrow labels gets ~90% of the feel.

### 3.2 The design *is* the photography — and we have none
Cleo's page runs on **30+ pieces of commissioned photography and video of
real people**, plus photoreal 3D phone renders. Strip those out and almost
nothing remains: the layouts are frames *around* imagery.

Zenith's actual image library:
- `coin-moss.webp`, `coin-gold.webp` — coin renders
- `mascot.webp`, `mark.webp` — axolotl brand marks
- 8 × `ui_*.webp` — app screenshots

No people. No lifestyle photography. No video. So sections 2, 3, 6 and 8
above have nothing to put in them as-is.

**Options, in order of honesty:**

| | Approach | Verdict |
|---|---|---|
| A | Rebuild the *system* (colour, radius, type, motion, layout rhythm) and fill the media slots with Zenith's coin renders, mascot and the 8 app screenshots | **Recommended.** Achievable now, looks intentional, uses assets that are genuinely ours |
| B | Commission/generate lifestyle photography of gamers to fill the slots | Strongest match to the reference, but it's a shoot — cost and time, and generated "users" on a pre-launch investor page is a credibility risk |
| C | Copy Cleo's images | Not an option — they're licensed to Cleo, and this is an investor-facing page |

### 3.3 Scope
Scroll-scrubbed canvas hero, virtual scroll, per-word scroll-driven text
reveals, video tiles, carousel. That is weeks of build, not a restyle. A
faithful *static* translation of the system is days.

---

## 4. What maps well — the reason this reference is a good pick

Cleo is a **conversational AI companion for money**. Zenith is a
**conversational companion for gaming**. The speech-bubble language isn't
borrowed decoration here — it's the same product truth:

- Zenith's core mechanic is *State Match* — a check-in conversation. Chat
  bubbles are literally the interface.
- The FAQ-as-chat-thread pattern fits Zenith's "ask how you are before asking
  what you play" thesis exactly.
- The warm brown/cream palette is a genuine alternative to the current violet
  and would need a decision from the founder, since violet is the brand
  (`DESIGN.md`: "violet is the logo colour and stays the brand").

**Open conflict:** Cleo's palette is warm brown on cream. Zenith's documented
brand is violet on near-black (`DESIGN.md`). Adopting Cleo's colour wholesale
overwrites the brand. Recommend keeping violet as the accent and borrowing
the *structure* — radius language, type weights, layout rhythm, motion — not
the hue.
