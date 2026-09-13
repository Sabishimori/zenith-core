import { useState } from 'react';
import Device from '../components/Device.jsx';

/**
 * The product — one section, one phone.
 *
 * This replaces two: a six-screen sign-up rail and a separate four-tab
 * "in the app" stage. Eight screenshots across two sections read as a
 * contact sheet and said less than five do, and the rail also overflowed
 * the page horizontally at desktop width.
 *
 * Five surfaces, one at a time, in a device frame. What is deliberately
 * NOT here is the order of the sign-up sequence: the screenshots were never
 * the sensitive part, the sequence is. What gets asked, in what order, and
 * what the app does with the answer IS the product, and laying it out in
 * numbered steps hands that over for nothing.
 *
 * Held back on purpose, all still in /public/img if the call changes:
 *   ui_intent     the four-way "what are you looking to do right now"
 *                 taxonomy — the most liftable idea in the app
 *   ui_onboard    the match-preference mechanics (same rank / higher / any),
 *                 which is how the matching is steered
 *   ui_signin     a sign-in screen; carries no argument
 *   ui_style      session-kind card, folded into the check-in below
 *   ui_collection stickers; the economy is already made by Coins
 *
 * Each body describes only what is visibly on its screen. The screenshot is
 * the claim, so the copy must not outrun it.
 */
const SURFACES = [
  {
    key: 'checkin',
    label: 'The check-in',
    src: '/img/ui_checkin.webp',
    title: 'How you are, not what you play',
    body: 'Available now, later, or not at all. How long you have, and when you usually play. This is the whole idea in one screen.',
  },
  {
    key: 'matched',
    label: 'Matched',
    src: '/img/ui_home.webp',
    title: 'People, not leaderboards',
    body: 'Every card leads with the games someone plays, whether their mic is on, and what a session costs.',
  },
  {
    key: 'discover',
    label: 'Discovery',
    src: '/img/ui_discover.webp',
    title: 'Browse people, not ranks',
    body: 'Every card leads with how someone plays with others, not how well they play.',
  },
  {
    key: 'voice',
    label: 'Live voice',
    src: '/img/ui_voice.webp',
    title: 'Rooms that outlast the match',
    body: 'Rooms you can drop into. Moderation runs on the room, not on reports filed afterwards.',
  },
  {
    key: 'coins',
    label: 'Coins',
    src: '/img/ui_wallet.webp',
    title: 'An economy you carry',
    body: 'A struck object you keep, not a rank you lose the moment you stop playing.',
  },
];

export default function Product() {
  const [active, setActive] = useState(SURFACES[0].key);
  const current = SURFACES.find((s) => s.key === active) ?? SURFACES[0];

  return (
    <section className="section product" id="product">
      <div className="shell">
        <p className="t-eyebrow reveal">02 — The product</p>
        <h2
          className="t-headline product__title reveal reveal--display"
          style={{ '--d': '80ms' }}
        >
          Sign up, check in, matched.
          <br />
          <span className="ink-soft">Twenty-eight seconds.</span>
        </h2>

        <div className="inapp__stage reveal" style={{ '--d': '160ms' }}>
          <div className="inapp__panel">
            <Device
              className="device--stage"
              src={current.src}
              alt={`${current.label} screen`}
              key={current.src}
            />

            <div className="inapp__detail">
              {/* The surface's own name, which the copy never says out loud —
                  without it the paragraph reads as a caption beside a phone
                  rather than as an answer to the tab. */}
              <p className="t-eyebrow inapp__surface">{current.label}</p>
              <h3 className="t-lead">{current.title}</h3>
              <p className="t-body inapp__copy">{current.body}</p>

              <div className="switcher" role="tablist" aria-label="App surfaces">
                {SURFACES.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    role="tab"
                    aria-selected={active === s.key}
                    className={`switcher__tab${active === s.key ? ' is-active' : ''}`}
                    onClick={() => setActive(s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="t-sub inapp__close reveal" style={{ '--d': '240ms' }}>
          Ask how you are before asking what you play.
        </p>
      </div>
    </section>
  );
}
