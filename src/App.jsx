import { useEffect, useState } from "react";

function ReactIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="4.5" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="2.5">
        <ellipse cx="32" cy="32" rx="22" ry="8.5" />
        <ellipse cx="32" cy="32" rx="22" ry="8.5" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="22" ry="8.5" transform="rotate(120 32 32)" />
      </g>
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="7" y="7" width="50" height="50" rx="10" fill="currentColor" opacity="0.18" />
      <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M19 26h19m-9.5 0v18M39.5 31.5c1.6-1.7 3.6-2.5 6.1-2.5 3.9 0 6.4 1.9 6.4 4.8 0 2.2-1.5 3.8-4.4 4.7l-2.7.9c-2 .6-2.9 1.3-2.9 2.5 0 1.6 1.3 2.6 3.4 2.6 2.1 0 4-.8 5.9-2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CapacitorIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M42.5 21.5a14 14 0 1 0 0 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M48 16l-8 8M48 48l-8-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 12c-8.7 0-14 4.2-14 11.5V31h20c4.4 0 8 3.6 8 8v2h2.5C55.8 41 58 35.8 58 30c0-10.4-7.4-18-26-18Zm-6 8a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Z"
        fill="currentColor"
      />
      <path
        d="M32 52c8.7 0 14-4.2 14-11.5V33H26c-4.4 0-8-3.6-8-8v-2h-2.5C8.2 23 6 28.2 6 34c0 10.4 7.4 18 26 18Zm6-8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

function MetaLearningIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M32 10v10M32 44v10M10 32h10M44 32h10" />
        <path d="M17 17l7 7M40 40l7 7M47 17l-7 7M24 40l-7 7" />
        <circle cx="32" cy="32" r="16" opacity="0.55" />
      </g>
    </svg>
  );
}

function ContinualLearningIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 24a18 18 0 0 1 29-5" />
        <path d="M47 40a18 18 0 0 1-29 5" opacity="0.7" />
        <path d="M42 12v9h-9" />
        <path d="M22 52v-9h9" opacity="0.7" />
        <circle cx="32" cy="32" r="8.5" />
      </g>
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 7 51 18v28L32 57 13 46V18L32 7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M25 40V24l13 8v8m-8 0h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SystemDesignIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="12" width="18" height="12" rx="3" />
        <rect x="36" y="12" width="18" height="12" rx="3" />
        <rect x="23" y="40" width="18" height="12" rx="3" />
        <path d="M19 24v8h26v-8M32 32v8" />
      </g>
    </svg>
  );
}

const navigation = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
];

const skills = [
  { name: "React", type: "Frontend", icon: ReactIcon },
  { name: "TypeScript", type: "Language", icon: TypeScriptIcon },
  { name: "Capacitor", type: "Mobile", icon: CapacitorIcon },
  { name: "Python", type: "Language", icon: PythonIcon },
  { name: "Meta-Learning", type: "ML/AI", icon: MetaLearningIcon },
  { name: "Continual Learning", type: "ML/AI", icon: ContinualLearningIcon },
  { name: "Node.js", type: "Backend", icon: NodeIcon },
  { name: "System Design", type: "Architecture", icon: SystemDesignIcon },
];

const projects = [
  {
    num: "01",
    name: "Macro Audit Journal",
    desc: "A trading journal app for serious traders. Log trades, review analytics, and sharpen execution consistency in one deliberate workspace.",
    tags: ["Trading", "Analytics", "React", "TypeScript"],
    status: "Live",
    link: "https://macroaudit.xalosoftware.com",
  },
  {
    num: "02",
    name: "SHG Capacitor CLI",
    desc: "A developer CLI that abstracts the messy parts of the Capacitor workflow into focused commands so shipping mobile builds feels repeatable instead of fragile.",
    tags: ["CLI", "Capacitor", "DX", "TypeScript"],
    status: "Active",
    link: null,
  },
  {
    num: "03",
    name: "[Classified]",
    desc: "Reserved for work that is better explained in conversation than in public. Available on request for serious collaborators.",
    tags: ["Private Build", "Strategy", "Systems"],
    status: "Classified",
    link: "mailto:diplovlogodesign@gmail.com?subject=Let's%20talk%20about%20the%20classified%20project",
  },
];

const principles = [
  {
    title: "Practical intelligence",
    text: "I like systems that are smart because they are useful, not because they are flashy.",
  },
  {
    title: "Calm delivery",
    text: "The best products reduce noise for the people using them and for the team maintaining them.",
  },
  {
    title: "Long-term thinking",
    text: "I build with enough structure that a tool can grow without collapsing under its own weight.",
  },
];

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tkay-mutumbiwenzou-342b563b3",
    detail: "Professional profile and updates",
  },
  {
    label: "Email",
    href: "mailto:diplovlogodesign@gmail.com",
    detail: "Best for project inquiries",
  },
  {
    label: "Download CV",
    href: "/tkay-cv.pdf",
    detail: "PDF version",
  },
];

