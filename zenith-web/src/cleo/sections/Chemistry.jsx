/**
 * Chemistry and risk.
 *
 * This section used to lead with three figures — a 92.4 compatibility score,
 * a 0.4 risk reading and a 120ms check-in latency, each labelled simulated.
 * They were removed on request: they are outputs of the matching model, and
 * publishing the model's own readings tells a competitor what the scale is,
 * what it optimises for and roughly how well it performs. The caveat made
 * them honest; it did not make them safe to publish.
 *
 * What is left is the part that is a promise to a user rather than a
 * disclosure about a model: that safety outranks a good score, always. That
 * claim costs nothing to make in public and is the actual differentiator.
 *
 * Market statistics stay on the page — those are cited third-party numbers
 * in `Market.jsx`, which is a different thing from our own telemetry.
 */
export default function Chemistry() {
  return (
    <section className="section chemistry" id="chemistry">
      <div className="shell">
        <div className="chemistry__wash">
          <p className="t-eyebrow reveal">Chemistry and risk</p>
          <h2
            className="t-headline chemistry__title reveal reveal--display"
            style={{ '--d': '80ms' }}
          >
            Chemistry is a reason to offer.
            <br />
            <span className="ink-soft">Risk is a reason not to.</span>
          </h2>

          <div className="bubble bubble--lg chemistry__safe reveal" style={{ '--d': '160ms' }}>
            <p className="t-eyebrow">Safe Match Mode</p>
            <p className="t-lead chemistry__safe-copy">
              A strong match is a reason to offer an introduction, never a
              reason to override the safety gate. When the two disagree the
              gate wins and the match is not sent &mdash; protection placed
              before the introduction, not after the report.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
