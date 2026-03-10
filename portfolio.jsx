import { useState, useEffect, useRef } from "react";

const GOOGLE_FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&display=swap');
`;

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #080808;
    --surface: #111111;
    --border: #1e1e1e;
    --muted: #444444;
    --dim: #888888;
    --text: #e8e8e8;
    --white: #ffffff;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'IBM Plex Mono', monospace;
    --font-serif: 'Cormorant Garamond', serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  .portfolio { min-height: 100vh; background: var(--bg); overflow-x: hidden; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 48px;
    border-bottom: 1px solid var(--border);
    background: rgba(8,8,8,0.92);
    backdrop-filter: blur(12px);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.4rem; letter-spacing: 0.15em;
    color: var(--white);
  }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a {
    font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--dim); text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--white); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 48px 64px;
    position: relative;
    border-bottom: 1px solid var(--border);
  }
  .hero-grid-number {
    position: absolute; top: 120px; right: 48px;
    font-size: 0.65rem; letter-spacing: 0.3em; color: var(--muted);
    writing-mode: vertical-rl;
  }
  .hero-label {
    font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--dim); margin-bottom: 16px;
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(4rem, 11vw, 10rem);
    line-height: 0.92;
    letter-spacing: 0.02em;
    color: var(--white);
    margin-bottom: 8px;
  }
  .hero-name span { color: var(--muted); }
  .hero-title {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: clamp(1.2rem, 2.5vw, 2rem);
    font-weight: 300;
    color: var(--dim);
    margin-bottom: 40px;
  }
  .hero-bottom {
    display: flex; justify-content: space-between; align-items: flex-end;
    border-top: 1px solid var(--border); padding-top: 32px;
  }
  .hero-tagline {
    max-width: 380px;
    font-size: 0.75rem; line-height: 1.8;
    color: var(--dim); letter-spacing: 0.05em;
  }
  .hero-links { display: flex; gap: 24px; }
  .hero-link {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text); text-decoration: none;
    padding: 10px 20px; border: 1px solid var(--border);
    transition: all 0.2s;
    cursor: pointer; background: transparent;
  }
  .hero-link:hover { border-color: var(--white); color: var(--white); }
  .hero-link.filled { background: var(--white); color: var(--bg); border-color: var(--white); }
  .hero-link.filled:hover { background: var(--text); }

  /* SECTION BASE */
  section { padding: 96px 48px; border-bottom: 1px solid var(--border); }
  .section-header {
    display: flex; align-items: baseline; gap: 24px;
    margin-bottom: 64px;
  }
  .section-num {
    font-size: 0.65rem; letter-spacing: 0.3em; color: var(--muted);
    font-family: var(--font-body);
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    letter-spacing: 0.05em; color: var(--white);
  }
  .section-line {
    flex: 1; height: 1px; background: var(--border); margin-left: 16px;
  }

  /* SKILLS */
  .skills-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1px; background: var(--border);
    border: 1px solid var(--border);
  }
  .skill-item {
    background: var(--bg);
    padding: 28px 24px;
    display: flex; flex-direction: column; gap: 8px;
    transition: background 0.2s;
    cursor: default;
  }
  .skill-item:hover { background: var(--surface); }
  .skill-name {
    font-size: 0.85rem; font-weight: 500;
    color: var(--white); letter-spacing: 0.05em;
  }
  .skill-type {
    font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--muted);
  }

  /* PROJECTS */
  .projects-list { display: flex; flex-direction: column; gap: 0; }
  .project-card {
    display: grid; grid-template-columns: 80px 1fr auto;
    align-items: start; gap: 40px;
    padding: 40px 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }
  .project-card:last-child { border-bottom: none; }
  .project-card:hover .project-num { color: var(--white); }
  .project-num {
    font-family: var(--font-display);
    font-size: 3rem; color: var(--border);
    transition: color 0.2s; line-height: 1;
  }
  .project-content { display: flex; flex-direction: column; gap: 12px; }
  .project-name {
    font-family: var(--font-display);
    font-size: 1.8rem; letter-spacing: 0.05em;
    color: var(--white);
  }
  .project-desc {
    font-size: 0.75rem; line-height: 1.9;
    color: var(--dim); max-width: 520px;
  }
  .project-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
  .tag {
    font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 4px 10px; border: 1px solid var(--border);
    color: var(--muted);
  }
  .project-status {
    font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--dim); white-space: nowrap; padding-top: 6px;
  }
  .project-status.active { color: var(--text); }

  /* CV SECTION */
  .cv-container { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .cv-info { display: flex; flex-direction: column; gap: 24px; }
  .cv-description {
    font-size: 0.75rem; line-height: 1.9;
    color: var(--dim);
  }
  .cv-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
  .cv-btn {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 12px 24px; border: 1px solid var(--border);
    color: var(--text); background: transparent;
    cursor: pointer; transition: all 0.2s;
    font-family: var(--font-body);
  }
  .cv-btn:hover { border-color: var(--white); color: var(--white); }
  .cv-btn.primary { background: var(--white); color: var(--bg); border-color: var(--white); }
  .cv-btn.primary:hover { background: var(--text); }

  .cv-preview-panel {
    border: 1px solid var(--border);
    background: var(--surface);
    height: 480px;
    overflow: hidden;
    position: relative;
  }
  .cv-preview-overlay {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    gap: 16px; background: var(--surface);
  }
  .cv-preview-label {
    font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--muted);
  }
  .cv-preview-icon { font-size: 2.5rem; opacity: 0.3; }
  .cv-preview-note {
    font-size: 0.6rem; letter-spacing: 0.1em;
    color: var(--muted); text-align: center; max-width: 200px; line-height: 1.6;
  }
  .cv-iframe { width: 100%; height: 100%; border: none; }
  .cv-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
  }
  .cv-topbar-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
  .cv-topbar-name {
    font-size: 0.6rem; letter-spacing: 0.15em; color: var(--muted);
  }

  /* FOOTER */
  footer {
    padding: 48px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-name {
    font-family: var(--font-display);
    font-size: 1rem; letter-spacing: 0.2em; color: var(--muted);
  }
  .footer-copy {
    font-size: 0.6rem; letter-spacing: 0.15em; color: var(--muted);
  }

  /* CLASSIFIED CARD */
  .classified-card { opacity: 0.85; }
  .classified-card:hover { opacity: 1; }
  .classified-name {
    font-family: var(--font-display);
    font-size: 1.8rem; letter-spacing: 0.1em;
    color: var(--muted) !important;
  }
  .classified-desc {
    font-size: 0.7rem; line-height: 2;
    color: var(--border);
    letter-spacing: 0.05em;
    user-select: none;
  }
  .hire-me-btn {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 10px 20px; border: 1px solid var(--muted);
    color: var(--text); text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }
  .hire-me-btn:hover {
    border-color: var(--white); color: var(--white);
    background: var(--white); color: var(--bg);
  }
  .tag-link {
    color: var(--text) !important;
    border-color: var(--muted) !important;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
  }
  .tag-link:hover { border-color: var(--white) !important; color: var(--white) !important; }

  /* FADE IN ANIMATION */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeUp 0.7s ease forwards; }
  .fade-in-2 { animation: fadeUp 0.7s 0.15s ease forwards; opacity: 0; }
  .fade-in-3 { animation: fadeUp 0.7s 0.3s ease forwards; opacity: 0; }
  .fade-in-4 { animation: fadeUp 0.7s 0.45s ease forwards; opacity: 0; }

  /* MOBILE MENU */
  .mobile-menu-btn {
    display: none;
    flex-direction: column; gap: 5px;
    cursor: pointer; padding: 4px; background: none; border: none;
  }
  .mobile-menu-btn span {
    display: block; width: 22px; height: 1px;
    background: var(--text); transition: all 0.3s;
  }
  .mobile-menu-btn.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .mobile-menu-btn.open span:nth-child(2) { opacity: 0; }
  .mobile-menu-btn.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  .mobile-nav {
    display: none;
    position: fixed; top: 61px; left: 0; right: 0; z-index: 99;
    background: rgba(8,8,8,0.98);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    padding: 24px;
    gap: 24px;
  }
  .mobile-nav.open { display: flex; }
  .mobile-nav a {
    font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--dim); text-decoration: none;
    padding: 12px 0; border-bottom: 1px solid var(--border);
    transition: color 0.2s;
  }
  .mobile-nav a:last-child { border-bottom: none; }
  .mobile-nav a:hover { color: var(--white); }

  @media (max-width: 768px) {
    /* NAV */
    nav { padding: 16px 20px; }
    .nav-links { display: none; }
    .mobile-menu-btn { display: flex; }

    /* HERO */
    .hero { padding: 0 20px 48px; min-height: 100svh; }
    .hero-grid-number { display: none; }
    .hero-name { font-size: clamp(3.2rem, 18vw, 5rem); margin-bottom: 12px; }
    .hero-title { font-size: 1.1rem; margin-bottom: 28px; }
    .hero-bottom { flex-direction: column; gap: 24px; align-items: flex-start; }
    .hero-tagline { max-width: 100%; font-size: 0.7rem; }
    .hero-links { width: 100%; }
    .hero-link { flex: 1; text-align: center; padding: 14px 12px; font-size: 0.6rem; }

    /* SECTIONS */
    section { padding: 56px 20px; }
    .section-header { margin-bottom: 40px; }
    .section-title { font-size: clamp(2rem, 10vw, 3rem); }
    .section-line { display: none; }

    /* SKILLS */
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .skill-item { padding: 20px 16px; }
    .skill-name { font-size: 0.8rem; }

    /* PROJECTS */
    .project-card {
      grid-template-columns: 40px 1fr;
      gap: 16px; padding: 28px 0;
    }
    .project-num { font-size: 2rem; }
    .project-name { font-size: 1.3rem; }
    .project-desc { font-size: 0.7rem; }
    .project-status { display: none; }

    /* CV */
    .cv-container { grid-template-columns: 1fr; gap: 32px; }
    .cv-description { font-size: 0.7rem; }
    .cv-actions { flex-direction: column; }
    .cv-btn { width: 100%; text-align: center; padding: 14px; }
    .cv-preview-panel { height: 360px; }

    /* FOOTER */
    footer {
      padding: 32px 20px;
      flex-direction: column; gap: 12px; text-align: center;
    }
    .footer-name { font-size: 0.75rem; }
  }

  @media (max-width: 400px) {
    .hero-name { font-size: clamp(2.8rem, 16vw, 4rem); }
    .skills-grid { grid-template-columns: 1fr 1fr; }
  }
`;

