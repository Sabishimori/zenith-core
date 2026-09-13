# Zenith Core — product truth

Captured 2026-09-06 from the approved v2 concept page, the IR deck, and a
direct decision round with the founder. Product facts only; every visual
decision lives in DESIGN.md.

## What it is

A **gaming companionship platform**. Zenith matches players on conversation
and safety rather than rank — because a game mate is not the person who plays
best, it is the person you actually click with.

It owns the space *between* matches: identity, discovery, live voice, and an
economy that rewards showing up for people.

## Status — this is the constraint that shapes everything

**Pre-launch. Nothing is publicly available yet.** Next milestone is a Korean
closed beta. Every performance number in the material is a target or a
simulation, never a measurement, and must stay labelled as such.

## Audience for this surface

Two, in this order:

1. **Prospective beta players** — the waitlist is the conversion.
2. **Investors and promoters** who want to see the concept and the thinking.

It is explicitly *not* an official product launch site.

## Disclosure boundary — do not publish

The founder scoped this: show the story and the product, withhold the raise.
Never put on this surface:

- The $5M ask, or the $0.8M committed capital
- LTV/CAC, MRR targets, per-channel CAC
- Any unit economics

The page says financials are shared on request. That is the whole treatment.

## The six product surfaces

Identity · Discovery · Live voice · Player rental · Coins · Stickers

## The core mechanic

**State Match.** Disposition is fixed, state changes, and Zenith reads both.

- **Trait** — who am I as a mate: Big Five personality, preferred genres, voice
  score, tone (formal, casual, emoji frequency)
- **State** — what do I need right now: mood, session length, mic on or off,
  whether to avoid a heavy tone

The design decision that defines the product: **ask how you are before asking
what you play.** State first, genre second.

Flow: sign up → state check-in → matched, in twenty-eight seconds.

## The problem it argues against

Skill-based matching loses about half its users by week three. Skill tells you
who *can* play; it does not tell you who will come back. Three toxicity
patterns break the platform even when the match is right: abuse, ghosting,
catfishing.

## Numbers, and exactly how they may be used

| Figure | Status | Required framing |
|---|---|---|
| 22% D30 retention, skill-matching | Observed band across comparable services | may state |
| 65% D30 target, conversation-led | Zenith hypothesis, closed-beta simulation | **"not yet measured in market"** |
| 92.4 conversation compatibility | Simulated, pre-launch | **must be labelled simulated** |
| 0.4 relationship risk /10 | Simulated, pre-launch | **must be labelled simulated** |
| 120ms check-in to cards | Simulated, pre-launch | **must be labelled simulated** |
| 230M gamers US + Japan | Newzoo / IMARC / Statista | cite source |
| $418 Japan mobile ARPU | Newzoo / IMARC / Statista | cite source |
| $188.8B global games market 2025 | Newzoo / IMARC / Statista | cite source |

Fabricating traction, testimonials, logos or press is out of bounds. The
caveats are part of the claim, not fine print to be dropped for rhythm.

## Safety, as a product feature

Chemistry can read 92; if risk sits above the line it still is not sent.
Under 80 re-match · 80–90 candidate · above 90 matched immediately.
Risk under 2.0 exposed · 2–5 conditional · above 5 blocked automatically.

**Safe Match Mode**: if your last session ran sharp, Zenith says so before the
next match and offers a calmer mate — protection placed before the
introduction, not after the report.

## Go to market

Korea (closed beta, 500 players, PC-café partnerships) → United States
(creator partnerships, LA / NY / Austin) → Japan (retail and gacha tie-ins).

## Team

- **Sabishimori** — UX/UI design lead. Born in India. KSK Engineers, then four
  years at DDM Town.
- **Kim Jin-seok** — platform operations and security design.
- **Lee Bo-kyung** — social marketing and partner care.

Open item: CTO 안재혁 appears in the IR deck but not on the site.

## Contact

zenithcore0313@gmail.com — **placeholder, must be replaced before publishing.**

## Decisions for this build (founder, 2026-09-06)

- **Stack**: React + Three.js (react-three-fiber).
- **3D**: the Zenith Coin as a real lit 3D object, reacting to scroll and
  cursor. WebGL carries the brand centrepiece; it is not decoration.
- **Scope**: tight beta landing plus waitlist, not the full 13-section IR
  narrative.
- **Register**: push bolder and more premium than the v2 concept page.
- **Waitlist**: full form states against a stub; real endpoint wired later.
