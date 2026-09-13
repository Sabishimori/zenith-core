export default function Chemistry() {
  return (
    <section>
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3"><h3 className="small-title animate">Chemistry and risk</h3></div>
          <div className="col col-7">
            <p className="statement split">Chemistry can read 92. If risk sits above the line, we still do not send it.</p>
            <div className="metrics" style={{ marginTop: '2.5rem' }}>
              <div className="metric animate">
                <p className="v">92.4</p>
                <p className="k micro">Conversation compatibility / 100</p>
                <p className="small" style={{ marginTop: '.4rem' }}>Under 80 re-match · 80 to 90 shown as a candidate · above 90 matched immediately</p>
              </div>
              <div className="metric animate">
                <p className="v">0.4</p>
                <p className="k micro">Relationship risk / 10 — lower is safer</p>
                <p className="small" style={{ marginTop: '.4rem' }}>Under 2.0 exposed · 2 to 5 conditional · above 5 blocked automatically</p>
              </div>
              <div className="metric animate">
                <p className="v">120ms</p>
                <p className="k micro">Check-in to recommended cards</p>
              </div>
            </div>
            <p className="small animate" style={{ marginTop: '2rem' }}><em>Safe Match Mode.</em> If your last session ran sharp, Zenith says so before the next match and offers a calmer mate instead — protection placed before the introduction, not after the report.</p>
            <p className="animate" style={{ marginTop: '1.5rem' }}><span className="flag">Simulated · pre-launch figures</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
