import { Slot } from '../components/Media.jsx';

const PHASES = [
  {
    id: 'road-korea',
    place: 'Korea',
    role: 'Testbed',
    lines: [
      'Closed beta, 500 players.',
      'PC-café partnerships for the first cohort.',
    ],
  },
  {
    id: 'road-us',
    place: 'United States',
    role: 'Scale',
    lines: [
      'Creator partnerships as the acquisition channel.',
      'Los Angeles, New York, Austin.',
    ],
  },
  {
    id: 'road-japan',
    place: 'Japan',
    role: 'Monetise',
    lines: [
      'Retail and gacha tie-ins.',
      'The collectible layer lands where it is already native.',
    ],
  },
];

/* 06 — Where we are. */
export default function Roadmap() {
  return (
    <section className="section roadmap" id="roadmap">
      <div className="shell">
        <p className="t-eyebrow reveal">06 — Where we are</p>
        <h2 className="t-headline roadmap__title reveal reveal--display" style={{ '--d': '80ms' }}>
          Prove it in Korea, then follow the spend.
        </h2>

        <ol className="roadmap__grid">
          {PHASES.map((p, i) => (
            <li key={p.id} className="reveal" style={{ '--d': `${i * 90}ms` }}>
              <Slot id={p.id} ratio="4 / 3" alt="" />
              <p className="t-eyebrow roadmap__role">
                Phase {i + 1} — {p.role}
              </p>
              <h3 className="t-sub roadmap__place">{p.place}</h3>
              <ul className="roadmap__lines">
                {p.lines.map((l) => (
                  <li className="t-body" key={l}>
                    {l}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="t-eyebrow roadmap__status reveal">
          Still in design and development.
        </p>
      </div>
    </section>
  );
}
