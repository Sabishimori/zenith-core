import { Slot } from '../components/Media.jsx';

/**
 * The hero reel — the one full-bleed band at the top of the page.
 *
 * Built to take either the still being generated now or the video that
 * replaces it, with no layout change in between. `Slot` detects `.mp4` and
 * `.webm` from the extension and renders a muted, looping, inline video
 * instead of an `<img>`; everything else about the band stays the same,
 * because the slot reserves the box either way.
 *
 * Now holding the real thing: `public/media/hero-reel.mp4`, 8s, silent,
 * 1600x1066, 1.7 MB — transcoded down from a 32 MB / 33 Mbps source, which
 * would have been the single heaviest thing on the page by an order of
 * magnitude. `hero-reel-poster.webp` is frame one, so there is something on
 * screen before the video has buffered.
 *
 * The source is 3:2 and the band is 16/9, so `object-fit: cover` trims the
 * top and bottom rather than letterboxing. If that crop loses something,
 * change the ratio here — the slot reserves whatever box it is given.
 *
 * 16/9 rather than something taller on purpose: this sits directly under the
 * hero type, and a tall band here pushes the first panel entirely off the
 * first two screens.
 */
export default function Reel() {
  return (
    <section className="section-flush reel" aria-label="Zenith in use">
      <div className="reel__frame reveal">
        <Slot
          id="hero-reel"
          ratio="16 / 9"
          src="/media/hero-reel.mp4"
          poster="/media/hero-reel-poster.webp"
          alt="Zenith in use"
        />
        <div className="reel__caption">
          <p className="t-eyebrow">The space between matches</p>
        </div>
      </div>
    </section>
  );
}
