import { useEffect } from 'react';
import { useCursor, useDampedScroll, useFloats, useReveals } from './hooks/useV2.js';

import Masthead from './components/Masthead.jsx';
import Marquee from './components/Marquee.jsx';
import Hero from './sections/Hero.jsx';
import Problem from './sections/Problem.jsx';
import Toxicity from './sections/Toxicity.jsx';
import Product from './sections/Product.jsx';
import InApp from './sections/InApp.jsx';
import Tech from './sections/Tech.jsx';
import Chemistry from './sections/Chemistry.jsx';
import Who from './sections/Who.jsx';
import Market from './sections/Market.jsx';
import Where from './sections/Where.jsx';
import Roadmap from './sections/Roadmap.jsx';
import Team from './sections/Team.jsx';
import Talk from './sections/Talk.jsx';
import Footer from './sections/Footer.jsx';

import './styles/v2.css';

export default function App() {
  /* v2's CSS keys every reveal off `html.js`, and the no-js fallback shows
     everything. Set it after mount, and never for a reduced-motion visitor —
     exactly as the original did. Effects run in declaration order, so this
     lands before the hooks below query the DOM. */
  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('js');
    }
  }, []);

  useReveals();
  useFloats();
  useCursor();
  useDampedScroll();

  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>

      <div className="cursor" id="cursor" aria-hidden="true">
        <div className="cursor-dot" />
      </div>

      <Masthead />

      <main id="top">
        <Hero />
        <Marquee />
        <Problem />
        <Toxicity />
        <Product />
        <InApp />
        <Tech />
        <Chemistry />
        <Who />
        <Market />
        <Where />
        <Roadmap />
        <Team />
        <Talk />
      </main>

      <Footer />
    </>
  );
}
