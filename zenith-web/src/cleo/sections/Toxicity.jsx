import { Slot } from '../components/Media.jsx';
import Panel, { PanelRow } from '../components/Panel.jsx';

const PATTERNS = [
  {
    id: 'tox-abuse',
    title: 'Abuse.',
    body: 'The voice channel is the product, and it is also the exit. Most reports arrive after the player has already left.',
  },
  {
    id: 'tox-ghosting',
    title: 'Ghosting.',
    body: 'A good session ends and nothing carries it forward. No thread, no history, no reason to come back to that person.',
  },
  {
    id: 'tox-catfishing',
    title: 'Catfishing.',
    body: 'Identity is a handle and an avatar, verified by nobody. Trust is rebuilt from zero on every single match.',
  },
];

/* Three ways the match survives and the relationship does not — a three-up
   panel row, the tightest grid Cleo uses. */
export default function Toxicity() {
  return (
    <section className="section-flush">
      <PanelRow cols={3}>
        {PATTERNS.map((p, i) => (
          <Panel
            key={p.id}
            eyebrow={i === 0 ? 'What goes wrong' : undefined}
            title={p.title}
            body={p.body}
            media={<Slot id={p.id} ratio="3 / 4" alt="" />}
          />
        ))}
      </PanelRow>
    </section>
  );
}
