/**
 * Media slots and the two layouts that frame them.
 *
 * Cleo's page is 30+ pieces of commissioned photography and video; the
 * layouts are frames *around* imagery. Zenith has no lifestyle library yet,
 * so every slot renders as a labelled placeholder carrying the exact id and
 * aspect it needs. Those ids match ASSETS.md — drop a file into
 * /public/media with the slot's id as its name and pass `src`, and the
 * placeholder is replaced with no layout change.
 */

/**
 * Placeholder fill.
 *
 * Every id below has a generated stand-in in /public/media — a screen-lit
 * evening frame at the right aspect, carrying a visible PLACEHOLDER label.
 * They exist so the page can be judged with imagery in place: scrim
 * strength, white-on-photo contrast and the drift all behave differently
 * over a real tonal range than over an empty panel.
 *
 * An explicit `src` always wins, so installing the real asset is still the
 * one-line change ASSETS.md describes. Delete a file here and that slot
 * returns to the labelled empty box.
 */
const PLACEHOLDERS = new Set([
  'market-japan',
  'market-us',
  'persona-ren',
  'persona-soojin',
  'problem-figures',
  'problem-retention',
  'road-japan',
  'road-korea',
  'road-us',
  'team-sagar',
  'team-two',
  'tox-abuse',
  'tox-catfishing',
  'tox-ghosting',
]);

function placeholderFor(id) {
  return PLACEHOLDERS.has(id) ? `/media/${id}.webp` : null;
}

export function Slot({
  id,
  src,
  alt = '',
  ratio = '4 / 3',
  poster,
  className = '',
  /* Filled slots drift by default — it is most of what stops a column of
     stills reading as a contact sheet. The hook scales the image 16% and
     clamps the travel to the 8% of headroom that creates, so this number
     only sets how eager the drift feels. */
  parallax = 0.05,
}) {
  const resolved = src || placeholderFor(id);
  const isVideo = typeof resolved === 'string' && /\.(mp4|webm)$/i.test(resolved);
  const drift = resolved && parallax ? parallax : null;

  return (
    <div
      className={`slot ${drift ? 'slot--parallax ' : ''}${className}`}
      style={{ aspectRatio: ratio }}
    >
      {resolved ? (
        isVideo ? (
          <video
            src={resolved}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
            data-parallax={drift || undefined}
          />
        ) : (
          <img
            src={resolved}
            alt={alt}
            loading="lazy"
            decoding="async"
            data-parallax={drift || undefined}
          />
        )
      ) : (
        <div className="slot__empty">
          <span className="t-eyebrow">{id}</span>
          <span className="t-micro">{ratio.replace(/\s/g, '')}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Split media/text. Cleo alternates the media side down the page — that
 * alternation is most of what keeps 16 screens from feeling like a list.
 */
export function Split({
  id,
  eyebrow,
  title,
  body,
  cta,
  media,
  flip = false,
  children,
}) {
  return (
    <section className="section split" id={id}>
      <div className={`shell split__inner${flip ? ' split__inner--flip' : ''}`}>
        <div className="split__media reveal">{media}</div>

        <div className="split__text">
          {eyebrow ? (
            <p className="t-eyebrow reveal">{eyebrow}</p>
          ) : null}
          <h2 className="t-headline reveal reveal--display" style={{ '--d': '80ms' }}>
            {title}
          </h2>
          {body ? (
            <p className="t-body split__body reveal" style={{ '--d': '160ms' }}>
              {body}
            </p>
          ) : null}
          {children}
          {cta ? (
            <div className="reveal" style={{ '--d': '240ms' }}>
              {cta}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/**
 * Full-bleed media card: photography edge to edge, dark scrim, type
 * top-left, pill bottom-left. Cleo's loudest pattern.
 */
export function MediaCard({ id, eyebrow, title, cta, media, tall = false }) {
  return (
    <div className={`media media--scrim mediacard${tall ? ' mediacard--tall' : ''}`}>
      {media}
      <div className="media__body">
        <div className="mediacard__head">
          {eyebrow ? <p className="t-eyebrow mediacard__eyebrow">{eyebrow}</p> : null}
          <h3 className="t-sub mediacard__title">{title}</h3>
        </div>
        {cta ? <div>{cta}</div> : null}
      </div>
      <span hidden>{id}</span>
    </div>
  );
}
