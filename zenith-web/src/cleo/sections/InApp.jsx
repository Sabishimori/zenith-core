import { useState } from 'react';

const TABS = [
  {
    key: 'discover',
    label: 'Discovery',
    src: '/img/ui_discover.webp',
    body: 'Browse people, not leaderboards. Every card leads with how someone plays with others.',
  },
  {
    key: 'voice',
    label: 'Live voice',
    src: '/img/ui_voice.webp',
    body: 'Rooms you can drop into. Moderation runs on the room, not on reports filed afterwards.',
  },
  {
    key: 'coins',
    label: 'Coins',
    src: '/img/ui_wallet.webp',
    body: 'The economy is a struck object you carry, not a rank you lose when you stop playing.',
  },
  {
    key: 'stickers',
    label: 'Stickers',
    src: '/img/ui_collection.webp',
    body: 'Cryptic Stickers are earned in company. They only make sense to the people who were there.',
  },
];

/* A phone, a description of what is on it, and the control that changes
   both — as one composed pair, not three things at three corners.

   The switcher used to float absolutely at the stage's bottom centre, which
   is Cleo's pattern: a translucent pill overlaid on the media. It stopped
   working here at width. Cleo's pill floats over a full-bleed image; ours
   was floating over nine hundred pixels of empty panel, a long way from
   both the phone it controls and the copy it changes. It now sits at the
   foot of the column it belongs to, keeping the pill's own look — same
   translucent ground, same filled active tab — but in flow, under the words
   it rewrites. */
export default function InApp() {
  const [active, setActive] = useState(TABS[0].key);
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <section className="section inapp" id="inapp">
      <div className="shell">
        <p className="t-eyebrow reveal">In the app</p>
        <h2 className="t-headline inapp__title reveal reveal--display" style={{ '--d': '80ms' }}>
          Four surfaces, one thesis.
        </h2>

        <div className="inapp__stage reveal" style={{ '--d': '160ms' }}>
          <div className="inapp__panel">
            <div className="phone-tile phone-tile--lg">
              <img
                key={current.src}
                src={current.src}
                alt={`${current.label} screen`}
                width="393"
                height="852"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="inapp__detail">
              {/* The surface's own name, which the copy never said out loud
                  — without it the paragraph reads as a caption floating
                  beside a phone rather than as an answer to the tab. */}
              <p className="t-eyebrow inapp__surface">{current.label}</p>
              <p className="t-lead inapp__copy">{current.body}</p>

              <div className="switcher" role="tablist" aria-label="App surfaces">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={active === t.key}
                    className={`switcher__tab${active === t.key ? ' is-active' : ''}`}
                    onClick={() => setActive(t.key)}
                  >
                    {t.label}
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
