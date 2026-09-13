import { useRef } from 'react';

import Device from '../components/Device.jsx';
import Panel from '../components/Panel.jsx';
import { useSectionProgress } from '../hooks.js';

/**
 * The first panel, and the page's one scroll-scrubbed moment.
 *
 * This is where Cleo puts its phone: not in the hero, but in a full-bleed
 * panel directly under it — statement top-left at 48/300, the device rising
 * over a soft ground as the section scrolls. The panel is pinned while the
 * scrub runs, which is what gives the phone somewhere to travel.
 *
 * The phone is CSS, not WebGL. It was a live three.js render — a RoundedBox
 * body, a screen plane, Lightformers — and it looked good, but it cost three
 * libraries, ~600KB of JavaScript, and a main thread busy enough that every
 * CSS transition elsewhere on the page stopped ticking: the FAQ answers
 * froze at their start value because the compositor never got a frame in.
 * On a page that has to scroll smoothly for fifteen screens that is the
 * wrong trade, so the device is a rounded frame around the real screenshot
 * and everything that moves is a transform.
 */
export default function Showcase() {
  const scope = useRef(null);
  const progress = useSectionProgress(scope);

  return (
    <section className="showcase" ref={scope}>
      <div className="showcase__stick">
        <Panel
          eyebrow="Ask how you are before asking what you play"
          statement={
            <>
              Zenith gets to know you
              <br />
              (and how you actually play).
            </>
          }
          className="showcase__panel"
          media={
            /* Progress drives the rise through one custom property, so the
               scrub is a compositor transform rather than a React render. */
            <div
              className="showcase__canvas"
              aria-hidden="true"
              style={{ '--t': progress }}
            >
              <Device
                className="showcase__device"
                src="/img/ui_checkin.webp"
                alt=""
              />
            </div>
          }
        />
      </div>
    </section>
  );
}
