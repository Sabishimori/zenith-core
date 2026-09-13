# Media the page is waiting on

**Every slot is currently filled with a generated placeholder** so the page
can be judged with imagery in place. They are labelled `PLACEHOLDER · <id>`
across the bottom and live in `public/media/<id>.webp` — 15 files, ~160 KB
total, screen-lit evening frames at the right aspect with a realistic tonal
range. They are stand-ins for judging composition, scrim strength and
contrast. They are not art.

## Replacing one with the real thing

1. Save the real file over `public/media/<id>.webp` (same name).
2. That is the whole change. `Media.jsx` resolves placeholders by id, so the
   real file is picked up with no code edit at all.

To go back to a labelled empty box, delete the file and remove its id from
`PLACEHOLDERS` in `src/cleo/components/Media.jsx`.

For a **video**, save `public/media/<id>.mp4` and pass `src` and `poster`
explicitly on that `Slot` — the extension is detected and rendered as a
muted, looping, inline `<video>`.

**Formats.** WebP for stills (quality ~82), MP4/H.264 for video. Export at
**2× the listed pixel width** so it holds up on a retina screen.

## Two things the placeholders already proved

Filling the slots surfaced two real bugs that empty panels had been hiding,
both now fixed:

- `.panel__media .slot` collapsed to **zero height** the moment it held an
  `<img>` instead of the placeholder's flex box, because `.slot`'s own
  `position: relative` was beating the panel's `position: absolute`. The
  panels lost their media entirely and their white captions were left on the
  light page ground at **1.13:1**.
- Panel captions are white and sat **directly on the photograph with no
  scrim**. Nine of ten cleared 4.5:1 against the placeholders by luck; one
  landed on a bright patch at **1.0:1**. `.panel__media::after` now carries a
  bottom-weighted scrim, and the worst caption measures **7.39:1** — it holds
  even over a white region.

So: any real photograph you drop in is already protected. You do not need to
pick dark images to keep the type readable.

---


## Why Cleo's own imagery cannot be used

The scrape in `../saveweb2zip-com-web-meetcleo-com/images` is a measurement
reference only. Those 291 files are licensed to Cleo — commissioned
photography of real people. Copying them onto an investor-facing page is
the one option with no upside. They are useful for *composition*: look at
how tightly the subject is cropped and how much dead space the type sits in.

---

## The list

### Priority 1 — the page reads as unfinished without these

| id | Ratio | Export at | What it is |
|---|---|---|---|
| ~~`hero-reel`~~ | 16 / 9 | — | **DONE — real video installed.** `hero-reel.mp4`, 8s silent loop, 1600×1066, 1.7 MB, transcoded from the 32 MB / 33 Mbps source. `hero-reel-poster.webp` is frame one. Source is 3:2 in a 16/9 band, so cover trims top and bottom — change `ratio` in `sections/Reel.jsx` if that crop loses something. |
| `problem-retention` | 4 / 3 | 1600×1200 | Someone alone at a desk mid-session, lit only by the monitor. Room reads late-evening. The feeling is *the session is going fine and nobody is talking.* Not sad-stock-photo sad — just unaccompanied. |
| `tox-abuse` | 3 / 4 | 1200×1600 | Portrait, headset on, pulling back from the mic. Face partly out of frame. Tension in the shoulders, not the expression. |
| `tox-ghosting` | 3 / 4 | 1200×1600 | An empty chair still lit by a screen, headset on the desk. Nobody in frame. This is the one that must have no person in it. |
| `tox-catfishing` | 3 / 4 | 1200×1600 | A face lit hard from one side so half of it is unreadable. Ambiguity is the subject. Avoid anything that reads as menace — the point is *unverified*, not *dangerous*. |
| `persona-soojin` | 1 / 1 | 1200×1200 | Soo-jin, 28, marketer, Seoul. Square crop, natural light, at home rather than at a desk. She should look like someone with two free evenings, not a gamer archetype. |
| `persona-ren` | 1 / 1 | 1200×1200 | Ren, 24, student, Osaka. Square crop. Mic visible but unused. Same register as above. |

### Priority 2 — real content, but the page holds without them

| id | Ratio | Export at | What it is |
|---|---|---|---|
| `market-us` | 16 / 10 | 1920×1200 | US context. A living room or dorm, two or three people around one screen. Evening. |
| `market-japan` | 16 / 10 | 1920×1200 | Japan context. Street-level or a game centre at night. Collectible/gacha texture if you can get it — that is the section's actual argument. |
| `road-korea` | 4 / 3 | 1600×1200 | A PC café, Korea. Rows of machines. This one is nearly impossible to fake convincingly, so a real photo beats a generated one. |
| `road-us` | 4 / 3 | 1600×1200 | Creator-facing: a small setup with a ring light, someone mid-stream. |
| `road-japan` | 4 / 3 | 1600×1200 | Retail. A shelf of blind-box or gacha product. |
| `team-sagar` | 4 / 5 | 1200×1500 | Real headshot. Plain background, even light. |
| `team-two` | 4 / 5 | 1200×1500 | Real headshot, same treatment so the pair matches. |

### Optional — video

Cleo uses video in the full-bleed cards and the feature grid, and it is a
large part of why the page feels alive. Any of the Priority-1 stills can be
a **3–6 second silent loop** instead, same framing:

- No cuts. One continuous shot with almost no motion — a hand moving, a
  screen flickering, someone breathing.
- 1080p, H.264, under ~2 MB each. Muted; they autoplay.
- Export a still from frame one as the `poster`.

`tox-ghosting` is the strongest candidate: an empty lit chair with the
screen flickering does more in four seconds than any still can.

---

## A note on generated people

Priority-1 rows 1–4 are situations, not identities — generated imagery is
fine there, and probably better than stock.

Rows 5–6 (`persona-*`) and both `team-*` rows are different. Generated faces
presented as named users or as the founding team on a pre-launch investor
page is a credibility risk: it is the kind of thing that gets noticed, and
once noticed it recolours everything else on the page. Recommendation:

- **Personas** — use illustration, or the existing mascot, or a heavily
  abstracted treatment (Cleo runs its testimonial portraits through a
  halftone dot-matrix filter for exactly this reason). Do not use a
  photoreal generated face.
- **Team** — real photographs of the two of you, or no photographs. Those
  are the only two honest options.

---

## What is already covered and needs nothing

- **Hero 3D.** Live WebGL, `src/cleo/three/Phone.jsx`. It renders the phone
  and puts `public/img/ui_home.webp` on its screen. No render, no frame
  sequence, no file to produce. To change which screen it shows, pass a
  different `screen` prop in `sections/Hero.jsx`.
- **App screenshots.** All eight `ui_*.webp` are in use across the Product
  and In-the-app sections.
- **Brand marks.** `mark.webp` in the masthead and footer.
- **Fonts.** Switzer and DM Mono, self-hosted in `public/fonts`. Nothing to buy.
