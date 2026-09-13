import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const R = 1;          /* coin radius, world units */
const T = 0.135;      /* half-thickness */
const BEVEL = 0.05;

/**
 * Half cross-section of the coin, revolved around Y by LatheGeometry.
 *
 * The rim is a real rounded shoulder rather than a chamfer: a hard 45°
 * edge catches one flat highlight and reads as a cylinder, where a rolled
 * shoulder drags the highlight around the edge the way struck metal does.
 */
function coinProfile(steps = 8) {
  const p = [];
  const arc = (cx, cy, fx, fy) => {
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * (Math.PI / 2);
      p.push(new THREE.Vector2(cx + fx(a) * BEVEL, cy + fy(a) * BEVEL));
    }
  };

  p.push(new THREE.Vector2(0.0001, T));
  p.push(new THREE.Vector2(R - BEVEL, T));
  arc(R - BEVEL, T - BEVEL, Math.sin, Math.cos);       /* over the top rim */
  p.push(new THREE.Vector2(R, -T + BEVEL));
  arc(R - BEVEL, -T + BEVEL, Math.cos, (a) => -Math.sin(a)); /* under it */
  p.push(new THREE.Vector2(0.0001, -T));
  return p;
}

/** Reeded edge: the milled grooves around a struck coin's rim. */
function useReeding() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 8;
    const g = c.getContext('2d');
    g.fillStyle = '#7a7a7a';
    g.fillRect(0, 0, c.width, c.height);
    for (let x = 0; x < c.width; x += 8) {
      g.fillStyle = '#2e2e2e';
      g.fillRect(x, 0, 4, c.height);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    tex.anisotropy = 8;
    return tex;
  }, []);
}

export default function Coin({ scrollRef, pointerRef, calm }) {
  const group = useRef();
  const spin = useRef();
  const key = useRef();
  const born = useRef(0);

  const raw = useLoader(THREE.TextureLoader, '/img/emblem-height.png');
  const reeding = useReeding();

  const geo = useMemo(
    () => new THREE.LatheGeometry(coinProfile(), 160),
    [],
  );
  const disc = useMemo(() => new THREE.CircleGeometry(R * 0.94, 128), []);

  /* Clone rather than mutate what the loader cache handed back: the cache
     may share this texture with another consumer that wants its own
     sampling. Cloning shares the decoded image, so it costs nothing. */
  const emblem = useMemo(() => {
    const t = raw.clone();
    t.colorSpace = THREE.NoColorSpace;   /* height data, not colour */
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, [raw]);

  useFrame((state, dt) => {
    const g = group.current;
    const s = spin.current;
    if (!g || !s) return;

    const d = Math.min(dt, 0.05);
    if (!born.current) born.current = state.clock.elapsedTime;
    const age = state.clock.elapsedTime - born.current;

    /* ── the strike ──────────────────────────────────────────────
       The one authored moment: the coin falls, overshoots, settles.
       Reduced motion gets it already at rest and lit. */
    let drop = 0;
    let ring = 0;
    if (!calm) {
      const t = Math.min(age / 1.5, 1);
      const e = 1 - Math.pow(1 - t, 4);              /* exponential out */
      drop = (1 - e) * 3.4;
      ring = (1 - e) * Math.sin(age * 19) * 0.28;    /* it rings as it lands */
    }

    /* ── scroll ──────────────────────────────────────────────────
       One continuous curve, not a set of triggered animations: the coin
       leaves rather than being switched off. Inside v2's hero figure there
       is nowhere to leave to, so the drift is simply off. */
    let ease = 0;
    let restX = 0;
    if (scrollRef) {
      const vh = scrollRef.current.vh || innerHeight || 1;
      const p = Math.min(Math.max(scrollRef.current.y / (vh * 1.5), 0), 1);
      ease = p * p * (3 - 2 * p);
      restX = state.size.width >= 900 ? state.viewport.width * 0.2 : 0;
    }

    /* ── cursor ──────────────────────────────────────────────────
       Damped, frame-rate normalised, and it returns to centre when
       the pointer leaves rather than holding a stale tilt. */
    const pt = pointerRef ? pointerRef.current : { x: 0, y: 0 };
    const lerp = 1 - Math.pow(0.0016, d);
    const tiltX = calm ? 0 : pt.y * 0.24;
    const tiltY = calm ? 0 : pt.x * 0.42;

    g.position.y += (drop + ease * 1.15 - g.position.y) * lerp;
    g.position.x += (restX + ease * 2.15 - g.position.x) * lerp;
    g.position.z += (ease * -1.6 - g.position.z) * lerp;

    const scale = 1 - ease * 0.55;
    g.scale.setScalar(g.scale.x + (scale - g.scale.x) * lerp);

    s.rotation.x += (tiltX + ring - s.rotation.x) * lerp;
    if (calm) {
      s.rotation.y += (tiltY - s.rotation.y) * lerp;
    } else {
      /* a slow idle turn, quickening slightly as it leaves */
      s.rotation.y += d * (0.34 + ease * 1.5);
      g.rotation.z += (tiltY * 0.25 - g.rotation.z) * lerp;
    }

    /* the key light sweeps once across the strike, then holds */
    if (key.current && !calm) {
      const t = Math.min(age / 2.2, 1);
      const e = 1 - Math.pow(1 - t, 3);
      key.current.position.set(-6 + e * 9, 4.5, 6);
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} />

      {/* A built environment, not a downloaded HDRI — the page renders
          identically with no network. Baked once: nothing in it moves. */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#05040a']} />
        <Lightformer
          intensity={2.6}
          form="rect"
          position={[-3.5, 3, 4]}
          scale={[7, 7, 1]}
          color="#fff6e8"
        />
        <Lightformer
          intensity={3.1}
          form="rect"
          position={[4, -1.5, -3]}
          scale={[6, 6, 1]}
          color="#6b4eff"
        />
        <Lightformer
          intensity={1.15}
          form="circle"
          position={[0, -4, 2]}
          scale={[5, 5, 1]}
          color="#3a2f6b"
        />
        <Lightformer
          intensity={1.7}
          form="rect"
          position={[0, 5, -4]}
          scale={[10, 1.6, 1]}
          color="#ffffff"
        />
      </Environment>

      <directionalLight
        ref={key}
        position={[3, 4.5, 6]}
        intensity={2.2}
        color="#fff3df"
      />
      <directionalLight position={[-4, -2, -5]} intensity={1.1} color="#7d5cff" />

      <group ref={group} position={[0, 3.4, 0]}>
        <group ref={spin} rotation={[0.34, 0, 0]}>
          {/* body */}
          <group rotation-x={Math.PI / 2}>
            <mesh geometry={geo} castShadow>
              <meshPhysicalMaterial
                color="#c9a24f"
                metalness={1}
                roughness={0.29}
                anisotropy={0.4}
                anisotropyRotation={Math.PI / 2}
                clearcoat={0.35}
                clearcoatRoughness={0.42}
                roughnessMap={reeding}
                envMapIntensity={1.25}
              />
            </mesh>
          </group>

          {/* the struck emblem, front and back */}
          {[1, -1].map((side) => (
            <mesh
              key={side}
              geometry={disc}
              position={[0, 0, side * (T + 0.0015)]}
              rotation-y={side === 1 ? 0 : Math.PI}
            >
              <meshPhysicalMaterial
                color="#f2dea4"
                metalness={1}
                roughness={0.15}
                alphaMap={emblem}
                bumpMap={emblem}
                bumpScale={2.2}
                transparent
                depthWrite={false}
                polygonOffset
                polygonOffsetFactor={-2}
                envMapIntensity={1.5}
              />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}
