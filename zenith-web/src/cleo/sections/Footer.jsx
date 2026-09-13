/* TODO(content): placeholder email, same as Talk.jsx. */
const EMAIL = 'zenithcore0313@gmail.com';

const INDEX = [
  ['01 — The problem', '#problem'],
  ['02 — The product', '#product'],
  ['03 — The technology', '#tech'],
  ['04 — Who we build for', '#who'],
  ['05 — Market', '#market'],
  ['06 — Where we are', '#roadmap'],
  ['07 — Team', '#team'],
];

/* `base` mirrors Masthead's: empty on the overview so the index is a set
   of in-page anchors, "/" on any other page so the same list still lands on
   the right section. */
export default function Footer({ base = '' }) {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <img
            src="/img/mark.webp"
            alt="Zenith"
            width="621"
            height="357"
            className="footer__mark"
          />
          <p className="t-body footer__line">
            Not who plays best. Who you click with.
          </p>
        </div>

        <nav className="footer__index" aria-label="Contents">
          <p className="t-eyebrow footer__label">Contents</p>
          <ul>
            {INDEX.map(([label, href]) => (
              <li key={href}>
                <a className="t-body footer__link" href={`${base}${href}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__meta">
          <p className="t-eyebrow footer__label">Status</p>
          <p className="t-body">Still in design and development.</p>

          <p className="t-eyebrow footer__label footer__label--gap">Contact</p>
          <a className="t-body footer__link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="shell footer__base">
        <p className="t-micro">
          Zenith&reg; — concept. Retention targets are simulated and
          labelled as such; market figures are cited to Newzoo, IMARC and
          Statista. The matching model is not described on this page.
        </p>
      </div>
    </footer>
  );
}
