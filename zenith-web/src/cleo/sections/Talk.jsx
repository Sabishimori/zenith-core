/* Get in touch. Financials, unit economics and the funding ask are
   deliberately absent per PRODUCT.md's disclosure boundary — that stays
   true regardless of how the rest of the page changes.

   TODO(content): zenithcore0313@gmail.com is a placeholder and must be
   replaced before this is published anywhere real. */
const EMAIL = 'zenithcore0313@gmail.com';

/* The closing statement, composed after the dc-dev hero: one column of
   enormous type set on a flat grey ground, each line indented differently
   so the block reads as a ragged poem rather than a centred heading, a
   ghosted wordmark filling the panel behind it, a solid card dropped on top
   of the type so it interrupts a word mid-line, and the small meta text
   pinned into the corners.
 *
 * The per-line indents are the whole composition, which is why they are
 * data rather than CSS: they have to be read as a rhythm down the column,
 * and seven `nth-child` rules in a stylesheet cannot be read that way.
 * Percentages of the type block's own width, so the stagger holds its shape
 * at every viewport instead of collapsing as the type scales.
 *
 * The reference is grey ground, black type, red card. Only the card moves
 * to the brand: everything else is the reference's own value structure,
 * which is where its weight comes from. */
const LINES = [
  { text: 'The', x: 30 },
  { text: 'relationship', x: 18 },
  /* The three lines the card lands on are placed against its edges, not
     without reference to them. "market is" runs out of the left and is
     clipped at its tail; "empty." and "We intend" start beyond the card's
     right edge. The reference never lets the card swallow a whole word —
     it takes the end of one and the sentence still reads. */
  { text: 'market is', x: 10 },
  { text: 'empty.', x: 64 },
  { text: 'We intend', x: 58 },
  { text: 'to take', x: 48 },
  { text: 'it first.', x: 38 },
];

export default function Talk() {
  return (
    <section className="talk" id="talk">
      <div className="talk__stage">
        {/* Set in the ground rather than on it — a shade off the panel and
            nothing more. It is the reason the type has something to sit in
            front of. */}
        <p className="talk__mark" aria-hidden="true">
          zenith
        </p>

        <p className="talk__corner talk__corner--tl">
          <span className="talk__spark" aria-hidden="true">
            ✳
          </span>
          Contact
        </p>

        <p className="talk__corner talk__corner--tr">
          We would rather hear where this breaks than be told that it is
          good.
        </p>

        {/* One heading, seven blocks. Each line is a block so the indent has
            something to act on; the reading order is unchanged, so this
            still announces as the single sentence it is. */}
        <h2 className="talk__type">
          {LINES.map((l) => (
            <span key={l.text} className="talk__line" style={{ '--x': l.x }}>
              {l.text}
            </span>
          ))}
        </h2>

        <div className="talk__card">
          <p className="talk__card-brand">
            <img src="/img/mark.webp" alt="" width="621" height="357" />
            zenith
          </p>

          <p className="talk__card-copy">
            Zenith is still in design and development, which is the useful
            half of the conversation.
          </p>

          <p className="talk__card-copy talk__card-copy--soft">
            From matching and check-ins to risk gating and the research
            behind it — investment, pilots and press all start here.
          </p>

          <a className="talk__card-link" href={`mailto:${EMAIL}`}>
            Email us
            <span aria-hidden="true">↗</span>
          </a>

          {/* Anchored to the card's right edge and hung half outside it, so
              the circle is cut by the edge exactly as the reference's is.
              The label runs on past it, over the type. */}
          <a className="talk__action" href="/contact.html">
            {/* The mark rather than a lightning glyph: the disc is the one
                place in this composition where the brand can appear at a
                size you can actually read it, and an emoji bolt was
                borrowing someone else's icon set to say "action". */}
            <span className="talk__action-dot" aria-hidden="true">
              <img src="/img/mark.webp" alt="" width="621" height="357" />
            </span>
            <span className="talk__action-label">
              <span className="talk__action-kicker">Ready</span>
              <span className="talk__action-text">Start a conversation</span>
            </span>
          </a>
        </div>

        <div className="talk__foot">
          <p className="talk__est">
            <span className="talk__est-label">Est.</span>
            <span className="talk__est-year">2026</span>
            <span className="talk__est-slash">//</span>
            <span className="talk__est-name">zenith&reg;</span>
          </p>
          <p className="talk__trade">
            Gaming
            <br />
            Companionship
          </p>
        </div>
      </div>
    </section>
  );
}
