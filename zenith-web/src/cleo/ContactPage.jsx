import { useEffect, useMemo, useRef, useState } from 'react';

import Cursor from './components/Cursor.jsx';
import Masthead from './components/Masthead.jsx';
import Footer from './sections/Footer.jsx';
import { useReveals } from './hooks.js';

import './tokens.css';
import './layout.css';

/* Named ContactPage, and its entry contact-main.jsx, because this project
   builds on a case-insensitive filesystem: Contact.jsx and contact.jsx are
   the same file on Windows, and pairing them the way App.jsx pairs with
   main.jsx would silently overwrite one with the other. */

/* TODO(content): placeholder address, same as Talk.jsx and Footer.jsx.
   All three must be changed together before this is published anywhere
   real. */
const EMAIL = 'zenithcore0313@gmail.com';

/* The four things people actually write in about, each with the one thing
   that makes a first message worth answering. Naming it up front is the
   whole point of splitting contact out of the overview page: a single
   "get in touch" box gets vague messages, a routed one gets useful ones. */
const ROUTES = [
  {
    id: 'invest',
    label: 'Investment',
    blurb: 'Pre-seed. Deck, model and the risk register on request.',
    asks: [
      'Fund or angle, and the cheque size you typically write',
      'Stage you usually come in at',
      'Anything you have already read about us',
    ],
  },
  {
    id: 'partner',
    label: 'Partnership',
    blurb: 'Studios, platforms and communities who want to run a pilot.',
    asks: [
      'The game, platform or community, and rough size',
      'What you would want a pilot to prove',
      'Who owns the decision on your side',
    ],
  },
  {
    id: 'press',
    label: 'Press',
    blurb: 'Interviews, briefings and anything on the record.',
    asks: [
      'Outlet and the piece you are working on',
      'Your deadline',
      'Whether you need assets or a named quote',
    ],
  },
  {
    id: 'general',
    label: 'Something else',
    blurb: 'Research, safety work, hiring, or telling us we are wrong.',
    asks: [
      'What prompted you to write',
      'What a useful reply would look like',
    ],
  },
];

export default function ContactPage() {
  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('js');
    }
  }, []);

  useReveals();

  const [route, setRoute] = useState(ROUTES[0].id);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(0);

  const active = useMemo(
    () => ROUTES.find((r) => r.id === route) ?? ROUTES[0],
    [route],
  );

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  /* There is no backend, and pretending otherwise would be the worst thing
     this page could do: a form that swallows a message and says "thanks" is
     worse than no form at all. So submitting composes a real message in the
     sender's own mail client, prefilled and already routed, and the page
     says so in as many words under the button. */
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim();
    const org = String(f.get('org') || '').trim();
    const from = String(f.get('email') || '').trim();
    const note = String(f.get('message') || '').trim();

    const body = [
      `Name: ${name}`,
      org && `Organisation: ${org}`,
      `Reply to: ${from}`,
      '',
      note,
    ]
      .filter(Boolean)
      .join('\n');

    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `${active.label} — Zenith`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard access can be refused outright, and a button that throws
         a console error at the reader helps nobody — the address is written
         out in full right next to it either way. */
    }
  };

  return (
    <>
      <Cursor />
      <Masthead base="/" cta={{ label: 'Overview', href: '/' }} />

      <main className="contact">
        <section className="contact__head">
          <div className="shell contact__head-inner">
            <p className="t-eyebrow reveal">Contact</p>
            <h1
              className="t-statement contact__title reveal reveal--display"
              style={{ '--d': '80ms' }}
            >
              Tell us where this breaks.
            </h1>
            <p
              className="t-lead contact__lead reveal"
              style={{ '--d': '160ms' }}
            >
              Zenith is in design and development, which is the useful half of
              the conversation. Pick the line that fits and we will reply with
              something specific rather than a deck.
            </p>
          </div>
        </section>

        <div className="shell contact__body">
          <form className="contact__form reveal" onSubmit={onSubmit}>
            <fieldset className="contact__routes">
              <legend className="t-eyebrow contact__legend">
                What is this about?
              </legend>

              {/* Real radios, visually replaced rather than reimplemented:
                  arrow-key navigation, the form's own value and focus all
                  keep working, which a div with an onClick throws away. */}
              <div className="contact__chips">
                {ROUTES.map((r) => (
                  <label
                    key={r.id}
                    className={`contact__chip${route === r.id ? ' is-on' : ''}`}
                  >
                    <input
                      type="radio"
                      name="route"
                      value={r.id}
                      checked={route === r.id}
                      onChange={() => setRoute(r.id)}
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
              <p className="t-body contact__blurb">{active.blurb}</p>
            </fieldset>

            <div className="contact__grid">
              <p className="field">
                <label className="t-micro field__label" htmlFor="c-name">
                  Your name
                </label>
                <input id="c-name" name="name" type="text" required />
              </p>

              <p className="field">
                <label className="t-micro field__label" htmlFor="c-org">
                  Organisation <span className="field__opt">optional</span>
                </label>
                <input id="c-org" name="org" type="text" />
              </p>
            </div>

            <p className="field">
              <label className="t-micro field__label" htmlFor="c-email">
                Email we should reply to
              </label>
              <input id="c-email" name="email" type="email" required />
            </p>

            <p className="field">
              <label className="t-micro field__label" htmlFor="c-message">
                Message
              </label>
              <textarea id="c-message" name="message" rows="7" required />
            </p>

            <div className="contact__send">
              <button type="submit" className="pill pill--glass">
                Open this in your mail app
                <span className="pill__arrow" aria-hidden="true">
                  →
                </span>
              </button>
              <p className="t-micro contact__note">
                Nothing is sent from this page. Submitting composes the
                message, already routed and prefilled, in your own mail client
                — so you keep a copy, and we never hold your details on a
                server that does not exist yet.
              </p>
            </div>
          </form>

          <aside className="contact__aside">
            <div className="contact__card reveal" style={{ '--d': '120ms' }}>
              <p className="t-eyebrow contact__label">Direct</p>
              <a className="t-body contact__email" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <button type="button" className="contact__copy" onClick={copy}>
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>

            <div className="contact__card reveal" style={{ '--d': '200ms' }}>
              <p className="t-eyebrow contact__label">
                Worth including — {active.label.toLowerCase()}
              </p>
              <ul className="contact__asks">
                {active.asks.map((a) => (
                  <li key={a} className="t-body">
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact__card reveal" style={{ '--d': '280ms' }}>
              <p className="t-eyebrow contact__label">What you will get</p>
              <p className="t-body">
                A reply from a person, usually within two working days. For
                investment, the deck and the risk register; financials and the
                funding ask stay off the public page and come on request.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer base="/" />
    </>
  );
}
