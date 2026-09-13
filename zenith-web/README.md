# Zenith — two pages, one repo

| Entry | URL in dev | What it is |
|---|---|---|
| `index.html` | `/` | Concept v2 — the incumbent page, ported from `../v2.html` |
| `cleo.html` | `/cleo.html` | The Cleo-system rebuild |

They are deliberately parallel: neither overwrites the other, and they can be
compared side by side. Product truth for both is `../PRODUCT.md` — several
numbers carry required caveats, so read it before editing copy.

## Run

```bash
npm install
npm run dev      # / and /cleo.html
npm run build    # builds both entries
npm run preview
```

---

# The Cleo-system rebuild (`/cleo.html`)

Built from the measured teardown in `../CLEO-REFERENCE.md`. What was taken
and what was not:

**Taken — the system.** The spacing scale, the partial-fluid size formula
`X · (1 − M·(1 − vw/W))`, the radius ladder, the 4→8 column grid, the
768/1280/1440 breakpoints, the type roles, and the eight section patterns.
All of it is in `src/cleo/tokens.css`, with Cleo's own custom-property names
kept so the mapping stays auditable.

**Not taken — the palette.** Cleo is warm brown on cream. Zenith is violet on
near-black per `../DESIGN.md`, and that stays. Every Cleo colour role is
remapped at the top of `tokens.css`; the peach gradients become violet.

**Not taken — the fonts.** PPNeueMontreal and SimplonBPMono are paid,
per-domain licences. Switzer (Fontshare, free for commercial use) stands in
for the sans at the same 300/400/500 ladder, DM Mono for the eyebrow labels.
Both self-hosted in `public/fonts` — no external font dependency, ~84 KB total.

## The hero is live 3D, not a frame sequence

Cleo scrubs a pre-rendered PNG sequence. `src/cleo/three/Phone.jsx` renders
the phone in WebGL instead: a `RoundedBox` body in dark titanium, a
rounded-rect screen plane carrying a real app screenshot, and a near-clear
glass layer over it for the reflection that sells the object as physical.
Lighting is a built `Lightformer` environment, not a downloaded HDRI, so the
page renders identically offline — the 3D contract from `../DESIGN.md`.

Scroll progress reaches it through a ref read inside `useFrame`, so scrolling
never re-renders the React tree.

Costs ~30 KB of source and no asset pipeline. The trade against a frame
sequence is photorealism: a Blender render would look better, at 30–80 MB.

## Media

Every unfilled media slot renders as a labelled placeholder showing its id
and aspect ratio. **`ASSETS.md` is the list** — what each one needs, at what
size, and which ones should not be filled with generated imagery.

## Layout

```
cleo.html              entry
src/cleo/
  tokens.css           the ported system + palette remap. Change tokens here.
  layout.css           section layouts. Every value comes off the token ladder.
  App.jsx              section order
  hooks.js             reveals, the word-warm scrub, section progress
  components/          Masthead, Statement, Media (Slot / Split / MediaCard)
  sections/            one file per section, in page order
  three/Phone.jsx      the hero
```

## Two traps, already hit once

- **`ch` resolves against the element's own font-size.** `max-width: 20ch` on
  a wrapper that sets 16px body text is ~160px, not 20 characters of the 48px
  statement inside it. Measures for display type go in px, or on the display
  element itself.
- **Media in a split needs a height cap.** A 4/5 slot in a half-width column
  is ~1000px tall on desktop, which pushes the text beside it out of view and
  breaks the pairing. `.split__media` caps at 78vh.

## Still open

Both blockers from `../CONTENT.md` are visible on the page as placeholders
rather than invented: the two team bio lines, and the founder name. The
contact email is still `zenithcore0313@gmail.com`, marked TODO in
`sections/Talk.jsx` and `sections/Footer.jsx`.

## How the port stays faithful

`src/styles/v2.css` is **v2's stylesheet, imported verbatim** — the only edit
was making image paths absolute. That, not re-implementation, is why the React
build measures identically to the original: hero card `[10,10,1410,880]`,
wordmark `160px`, 13 sections in the same order.

The markup was converted mechanically from v2's HTML rather than retyped, so
no copy drifted. If you need to re-derive it, the source of truth is
`../.v2.preinline.bak` (v2 before its images were inlined).

**Change tokens in `v2.css`, not in components.**

```
src/
  sections/     one file per v2 <section>, in page order
  components/   Masthead, Marquee
  hooks/useV2.js  reveals, floats, cursor, theme, damped scroll
  three/        the coin
  styles/v2.css v2's stylesheet, verbatim
```

## What Motion drives

Motion replaced hand-rolled loops; it did not change any timing or easing.
The reveal transitions themselves are still CSS, keyed off `.animate` → `.anim`,
which is what keeps the feel identical.

- `inView` triggers the reveals (was a raw IntersectionObserver)
- `scroll` + `animate` drive the parallax float layer (was a manual rAF loop)
- a `spring` follows the custom cursor (was a hand-written lerp)

The damped wheel scroll is deliberately **not** Motion: it has to stay
retargetable mid-gesture, which a keyframe animation is a poor fit for. It
keeps v2's frame-rate-normalised lerp at `LERP = 0.12`, plus `deltaMode`
normalisation so a Firefox wheel notch moves ~100px and not 3. Programmatic
scrolls use `behavior: 'instant'`, because the page's `scroll-behavior: smooth`
otherwise animates every frame of the loop against itself. Trackpads are left
to scroll natively — their momentum is already damped by the OS.

## The 3D coin (removed, but kept on disk)

The hero figure shows `coin-moss.webp`, exactly as v2 did.

An earlier pass put a live 3D coin in that slot. It was removed on request.
The components are still on disk but nothing imports them, so three.js is no
longer bundled at all:

- `src/three/HeroCoin.jsx` — the canvas that filled the hero figure
- `src/three/Coin.jsx` — the coin itself: a `LatheGeometry` profile for the
  rolled rim, the axolotl mark struck into both faces via
  `public/img/emblem-height.png`, lit by baked `<Lightformer>`s (no HDRI, so
  no network dependency)

To bring it back, render `<HeroCoin />` in place of the `<img>` in
`src/sections/Hero.jsx` and re-add the `.hero-3d` rule (absolute, inset 0,
below `.hero-figure::after` so the caption scrim still covers it).

`three`, `@react-three/fiber` and `@react-three/drei` are still in
package.json. They cost nothing in the build while unimported; remove them
if you are sure the coin is not coming back.

## Before publishing

- Replace `zenithcore0313@gmail.com` in `src/sections/Footer.jsx` and
  `src/sections/Talk.jsx`.
- Keep the simulated-figure caveats. They are part of the claim.
