export default function Team() {
  return (
    <section id="team">
      <div className="container rule-b">
        <div className="row">
          <div className="col col-2 offset-3">
            <p className="num animate">07</p>
            <h2 className="small-title animate">Team</h2>
          </div>
          <div className="col col-7">
            <p className="statement split">Three people sitting on the opposite side of the problem.</p>
            <div className="svc" style={{ marginTop: '2.5rem' }}>
              <div className="animate">
                <h4 className="micro">Sabishimori</h4>
                <p className="small">UX/UI design lead. Born in India. KSK Engineers, then four years at DDM Town.</p>
              </div>
              <div className="animate">
                <h4 className="micro">Kim Jin-seok</h4>
                <p className="small">Platform operations and security design. Computer information security. Esports and MCN background.</p>
              </div>
              <div className="animate">
                <h4 className="micro">Lee Bo-kyung</h4>
                <p className="small">Social marketing and partner care. Instagram creator with a 100K following, previously a top-ranked partner at a competing platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
