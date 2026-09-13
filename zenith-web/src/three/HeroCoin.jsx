import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Coin from './Coin.jsx';
import { usePointerRef, useReducedMotion } from '../hooks/useMotion.js';

/**
 * The Zenith Coin, live, in the slot v2's hero figure gave to a photograph.
 *
 * Everything around it — the card, the crop, the scrim, the caption and the
 * float card — is v2's, untouched. Only the object inside the frame changed.
 * To go back to the still photograph, render the <img> again instead of this
 * component; the layout does not depend on which one is there.
 */
function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGL2RenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroCoin() {
  const wrap = useRef(null);
  const pointerRef = usePointerRef();
  const calm = useReducedMotion();
  const [ok] = useState(webglAvailable);
  const [live, setLive] = useState(true);
  const [failed, setFailed] = useState(false);

  /* The hero leaves the screen; there is no reason to keep a GPU loop
     running behind eleven sections of type. */
  useEffect(() => {
    const el = wrap.current;
    if (!el || !ok) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ok]);

  /* A WebGL failure is a designed state: the photograph v2 always used,
     at the same size, with no layout shift. */
  if (!ok || failed) {
    return (
      <img
        src="/img/coin-moss.webp"
        alt="A Zenith Coin set in moss, ancient wood and violet flowers"
        width="1671"
        height="940"
      />
    );
  }

  return (
    <div className="hero-3d" ref={wrap}>
      <Canvas
        dpr={[1, 2]}
        frameloop={live ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setFailed(true);
          });
        }}
      >
        <Suspense fallback={null}>
          <Coin scrollRef={null} pointerRef={pointerRef} calm={calm} />
        </Suspense>
      </Canvas>
    </div>
  );
}
