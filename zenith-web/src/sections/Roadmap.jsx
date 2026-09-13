export default function Roadmap() {
  return (
    <section id="roadmap">
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3">
            <p className="num animate">06</p>
            <h2 className="small-title animate">Where we are</h2>
          </div>
          <div className="col col-7">
            <p className="statement split">Prove it in Korea, then follow the spend.</p>
            <div style={{ marginTop: '2.5rem' }}>
              <div className="phase animate">
                <p className="micro">Phase 01 · Korea · testbed</p>
                <p className="small" style={{ marginTop: '.5rem' }}>Closed beta with 500 players and PC-café partnerships, validating how the relationship score actually distributes.</p>
              </div>
              <div className="phase animate">
                <p className="micro">Phase 02 · United States · category</p>
                <p className="small" style={{ marginTop: '.5rem' }}>Creator partnerships across LA, New York and Austin, with natural inflow from existing gaming communities.</p>
              </div>
              <div className="phase animate">
                <p className="micro">Phase 03 · Japan · monetisation</p>
                <p className="small" style={{ marginTop: '.5rem' }}>Tokyo retail and gacha tie-ins, built for a market already used to paying for limited, emotional goods.</p>
              </div>
            </div>
            <p className="animate" style={{ marginTop: '2rem' }}><span className="flag">Currently pre-launch</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
