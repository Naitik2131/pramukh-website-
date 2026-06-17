import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  facts,
  heroSlides,
  milestones,
  offices,
  principles,
  processStages,
  projects,
} from "./data";
import { Picture } from "./components/Picture";
import {
  useLandingMotion,
  useMenuMotion,
} from "./motion/useLandingMotion";
import { factParts } from "./utils/content";

const navItems = [
  ["Projects", "#projects"],
  ["Difference", "#difference"],
  ["Ownership", "#ownership"],
  ["Footprint", "#footprint"],
  ["Contact", "#contact"],
] as const;

function FlipText({ children }: { children: string }) {
  return (
    <span className="flip-text" aria-label={children}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: string;
}) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function App() {
  const root = useRef<HTMLDivElement>(null);
  const heroController = useRef<((index: number) => void) | null>(null);
  const [activeHero, setActiveHero] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  useLandingMotion(root, setActiveHero, heroController);
  useMenuMotion(root, menuOpen);

  const navigate = (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    section: string,
  ) => {
    event.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent("pramukh:navigate", { detail: section }),
    );
  };

  return (
    <div ref={root} className="site-root">
      <div className="cursor" aria-hidden="true">
        <span>View</span>
      </div>
      <div className="transition-curtain" aria-hidden="true" />

      <div className="preloader" aria-hidden="true">
        <div className="preloader-grid">
          {["orbit-5", "one-tapi", "agastya"].map((image, index) => (
            <div
              className={`preloader-column ${index === 1 ? "preloader-center" : ""}`}
              key={image}
            >
              <div className="preloader-image">
                <img
                  src={`/media/${image}-720.webp`}
                  alt=""
                  fetchPriority="high"
                />
              </div>
            </div>
          ))}
        </div>
        <img
          className="preloader-logo"
          src="/media/pramukh-logo.svg"
          alt=""
        />
      </div>

      <header className="site-header">
        <div className="header-shell">
          <a
            className="header-logo header-reveal"
            href="#home"
            onClick={(event) => navigate(event, "#home")}
            aria-label="Pramukh home"
          >
            <span className="brand-mark">
              <img src="/media/pramukh-logo.svg" alt="Pramukh" />
            </span>
          </a>
          <nav className="header-nav" aria-label="Primary navigation">
            {navItems.slice(0, 2).map(([label, href]) => (
              <a
                className="header-nav-link"
                href={href}
                onClick={(event) => navigate(event, href)}
                key={href}
              >
                <FlipText>{label}</FlipText>
              </a>
            ))}
          </nav>
          <nav className="header-nav header-nav-right" aria-label="Secondary">
            <a
              className="header-contact"
              href="#contact"
              onClick={(event) => navigate(event, "#contact")}
            >
              <FlipText>Enquire</FlipText>
            </a>
            <button
              className="menu-button header-reveal"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Open menu"
              data-magnetic
            >
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>

      <div
        id="site-menu"
        className="menu-overlay"
        aria-hidden={!menuOpen}
      >
        <button
          className="menu-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <div className="menu-panel">
          <div className="menu-top">
            <img src="/media/pramukh-logo.svg" alt="Pramukh" />
            <button
              type="button"
              className="menu-close"
              onClick={() => setMenuOpen(false)}
              data-magnetic
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav className="menu-links" aria-label="Menu navigation">
            {navItems.map(([label, href], index) => (
              <a
                href={href}
                key={href}
                onClick={(event) => navigate(event, href)}
              >
                <span className="menu-index">0{index + 1}</span>
                <span className="menu-link-mask">
                  <span className="menu-link-inner">{label}</span>
                </span>
              </a>
            ))}
          </nav>
          <div className="menu-footer">
            <p className="menu-detail">
              Surat · Vapi · Silvassa
            </p>
            <p className="menu-detail">Building trust since 1993.</p>
          </div>
        </div>
      </div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section id="home" className="hero header-trigger">
              <div
                className="hero-chrome"
                style={{ backgroundColor: heroSlides[0].color }}
              />
              <div className="hero-media">
                {heroSlides.map((slide, index) => (
                  <div
                    className={`hero-layer hero-layer-${index}`}
                    style={
                      { "--slide-color": slide.color } as CSSProperties
                    }
                    key={slide.id}
                    aria-hidden={activeHero !== index}
                  >
                    {slide.media.kind === "video" ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={slide.media.poster}
                        preload="metadata"
                      >
                        <source src={slide.media.src} type="video/mp4" />
                      </video>
                    ) : (
                      <Picture
                        image={slide.media.image}
                        alt={slide.media.alt}
                        eager={index === 1}
                      />
                    )}
                    <div className="hero-shade" />
                  </div>
                ))}
              </div>

              <div className="hero-copy-stack">
                {heroSlides.map((slide) => (
                  <div className="hero-copy" key={slide.id}>
                    <p className="hero-eyebrow hero-intro-split">
                      {slide.eyebrow}
                    </p>
                    <h1>
                      <span className="hero-title-line hero-title-pair hero-intro-split">
                        <span className="hero-title-word">Designed.</span>
                        <span className="hero-title-word">Delivered.</span>
                      </span>
                      <span className="hero-title-line hero-intro-split">
                        Trusted.
                      </span>
                    </h1>
                    <p className="hero-project hero-intro-split">
                      {slide.name} · {slide.location}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hero-bottom-bar">
                <div className="hero-selectors" aria-label="Featured projects">
                  {heroSlides.map((slide, index) => (
                    <button
                      className={`hero-selector ${activeHero === index ? "is-active" : ""}`}
                      type="button"
                      onClick={() => heroController.current?.(index)}
                      aria-label={`Show ${slide.name}`}
                      key={slide.id}
                    >
                      <svg viewBox="0 0 48 48" aria-hidden="true">
                        <circle cx="24" cy="24" r="21" />
                        <circle
                          className="hero-progress-path"
                          cx="24"
                          cy="24"
                          r="21"
                        />
                      </svg>
                      <span>
                        <strong>{slide.name}</strong>
                        <small>{slide.type}</small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="hero-meta">
                  <span>60+ projects delivered</span>
                  <span>Pramukh Group © Since 1993</span>
                  <span>Surat · Vapi · Silvassa</span>
                </div>
              </div>
            </section>

            <section className="intro section-light">
              <div className="section-grid">
                <SectionLabel index="01">The Pramukh standard</SectionLabel>
                <div className="intro-copy">
                  <p className="eyebrow" data-reveal>
                    A class of its own
                  </p>
                  <h2 data-reveal>
                    Enduring spaces, built with clarity, commitment, and
                    long-term value.
                  </h2>
                  <p className="body-large" data-reveal>
                    With deep expertise in development, construction, and
                    planning, Pramukh creates residential and commercial
                    projects that elevate lifestyles and shape thriving
                    communities.
                  </p>
                </div>
              </div>

              <div className="ribbon-row" aria-hidden="true">
                <span>Trust</span>
                <span>Quality</span>
                <span>Ownership</span>
                <span>Delivery</span>
              </div>

              <div className="facts-grid">
                {facts.map(([value, label]) => {
                  const parts = factParts(value);
                  return (
                    <article className="fact" key={label} data-rise>
                      <strong
                        data-count={parts.target}
                        data-suffix={parts.suffix}
                        data-decimals={parts.decimals}
                      >
                        {value}
                      </strong>
                      <span>{label}</span>
                    </article>
                  );
                })}
              </div>
            </section>

            <section id="projects" className="featured-pin section-dark">
              <div className="featured-frame">
                <div className="featured-media">
                  {projects.slice(0, 3).map((project, index) => (
                    <Picture
                      className={`featured-project featured-project-${index}`}
                      image={project.image}
                      alt={project.name}
                      key={project.name}
                    />
                  ))}
                  <div className="featured-blur" />
                </div>
                <div className="featured-top">
                  <span className="featured-kicker">Step into Pramukh</span>
                  <span>Featured developments</span>
                </div>
                <div className="featured-copy">
                  {projects.slice(0, 3).map((project, index) => (
                    <article
                      className={`featured-copy-item featured-copy-${index}`}
                      key={project.name}
                    >
                      <p>{project.city} · {project.type}</p>
                      <h2>{project.name}</h2>
                      <span>{project.description}</span>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="milestones section-warm">
              <div className="section-grid section-heading">
                <SectionLabel index="02">Track record</SectionLabel>
                <h2 data-reveal>
                  Measured in trust, delivery, and places that endure.
                </h2>
              </div>
              <div className="milestone-list">
                {milestones.map((milestone, index) => (
                  <article className="milestone-card" key={milestone.title} data-rise>
                    <span className="milestone-index">0{index + 1}</span>
                    <strong>{milestone.year}</strong>
                    <div>
                      <h3>{milestone.title}</h3>
                      <p>{milestone.body}</p>
                    </div>
                    <Picture
                      image={milestone.image}
                      alt=""
                      sizes="22vw"
                    />
                  </article>
                ))}
              </div>
            </section>

            <section className="portfolio-pin section-dark">
              <div className="portfolio-heading">
                <SectionLabel index="03">Project portfolio</SectionLabel>
                <h2>Places with presence.</h2>
              </div>
              <div className="portfolio-track">
                {projects.map((project, index) => (
                  <article className="project-card" key={project.name} data-cursor>
                    <div className="project-card-media">
                      <Picture
                        image={project.image}
                        alt={project.name}
                        sizes="52vw"
                      />
                      <span>0{index + 1}</span>
                    </div>
                    <div className="project-card-copy">
                      <p>{project.city}</p>
                      <h3>{project.name}</h3>
                      <span>{project.type}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="difference" className="difference section-light">
              <div className="section-grid section-heading">
                <SectionLabel index="04">How we differ</SectionLabel>
                <div>
                  <h2 data-reveal>
                    What sets Pramukh apart is not only what we build, but how
                    we build.
                  </h2>
                  <p className="body-large" data-reveal>
                    Three principles shape every decision and every
                    relationship.
                  </p>
                </div>
              </div>
              <div className="principle-list">
                {principles.map((principle) => (
                  <article className="principle-card" key={principle.number}>
                    <div className="principle-copy" data-rise>
                      <span>{principle.number}</span>
                      <h3>{principle.title}</h3>
                      <p>{principle.body}</p>
                    </div>
                    <Picture
                      image={principle.image}
                      alt=""
                      sizes="45vw"
                    />
                  </article>
                ))}
              </div>
            </section>

            <section id="ownership" className="ownership-pin section-gold">
              <div className="ownership-intro">
                <SectionLabel index="05">All-in Ownership™</SectionLabel>
                <h2>We own every detail, from first thought to life beyond delivery.</h2>
              </div>
              <div className="process-numbers" aria-hidden="true">
                <div className="process-number-track">
                  {processStages.map((stage) => (
                    <span key={stage.number}>{stage.number}</span>
                  ))}
                </div>
              </div>
              <div className="process-stages">
                {processStages.map((stage) => (
                  <article className="process-stage" key={stage.number}>
                    <span>{stage.number}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.body}</p>
                  </article>
                ))}
              </div>
              <div className="ownership-orbit" aria-hidden="true">
                <span />
                <span />
                <img src="/media/pramukh-monogram.svg" alt="" />
              </div>
            </section>

            <section id="footprint" className="footprint section-dark">
              <div className="section-grid section-heading">
                <SectionLabel index="06">Our footprint</SectionLabel>
                <h2 data-reveal>
                  Local understanding. Long-term commitment.
                </h2>
              </div>
              <div className="office-layout">
                <div className="office-images">
                  {offices.map((office, index) => (
                    <Picture
                      className={`office-image ${activeOffice === index ? "is-active" : ""}`}
                      image={office.image}
                      alt={`${office.city} skyline`}
                      key={office.city}
                      sizes="50vw"
                    />
                  ))}
                </div>
                <div className="office-accordion">
                  {offices.map((office, index) => (
                    <article
                      className={`office-item ${activeOffice === index ? "is-open" : ""}`}
                      key={office.city}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveOffice(index)}
                        aria-expanded={activeOffice === index}
                      >
                        <span>0{index + 1}</span>
                        <strong>{office.city}</strong>
                        <i aria-hidden="true">+</i>
                      </button>
                      <div className="office-details">
                        <p>{office.address}</p>
                        <span>{office.phone}</span>
                        <span>{office.email}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="film-section">
              <video
                className="film-media"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster="/media/about-video-poster-1800.webp"
              >
                <source src="/media/pramukh-film.mp4" type="video/mp4" />
              </video>
              <div className="film-overlay">
                <p>Pramukh Group</p>
                <h2 data-reveal>Designed. Delivered. Trusted.</h2>
                <button
                  type="button"
                  className="round-button"
                  onClick={(event) => navigate(event, "#projects")}
                  data-magnetic
                >
                  Explore
                </button>
              </div>
            </section>

            <section className="ongoing section-light">
              <div className="section-grid section-heading">
                <SectionLabel index="07">Ongoing projects</SectionLabel>
                <div>
                  <h2 data-reveal>Building what comes next.</h2>
                  <p className="body-large" data-reveal>
                    Homes and commercial spaces shaped by focused planning,
                    responsible delivery, and a people-first approach.
                  </p>
                </div>
              </div>
              <div className="ongoing-grid">
                {projects.slice(3, 7).map((project) => (
                  <article className="ongoing-card" key={project.name} data-rise>
                    <Picture
                      image={project.image}
                      alt={project.name}
                      sizes="50vw"
                    />
                    <div>
                      <span>{project.city}</span>
                      <h3>{project.name}</h3>
                      <p>{project.type}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <footer id="contact" className="footer section-dark">
              <div className="footer-cta">
                <p data-reveal>Let’s create lasting value.</p>
                <h2 data-reveal>We’re easy to reach and even easier to work with.</h2>
                <button
                  type="button"
                  className="footer-button"
                  onClick={(event) => navigate(event, "#footprint")}
                  data-magnetic
                >
                  <FlipText>Start a conversation</FlipText>
                </button>
              </div>
              <div className="footer-main">
                <div className="footer-brand">
                  <img src="/media/pramukh-logo.svg" alt="Pramukh" />
                  <p>
                    Enduring spaces across Surat, Vapi, and Silvassa since 1993.
                  </p>
                </div>
                <div className="footer-links">
                  <div>
                    <span>Explore</span>
                    {navItems.map(([label, href]) => (
                      <a
                        href={href}
                        onClick={(event) => navigate(event, href)}
                        key={href}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                  <div>
                    <span>Connect</span>
                    <a href="#contact">Instagram</a>
                    <a href="#contact">LinkedIn</a>
                    <a href="#contact">YouTube</a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <span>© 2026 Pramukh Group</span>
                <span>Privacy · Terms</span>
                <button
                  type="button"
                  onClick={(event) => navigate(event, "#home")}
                >
                  Back to top ↑
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