const skills = [
  { name: "React", type: "Frontend" },
  { name: "TypeScript", type: "Language" },
  { name: "Capacitor", type: "Mobile" },
  { name: "Python", type: "Language" },
  { name: "Meta-Learning", type: "ML/AI" },
  { name: "Continual Learning", type: "ML/AI" },
  { name: "Node.js", type: "Backend" },
  { name: "System Design", type: "Architecture" },
];

const projects = [
  {
    num: "01",
    name: "MACRO AUDIT JOURNAL",
    desc: "A trading journal app for serious traders. Log trades, review analytics, and sharpen execution consistency — all in one focused interface.",
    tags: ["Trading", "Analytics", "React", "TypeScript"],
    status: "Live",
    link: "https://macroaudit.xalosoftware.com",
  },
  {
    num: "02",
    name: "SHG — CAPACITOR CLI",
    desc: "A developer CLI tool that abstracts the entire Capacitor stack into simple commands. No more memorising build steps, sync flags, or platform-specific incantations.",
    tags: ["CLI", "Capacitor", "DX", "TypeScript"],
    status: "Active",
    link: null,
  },
  {
    num: "03",
    name: "[CLASSIFIED]",
    desc: null,
    tags: [],
    status: "Classified",
    link: null,
    classified: true,
  },
];

