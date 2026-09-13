/**
 * The phone.
 *
 * This was a live WebGL render: a RoundedBox body, a screen plane and a glass
 * layer, lit by built Lightformers. It looked good and it cost the page three
 * libraries, ~600 KB of JavaScript, and a main thread busy enough that the
 * renderer stopped answering for thirty seconds while the canvas was on
 * screen. On a fundraising page that has to feel light and scroll smoothly,
 * that trade is the wrong way round.
 *
 * So the device is CSS now: a rounded frame, a real screenshot, a hairline
 * bezel, and a single diagonal sheen. Everything that moves is a transform or
 * an opacity, which means the whole hero composites on the GPU and the main
 * thread stays free for the scroll.
 */
export default function Device({ src, alt = '', className = '', children }) {
  return (
    <div className={`device ${className}`}>
      <div className="device__frame">
        <img
          src={src}
          alt={alt}
          width="393"
          height="852"
          decoding="async"
          fetchPriority="high"
        />
        <span className="device__sheen" aria-hidden="true" />
        <span className="device__bezel" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
