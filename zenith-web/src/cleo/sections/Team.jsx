import { Slot } from '../components/Media.jsx';

/* 07 — Team.
   CONTENT.md marks both bio lines as blocking-open: Sagar's background and
   the second founder's name and background are still needed. They are left
   as visible placeholders rather than invented — a made-up bio on an
   investor-facing page is the one error that cannot be walked back. */
const TEAM = [
  {
    id: 'team-sagar',
    name: 'Sagar',
    title: 'Founding member — Design',
    bio: null, // TODO(content): one line of background, matching the v2 bio style.
  },
  {
    id: 'team-two',
    name: null, // TODO(content): founder name.
    title: 'Founding member — Design',
    bio: null, // TODO(content): one line of background.
  },
];

export default function Team() {
  return (
    <section className="section team" id="team">
      <div className="shell">
        <p className="t-eyebrow reveal">07 — Team</p>
        <h2 className="t-headline team__title reveal reveal--display" style={{ '--d': '80ms' }}>
          Two people, both building the thing they wanted to exist.
        </h2>

        <div className="team__grid">
          {TEAM.map((m, i) => (
            <article
              key={m.id}
              className="team__card reveal"
              style={{ '--d': `${i * 90}ms` }}
            >
              <Slot id={m.id} ratio="4 / 5" alt="" />
              <h3 className="t-sub team__name">
                {m.name ?? <span className="team__todo">Name pending</span>}
              </h3>
              <p className="t-eyebrow">{m.title}</p>
              <p className="t-body team__bio">
                {m.bio ?? (
                  <span className="team__todo">Background line pending</span>
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
