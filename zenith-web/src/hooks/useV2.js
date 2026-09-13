import { useEffect, useState } from 'react';
import { inView, animate, scroll, spring } from 'motion';

const KEY = 'zenith-theme';

/**
 * Theme, persisted. Matches v2: no attribute means "follow the OS".
 *
 * index.html already applies the stored theme before first paint, so there
 * is nothing to restore here and no state to hold — the attribute on <html>
 * is the single source of truth.
 */
export function useTheme() {
  const toggle = () => {
    const root = document.documentElement;
    const dark =
      root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') &&
        matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* nothing to persist to; the attribute still applies for this visit */
    }
  };

  return { toggle };
}

/** `.settled` on the masthead once the page has moved. */
export function useSettled() {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const on = () => setSettled(scrollY > 20);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  return settled;
}

/**
 * Word splitter — wraps each word in an overflow-hidden box and indexes it,
 * the way Splitting.js feeds --word-index.
 *
 * Whitespace text nodes are preserved rather than dropped; splitting on
 * /(\s+)/ and re-emitting the separators is what keeps "Game matching, from
 * skill to conversation." from collapsing into one unreadable string.
 */
function splitEl(el) {
  if (el.dataset.split === '1') return;
  el.dataset.split = '1';
  el.dataset.plain = el.innerHTML;

  const nodes = [];
  (function walk(n) {
    for (const c of n.childNodes) {
      if (c.nodeType === 3) {
        if (c.nodeValue.trim()) nodes.push(c);
      } else if (c.nodeType === 1) walk(c);
    }
  })(el);

  let idx = 0;
  nodes.forEach((node) => {
    const frag = document.createDocumentFragment();
    node.nodeValue.split(/(\s+)/).forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        return;
      }
      const wrap = document.createElement('span');
      wrap.className = 'word-wrap';
      const inner = document.createElement('span');
      inner.className = 'word';
      inner.textContent = tok;
      inner.style.setProperty('--wi', String(Math.min(idx++, 26)));
      wrap.appendChild(inner);
      frag.appendChild(wrap);
    });
    node.parentNode.replaceChild(frag, node);
  });
}

/**
 * Reveals. Motion's `inView` replaces the hand-rolled IntersectionObserver;
 * the transition itself stays in CSS so the timing is identical to v2.
 */
export function useReveals() {
  useEffect(() => {
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const splits = [...document.querySelectorAll('.split')];

    if (calm) {
      document
        .querySelectorAll('.animate, .animate-btn, .split')
        .forEach((el) => el.classList.add('anim'));
      return;
    }

    splits.forEach(splitEl);

    const targets = [...document.querySelectorAll('.animate, .animate-btn, .split')];
    const stops = [];

    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      /* anything already on screen reveals immediately — the page should
         never open on invisible content */
      if (r.top < innerHeight && r.bottom > 0) {
        el.classList.add('anim');
        return;
      }
      /* Motion calls a returned function when the element leaves view; we
         want the reveal to stay, so nothing is returned. Re-entry just
         re-adds a class that is already there. */
      stops.push(
        inView(
          el,
          (target) => {
            target.classList.add('anim');
          },
          { amount: 0.12, margin: '0px 0px -6% 0px' },
        ),
      );
    });

    /* Re-split on a real width change: the word boxes are laid out for one
       measure, and a resize leaves them wrapped against the old one. */
    let lastW = innerWidth;
    let t;
    const onResize = () => {
      if (innerWidth === lastW) return;
      lastW = innerWidth;
      clearTimeout(t);
      t = setTimeout(() => {
        splits.forEach((el) => {
          const seen = el.classList.contains('anim');
          el.innerHTML = el.dataset.plain;
          el.dataset.split = '0';
          el.classList.remove('anim');
          splitEl(el);
          if (seen) el.classList.add('anim');
        });
      }, 180);
    };
    addEventListener('resize', onResize);

    return () => {
      stops.forEach((s) => s && s());
      removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, []);
}

/**
 * Parallax float layer, driven by Motion's `scroll` rather than a manual
 * rAF loop — each mark is tied to its own progress through the viewport.
 */
