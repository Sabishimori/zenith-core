import { useEffect, useRef } from 'react';

/* A dot that is the pointer, and a ring that chases it.

   The dot is written straight to the DOM on every pointermove. A cursor
   that lags the hardware pointer by even one render reads as broken, so
   nothing in this loop goes through React state — the refs are the whole
   point. The ring is the opposite: it is *supposed* to lag, and eases
   toward the dot on its own frame loop. Two circles moving at different
   rates is what makes them read as one object with weight rather than as
   two stickers following the mouse.

   Nothing activates on a touch screen or under reduced motion: there is no
   pointer to replace on the first, and a permanently trailing element is
   exactly the kind of motion the second is asking us to drop. In both
   cases the native cursor is left alone, because `cursor: none` only ever
   goes on with a replacement already running. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    /* A fine pointer that can hover. Touch and pen both fail this, and so
       does a laptop trackpad in tablet mode — all cases where hiding the
       system cursor would leave the page with no pointer at all. */
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    /* Start both circles at the centre rather than at 0,0, so the first
       pointermove eases in from the middle of the page instead of flying
       in from the corner. */
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let frame = 0;

    const place = (el, px, py) => {
      el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    };
    place(dot, x, y);
    place(ring, x, y);

    /* 0.18 is the whole feel of it: the ring lands about a sixth of the
       remaining distance each frame, which settles in ~120ms — close
       enough to feel attached, slow enough to be visible on a fast flick. */
    const tick = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      place(ring, ringX, ringY);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      place(dot, x, y);
      /* Held until the pointer has actually moved: on load the real cursor
         may be anywhere, and fading two circles in at the page centre
         before the reader has touched the mouse looks like a bug. */
      root.classList.add('cursor-on');
    };

    /* `pointerover` bubbles and fires only when the element under the
       pointer changes, so the `closest` lookup runs on hover changes
       instead of on every one of a hundred moves a second. */
    const onOver = (e) => {
      const hit = e.target.closest?.(
        'a, button, summary, label, [role="button"], [tabindex]:not([tabindex="-1"])',
      );
      root.classList.toggle('cursor-over', Boolean(hit));
      /* An ink dot on an ink ground is no dot at all. Anything that opts in
         with data-cursor="invert" — the masthead bar, for one — flips both
         circles to light for as long as the pointer is inside it. */
      root.classList.toggle(
        'cursor-invert',
        Boolean(e.target.closest?.('[data-cursor="invert"]')),
      );
    };

    const onDown = () => root.classList.add('cursor-down');
    const onUp = () => root.classList.remove('cursor-down');
    /* Only a leave whose relatedTarget is null is a leave of the window —
       the rest are moves between elements inside it. */
    const onOut = (e) => {
      if (!e.relatedTarget) root.classList.remove('cursor-on');
    };

    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('pointerover', onOver, { passive: true });
    addEventListener('pointerdown', onDown, { passive: true });
    addEventListener('pointerup', onUp, { passive: true });
    addEventListener('pointerout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerover', onOver);
      removeEventListener('pointerdown', onDown);
      removeEventListener('pointerup', onUp);
      removeEventListener('pointerout', onOut);
      root.classList.remove(
        'has-cursor',
        'cursor-on',
        'cursor-over',
        'cursor-down',
        'cursor-invert',
      );
    };
  }, []);

  /* Rendered unconditionally and parked at opacity 0. The effect above is
     the only thing that ever switches it on, so a visitor who fails either
     query gets four inert, unpainted spans and their own system cursor.

     Position and scale are split across two elements on purpose. CSS
     composes the standalone `scale` property AFTER the `transform`
     property, so a hover scale on the same element the loop is translating
     would multiply its x and y as well and throw the circle off screen.
     The outer span is moved and never scaled; the inner one is scaled and
     never moved. */
  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor__at" ref={ringRef}>
        <span className="cursor__ring" />
      </span>
      <span className="cursor__at" ref={dotRef}>
        <span className="cursor__dot" />
      </span>
    </div>
  );
}
