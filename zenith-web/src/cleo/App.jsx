import { useEffect } from 'react';

import Cursor from './components/Cursor.jsx';
import Masthead from './components/Masthead.jsx';
import Preloader from './components/Preloader.jsx';
import Statement from './components/Statement.jsx';
import Chemistry from './sections/Chemistry.jsx';
import Faq from './sections/Faq.jsx';
import Footer from './sections/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Market from './sections/Market.jsx';
import Problem from './sections/Problem.jsx';
import Product from './sections/Product.jsx';
import Roadmap from './sections/Roadmap.jsx';
import Showcase from './sections/Showcase.jsx';
import Talk from './sections/Talk.jsx';
import Team from './sections/Team.jsx';
import Tech from './sections/Tech.jsx';
import Toxicity from './sections/Toxicity.jsx';
import Where from './sections/Where.jsx';
import Who from './sections/Who.jsx';
import { useDampedScroll, useParallax, useReveals } from './hooks.js';

import './tokens.css';
import './layout.css';

export default function App() {
  /* Reveals are keyed off `html.js`, so a no-js visitor gets the whole page
     and a reduced-motion visitor gets it without the transitions. */
  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('js');
    }
  }, []);

  useReveals();
  useParallax();
  useDampedScroll();

  return (
    <>
      <a className="skip" href="#problem">
        Skip to content
      </a>

      <Preloader />

      {/* Above everything and outside <main>: it is page chrome, not
          content, and it must not sit inside anything that clips. */}
      <Cursor />

      <Masthead />

      <main>
        <Hero />

        {/* The imagery starts here, below the hero, exactly as Cleo's does:
            a full-bleed panel with the device scrubbing on scroll. */}
        <Showcase />

        {/* Cleo's centred two-line statement, the page's recurring motion
            signature. Used twice, at the two turns in the argument. */}
        <Statement
          lead="Multiplayer finds you a match."
          warm="It never helps you keep them."
        />

        <Problem />
        <Toxicity />
        <Product />

        <Statement
          lead="A game mate is not the best player."
          warm="It is the person you actually click with."
        />

        <Tech />
        <Chemistry />
        <Who />
        <Market />
        <Where />
        <Roadmap />
        <Team />
        <Faq />
        <Talk />
      </main>

      <Footer />
    </>
  );
}
