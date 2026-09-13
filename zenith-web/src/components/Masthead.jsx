import { useSettled, useTheme } from '../hooks/useV2.js';

export default function Masthead() {
  const settled = useSettled();
  const { toggle } = useTheme();

  return (
    <header className={`masthead${settled ? ' settled' : ''}`} id="masthead">
      <a className="brand" href="#top">
        <img src="/img/mark.webp" alt="" width="621" height="357" />
        <b>Zenith</b>
      </a>
      <nav className="nav">
        <a href="#problem">Problem</a>
        <a href="#product">Product</a>
        <a href="#tech">Technology</a>
        <a href="#market">Market</a>
        <button className="theme-btn" id="themeBtn" onClick={toggle} aria-label="Switch colour theme">
          <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.5 4.5l1.4 1.4M18.1 18.1l1.4 1.4M19.5 4.5l-1.4 1.4M5.9 18.1l-1.4 1.4"/></svg>
          <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/></svg>
        </button>
        <a href="#talk" className="pill pill-solid">Get in touch</a>
      </nav>
    </header>
  );
}
