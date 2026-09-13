import { useState } from 'react';

/**
 * The hero, now with the app footage behind the type.
 *
 * This absorbs what used to be a separate full-bleed band directly below —
 * one screen instead of two, which is what the video was always for.
 *
 * The footage is dark navy with bright white UI cards moving through it, so
 * the type cannot simply sit on top: over those cards, dark ink drops to
 * about 1:1. The hero therefore inverts — light type over a scrimmed video —
 * and the page returns to its cream ground immediately after. A dark opening
 * into a light body is a deliberate step, not a leak; `layout.css` keeps the
 * scrim strong enough that the worst frame still clears 4.5:1.
 *
 * Reduced motion gets the poster frame as a still image rather than a paused
 * video: same composition, no movement, and nothing downloads that will not
 * be used.
 */
export default function Hero() {
  const [calm] = useState(
    () =>
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  return (
    <section className="hero hero--media" id="top">
      <div className="hero__bg" aria-hidden="true">
        {calm ? (
          <img src="/media/hero-bg-poster.webp" alt="" width="1280" height="630" />
        ) : (
          <video
            src="/media/hero-bg.mp4"
            poster="/media/hero-bg-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </div>

      <div className="hero__inner">
        <h1 className="hero__title reveal reveal--display">
          Not who plays best. Who you click with.
        </h1>

        <p className="hero__sub reveal" style={{ '--d': '90ms' }}>
          Zenith matches on conversation and safety rather than rank, because
          a game mate is not the person who plays best.
        </p>

        <div className="reveal" style={{ '--d': '180ms' }}>
          <a className="pill pill--solid" href="#product">
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
