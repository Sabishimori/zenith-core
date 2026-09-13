export default function Problem() {
  return (
    <section id="problem">
      <div className="float bg" data-speed="0.14" style={{ top: '12%', left: '-5%' }}><img src="/img/coin-moss.webp" alt="" loading="lazy" width="1671" height="940" /></div>
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3">
            <p className="num animate">01</p>
            <h2 className="small-title animate">Retention collapse</h2>
          </div>
          <div className="col col-7">
            <p className="statement split">Skill-based matching loses half its users by week three.</p>
            <p className="small animate">Skill tells you who can play. It does not tell you who will come back. The people who leave first make it look like there is nobody worth playing with, and the ones who stay leave later because the conversation never worked.</p>
            <div className="metrics" style={{ marginTop: '2.5rem' }}>
              <div className="metric animate">
                <p className="v">22%</p>
                <p className="k micro">D30 retention · skill-matching platforms</p>
                <p className="small" style={{ marginTop: '.4rem' }}>Observed band across comparable services</p>
              </div>
              <div className="metric animate">
                <p className="v">65%</p>
                <p className="k micro">D30 target · conversation-led matching</p>
                <p className="small" style={{ marginTop: '.4rem' }}>Zenith hypothesis from closed-beta simulation. Not yet measured in market.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