function scrollToSection(id, closeMenu) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu?.();
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="site-shell">
      <div className="background-orb background-orb-left" />
      <div className="background-orb background-orb-right" />

      <header className="topbar">
        <a className="brand" href="#hero" onClick={() => setMenuOpen(false)}>
          T-KAY
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {navigation.map((item) => (
            <button
              key={item.id}
              className="nav-link"
              type="button"
              onClick={() => scrollToSection(item.id, () => setMenuOpen(false))}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        {navigation.map((item) => (
          <button
            key={item.id}
            className="mobile-link"
            type="button"
            onClick={() => scrollToSection(item.id, () => setMenuOpen(false))}
          >
            {item.label}
          </button>
        ))}
      </div>

      <main>
        <section className="hero-section" id="hero">
          <div className="eyebrow">Software Developer and Systems Thinker</div>
          <div className="hero-grid">
            <div>
              <p className="hero-kicker">Harare / Remote / Shipping in 2026</p>
              <h1 className="hero-title">
                Building intelligent systems for the real world.
              </h1>
            </div>
            <div className="hero-side">
              <p className="hero-copy">
                I design and build software that turns messy workflows into
                focused tools, from trading products to developer utilities and
                infrastructure-minded apps.
              </p>
              <div className="hero-actions">
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => scrollToSection("projects")}
                >
                  View Work
                </button>
                <a className="button button-solid" href="mailto:diplovlogodesign@gmail.com">
                  Start a Conversation
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section" id="about">
          <div className="section-heading">
            <span className="section-number">01</span>
            <h2>About</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I care about software that earns trust quickly: sharp interfaces,
                clean system boundaries, and product decisions that respect how
                people actually work.
              </p>
              <p>
                My sweet spot is the space between product taste and engineering
                rigor. I like solving hard problems without making the end result
                feel complicated.
              </p>
            </div>
            <div className="principles-grid">
              {principles.map((principle) => (
                <article key={principle.title} className="principle-card">
                  <span className="card-label">Principle</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="stack">
          <div className="section-heading">
            <span className="section-number">02</span>
            <h2>Stack</h2>
          </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <article key={skill.name} className="skill-card">
                  <div className="skill-icon" aria-hidden="true">
                    <skill.icon />
                  </div>
                  <span className="skill-type">{skill.type}</span>
                  <h3>{skill.name}</h3>
                </article>
              ))}
            </div>
        </section>

        <section className="content-section" id="projects">
          <div className="section-heading">
            <span className="section-number">03</span>
            <h2>Selected Projects</h2>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <article key={project.num} className="project-card">
                <span className="project-num">{project.num}</span>
                <div className="project-main">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <span className={`status-pill status-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </div>
                  <p>{project.desc}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                    {project.link ? (
                      <a
                        className="tag tag-link"
                        href={project.link}
                        target={project.link.startsWith("http") ? "_blank" : undefined}
                        rel={project.link.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {project.status === "Classified" ? "Ask About It" : "Open Project"}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section cv-section" id="cv">
          <div className="section-heading">
            <span className="section-number">04</span>
            <h2>Curriculum Vitae</h2>
          </div>
          <div className="cv-layout">
            <div className="cv-copy">
              <p>
                A full overview of my experience, projects, and technical background.
                Preview it here, download the polished PDF, or grab the original DOCX.
              </p>
              <div className="hero-actions">
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => setCvPreviewOpen((value) => !value)}
                >
                  {cvPreviewOpen ? "Hide Preview" : "Preview CV"}
                </button>
                <a className="button button-solid" href="/tkay-cv.pdf" download>
                  Download PDF
                </a>
                <a className="button button-ghost" href="/tkay-cv.docx" download>
                  Download DOCX
                </a>
              </div>
            </div>

            <div className="cv-frame">
              <div className="cv-frame-bar">
                <span />
                <p>T-KAY-CV.PDF</p>
                <span />
              </div>
              {cvPreviewOpen ? (
                <iframe className="cv-preview" src="/tkay-cv.pdf" title="CV preview" />
              ) : (
                <div className="cv-placeholder">
                  <p className="card-label">Preview ready</p>
                  <h3>Open the PDF without leaving the page.</h3>
                  <p>
                    The preview stays embedded so recruiters and collaborators can
                    read it in context.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="section-heading">
            <span className="section-number">05</span>
            <h2>Contact</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="contact-lead">
                If you are building something thoughtful and technically ambitious,
                I am interested.
              </p>
              <p>
                The fastest path is email, but LinkedIn works well too if you want
                context before reaching out.
              </p>
            </div>

            <div className="contact-cards">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  className="contact-card"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="card-label">{link.label}</span>
                  <strong>{link.detail}</strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>T-Kay Tinotenda Mutumbiwenzou</p>
        <span>{new Date().getFullYear()} Portfolio</span>
      </footer>
    </div>
  );
}
