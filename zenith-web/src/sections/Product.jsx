export default function Product() {
  return (
    <section id="product">
      <div className="float md" data-speed="-0.18" style={{ top: '16%', right: '-4%' }}><img src="/img/mascot.webp" alt="" loading="lazy" width="771" height="524" /></div>
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3">
            <p className="num animate">02</p>
            <h2 className="small-title animate">The product</h2>
          </div>
          <div className="col col-7">
            <p className="statement split">Sign up, check in, matched — twenty-eight seconds.</p>
            <p className="small animate">The moment you open a mobile game, a mate with a 92-point conversation-compatibility score is already waiting. One state check-in starts the session.</p>
          </div>
        </div>
        <div className="row" style={{ marginTop: '1.5rem' }}>
          <div className="col col-9 offset-3">
            <div className="phones">
              <figure className="animate">
                <div className="phone"><img src="/img/ui_onboard.webp" alt="Onboarding: choosing games and play style" loading="lazy" width="393" height="852" /></div>
                <figcaption className="step-n small"><b>Step 01 · Onboarding</b>Your games, and how you like to play them</figcaption>
              </figure>
              <figure className="animate">
                <div className="phone"><img src="/img/ui_checkin.webp" alt="State check-in: availability and session length" loading="lazy" width="393" height="852" /></div>
                <figcaption className="step-n small"><b>Step 02 · State check-in</b>When you are free, for how long, and when you usually play</figcaption>
              </figure>
              <figure className="animate">
                <div className="phone"><img src="/img/ui_discover.webp" alt="Discover screen with recommended mates" loading="lazy" width="393" height="852" /></div>
                <figcaption className="step-n small"><b>Step 03 · Matched</b>Three recommendations, one tap to talk</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
