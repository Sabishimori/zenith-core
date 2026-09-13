import { Slot } from '../components/Media.jsx';
import Panel, { PanelRow } from '../components/Panel.jsx';

/* 01 — Retention collapse.
   Cleo's two-up media row: a pair of near-full-height panels, 8px from the
   page edge and 8px from each other, each captioned at the bottom-left.
   Both figures carry their caveat inline, per DESIGN.md — the 22% is an
   observed band, the 65% is simulated and says so. */
export default function Problem() {
  return (
    <section className="section-flush" id="problem">
      <PanelRow cols={2}>
        <Panel
          eyebrow="01 — The problem"
          title="Skill-based matching loses half its users by week three."
          body="Skill tells you who can play. It does not tell you who comes back — rank matches the hands and ignores the person holding them."
          media={<Slot id="problem-retention" ratio="1 / 1" alt="" />}
        />

        <Panel
          title="Twenty-two percent still here at day thirty."
          body="Observed band across comparable skill-matched products. The conversation-led target is 65% — simulated, not yet measured."
          media={<Slot id="problem-figures" ratio="1 / 1" alt="" />}
        >
          <dl className="figures">
            <div className="figures__item">
              <dt className="c-eyebrow">Skill-matched</dt>
              <dd className="figures__value">22%</dd>
            </div>
            <div className="figures__item">
              <dt className="c-eyebrow">Conversation-led</dt>
              <dd className="figures__value figures__value--accent">65%</dd>
            </div>
          </dl>
        </Panel>
      </PanelRow>
    </section>
  );
}