export default function Portfolio() {
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const CV_URL = "data:application/pdf;base64,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MjhdL0Fubm90c1sKNzEgMCBSIF0KL1RhYnMvUwovU3RydWN0UGFyZW50cyAwCi9Db250ZW50cyAyIDAgUj4+CmVuZG9iagoKNjUgMCBvYmoKPDwvVHlwZS9QYWdlL1BhcmVudCA3MiAwIFIvUmVzb3VyY2VzIDg5IDAgUi9NZWRpYUJveFswIDAgNTk1LjMwMzkzNzAwNzg3NCA4NDEuODg5NzYzNzc5NTI4XS9UYWJzL1MKL1N0cnVjdFBhcmVudHMgMQovQ29udGVudHMgNjYgMCBSPj4KZW5kb2JqCgo1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9TdGFuZGFyZAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCj4+Ci9LWzAgXQo+PgplbmRvYmoKCjYgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDgKPj4KL0tbMSBdCj4+CmVuZG9iagoKOCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTGluawovUCA3IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvVGV4dERlY29yYXRpb25UeXBlL1VuZGVybGluZQo+PgovS1szIDw8L1R5cGUvT0JKUi9PYmogNzEgMCBSID4+Cl0KPj4KZW5kb2JqCgo3IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9TdGFuZGFyZAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjEKPj4KL0tbMiA4IDAgUiAgNCBdCj4+CmVuZG9iagoKOSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4wOAo+PgovS1s1IDYgNyA4IF0KPj4KZW5kb2JqCgoxMCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4yOAo+PgovS1s5IF0KPj4KZW5kb2JqCgoxMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4yCj4+Ci9LWzEwIDExIF0KPj4KZW5kb2JqCgoxMiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4wNAo+PgovS1sxMiBdCj4+CmVuZG9iagoKMTUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xibAovUCAxNCAwIFIKL1BnIDEgMCBSCi9LWzEzIF0KPj4KZW5kb2JqCgoxNyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTGlzdCMyMFBhcmFncmFwaAovUCAxNiAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4wNAovU3RhcnRJbmRlbnQgMC4yNAo+PgovS1sxNCAxNSBdCj4+CmVuZG9iagoKMTYgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xCb2R5Ci9QIDE0IDAgUgovUGcgMSAwIFIKL0tbMTcgMCBSICBdCj4+CmVuZG9iagoKMTQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xJCi9QIDEzIDAgUgovUGcgMSAwIFIKL0tbMTUgMCBSICAxNiAwIFIgIF0KPj4KZW5kb2JqCgoxOSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTGJsCi9QIDE4IDAgUgovUGcgMSAwIFIKL0tbMTYgXQo+PgplbmRvYmoKCjIxIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MaXN0IzIwUGFyYWdyYXBoCi9QIDIwIDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjAzCi9TdGFydEluZGVudCAwLjI0Cj4+Ci9LWzE3IF0KPj4KZW5kb2JqCgoyMCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTEJvZHkKL1AgMTggMCBSCi9QZyAxIDAgUgovS1syMSAwIFIgIF0KPj4KZW5kb2JqCgoxOCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTEkKL1AgMTMgMCBSCi9QZyAxIDAgUgovS1sxOSAwIFIgIDIwIDAgUiAgXQo+PgplbmRvYmoKCjIzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MYmwKL1AgMjIgMCBSCi9QZyAxIDAgUgovS1sxOCBdCj4+CmVuZG9iagoKMjUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xpc3QjMjBQYXJhZ3JhcGgKL1AgMjQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDMKL1N0YXJ0SW5kZW50IDAuMjQKPj4KL0tbMTkgXQo+PgplbmRvYmoKCjI0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MQm9keQovUCAyMiAwIFIKL1BnIDEgMCBSCi9LWzI1IDAgUiAgXQo+PgplbmRvYmoKCjIyIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MSQovUCAxMyAwIFIKL1BnIDEgMCBSCi9LWzIzIDAgUiAgMjQgMCBSICBdCj4+CmVuZG9iagoKMTMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0wKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGlzdC9MaXN0TnVtYmVyaW5nL05vbmUKPj4KL0tbMTQgMCBSICAxOCAwIFIgIDIyIDAgUiAgXQo+PgplbmRvYmoKCjI2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9TdGFuZGFyZAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjIKPj4KL0tbMjAgMjEgXQo+PgplbmRvYmoKCjI3IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9TdGFuZGFyZAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjA0Cj4+Ci9LWzIyIF0KPj4KZW5kb2JqCgozMCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTGJsCi9QIDI5IDAgUgovUGcgMSAwIFIKL0tbMjMgXQo+PgplbmRvYmoKCjMyIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MaXN0IzIwUGFyYWdyYXBoCi9QIDMxIDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjA0Ci9TdGFydEluZGVudCAwLjI0Cj4+Ci9LWzI0IDI1IF0KPj4KZW5kb2JqCgozMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTEJvZHkKL1AgMjkgMCBSCi9QZyAxIDAgUgovS1szMiAwIFIgIF0KPj4KZW5kb2JqCgoyOSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTEkKL1AgMjggMCBSCi9QZyAxIDAgUgovS1szMCAwIFIgIDMxIDAgUiAgXQo+PgplbmRvYmoKCjM0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MYmwKL1AgMzMgMCBSCi9QZyAxIDAgUgovS1syNiBdCj4+CmVuZG9iagoKMzYgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xpc3QjMjBQYXJhZ3JhcGgKL1AgMzUgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDMKL1N0YXJ0SW5kZW50IDAuMjQKPj4KL0tbMjcgMjggXQo+PgplbmRvYmoKCjM1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MQm9keQovUCAzMyAwIFIKL1BnIDEgMCBSCi9LWzM2IDAgUiAgXQo+PgplbmRvYmoKCjMzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MSQovUCAyOCAwIFIKL1BnIDEgMCBSCi9LWzM0IDAgUiAgMzUgMCBSICBdCj4+CmVuZG9iagoKMzggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xibAovUCAzNyAwIFIKL1BnIDEgMCBSCi9LWzI5IF0KPj4KZW5kb2JqCgo0MCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTGlzdCMyMFBhcmFncmFwaAovUCAzOSAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4wMwovU3RhcnRJbmRlbnQgMC4yNAo+PgovS1szMCBdCj4+CmVuZG9iagoKMzkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xCb2R5Ci9QIDM3IDAgUgovUGcgMSAwIFIKL0tbNDAgMCBSICBdCj4+CmVuZG9iagoKMzcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xJCi9QIDI4IDAgUgovUGcgMSAwIFIKL0tbMzggMCBSICAzOSAwIFIgIF0KPj4KZW5kb2JqCgoyOCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MaXN0L0xpc3ROdW1iZXJpbmcvTm9uZQo+PgovS1syOSAwIFIgIDMzIDAgUiAgMzcgMCBSICBdCj4+CmVuZG9iagoKNDEgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMgo+PgovS1szMSAzMiBdCj4+CmVuZG9iagoKNDIgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDQKPj4KL0tbMzMgXQo+PgplbmRvYmoKCjQ1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MYmwKL1AgNDQgMCBSCi9QZyAxIDAgUgovS1szNCBdCj4+CmVuZG9iagoKNDcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xpc3QjMjBQYXJhZ3JhcGgKL1AgNDYgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDQKL1N0YXJ0SW5kZW50IDAuMjQKPj4KL0tbMzUgXQo+PgplbmRvYmoKCjQ2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MQm9keQovUCA0NCAwIFIKL1BnIDEgMCBSCi9LWzQ3IDAgUiAgXQo+PgplbmRvYmoKCjQ0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MSQovUCA0MyAwIFIKL1BnIDEgMCBSCi9LWzQ1IDAgUiAgNDYgMCBSICBdCj4+CmVuZG9iagoKNDkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xibAovUCA0OCAwIFIKL1BnIDEgMCBSCi9LWzM2IF0KPj4KZW5kb2JqCgo1MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTGlzdCMyMFBhcmFncmFwaAovUCA1MCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4wMwovU3RhcnRJbmRlbnQgMC4yNAo+PgovS1szNyBdCj4+CmVuZG9iagoKNTAgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xCb2R5Ci9QIDQ4IDAgUgovUGcgMSAwIFIKL0tbNTEgMCBSICBdCj4+CmVuZG9iagoKNDggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0xJCi9QIDQzIDAgUgovUGcgMSAwIFIKL0tbNDkgMCBSICA1MCAwIFIgIF0KPj4KZW5kb2JqCgo1MyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTGJsCi9QIDUyIDAgUgovUGcgMSAwIFIKL0tbMzggXQo+PgplbmRvYmoKCjU1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MaXN0IzIwUGFyYWdyYXBoCi9QIDU0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjAzCi9TdGFydEluZGVudCAwLjI0Cj4+Ci9LWzM5IF0KPj4KZW5kb2JqCgo1NCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTEJvZHkKL1AgNTIgMCBSCi9QZyAxIDAgUgovS1s1NSAwIFIgIF0KPj4KZW5kb2JqCgo1MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvTEkKL1AgNDMgMCBSCi9QZyAxIDAgUgovS1s1MyAwIFIgIDU0IDAgUiAgXQo+PgplbmRvYmoKCjQzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9MCi9QIDQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xpc3QvTGlzdE51bWJlcmluZy9Ob25lCj4+Ci9LWzQ0IDAgUiAgNDggMCBSICA1MiAwIFIgIF0KPj4KZW5kb2JqCgo1NiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4yOAo+PgovS1s0MCBdCj4+CmVuZG9iagoKNTcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDYKPj4KL0tbNDEgNDIgXQo+PgplbmRvYmoKCjU4IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9TdGFuZGFyZAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjA2Cj4+Ci9LWzQzIDQ0IF0KPj4KZW5kb2JqCgo1OSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4wNgo+PgovS1s0NSA0NiBdCj4+CmVuZG9iagoKNjAgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDYKPj4KL0tbNDcgNDggXQo+PgplbmRvYmoKCjYxIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9TdGFuZGFyZAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjA2Cj4+Ci9LWzQ5IDUwIF0KPj4KZW5kb2JqCgo2MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDw8L08vTGF5b3V0L1BsYWNlbWVudC9CbG9jawovU3BhY2VCZWZvcmUgMC4yOAo+PgovS1s1MSBdCj4+CmVuZG9iagoKNjMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyAxIDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMDYKPj4KL0tbNTIgNTMgXQo+PgplbmRvYmoKCjY0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9TdGFuZGFyZAovUCA0IDAgUgovUGcgMSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjAyCj4+Ci9LWzU0IF0KPj4KZW5kb2JqCgo2OCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvU3RhbmRhcmQKL1AgNCAwIFIKL1BnIDY1IDAgUgovQSA8PC9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2sKL1NwYWNlQmVmb3JlIDAuMjgKPj4KL0tbMCBdCj4+CmVuZG9iagoKNjkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyA2NSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjA2Cj4+Ci9LWzEgMiBdCj4+CmVuZG9iagoKNzAgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1N0YW5kYXJkCi9QIDQgMCBSCi9QZyA2NSAwIFIKL0EgPDwvTy9MYXlvdXQvUGxhY2VtZW50L0Jsb2NrCi9TcGFjZUJlZm9yZSAwLjA2Cj4+Ci9LWzMgNCBdCj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvRG9jdW1lbnQKL1AgOTAgMCBSCi9QZyAxIDAgUgovS1s1IDAgUiAgNiAwIFIgIDcgMCBSICA5IDAgUiAgMTAgMCBSICAxMSAwIFIgIDEyIDAgUiAgMTMgMCBSICAyNiAwIFIgIDI3IDAgUiAgMjggMCBSICA0MSAwIFIgIDQyIDAgUiAgNDMgMCBSICA1NiAwIFIgIDU3IDAgUiAKNTggMCBSICA1OSAwIFIgIDYwIDAgUiAgNjEgMCBSICA2MiAwIFIgIDYzIDAgUiAgNjQgMCBSICA2OCAwIFIgIDY5IDAgUiAgNzAgMCBSICBdCj4+CmVuZG9iagoKOTAgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RUcmVlUm9vdAovUGFyZW50VHJlZSA5MSAwIFIKL1JvbGVNYXA8PC9MaXN0IzIwUGFyYWdyYXBoL1AKL1N0YW5kYXJkL1AKPj4KL0tbNCAwIFIgIF0KPj4KZW5kb2JqCgo5MSAwIG9iago8PC9OdW1zWwowIFsgNSAwIFIgNiAwIFIgNyAwIFIgOCAwIFIgNyAwIFIgOSAwIFIgOSAwIFIgOSAwIFIgOSAwIFIgMTAgMCBSCjExIDAgUiAxMSAwIFIgMTIgMCBSIDE1IDAgUiAxNyAwIFIgMTcgMCBSIDE5IDAgUiAyMSAwIFIgMjMgMCBSIDI1IDAgUgoyNiAwIFIgMjYgMCBSIDI3IDAgUiAzMCAwIFIgMzIgMCBSIDMyIDAgUiAzNCAwIFIgMzYgMCBSIDM2IDAgUiAzOCAwIFIKNDAgMCBSIDQxIDAgUiA0MSAwIFIgNDIgMCBSIDQ1IDAgUiA0NyAwIFIgNDkgMCBSIDUxIDAgUiA1MyAwIFIgNTUgMCBSCjU2IDAgUiA1NyAwIFIgNTcgMCBSIDU4IDAgUiA1OCAwIFIgNTkgMCBSIDU5IDAgUiA2MCAwIFIgNjAgMCBSIDYxIDAgUgo2MSAwIFIgNjIgMCBSIDYzIDAgUiA2MyAwIFIgNjQgMCBSIF0KMSBbIDY4IDAgUiA2OSAwIFIgNjkgMCBSIDcwIDAgUiA3MCAwIFIgXQoyIDggMCBSCl0+PgplbmRvYmoKCjcyIDAgb2JqCjw8L1R5cGUvUGFnZXMKL1Jlc291cmNlcyA4OSAwIFIKL0tpZHNbIDEgMCBSIDY1IDAgUiBdCi9Db3VudCAyPj4KZW5kb2JqCgo3MSAwIG9iago8PC9UeXBlL0Fubm90L1N1YnR5cGUvTGluay9Cb3JkZXJbMCAwIDBdL1JlY3RbMTgzLjk5MyA3MzAuNTg5IDMzMS4xMDcgNzQwLjkzOV0vQ29udGVudHM8RkVGRjAwNkMwMDY5MDA2RTAwNkIwMDY1MDA2NDAwNjkwMDZFMDAyRTAwNjMwMDZGMDA2RDAwMkYwMDY5MDA2RTAwMkYwMDc0MDA2QjAwNjEwMDc5MDAyRDAwNkQwMDc1MDA3NDAwNzUwMDZEMDA2MjAwNjkwMDc3MDA2NTAwNkUwMDdBMDA2RjAwNzU+L0E8PC9UeXBlL0FjdGlvbi9TL1VSSS9VUkkoaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3RrYXktbXV0dW1iaXdlbnpvdS0zNDJiNTYzYjMpPj4KL1N0cnVjdFBhcmVudCAyPj4KZW5kb2JqCgo5MiAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgNzIgMCBSCi9QYWdlTW9kZS9Vc2VPdXRsaW5lcwovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovU3RydWN0VHJlZVJvb3QgOTAgMCBSCi9MYW5nKGVuLVVTKQovTWFya0luZm88PC9NYXJrZWQgdHJ1ZT4+Cj4+CmVuZG9iagoKOTMgMCBvYmoKPDwvQXV0aG9yPEZFRkYwMDU1MDA2RTAwMkQwMDZFMDA2MTAwNkQwMDY1MDA2ND4KL0NyZWF0b3I8RkVGRjAwNTcwMDcyMDA2OTAwNzQwMDY1MDA3Mj4KL1Byb2R1Y2VyPEZFRkYwMDRDMDA2OTAwNjIwMDcyMDA2NTAwNEYwMDY2MDA2NjAwNjkwMDYzMDA2NTAwMjAwMDMyMDAzNDAwMkUwMDMyPgovQ3JlYXRpb25EYXRlKEQ6MjAyNjAzMTAxODQ2NDlaJyk+PgplbmRvYmoKCnhyZWYKMCA5NAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMzk1MDQgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAyODI0IDAwMDAwIG4gCjAwMDAwNDY5NDcgMDAwMDAgbiAKMDAwMDAzOTgyNCAwMDAwMCBuIAowMDAwMDM5OTM0IDAwMDAwIG4gCjAwMDAwNDAyMDggMDAwMDAgbiAKMDAwMDA0MDA2MiAwMDAwMCBuIAowMDAwMDQwMzQ0IDAwMDAwIG4gCjAwMDAwNDA0NzggMDAwMDAgbiAKMDAwMDA0MDYwNyAwMDAwMCBuIAowMDAwMDQwNzM5IDAwMDAwIG4gCjAwMDAwNDIwNjYgMDAwMDAgbiAKMDAwMDA0MTE4NCAwMDAwMCBuIAowMDAwMDQwODY5IDAwMDAwIG4gCjAwMDAwNDExMDMgMDAwMDAgbiAKMDAwMDA0MDk0MyAwMDAwMCBuIAowMDAwMDQxNTgyIDAwMDAwIG4gCjAwMDAwNDEyNzAgMDAwMDAgbiAKMDAwMDA0MTUwMSAwMDAwMCBuIAowMDAwMDQxMzQ0IDAwMDAwIG4gCjAwMDAwNDE5ODAgMDAwMDAgbiAKMDAwMDA0MTY2OCAwMDAwMCBuIAowMDAwMDQxODk5IDAwMDAwIG4gCjAwMDAwNDE3NDIgMDAwMDAgbiAKMDAwMDA0MjE5MyAwMDAwMCBuIAowMDAwMDQyMzI1IDAwMDAwIG4gCjAwMDAwNDM2NTUgMDAwMDAgbiAKMDAwMDA0Mjc3MCAwMDAwMCBuIAowMDAwMDQyNDU1IDAwMDAwIG4gCjAwMDAwNDI2ODkgMDAwMDAgbiAKMDAwMDA0MjUyOSAwMDAwMCBuIAowMDAwMDQzMTcxIDAwMDAwIG4gCjAwMDAwNDI4NTYgMDAwMDAgbiAKMDAwMDA0MzA5MCAwMDAwMCBuIAowMDAwMDQyOTMwIDAwMDAwIG4gCjAwMDAwNDM1NjkgMDAwMDAgbiAKMDAwMDA0MzI1NyAwMDAwMCBuIAowMDAwMDQzNDg4IDAwMDAwIG4gCjAwMDAwNDMzMzEgMDAwMDAgbiAKMDAwMDA0Mzc4MiAwMDAwMCBuIAowMDAwMDQzOTE0IDAwMDAwIG4gCjAwMDAwNDUyMzggMDAwMDAgbiAKMDAwMDA0NDM1NiAwMDAwMCBuIAowMDAwMDQ0MDQ0IDAwMDAwIG4gCjAwMDAwNDQyNzUgMDAwMDAgbiAKMDAwMDA0NDExOCAwMDAwMCBuIAowMDAwMDQ0NzU0IDAwMDAwIG4gCjAwMDAwNDQ0NDIgMDAwMDAgbiAKMDAwMDA0NDY3MyAwMDAwMCBuIAowMDAwMDQ0NTE2IDAwMDAwIG4gCjAwMDAwNDUxNTIgMDAwMDAgbiAKMDAwMDA0NDg0MCAwMDAwMCBuIAowMDAwMDQ1MDcxIDAwMDAwIG4gCjAwMDAwNDQ5MTQgMDAwMDAgbiAKMDAwMDA0NTM2NSAwMDAwMCBuIAowMDAwMDQ1NDk1IDAwMDAwIG4gCjAwMDAwNDU2MjggMDAwMDAgbiAKMDAwMDA0NTc2MSAwMDAwMCBuIAowMDAwMDQ1ODk0IDAwMDAwIG4gCjAwMDAwNDYwMjcgMDAwMDAgbiAKMDAwMDA0NjE2MCAwMDAwMCBuIAowMDAwMDQ2MjkwIDAwMDAwIG4gCjAwMDAwNDY0MjMgMDAwMDAgbiAKMDAwMDAzOTY3MiAwMDAwMCBuIAowMDAwMDAyODQ1IDAwMDAwIG4gCjAwMDAwMDMzNDYgMDAwMDAgbiAKMDAwMDA0NjU1MyAwMDAwMCBuIAowMDAwMDQ2NjgzIDAwMDAwIG4gCjAwMDAwNDY4MTUgMDAwMDAgbiAKMDAwMDA0Nzg4OCAwMDAwMCBuIAowMDAwMDQ3ODA2IDAwMDAwIG4gCjAwMDAwMDMzNjcgMDAwMDAgbiAKMDAwMDAxNjExNyAwMDAwMCBuIAowMDAwMDE2MTQwIDAwMDAwIG4gCjAwMDAwMTYzMzYgMDAwMDAgbiAKMDAwMDAxNjkxNyAwMDAwMCBuIAowMDAwMDE3MzM5IDAwMDAwIG4gCjAwMDAwMjYzNjggMDAwMDAgbiAKMDAwMDAyNjM5MCAwMDAwMCBuIAowMDAwMDI2NTk4IDAwMDAwIG4gCjAwMDAwMjcwNjUgMDAwMDAgbiAKMDAwMDAyNzM4NSAwMDAwMCBuIAowMDAwMDM4Mjg3IDAwMDAwIG4gCjAwMDAwMzgzMTAgMDAwMDAgbiAKMDAwMDAzODUxMyAwMDAwMCBuIAowMDAwMDM5MDI5IDAwMDAwIG4gCjAwMDAwMzkzOTUgMDAwMDAgbiAKMDAwMDAzOTQ0OCAwMDAwMCBuIAowMDAwMDQ3MjI2IDAwMDAwIG4gCjAwMDAwNDczNDUgMDAwMDAgbiAKMDAwMDA0ODIzOSAwMDAwMCBuIAowMDAwMDQ4NDA4IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA5NC9Sb290IDkyIDAgUgovSW5mbyA5MyAwIFIKL0lEIFsgPDhDRkYzMTkyQTRBNEMwMTVCOTVEODMwNzQyMUVFQjhGPgo8OENGRjMxOTJBNEE0QzAxNUI5NUQ4MzA3NDIxRUVCOEY+IF0KL0RvY0NoZWNrc3VtIC85MEIzMjhDNkNDMUYyRUNDNjg0NURENzA0Njg1OTRDOAo+PgpzdGFydHhyZWYKNDg2MjgKJSVFT0YK";

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{GOOGLE_FONTS + styles}</style>
      <div className="portfolio">

        {/* NAV */}
        <nav>
          <div className="nav-logo">T—KAY</div>
          <ul className="nav-links">
            {["skills", "projects", "cv"].map((s) => (
              <li key={s}>
                <a onClick={() => scrollTo(s)} href={`#${s}`}>{s}</a>
              </li>
            ))}
          </ul>
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* MOBILE DRAWER */}
        <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
          {["skills", "projects", "cv"].map((s) => (
            <a key={s} onClick={() => scrollTo(s)} href={`#${s}`}>{s}</a>
          ))}
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-grid-number">ZWE — 2026 — SD</div>
          <div className="hero-label fade-in">Software Developer & Systems Thinker</div>
          <h1 className="hero-name fade-in-2">
            T—KAY<br />
            <span>TINOTENDA</span>
          </h1>
          <p className="hero-title fade-in-3">
            Building intelligent systems for the real world
          </p>
          <div className="hero-bottom fade-in-4">
            <p className="hero-tagline">
              Building tools that solve real problems — from trading journals 
              to CLI utilities and systems that haven't been named yet.
            </p>
            <div className="hero-links">
              <a
                className="hero-link"
                href="https://www.linkedin.com/in/tkay-mutumbiwenzou-342b563b3"
                target="_blank" rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <button className="hero-link" onClick={() => scrollTo("projects")}>
                View Work
              </button>
              <button className="hero-link filled" onClick={() => scrollTo("cv")}>
                Get CV
              </button>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <section id="skills">
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">STACK</h2>
            <div className="section-line" />
          </div>
          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.name} className="skill-item">
                <span className="skill-name">{s.name}</span>
                <span className="skill-type">{s.type}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">PROJECTS</h2>
            <div className="section-line" />
          </div>
          <div className="projects-list">
            {projects.map((p) =>
              p.classified ? (
                <div key={p.num} className="project-card classified-card">
                  <div className="project-num">{p.num}</div>
                  <div className="project-content">
                    <h3 className="project-name classified-name">
                      {p.name}
                    </h3>
                    <p className="classified-desc">
                      ████████ ██████ ████ ██████████ ████ ███████ ██ ████████████ ██████.<br/>
                      ██████ ████████████ ████ ██████ ██████████ ████████.
                    </p>
                    <div className="project-tags" style={{marginTop: "16px"}}>
                      <a
                        className="hire-me-btn"
                        href="mailto:diplovlogodesign@gmail.com"
                      >
                        Hire me to find out →
                      </a>
                    </div>
                  </div>
                  <div className="project-status">⬛ Classified</div>
                </div>
              ) : (
                <div key={p.num} className="project-card">
                  <div className="project-num">{p.num}</div>
                  <div className="project-content">
                    <h3 className="project-name">{p.name}</h3>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tag tag-link"
                        >
                          ↗ View Live
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={`project-status ${p.status === "Live" || p.status === "Active" ? "active" : ""}`}>
                    {p.status}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* CV */}
        <section id="cv">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">CURRICULUM VITAE</h2>
            <div className="section-line" />
          </div>
          <div className="cv-container">
            <div className="cv-info">
              <p className="cv-description">
                A detailed record of my work, skills, and the projects I've 
                shipped. Preview it right here or download a copy to keep.
              </p>
              <div className="cv-actions">
                <button
                  className="cv-btn"
                  onClick={() => setCvPreviewOpen(!cvPreviewOpen)}
                >
                  {cvPreviewOpen ? "Close Preview" : "Preview CV"}
                </button>
                <a className="cv-btn primary" href={CV_URL} download>
                  Download PDF
                </a>
              </div>
            </div>

            <div className="cv-preview-panel">
              <div className="cv-topbar">
                <div className="cv-topbar-dot" />
                <span className="cv-topbar-name">T-KAY — CV.PDF</span>
                <div className="cv-topbar-dot" />
              </div>

              {cvPreviewOpen ? (
                <iframe
                  className="cv-iframe"
                  src={CV_URL}
                  title="CV Preview"
                />
              ) : (
                <div className="cv-preview-overlay">
                  <span className="cv-preview-icon">⬡</span>
                  <span className="cv-preview-label">Click Preview to Open</span>
                  <p className="cv-preview-note">
                    Your CV loads right here — no redirects, no new tabs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <span className="footer-name">T—KAY TINOTENDA MUTUMBIWENZOU</span>
          <div style={{display:"flex", gap:"24px", alignItems:"center"}}>
            <a
              href="https://www.linkedin.com/in/tkay-mutumbiwenzou-342b563b3"
              target="_blank" rel="noopener noreferrer"
              style={{fontSize:"0.6rem", letterSpacing:"0.2em", color:"var(--muted)", textDecoration:"none"}}
            >
              LINKEDIN ↗
            </a>
            <span className="footer-copy">© 2026 — ALL RIGHTS RESERVED</span>
          </div>
        </footer>

      </div>
    </>
  );
}
