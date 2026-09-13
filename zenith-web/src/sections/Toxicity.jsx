export default function Toxicity() {
  return (
    <section>
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3"><h3 className="small-title animate">Three toxicity patterns</h3></div>
          <div className="col col-7">
            <p className="statement split">You can make the match. If the conversation breaks, the platform breaks.</p>
            <div className="svc" style={{ marginTop: '2.5rem' }}>
              <div className="animate"><h4 className="micro">01 · Abuse</h4><ul><li>Slurs and demeaning speech</li><li>Trigger words that must leave voice chat immediately</li></ul></div>
              <div className="animate"><h4 className="micro">02 · Ghosting</h4><ul><li>No reply, or mute and vanish</li><li>Matching cost spent, no revenue event</li></ul></div>
              <div className="animate"><h4 className="micro">03 · Catfishing</h4><ul><li>Fake profiles, pulled off to another game</li><li>Payment-fraud traffic noise</li></ul></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
