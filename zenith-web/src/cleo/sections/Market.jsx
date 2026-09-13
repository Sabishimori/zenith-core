import { Slot } from '../components/Media.jsx';

const FIGURES = [
  ['230M', 'Gamers, US + Japan', 'Newzoo, 2025'],
  ['$418', 'Japan mobile ARPU', 'IMARC'],
  ['$188.8B', 'Global games market, 2025', 'Statista'],
];

const US = [
  'The spend is already there and already social.',
  'Creator partnerships reach the exact age band we need.',
  'English-first means the check-in model ships without a translation layer.',
];

const JAPAN = [
  'The highest mobile ARPU of any market we could enter second.',
  'Collectible and gacha mechanics are native there, not an import.',
];

/* 05 — Market. Every figure is cited inline; these are the only numbers on
   the page that are not simulated, and the distinction has to be visible. */
export default function Market() {
  return (
    <section className="section market" id="market">
      <div className="shell">
        <p className="t-eyebrow reveal">05 — Market</p>
        <h2 className="t-headline market__title reveal reveal--display" style={{ '--d': '80ms' }}>
          Two markets that have already proved they will pay.
        </h2>

        <ul className="market__figures">
          {FIGURES.map(([value, label, source], i) => (
            <li key={label} className="reveal" style={{ '--d': `${i * 80}ms` }}>
              <p className="market__value">{value}</p>
              <p className="t-eyebrow">{label}</p>
              <p className="t-micro">{source}</p>
            </li>
          ))}
        </ul>

        <div className="market__pair">
          <article className="market__side reveal">
            <Slot id="market-us" ratio="16 / 10" alt="" />
            <p className="t-eyebrow market__where">Why the United States first</p>
            <ul className="market__list">
              {US.map((l) => (
                <li className="t-body" key={l}>
                  {l}
                </li>
              ))}
            </ul>
          </article>

          <article className="market__side reveal" style={{ '--d': '120ms' }}>
            <Slot id="market-japan" ratio="16 / 10" alt="" />
            <p className="t-eyebrow market__where">Why Japan next</p>
            <ul className="market__list">
              {JAPAN.map((l) => (
                <li className="t-body" key={l}>
                  {l}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
