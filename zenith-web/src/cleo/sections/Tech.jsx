const TRAIT = [
  'How you handle a losing round',
  'Whether you lead or follow into a fight',
  'How much talk you want between rounds',
  'What you do when someone new joins',
];

const STATE = [
  'How much energy you have tonight',
  'Whether you want to win or wind down',
  'How long you can actually stay',
  'Whether you want to talk at all',
];

/* 03 — State Match. Cleo's FAQ-as-chat-thread taught the vocabulary here:
   the trait/state contrast is set as two sides of a conversation, because
   that is literally what the check-in is.

   What this section says is the positioning, which is already public in the
   pitch: disposition is fixed, state changes, we read both. What it no
   longer says is how. */
export default function Tech() {
  return (
    <section className="section tech" id="tech">
      <div className="shell">
        <p className="t-eyebrow reveal">03 — The technology</p>
        <h2 className="t-headline tech__title reveal reveal--display" style={{ '--d': '80ms' }}>
          Disposition is fixed. State changes.
          <br />
          <span className="ink-soft">We read both.</span>
        </h2>

        <div className="tech__pair">
          <div className="tech__col reveal">
            <div className="bubble bubble--lg tech__bubble">
              <p className="t-eyebrow">Trait</p>
              <p className="t-lead">Who am I as a mate?</p>
            </div>
            <ul className="tech__list">
              {TRAIT.map((t) => (
                <li className="t-body" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="tech__col tech__col--them reveal" style={{ '--d': '120ms' }}>
            <div className="bubble bubble--them bubble--violet tech__bubble">
              <p className="t-eyebrow tech__eyebrow-on">State</p>
              <p className="t-lead">What do I need right now?</p>
            </div>
            <ul className="tech__list tech__list--them">
              {STATE.map((t) => (
                <li className="t-body" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The four-layer pipeline that used to sit here — the embedding,
            the state mapping, the rejection signal and the risk gate — was
            removed on request. It is the method, and the method is the
            company: an investor page earns nothing by publishing it, and a
            competitor reads it for free. What the product DOES is above;
            how it does it belongs in a conversation under NDA. */}
        <p className="t-sub tech__close reveal" style={{ '--d': '160ms' }}>
          Both readings are taken at every check-in, and safety is applied
          before a match is ever offered &mdash; never after a report.{' '}
          <span className="ink-soft">
            The matching model itself is shared under NDA.
          </span>
        </p>
      </div>
    </section>
  );
}
