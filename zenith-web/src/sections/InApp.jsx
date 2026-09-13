export default function InApp() {
  return (
    <section id="in-app">
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3"><h3 className="small-title animate">In the app</h3></div>
          <div className="col col-7">
            <div className="phones phones-4">
              <figure className="animate">
                <div className="phone"><img src="/img/ui_home.webp" alt="Home screen with recommended mates" loading="lazy" width="393" height="852" /></div>
                <figcaption className="step-n small"><b>Discovery</b>Mates with chemistry, rate and mic status</figcaption>
              </figure>
              <figure className="animate">
                <div className="phone"><img src="/img/ui_voice.webp" alt="A live group voice room" loading="lazy" width="393" height="852" /></div>
                <figcaption className="step-n small"><b>Live voice</b>Group rooms that outlast the match</figcaption>
              </figure>
              <figure className="animate">
                <div className="phone"><img src="/img/ui_wallet.webp" alt="The Zenith Coins wallet" loading="lazy" width="393" height="850" /></div>
                <figcaption className="step-n small"><b>Coins</b>Balance, payouts and transfers</figcaption>
              </figure>
              <figure className="animate">
                <div className="phone"><img src="/img/ui_collection.webp" alt="Cryptic Sticker collection by rarity" loading="lazy" width="393" height="852" /></div>
                <figcaption className="step-n small"><b>Cryptic Stickers</b>Common through Legendary</figcaption>
              </figure>
            </div>
            <p className="small animate" style={{ marginTop: '1.5rem' }}>The core design decision: ask how you are before asking what you play. State first, genre second.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
