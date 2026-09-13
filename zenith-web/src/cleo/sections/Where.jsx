const RIVALS = [
  {
    name: 'Skill marketplaces',
    solves: 'You can hire someone good, tonight, reliably.',
    misses: 'It is a transaction. Nothing about it is designed to repeat.',
  },
  {
    name: 'Community voice apps',
    solves: 'Relationships form and persist, sometimes for years.',
    misses: 'You have to already know someone to get in. There is no front door.',
  },
  {
    name: 'LFG tools',
    solves: 'A group gets filled in seconds.',
    misses: 'It matches on the slot, not the person. The group dissolves at the end.',
  },
];

/* Where we sit. This is the section that answers "why hasn't Discord done
   this" — the thing most pitches skip. It earns its place by naming what
   each rival genuinely does well before naming what it misses. */
export default function Where() {
  return (
    <section className="section where" id="where">
      <div className="shell">
        <p className="t-eyebrow reveal">Where we sit</p>
        <h2 className="t-headline where__title reveal reveal--display" style={{ '--d': '80ms' }}>
          Plenty of products match well.
          <br />
          <span className="ink-soft">
            None do conversation and safety together.
          </span>
        </h2>

        <div className="where__grid">
          {RIVALS.map((r, i) => (
            <article
              key={r.name}
              className="card where__card reveal"
              style={{ '--d': `${i * 80}ms` }}
            >
              <h3 className="t-lead where__name">{r.name}</h3>
              <dl className="where__dl">
                <dt className="t-eyebrow">Solves</dt>
                <dd className="t-body">{r.solves}</dd>
                <dt className="t-eyebrow">Misses</dt>
                <dd className="t-body">{r.misses}</dd>
              </dl>
            </article>
          ))}
        </div>

        <p className="t-sub where__close reveal" style={{ '--d': '240ms' }}>
          The corner nobody occupies.
        </p>
      </div>
    </section>
  );
}
