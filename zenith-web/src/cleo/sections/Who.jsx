import { useState } from 'react';

import { Slot } from '../components/Media.jsx';

const PEOPLE = [
  {
    id: 'persona-soojin',
    name: 'Soo-jin',
    meta: '28 · Marketer · Seoul',
    pain: 'Plays two evenings a week and has never kept a single person from a match. Every session starts with strangers and ends with nothing.',
    want: 'Two or three people she can message on a Thursday, who already know how she plays.',
  },
  {
    id: 'persona-ren',
    name: 'Ren',
    meta: '24 · Student · Osaka',
    pain: 'Stopped using voice entirely after being abused in a lobby. Now queues muted, which makes every match worse.',
    want: 'A room where the moderation is real, so turning the mic on is not a risk to take alone.',
  },
];

/* 04 — Who we build for. Cleo's testimonial carousel: white 30px cards,
   a portrait beside the quote, attribution in mono, circular arrows. */
export default function Who() {
  const [i, setI] = useState(0);
  const p = PEOPLE[i];

  return (
    <section className="section who" id="who">
      <div className="shell">
        <div className="who__head">
          <div>
            <p className="t-eyebrow reveal">04 — Who we build for</p>
            <h2 className="t-headline who__title reveal reveal--display" style={{ '--d': '80ms' }}>
              Two people, one missing thing.
            </h2>
          </div>

          <div className="who__nav" aria-label="Personas">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setI((v) => Math.max(0, v - 1))}
              disabled={i === 0}
              aria-label="Previous person"
            >
              &larr;
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setI((v) => Math.min(PEOPLE.length - 1, v + 1))}
              disabled={i === PEOPLE.length - 1}
              aria-label="Next person"
            >
              &rarr;
            </button>
          </div>
        </div>

        <article className="card who__card reveal" style={{ '--d': '160ms' }}>
          <Slot id={p.id} ratio="1 / 1" className="who__portrait" alt="" />

          <div className="who__body">
            <p className="t-sub who__pain">{p.pain}</p>
            <p className="t-body who__want">
              <span className="ink-accent">What&rsquo;s missing — </span>
              {p.want}
            </p>
            <p className="t-eyebrow who__attrib">
              {p.name} <span className="ink-soft">· {p.meta}</span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
