import { useEffect, useRef, useState } from 'react';

const QUESTIONS = [
  {
    q: 'How is this different from an LFG bot?',
    a: 'An LFG tool fills a slot. It asks what you play and when you are free, and it is finished the moment the group is full. Zenith asks how you are first, and keeps the answer — so the second match knows something the first one taught it.',
  },
  {
    q: 'What actually happens at a check-in?',
    a: 'One short exchange, about as long as a text message. It reads state, not skill: energy, how long you can stay, whether you want to talk at all. That is the input the match runs on.',
  },
  {
    q: 'Why would someone answer honestly?',
    a: 'Because the answer changes what they get in the next thirty seconds. A check-in that visibly produces a better match is the only incentive that has ever worked here.',
  },
  {
    q: 'What stops this becoming another abusive voice lobby?',
    a: 'Risk gating runs before a match is offered, not after a report is filed. When compatibility and risk disagree, risk wins and the match is simply never sent.',
  },
  {
    q: 'Is any of this live yet?',
    a: 'No. Zenith is still in design and development. Every performance figure on this page is a simulation and is labelled as one; the market figures are cited third-party research.',
  },
];

/* Cleo's panel, measured live at 1920 — 830px, 88px of padding, an 88px
   radius with the bottom-right corner squared off — holding a stack of our
   own uniform cards. Every card is the full width of the panel with its
   question centred on it, and the answer opens inside that same card under
   a hairline rather than arriving as a separate bubble, so the column has
   one centre line and the open card is the only thing that breaks it. */
export default function Faq() {
  const [open, setOpen] = useState(0);
  /* `typing` is the index currently showing the three-dot bubble. The answer
     is in the DOM the whole time either way — this only decides whether the
     dots or the words are visible, so nothing about opening depends on the
     timer finishing. */
  const [typing, setTyping] = useState(-1);
  const timer = useRef(0);

  const openAt = (i) => {
    clearTimeout(timer.current);
    if (i === -1) {
      setTyping(-1);
      setOpen(-1);
      return;
    }
    setOpen(i);
    /* Someone who asked for less motion gets the answer immediately — a
       deliberate delay is exactly what reduced-motion is asking us to drop. */
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyping(-1);
      return;
    }
    setTyping(i);
    timer.current = setTimeout(() => setTyping(-1), 620);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <section className="section faq" id="faq">
      <div className="shell">
        <div className="faq__panel">
          <div className="faq__head sechead--center">
            <p className="t-eyebrow reveal">Questions</p>
            <h2
              className="t-headline faq__title reveal reveal--display"
              style={{ '--d': '80ms' }}
            >
              Ask it the way you would ask a person.
            </h2>
          </div>

          <ul className="faq__items">
            {QUESTIONS.map((item, i) => {
              const isOpen = open === i;
              const isTyping = typing === i;
              return (
                <li
                  key={item.q}
                  className="faq__turn reveal"
                  /* The thread enters as a thread — each turn a beat behind the
                     one above it. Capped at three steps, per DESIGN.md: past
                     that a stagger stops reading as rhythm and starts reading
                     as the page being slow. */
                  style={{ '--d': `${120 + Math.min(i, 3) * 70}ms` }}
                >
                  {/* The card is its own element rather than the <li>: the
                      <li> carries .reveal, whose transition declaration is
                      more specific than a single class and would otherwise
                      swallow the card's hover and open transitions. */}
                  <div className={`faq__card${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className={`faq__q${isOpen ? ' is-open' : ''}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => openAt(isOpen ? -1 : i)}
                    >
                      <span className="t-body faq__label">{item.q}</span>
                      {/* One glyph that rotates rather than two that swap: a
                          "+" turned 45° is a "×", and rotating it is a single
                          property change instead of a text node replacement. */}
                      <span className="faq__toggle" aria-hidden="true">
                        +
                      </span>
                    </button>

                    {/* The answer stays mounted so opening and closing can
                        both be animated — a conditional render can only ever
                        pop. It is made inert when closed so it stays out of
                        the tab order and the accessibility tree. */}
                    <div
                      id={`faq-a-${i}`}
                      className={`faq__reply${isOpen ? ' is-open' : ''}`}
                      inert={!isOpen}
                    >
                      <div className="faq__reply-clip">
                        <div
                          className={`faq__a${isTyping ? ' is-typing' : ''}`}
                        >
                          {/* The dots sit on top of the answer rather than in
                              place of it, so the card is already the right
                              height when the words appear and nothing jumps. */}
                          <span className="faq__typing" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                          </span>
                          <p className="t-body faq__a-copy">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
