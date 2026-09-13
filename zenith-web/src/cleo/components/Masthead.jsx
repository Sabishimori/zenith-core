import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Technology', href: '#tech' },
  { label: 'Who', href: '#who' },
  { label: 'Market', href: '#market' },
  { label: 'Team', href: '#team' },
];

/**
 * One dark bar, not three floating pills: the mark pinned to its left end,
 * the section links run out to its right in small spaced caps, and no
 * button — the last link is the call to action and is styled like every
 * other one.
 *
 * It arrives in two beats, and only on arrival: the mark drops in as a
 * square on its own, lands, and then the square opens sideways into the
 * bar. Two movements in sequence rather than one, because a box that grows
 * while it is still falling reads as a glitch — the landing has to finish
 * before the opening starts, or neither is legible.
 *
 * Both beats are CSS animations, so this component owns none of it. It
 * plays once, on load. Scrolling never changes the bar's size.
 *
 * `base` is what makes the same masthead work on a second page. On the
 * overview it is empty and the section links are plain in-page anchors; on
 * any other page it is "/" and they become cross-page links that land on
 * the right section. The alternative — always writing "/#product" — would
 * make every nav click on the overview a full navigation.
 */
export default function Masthead({
  base = '',
  cta = { label: 'Contact', href: '/contact.html' },
}) {
  /* The only thing scroll still decides is the shadow: past the hero the
     bar sits over content rather than over empty ground and needs to
     separate from it. Nothing about its size or position moves. */
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(scrollY > 24);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  /* The call to action is the last nav item rather than a separate element,
     which is the whole point of the composition. */
  const items = [
    ...LINKS.map((l) => ({ ...l, href: `${base}${l.href}` })),
    { ...cta, last: true },
  ];

  return (
    <header className={`masthead${lifted ? ' is-lifted' : ''}`}>
      {/* data-cursor tells Cursor.jsx to invert the dot and ring while they
          are over this bar — an ink cursor on an ink ground is no cursor. */}
      <div className="masthead__bar" data-cursor="invert">
        <a
          className="masthead__mark"
          href={base || '#top'}
          aria-label="Zenith, home"
        >
          <img src="/img/mark.webp" alt="" width="621" height="357" />
        </a>

        <nav className="masthead__nav" aria-label="Sections">
          {items.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={l.last ? 'is-last' : undefined}
            >
              {/* Two copies of the label, one waiting a line below the
                  other, so hover can roll the first out and the second in.
                  The arriving copy is hidden from assistive tech — it is
                  the same word twice, and a screen reader announcing it
                  twice is a bug, not a flourish. */}
              <span className="roll">
                <span className="roll__now">{l.label}</span>
                <span className="roll__next" aria-hidden="true">
                  {l.label}
                </span>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