export function useFloats() {
  useEffect(() => {    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stops = [];
    document.querySelectorAll('.float').forEach((el) => {
      const speed = parseFloat(el.dataset.speed || '0');
      if (!speed) return;
      const range = (innerHeight + el.offsetHeight) / 2;
      stops.push(
        /* `y` is a shorthand Motion only resolves for its own component
           tree (motion.div, useMotionValue, …). Handed a plain DOM node —
           as .float divs are — it's silently a no-op: no error, no style
           written, the element just never moves. `translateY` is the
           actual CSS custom-transform property name, which the DOM
           `animate()` writes to `transform` for any element. */
        scroll(animate(el, { translateY: [speed * range, -speed * range] }, { ease: 'linear' }), {
          target: el,
          offset: ['start end', 'end start'],
        }),
      );
    });
    return () => stops.forEach((s) => s && s());
  }, []);
}

/** The custom cursor, followed with a Motion spring instead of a hand lerp. */
export function useCursor() {
  useEffect(() => {    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;

    const cur = document.getElementById('cursor');
    if (!cur) return;

    const followed = { type: spring, stiffness: 520, damping: 42 };

    const onMove = (e) => {
      cur.classList.add('on');
      /* `x`/`y` are Motion's component-tree shorthand and are silently
         dropped on a plain DOM node (no error, nothing written) — that's
         why the dot never tracked the pointer and sat wherever the static
         CSS `translate:-50% -50%` put it. `translateX`/`translateY` are
         the real CSS custom-transform property names; the DOM `animate()`
         writes those to `transform`, which composes with the CSS
         `translate` used for centring (see the .cursor rule below). */
      animate(cur, { translateX: e.clientX, translateY: e.clientY }, followed);
    };
    const onOut = (e) => {
      if (!e.relatedTarget) cur.classList.remove('on');
    };
    const wide = () => cur.classList.add('wide');
    const narrow = () => cur.classList.remove('wide');

    addEventListener('mousemove', onMove, { passive: true });
    addEventListener('mouseout', onOut);
    const hot = [...document.querySelectorAll('a, button, .phone, .svc li')];
    hot.forEach((el) => {
      el.addEventListener('mouseenter', wide);
      el.addEventListener('mouseleave', narrow);
    });

    return () => {
      removeEventListener('mousemove', onMove);
      removeEventListener('mouseout', onOut);
      hot.forEach((el) => {
        el.removeEventListener('mouseenter', wide);
        el.removeEventListener('mouseleave', narrow);
      });
    };
  }, []);
}

/**
 * Damped wheel scroll. Kept as hand-written rAF rather than a Motion
 * animation because it has to stay continuously retargetable mid-gesture.
 */
export function useDampedScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!matchMedia('(pointer:fine)').matches) return;

    /* Lower = heavier drag. 0.09 was too floaty once the smooth-behaviour
       fight below was removed, because that lag was being read as weight. */
    const LERP = 0.12;
    let target = scrollY;
    let current = scrollY;
    let running = false;
    let wheeling = false;
    let last = 0;

    const limit = () =>
      Math.max(0, document.documentElement.scrollHeight - innerHeight);

    /* deltaY is only in pixels when deltaMode is 0. Firefox reports lines
       (mode 1, ~3 per notch), which without this pinned the page nearly
       still — a notch moved 3px instead of ~100. */
    const px = (e) => {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * innerHeight;
      return e.deltaY;
    };

    /* A mouse wheel fires sparse, large, whole-number deltas. A trackpad
       fires dense small ones that already carry OS momentum — damping that
       a second time is what makes trackpad scrolling feel like syrup, so
       trackpads are left alone entirely. */
    const isTrackpad = (e) =>
      e.deltaMode === 0 && (Math.abs(e.deltaY) < 40 || !Number.isInteger(e.deltaY));

    /* The page sets `scroll-behavior: smooth` for anchor jumps. That also
       applies to programmatic scrolls, so every frame of this loop was
       starting its own animation toward a target that had already moved —
       two easings fighting. `instant` opts these calls out; anchor links
       keep their smooth jump. */
    const jump = (y) => scrollTo({ top: y, behavior: 'instant' });

    const step = (now) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.064);
      last = now;
      const a = 1 - Math.pow(1 - LERP, dt * 60); /* frame-rate independent */
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
        /* native scroll handles it; just stay in sync */
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
