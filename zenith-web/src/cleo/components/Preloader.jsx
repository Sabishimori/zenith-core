import { useEffect, useRef, useState } from 'react';

/* Long enough that the loader is a beat and not a flicker. Below about this
   a full-screen panel appearing and leaving reads as a fault. */
const MIN_MS = 850;
/* And a hard ceiling. If a font or an image never resolves — or the tab is
   opened in the background, where Chrome suspends frame callbacks outright
   — the page opens anyway. A loader that can sit over the site forever is
   worse than no loader, so this timer ends it directly rather than nudging
   the frame loop and hoping the frame loop is running. */
const MAX_MS = 3500;
/* The panel's opacity transition is 0.6s (`.preloader` in layout.css); this
   is that plus a small margin, so the handover to the masthead and the
   scroll reveals happens once the panel has genuinely cleared rather than
   on the same frame it finishes. Change it if that transition changes. */
const FADE_MS = 700;

/**
 * The loading screen: the mark, a hairline track, and a zero-padded count.
 * Nothing else — it is the quietest thing on the site on purpose.
 *
 * The number is tied to real signals rather than to a timer pretending to
 * be one. The page reports three things as it comes up (parsed, fonts
 * resolved, everything loaded) and the count eases toward whichever has
 * landed. It can therefore sit at 60 for a moment on a slow connection,
 * which is the point: a bar that always takes exactly 1.2s is a picture of
 * a bar, and tells the reader nothing.
 *
 * On the way out it hands over: `is-loading` comes off the root, which
 * releases the masthead's own arrival animation, and a `zenith:ready` event
 * lets the scroll reveals start observing. Before that moment nothing on
 * the page behind has moved, so the mark drops into the bar as the first
 * thing the reader actually sees.
 */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  /* Decided at initialisation rather than in the effect: a reader who asked
     for less motion should never get a render with the panel in it, not
     even the one frame a setState in an effect would cost. */
  const [gone, setGone] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const root = useRef(null);

  useEffect(() => {
    const html = document.documentElement;

    /* Someone who asked for less motion is not shown a counter ticking up
       to a panel fading away. The page simply opens — but the handover
       still has to happen, or the masthead stays paused at its first
       keyframe and the reveals never start observing. */
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      html.classList.remove('is-loading');
      document.dispatchEvent(new CustomEvent('zenith:ready'));
      return;
    }

    const started = performance.now();
    let target = 8;
    let shown = 0;
    let frame = 0;
    let handover = 0;
    let finished = false;

    const bump = (v) => {
      target = Math.max(target, v);
    };
    if (document.readyState !== 'loading') bump(35);
    const onDom = () => bump(35);
    const onLoad = () => bump(100);
    document.fonts?.ready.then(() => bump(70));
    addEventListener('DOMContentLoaded', onDom);
    addEventListener('load', onLoad);
    /* setTimeout survives a hidden tab where requestAnimationFrame does
       not, which is the whole reason the ceiling is wired to finish()
       itself instead of to the counter. */
    const ceiling = setTimeout(finishNow, MAX_MS);

    function finishNow() {
      if (finished) return;
      finished = true;

      /* Start the fade first, and hand over only once the panel has
         actually cleared.
         The handover used to happen here, at the top: `is-loading` came
         off immediately, which released the masthead's arrival — and the
         panel then sat over it for another 700ms while it faded. The
         masthead's first beat, the mark dropping in as a square, is about
         700ms long, so the whole of it played behind the loader and the
         reader only ever caught the tail of the bar opening. On
         contact.html, which has no loading screen, both beats play from
         the first frame — which is why that page's nav arrival reads so
         much better than this one's. Same animation; this one was just
         being spent behind a curtain.
         The reveals wait for the same moment, for the same reason. */
      setDone(true);
      handover = setTimeout(() => {
        html.classList.remove('is-loading');
        document.dispatchEvent(new CustomEvent('zenith:ready'));
        setGone(true);
      }, FADE_MS);
    }
    const finish = finishNow;

    const tick = () => {
      /* Eased, never linear: the count closes a fifth of the remaining
         distance each frame, so it moves fast when a signal lands and
         slows as it approaches — which is what makes a real number read as
         deliberate rather than jumpy. */
      shown += (target - shown) * 0.06;
      if (target >= 100 && shown > 99.2) shown = 100;
      setPct(shown);

      if (shown >= 100 && performance.now() - started >= MIN_MS) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(ceiling);
      clearTimeout(handover);
      removeEventListener('DOMContentLoaded', onDom);
      removeEventListener('load', onLoad);
      /* Only ever unstick the page on the way out if the handover already
         happened. This used to be unconditional, and in development that
         quietly defeated the whole mechanism: StrictMode mounts, unmounts
         and remounts every effect, so this cleanup ran while the panel was
         still fully opaque, took `is-loading` off, and released the
         masthead's arrival to play behind the curtain — the exact thing
         the class exists to prevent. The remount re-runs the effect and
         drives the handover properly, so leaving the class on here costs
         nothing. Production never double-invokes, but it was wrong in both. */
      if (finished) html.classList.remove('is-loading');
    };
  }, []);

  if (gone) return null;

  const n = Math.round(pct);

  return (
    <div
      className={`preloader${done ? ' is-done' : ''}`}
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <img
        className="preloader__mark"
        src="/img/mark.webp"
        alt=""
        width="621"
        height="357"
      />

      <div className="preloader__track">
        <span className="preloader__fill" style={{ '--p': `${pct}%` }} />
      </div>

      {/* Zero-padded to three so the counter never changes width and the
          line above it never appears to shift. */}
      <p className="preloader__count">{String(n).padStart(3, '0')}</p>
    </div>
  );
}
