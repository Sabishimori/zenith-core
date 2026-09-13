export default function Market() {
  return (
    <section id="market">
      <div className="float bg" data-speed="-0.2" style={{ top: '14%', right: '-6%' }}><img src="/img/mark.webp" alt="" loading="lazy" width="621" height="357" /></div>
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3">
            <p className="num animate">05</p>
            <h2 className="small-title animate">Market</h2>
          </div>
          <div className="col col-7">
            <p className="statement split">Two markets that have already proved they will pay.</p>
            <div className="metrics" style={{ marginTop: '2.5rem' }}>
              <div className="metric animate"><p className="v">230M</p><p className="k micro">Gamers across the US and Japan</p></div>
              <div className="metric animate"><p className="v">$418</p><p className="k micro">Japan mobile ARPU — second highest worldwide</p></div>
              <div className="metric animate"><p className="v">$188.8B</p><p className="k micro">Global games market, 2025</p></div>
            </div>
            <div className="svc" style={{ marginTop: '3rem' }}>
              <div className="animate">
                <h4 className="micro">Why the US first</h4>
                <ul><li>A precedent has already validated the category</li><li>The same visible-transaction behaviour</li><li>Low localisation cost</li></ul>
              </div>
              <div className="animate">
                <h4 className="micro">Why Japan next</h4>
                <ul><li>Second-highest mobile ARPU in the world</li><li>Gacha culture — a market already fluent in paying for feeling</li></ul>
              </div>
            </div>
            <p className="small animate" style={{ marginTop: '2rem' }}>Sources: Newzoo 2025 Global Games Market, IMARC, Statista.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
