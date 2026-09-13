# Zenith Core — visual world

Owns durable visual decisions for the React + Three.js beta site
(`zenith-web/`). Product truth lives in PRODUCT.md. The v2 concept page is
the incumbent evidence; the founder asked to push bolder, so this replaces
its register while keeping its brand commitments.

## The idea

**A single minted object, lit in the dark.**

Zenith's economy centres on a coin, and the product's whole argument is that
worth is not rank — it is something struck and carried. So the page is one
dark field with one real, physically-lit object in it. The coin is the light
source and the only ornament; everything else is type and air.

This is why WebGL is here. A picture of a coin is a picture. A coin that
holds a highlight as you move, catches a violet rim as you scroll, and turns
with real specular response is *material* — and material is the entire
premium signal. If the 3D were removed and the page still worked identically,
the 3D would not have earned its place.

## The POV, and what it rejects

Zenith is explicitly not about skill, rank, or competition. So the page
refuses the dark competitive-gaming register — no neon, no angular chrome, no
scanlines, no hexagons, no glow-on-everything. It takes the opposite
position: **editorial, warm, and composed.** The surprise is a serif on a
gaming product, and that surprise is the point — it says this is about people,
not leaderboards.

## Palette

Dark-committed. Not picked by category — picked because a struck metal object
needs darkness to read as metal, and the product's use scene is late evening,
after work, lights low.

```
--void        #08070C   page ground, violet-tinted near-black
--raised      #101018   panels lifted out of the ground
--hair        rgba(255,255,255,.10)
--ink         #F7F5FA   primary text
--ink-soft    #A9A2B8   secondary, 7.4:1 on void
--ink-dim     #6E6880    tertiary — large or non-essential text only
--violet      #6B4EFF   the brand. Structural use, never body text on dark.
--accent      #A98BFF   the readable violet for text and links on dark
--gold        #E8C36A   the coin's own material. Reserved for coin echoes.
```

`--violet` is the logo colour and stays the brand, but it measures under 4.5:1
as text on `--void`; `--accent` is its legible sibling and is what type uses.
Gold is rationed hard: it belongs to the coin, so spending it elsewhere costs
the coin its uniqueness.

## Type

**Instrument Serif** for display, **Inter** for everything else.

The serif is the POV made visible — editorial and human where the category
defaults to technical. It appears only at large sizes, where its contrast
reads; it never sets UI or body copy.

- Display: Instrument Serif, tracking `-0.02em`, line-height `0.94`
- Body / UI: Inter, 400 and 500 only, tracking `-0.011em`
- Measure: 62–70ch
- Tracking floor: `-0.03em`. Never past `-0.04em`.

Weight discipline carries over from v2: load only what is used, and set
`font-synthesis-weight: none` so nothing is faux-bolded.

## Motion

One authored moment: **the strike.** On load the coin drops in, overshoots
slightly, and settles as the key light sweeps across it once. Nothing else on
the page competes with that.

Everything after is response, not performance — the coin tracks the cursor
with damping, and scroll drives its scale, position and rotation on a single
continuous curve rather than triggering discrete animations.

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — exponential out, from an
  already-visible default
- Reveals are short and never stagger more than 3 items
- `prefers-reduced-motion`: the coin holds still and lit, scroll coupling is
  off, reveals become instant. The page loses motion, not content or meaning.

## Depth

Elevation is declared once per surface — a shadow **or** a border, never
both. The coin gets real depth from lighting; flat UI does not imitate it
with glow. No glass, no backdrop blur as decoration.

## The 3D contract

- Lighting is a built environment of `Lightformer`s, not a downloaded HDRI.
  The page must render identically offline.
- DPR capped at 2. The loop pauses when the canvas is off-screen.
- A WebGL failure is a designed state, not a blank box: the still coin render
  takes its place and the layout does not shift.

## Bans, specific to this project

- No neon, glow-on-everything, or competitive-gaming chrome
- No gold outside the coin and its direct echoes
- No violet body text on dark — use `--accent`
- No unlabelled numbers. Every simulated figure carries its caveat inline,
  at a legible size, not as fine print
