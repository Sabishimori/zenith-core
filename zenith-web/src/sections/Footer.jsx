export default function Footer() {
  return (
    <footer>
      <div className="container flush">
        <div className="foot-grid">
          <div className="foot-col">
            <a className="brand" href="#top"><img src="/img/mark.webp" alt="" width="621" height="357" /><b>Zenith</b></a>
            <p className="small" style={{ maxWidth: '32ch', marginTop: '.75rem' }}>Zenith Core Inc. A gaming companionship platform. Pre-launch — nothing is publicly available yet.</p>
          </div>
          <nav className="foot-col">
            <p className="micro">Contents</p>
            <a href="#problem">01 Problem</a>
            <a href="#product">02 Product</a>
            <a href="#tech">03 Technology</a>
            <a href="#market">05 Market</a>
          </nav>
          <div className="foot-col">
            <p className="micro">Status</p>
            <span className="small">Pre-launch</span>
            <span className="small">Korean closed beta next</span>
            <span className="small">Figures shown are targets</span>
          </div>
          <div className="foot-col">
            <p className="micro">Contact</p>
            <a href="mailto:zenithcore0313@gmail.com">zenithcore0313@gmail.com</a>
          </div>
        </div>
        <div className="foot-base">
          <p className="micro">© 2026 Zenith Core</p>
          <p className="micro">Game matching, from skill to conversation</p>
        </div>
      </div>
    </footer>
  );
}
