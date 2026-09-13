export default function Tech() {
  return (
    <section id="tech">
      <div className="float bgr" data-speed="0.12" style={{ top: '8%', left: '-8%' }}><img src="/img/coin-gold.webp" alt="" loading="lazy" width="620" height="578" /></div>
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3">
            <p className="num animate">03</p>
            <h2 className="small-title animate">State Match</h2>
          </div>
          <div className="col col-7">
            <p className="statement split">Disposition is fixed. State changes. We read both.</p>
            <div className="svc" style={{ marginTop: '2.5rem' }}>
              <div className="animate">
                <h4 className="micro">Trait · who am I as a mate</h4>
                <ul><li>Big Five personality</li><li>Preferred genres</li><li>Voice score</li><li>Tone — formal, casual, emoji frequency</li></ul>
              </div>
              <div className="animate">
                <h4 className="micro">State · what do I need right now</h4>
                <ul><li>Mood: cheer me on, keep it easy, focus, challenge</li><li>Session length</li><li>Mic on or off</li><li>Avoid a heavy tone</li></ul>
              </div>
            </div>
            <div className="layers animate" style={{ marginTop: '2.5rem' }}>
              <div className="layer"><i>Layer 01</i><span>Trait embedding — speech and personality as a 768-dimension vector</span></div>
              <div className="layer"><i>Layer 02</i><span>State affinity — five-axis multimodal mapping of the check-in</span></div>
              <div className="layer"><i>Layer 03</i><span>Rejection learning — reinforcement on why sessions were declined</span></div>
              <div className="layer"><i>Layer 04</i><span>Risk gating — exposure only after the safety filter clears</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
