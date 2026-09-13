import { useRef } from 'react';

import { useWordWarm } from '../hooks.js';

/**
 * Cleo's one recurring motion signature: a centred two-line statement whose
 * second line warms word by word as it enters view — peach to full ink on
 * theirs, violet to full ink here — blurring in as it goes.
 *
 * The whole line is present from the first frame; only colour and blur
 * move. Nothing reflows, so it never shifts the page under the reader.
 */
export default function Statement({ lead, warm, id }) {
  const scope = useRef(null);
  const p = useWordWarm(scope);

  const words = warm.split(' ');
  /* Spread the warm across the words with a little overlap, so it reads as
     one sweep rather than a row of switches. */
  const span = 1 / (words.length + 2);

  return (
    <section className="section statement" ref={scope} id={id}>
      <div className="shell">
        <p className="t-statement statement__lead">{lead}</p>
        <p className="t-statement statement__warm" aria-label={warm}>
          {words.map((w, i) => {
            const t = Math.min(1, Math.max(0, (p - i * span) / (span * 3)));
            return (
              <span
                key={`${w}-${i}`}
                aria-hidden="true"
                style={{
                  '--t': t,
                  filter: `blur(${(1 - t) * 7}px)`,
                }}
              >
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
