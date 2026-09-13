export default function Who() {
  return (
    <section id="who">
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3">
            <p className="num animate">04</p>
            <h2 className="small-title animate">Who we build for</h2>
          </div>
          <div className="col col-7">
            <div className="svc">
              <div className="animate persona">
                <h4>Soo-jin</h4>
                <p className="micro">28 · marketer · Seoul to LA · solo ranked four nights a week</p>
                <p className="small" style={{ marginTop: '1rem' }}><em>Pain.</em> Rank is something you climb together, and her friends all married off and drifted away.</p>
                <p className="small"><em>Wants.</em> Someone to be around for thirty minutes after work, with conversation that runs by itself.</p>
              </div>
              <div className="animate persona">
                <h4>Ren</h4>
                <p className="micro">24 · student · Tokyo · heavy gacha spender</p>
                <p className="small" style={{ marginTop: '1rem' }}><em>Pain.</em> Pulled something great and has nobody to show it to.</p>
                <p className="small"><em>Wants.</em> To stop spending so long hunting for someone in the same game just to be around.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
