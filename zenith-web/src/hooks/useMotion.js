import { useEffect, useRef, useState } from 'react';

/** Live `prefers-reduced-motion`, re-read when the OS setting changes. */
export function useReducedMotion() {
  const [calm, setCalm] = useState(() =>
    typeof matchMedia === 'function'
      ? matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setCalm(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return calm;
}

/**
 * Document scroll progress written to a ref, never to state.
 *
 * The 3D scene reads this every frame. Routing it through React state would
 * re-render the tree sixty times a second to move one object, so the value
 * lives in a ref and the canvas samples it inside useFrame.
 */
export function useScrollRef() {
  const ref = useRef({ y: 0, progress: 0, vh: 0 });

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const vh = innerHeight || 1;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      ref.current = { y: scrollY, progress: scrollY / max, vh };
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', read);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', read);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

/**
 * Adds `.in` to elements marked `.reveal` once they enter view.
 *
 * Anything already above the fold is revealed on the first pass so the page
 * never opens on invisible content — the entrance is a welcome, not a gate.
 */
export function useReveals(deps = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.in)');
    if (!nodes.length) return;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((n) => n.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    nodes.forEach((n) => {
      if (n.getBoundingClientRect().top < innerHeight) n.classList.add('in');
      else io.observe(n);
    });

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Pointer position in -1..1, damped by the consumer. Idle at centre. */
export function usePointerRef() {
  const ref = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;

    const onMove = (e) => {
      ref.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
        active: true,
      };
    };
    const onLeave = () => {
      ref.current = { x: 0, y: 0, active: false };
    };

    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return ref;
}
