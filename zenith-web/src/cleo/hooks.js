import { useEffect, useState } from 'react';

/* Reveals. CSS holds the transition (tokens.css `.reveal` → `.in`); this only
   flips the class, so a no-js or reduced-motion visitor sees everything. */
export function useReveals() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    /* Nothing is observed until the loading screen has gone. Started at
       mount, the observer would fire on everything already in view while
       the loader still covered it, and the hero would be sitting there
       fully revealed the moment the page was uncovered — its entrance
       spent on an audience of nobody. */
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      els.forEach((el) => io.observe(el));
    };

    if (document.documentElement.classList.contains('is-loading')) {
      document.addEventListener('zenith:ready', start, { once: true });
    } else {
      start();
    }

    return () => {
      cancelled = true;
      document.removeEventListener('zenith:ready', start);
      io.disconnect();
    };
  }, []);
}

/* Cleo's one recurring motion signature: a centred statement whose second
   line warms from peach to full ink, word by word, as it enters view. Ours
   warms from violet to full ink. Returns 0→1 progress across the element's
   pass through the viewport's middle band. */
export function useWordWarm(ref) {
  /* A reduced-motion visitor starts fully warmed rather than being warmed
     by an effect — same end state, no cascading render, and no frame where
     the line is the wrong colour. */
  const [p, setP] = useState(() =>
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 1
      : 0,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      /* Start when the block's top crosses 85% of the viewport, finish when
         it reaches 40%. Clamped, so it holds at both ends. */
      const t = (vh * 0.85 - r.top) / (vh * 0.45);
      setP(Math.min(1, Math.max(0, t)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return p;
}

/* Scroll progress through a tall section, 0→1. Drives the hero's phone. */
export function useSectionProgress(ref) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - innerHeight;
      if (travel <= 0) return setP(0);
      setP(Math.min(1, Math.max(0, -r.top / travel)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return p;
}

/**
 * Damped wheel scroll — the "drag".
 *
 * Ported from the v2 build, which had it; this page never did, which is the
 * whole reason it reads as static. Four things here are load-bearing and
 * each one was a bug first:
 *
 *  - The lerp is normalised against frame time, so it settles at the same
 *    rate on a 60Hz and a 144Hz display. An un-normalised lerp is what makes
 *    this kind of scroll feel heavy on fast monitors and slack on slow ones.
 *  - Programmatic scrolls use `behavior: 'instant'`. The page sets
 *    `scroll-behavior: smooth` for anchor jumps, and that applies to
 *    scrollTo() too — so every frame of this loop was starting its own
 *    animation toward a target that had already moved. Two easings fighting
 *    reads as lag, not weight.
 *  - deltaY is only in pixels when deltaMode is 0. Firefox reports lines,
 *    so without normalising, a notch moved 3px instead of ~100.
 *  - Trackpads pass straight through. Their momentum is already damped by
 *    the OS, and damping it twice feels like syrup.
 */
export function useDampedScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!matchMedia('(pointer:fine)').matches) return;

    const LERP = 0.12; /* lower = heavier */
    let target = scrollY;
    let current = scrollY;
    let running = false;
    let wheeling = false;
    let last = 0;

    const limit = () =>
      Math.max(0, document.documentElement.scrollHeight - innerHeight);

    const px = (e) => {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * innerHeight;
      return e.deltaY;
    };

    const isTrackpad = (e) =>
      e.deltaMode === 0 &&
      (Math.abs(e.deltaY) < 40 || !Number.isInteger(e.deltaY));

    const jump = (y) => scrollTo({ top: y, behavior: 'instant' });

    const step = (now) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.064);
      last = now;
      const a = 1 - Math.pow(1 - LERP, dt * 60);
      current += (target - current) * a;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        jump(current);
        running = false;
        wheeling = false;
        return;
      }
      jump(current);
      requestAnimationFrame(step);
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return; /* leave pinch-zoom alone */
      if (isTrackpad(e)) {
        running = false;
        wheeling = false;
        target = scrollY;
        return;
      }
      e.preventDefault();
      if (!wheeling) {
        wheeling = true;
        current = scrollY;
        target = scrollY;
      }
      target = Math.min(Math.max(target + px(e), 0), limit());
      if (!running) {
        running = true;
        last = 0;
        requestAnimationFrame(step);
      }
    };

    /* anything that is not the wheel wins: resync rather than fight it */
    const resync = () => {
      running = false;
      wheeling = false;
      target = scrollY;
    };
    const onScroll = () => {
      if (!running) target = scrollY;
    };

    addEventListener('wheel', onWheel, { passive: false });
    ['keydown', 'mousedown', 'touchstart'].forEach((ev) =>
      addEventListener(ev, resync, { passive: true }),
    );
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', resync);

    return () => {
      removeEventListener('wheel', onWheel);
      ['keydown', 'mousedown', 'touchstart'].forEach((ev) =>
        removeEventListener(ev, resync),
      );
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', resync);
    };
  }, []);
}

/**
 * Parallax on anything carrying `data-parallax="<speed>"`.
 *
 * Deliberately a direct style write rather than Motion's `animate`: Motion's
 * `x`/`y` shorthand is resolved only inside its own component tree and is a
 * silent no-op on a plain DOM node — no error, no style written, the element
 * simply never moves. That trap already cost this project two debugging
 * rounds on the float layer and the cursor.
 *
 * One rAF loop over one cached list, offscreen elements skipped, so the cost
 * is a handful of transform writes per frame and nothing lays out.
 */
const SCALE = 1.16;

export function useParallax() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = [...document.querySelectorAll('[data-parallax]')].map((el) => ({
      el,
      speed: parseFloat(el.dataset.parallax) || 0,
    }));
    if (!nodes.length) return;

    let frame = 0;
    const place = () => {
      frame = 0;
      const vh = innerHeight;
      for (const { el, speed } of nodes) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) continue;
        /* distance of the element's centre from the viewport's centre */
        const mid = r.top + r.height / 2 - vh / 2;
        /* SCALE supplies the headroom: at 1.16 an image overhangs its frame
           by 8% top and bottom, so the drift has to stay inside that or an
           edge shows. Clamped rather than trusted to the speed alone,
           because the speed is per-element and the frames are not all the
           same height. */
        const room = r.height * 0.08;
        const y = Math.max(-room, Math.min(room, mid * -speed));
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0) scale(${SCALE})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);
}
