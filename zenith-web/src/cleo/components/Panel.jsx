/**
 * The panel is Cleo's page.
 *
 * Measured at 1920: a media panel is 948×919 — near the full viewport
 * height — sitting 8px from the page edge, with `border-radius: 24px 24px
 * 24px 0`. The square bottom-left corner is on the *big* surfaces, not just
 * on small chat bubbles; that is what makes the whole page read as a
 * conversation.
 *
 * Type inside a panel is small and low. The statement headline is 48/300
 * near the top, inset 64px. The caption block sits at the bottom-left,
 * inset 40px: a 20/450 title over 16/300 body held to a 340px measure.
 * Copy does not fill the panel — the image does, and the words sit in the
 * corner of it.
 */
export default function Panel({
  id,
  eyebrow,
  statement,
  title,
  body,
  cta,
  media,
  tone = 'dark',
  className = '',
  children,
}) {
  return (
    <div className={`panel panel--${tone} ${className}`} id={id}>
      <div className="panel__media">{media}</div>
      <div className="panel__scrim" aria-hidden="true" />

      <div className="panel__inner">
        <div className="panel__top">
          {eyebrow ? <p className="c-eyebrow">{eyebrow}</p> : null}
          {statement ? <h2 className="c-statement">{statement}</h2> : null}
        </div>

        {children ? <div className="panel__mid">{children}</div> : null}

        {title || body || cta ? (
          <div className="panel__caption">
            {title ? <h3 className="c-title">{title}</h3> : null}
            {body ? <p className="c-body">{body}</p> : null}
            {cta ? <div className="panel__cta">{cta}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** A row of panels sharing the page's tight 8px card gutter. */
export function PanelRow({ cols = 2, children, className = '' }) {
  return (
    <div className={`panel-row panel-row--${cols} ${className}`}>{children}</div>
  );
}
