export default function Hero() {
  return (
    <section className="head">
      <div className="hero-card">

        <div className="hero-top">
          <h1 className="hero-word animate">Zenith<sup>&reg;</sup></h1>

          <div className="hero-note">
            <div className="hero-note-head animate">
              <span className="hero-chip"><img src="/img/mark.webp" alt="" width="621" height="357" /></span>
              <span className="hero-rule" aria-hidden="true"></span>
              <span className="micro">[ Pre-launch ]</span>
            </div>
            <p className="animate" style={{ '--d': '80ms' }}>A gaming companionship platform. We match on conversation and safety rather than rank &mdash; because a game mate is not the person who plays best, it is the person you actually click with.</p>
          </div>
        </div>

        <figure className="hero-figure">
          <img src="/img/coin-moss.webp" alt="A Zenith Coin set in moss, ancient wood and violet flowers" width="1671" height="940" />

          <figcaption className="hero-corner animate" style={{ '--d': '160ms' }}>
            <p className="small">Built for the space between matches &mdash; identity, discovery, live voice, and an economy that rewards showing up for people.</p>
            <div className="hero-tags">
              <span>Identity</span><span>Discovery</span><span>Live voice</span>
              <span>Player rental</span><span>Coins</span><span>Stickers</span>
            </div>
          </figcaption>

          <a className="hero-float animate" href="#product" style={{ '--d': '240ms' }}>
            <span className="shot"><img src="/img/ui_voice.webp" alt="A live group voice room in Zenith" width="393" height="852" loading="lazy" /></span>
            <span className="meta">
              <span><b>Live voice rooms</b><span>Product &middot; 2026</span></span>
              <svg className="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
            </span>
          </a>
        </figure>

      </div>
    </section>
  );
}
