import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

/* `is-loading` and the scroll-restoration reset both live in index.html's
   head, not here: a module script is deferred, and by this point the
   browser has already settled what to do with the previous scroll
   position. See the comment there. */

/* Where the page starts, decided once the loading screen lets go.
 *
 * Both halves have to be done by hand. While `is-loading` holds
 * overflow:hidden the document cannot scroll at all, so the browser's
 * fragment scroll is a no-op and it never retries — nothing else would put
 * the reader at /#faq. And `history.scrollRestoration = 'manual'` in
 * index.html's head does not reliably stop Chrome restoring the old
 * position, so the top is asserted rather than assumed.
 *
 * The assertion is held until loading is genuinely finished, not for a
 * fixed few hundred milliseconds. Chrome restores once the document is
 * tall enough to restore into, and with images below the fold that moment
 * is unpredictable — it can easily be a second or more after the loader
 * hands over. The `load` event is the one point it cannot be later than.
 *
 * It releases immediately on any sign the reader is driving: a wheel, a
 * touch, a key, or a pointer going down (which covers dragging the
 * scrollbar, where no wheel event ever fires). Nothing here is entitled to
 * pull someone back once they have started moving.
 *
 * In module scope rather than inside a component, deliberately: this runs
 * exactly once. The same code in an effect did not run reliably at all —
 * StrictMode invokes effects twice and its cleanup can undo the first
 * pass. */
document.addEventListener(
  'zenith:ready',
  () => {
    const html = document.documentElement;

    let anchor = null;
    if (location.hash.length > 1) {
      try {
        anchor = document.querySelector(location.hash);
      } catch {
        /* A hash that is not a valid selector is simply not an anchor. */
      }
    }

    const place = () => {
      const behavior = html.style.scrollBehavior;
      /* Suspended, or the jump animates down fifteen screens of page the
         reader never asked to see. */
      html.style.scrollBehavior = 'auto';
      if (anchor) anchor.scrollIntoView();
      else scrollTo(0, 0);
      html.style.scrollBehavior = behavior;
    };

    place();

    /* An anchored load is placed once and left alone: there is no old
       position to fight, because the hash is what the reader asked for. */
    if (anchor) return;

    let done = false;
    const stop = () => {
      if (done) return;
      done = true;
      clearInterval(tick);
      clearTimeout(cap);
      removeEventListener('wheel', stop);
      removeEventListener('touchstart', stop);
      removeEventListener('keydown', stop);
      removeEventListener('pointerdown', stop);
    };

    const tick = setInterval(() => {
      if (!done && scrollY !== 0) scrollTo(0, 0);
    }, 60);

    /* A flat window, not one tied to `load`. In this app `load` fires
       BEFORE the loading screen hands over — the loader has a minimum
       duration of its own — so keying the window off it left 400ms that
       the restore simply landed after. 1.5s covers it and is still far too
       short to be noticed by anyone who has not touched anything. */
    const cap = setTimeout(stop, 1500);

    addEventListener('wheel', stop, { passive: true });
    addEventListener('touchstart', stop, { passive: true });
    addEventListener('keydown', stop);
    addEventListener('pointerdown', stop);
  },
  { once: true },
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
