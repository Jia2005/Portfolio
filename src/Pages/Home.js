import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  RotateCcw,
  Terminal,
  X,
} from 'lucide-react';
import AlgorificImg from '../Images/Algorific.png';
import CodementorImg from '../Images/Codementor.png';
import SignoraImg from '../Images/Signora.png';
import DashboardImg from '../Images/Dashboard.png';
import ResearchImg from '../Images/Research.png';
import JiaImg from '../Images/Jia.png';

const EMAIL = 'jia2.harisinghani@gmail.com';
const GITHUB_URL = 'https://github.com/Jia2005';
const LINKEDIN_URL = 'https://linkedin.com/in/jia-harisinghani';
const DOI_URL = 'https://doi.org/10.1049/icp.2025.4694';
const RESUME_URL = 'https://drive.google.com/file/d/1NMEvk1LYc53f-KPyrpeAJq56LocMaWR4/view?usp=drive_link';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
];

const skillGroups = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Java'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'InfluxDB'] },
  { label: 'ML and GIS', items: ['CNNs', 'K-means', 'Random Forest', 'GDAL', 'QGIS'] },
  { label: 'Tools', items: ['Docker', 'Git', 'Vercel'] },
];

const projects = [
  {
    id: 'codementor',
    kind: 'In progress',
    tint: 'var(--indigo)',
    name: 'CodeMentor',
    tagline: 'See what your code is doing, not just what it prints.',
    blurb: 'Run Python in the browser and step through it line by line.',
    tags: ['React', 'Node.js', 'Docker', 'AI assistant'],
    imageSrc: CodementorImg,
    linkText: 'Open site',
    linkUrl: 'https://codementor-fm3u.onrender.com/',
    role: 'Solo build, end to end',
    problem: 'Beginners can see a program\u2019s output but never what happened in between.',
    solution: 'Line-by-line execution with animated state, a live terminal, and an AI assistant.',
    flow: ['React editor', 'Node.js API', 'Docker runtime'],
    challenge: 'Showing every step without burying the learner in detail.',
    learned: 'Approachable tools can still have serious engineering underneath.',
  },
  {
    id: 'algorific',
    kind: 'Education',
    tint: 'var(--sun)',
    name: 'Algorific',
    tagline: 'Data structures, made visible.',
    blurb: 'Watch each operation happen, then test yourself with small games.',
    tags: ['JavaScript', 'React', 'Visualization'],
    imageSrc: AlgorificImg,
    linkText: 'Open site',
    linkUrl: 'https://algorific.vercel.app/ds',
    role: 'Front end and interactions',
    problem: 'Static diagrams hide how a structure changes from one operation to the next.',
    solution: 'Every topic gets a short explanation, an animated visualization, then practice.',
    flow: ['Explain', 'Animate', 'Practice'],
    challenge: 'Keeping scope tight. A few structures explained well beat a long list.',
    learned: 'A focused explanation beats a long feature list.',
  },
  {
    id: 'sign-to-text',
    kind: 'Computer vision',
    tint: 'var(--mint)',
    name: 'Sign-to-text',
    tagline: 'Listening with the eyes.',
    blurb: 'Real-time sign recognition that turns live video into text.',
    tags: ['Computer vision', 'Real time', 'Accessibility'],
    imageSrc: SignoraImg,
    linkText: 'View code',
    linkUrl: 'https://github.com/ria30102004/Sign-Language-Translate',
    role: 'Model, research, and web app',
    problem: 'Signers and non-signers usually need an interpreter or a written channel to talk.',
    solution: 'A vision model reads signs from live video and shows the text as it happens.',
    flow: ['Live video', 'Vision model', 'Web app'],
    challenge: 'Speed. A laggy translation is useless in a real conversation.',
    learned: 'When software shapes communication, reliability is a design requirement.',
  },
];

const codeLines = [
  { indent: 0, tokens: [['kw', 'def '], ['fn', 'make_it_clear'], ['', '(concept):']] },
  { indent: 1, tokens: [['', 'steps = '], ['fn', 'explain'], ['', '(concept)']] },
  { indent: 1, tokens: [['kw', 'for '], ['', 'step '], ['kw', 'in '], ['', 'steps:']] },
  { indent: 2, tokens: [['fn', 'show'], ['', '(step)']] },
  { indent: 1, tokens: [['kw', 'return '], ['str', '"aha"']] },
];

const stateRows = [
  { from: 1, name: 'concept', value: '"loops"' },
  { from: 2, name: 'steps', value: '3 items' },
  { from: 4, name: 'step', value: '3' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function BrowserFrame({ src, alt, title, bar = true }) {
  return (
    <div className={bar ? 'frame' : 'frame frame-plain'}>
      {bar && (
        <div className="frame-bar">
          <span />
          <span />
          <span />
          {title && <span className="frame-title">{title}</span>}
        </div>
      )}
      <div className="frame-screen">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

function Flow({ steps }) {
  return (
    <ol className="flow">
      {steps.map((step, index) => (
        <li key={step}>
          {index > 0 && <ArrowRight size={14} aria-hidden="true" />}
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

function HeroCode() {
  const [reduce] = useState(prefersReducedMotion);
  const [line, setLine] = useState(reduce ? 6 : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    setLine(0);
    const timers = [];
    for (let i = 1; i <= 6; i += 1) {
      timers.push(window.setTimeout(() => setLine(i), 900 + i * 700));
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [run, reduce]);

  const done = line === 6;

  return (
    <div className="hero-art">
      <div className="code-window" aria-hidden="true">
        <div className="code-bar">
          <span />
          <span />
          <span />
          <span className="code-file">lesson.py</span>
        </div>
        <div className="code-body">
          <div className="code-lines">
            {codeLines.map((codeLine, index) => (
              <div className={line === index + 1 ? 'code-line is-active' : 'code-line'} key={index}>
                <span className="line-number">{index + 1}</span>
                <span style={{ paddingLeft: `${codeLine.indent * 1.25}rem` }}>
                  {codeLine.tokens.map(([type, text], tokenIndex) => (
                    <span className={type ? `tok-${type}` : undefined} key={tokenIndex}>
                      {text}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
          <div className="code-state">
            <span className="state-heading">State</span>
            {stateRows.map((row) => (
              <div className={line >= row.from ? 'state-row is-on' : 'state-row'} key={row.name}>
                <span>{row.name}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={done ? 'code-output is-done' : 'code-output'}>
          {done ? (
            <>
              <Check size={13} /> Returned "aha"
            </>
          ) : (
            <>{line === 0 ? 'Ready' : 'Running'}</>
          )}
        </div>
      </div>
      <button className="replay" type="button" onClick={() => setRun((current) => current + 1)}>
        <RotateCcw size={13} /> Replay
      </button>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project" style={{ '--tint': project.tint }}>
      <button
        className="project-media"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open the ${project.name} case study`}
      >
        <BrowserFrame src={project.imageSrc} alt={`${project.name} screenshot`} title={project.name} />
      </button>
      <div className="project-body">
        <span className="kind-tag">{project.kind}</span>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-blurb">{project.blurb}</p>
        <ul className="chips" aria-label={`${project.name} technologies`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="project-links">
          <button className="button button-primary button-sm" type="button" onClick={() => onOpen(project)}>
            Case study <ArrowRight size={15} />
          </button>
          <a className="link-arrow" href={project.linkUrl} target="_blank" rel="noreferrer">
            {project.linkText} <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

function CaseStudy({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    if (dialogRef.current) dialogRef.current.focus();
    return () => {
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, []);

  const trapFocus = (event) => {
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === dialogRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="case-backdrop" role="presentation" onClick={onClose}>
      <article
        className="case-study"
        style={{ '--tint': project.tint }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        tabIndex={-1}
        ref={dialogRef}
        onKeyDown={trapFocus}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="case-header">
          <span className="kind-tag">{project.kind}</span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close case study">
            <X size={18} />
          </button>
        </div>
        <div className="case-hero">
          <h2 className="case-title" id="case-study-title">
            {project.name}
          </h2>
          <p className="case-tagline">{project.tagline}</p>
          <p className="case-role">{project.role}</p>
        </div>
        <div className="case-media">
          <BrowserFrame src={project.imageSrc} alt={`${project.name} screenshot`} title={project.name} />
        </div>
        <div className="case-grid">
          <div className="case-block">
            <h3 className="case-label">Problem</h3>
            <p>{project.problem}</p>
          </div>
          <div className="case-block">
            <h3 className="case-label">Solution</h3>
            <p>{project.solution}</p>
          </div>
          <div className="case-block case-wide">
            <h3 className="case-label">How it works</h3>
            <Flow steps={project.flow} />
          </div>
          <div className="case-block">
            <h3 className="case-label">Hardest part</h3>
            <p>{project.challenge}</p>
          </div>
          <div className="case-block">
            <h3 className="case-label">Takeaway</h3>
            <p>{project.learned}</p>
          </div>
        </div>
        <div className="case-footer">
          <a className="button button-primary" href={project.linkUrl} target="_blank" rel="noreferrer">
            {project.linkText} <ArrowUpRight size={16} />
          </a>
          <button className="link-quiet" type="button" onClick={onClose}>
            Back to work
          </button>
        </div>
      </article>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eggOpen, setEggOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeId, setActiveId] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
  const shortcut = isMac ? '\u2318 J' : 'Ctrl J';

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'j') {
        event.preventDefault();
        setEggOpen((current) => !current);
      }
      if (event.key === 'Escape') {
        setSelectedProject(null);
        setEggOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id === 'top' ? '' : entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ['top', ...navItems.map((item) => item.id)].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const navLink = (item, className) => (
    <a
      key={item.id}
      className={activeId === item.id ? `${className} is-active` : className}
      href={`#${item.id}`}
      aria-current={activeId === item.id ? 'true' : undefined}
      onClick={(event) => scrollToSection(event, item.id)}
    >
      {item.label}
    </a>
  );

  return (
    <main className="portfolio">
      <a className="skip-link" href="#about" onClick={(event) => scrollToSection(event, 'about')}>
        Skip to content
      </a>

      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
        <div className="page-shell header-inner">
          <a className="wordmark" href="#top" onClick={(event) => scrollToSection(event, 'top')}>
            <span className="wordmark-mark">
              <img src={JiaImg} alt="" />
            </span>
            <span>Jia Harisinghani</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => navLink(item, 'nav-link'))}
          </nav>
          <div className="header-actions">
            <a className="button button-secondary button-sm" href={RESUME_URL} target="_blank" rel="noreferrer">
              <FileText size={15} /> Resume
            </a>
          </div>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {menuOpen && (
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navItems.map((item) => navLink(item, 'mobile-link'))}
              <a className="mobile-link" href={RESUME_URL} target="_blank" rel="noreferrer">
                Resume
              </a>
            </nav>
          )}
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="page-shell hero-grid">
          <div className="hero-text">
            <p className="hero-status">
              <i className="status-dot" /> Open to new opportunities
            </p>
            <h1 className="hero-title" id="hero-title">
              <span>I make</span>
              <span>hard things</span>
              <span>click.</span>
            </h1>
            <p className="hero-copy">
              Computer engineer in Mumbai building developer tools, visual learning products, and real-time
              systems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work" onClick={(event) => scrollToSection(event, 'work')}>
                See my work <ArrowDown className="icon-down" size={16} />
              </a>
              <a className="button button-secondary" href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>
                <Mail size={16} /> Say hello
              </a>
            </div>
          </div>
          <HeroCode />
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="page-shell about-layout">
          <div className="about-photo">
            <img src={JiaImg} alt="Portrait of Jia Harisinghani" />
          </div>
          <div className="about-main">
            <h2 className="section-title" id="about-title">
              Between building and explaining
            </h2>
            <p className="about-lede">
              I like fuzzy requirements, weird edge cases, and the moment a system finally clicks.
            </p>
            <ul className="chips chips-solid" aria-label="Background">
              <li>B.E. Computer Engineering</li>
              <li>University of Mumbai</li>
              <li>Exploring agentic AI</li>
            </ul>
            <dl className="skills">
              {skillGroups.map((group) => (
                <div className="skill-row" key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>
                    <ul className="chips">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="work" aria-labelledby="work-title">
        <div className="page-shell">
          <div className="section-head">
            <h2 className="section-title" id="work-title">
              Work
            </h2>
            <p className="section-sub">Three projects about making hard things easier to see.</p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="impact" aria-labelledby="impact-title">
        <div className="page-shell">
          <div className="section-head">
            <h2 className="section-title" id="impact-title">
              Impact
            </h2>
            <p className="section-sub">Work that changed something outside the editor.</p>
          </div>
          <div className="impact-grid">
            <article className="impact-card impact-work" id="experience">
              <span className="kind-tag kind-tag-light">Intern at AB Engineers, Jun to Jul 2025</span>
              <h3 className="impact-title">Predictive maintenance dashboard</h3>
              <p className="impact-copy">A live monitoring app plus a model that predicts when equipment needs attention.</p>
              <div className="stats">
                <div className="stat">
                  <span className="stat-value">35%</span>
                  <span className="stat-label">more efficient operations</span>
                </div>
                <div className="stat">
                  <span className="stat-value">90%</span>
                  <span className="stat-label">model accuracy</span>
                </div>
              </div>
              <ul className="chips chips-dark" aria-label="Technologies">
                <li>React</li>
                <li>Node.js</li>
                <li>InfluxDB</li>
                <li>Random Forest</li>
              </ul>
              <p className="fine-print">Averages over the three months after launch.</p>
              <BrowserFrame src={DashboardImg} alt="Monitoring dashboard preview" title="Monitoring dashboard" />
            </article>

            <article className="impact-card impact-research" id="research">
              <span className="kind-tag">Published at ICATES 2025, IET Proceedings</span>
              <h3 className="impact-title impact-title-paper">
                Automated slum classification using deep convolutional neural networks and K-means clustering
              </h3>
              <p className="impact-copy">
                Finding informal settlements in satellite images of the Mumbai Metropolitan Region.
              </p>
              <Flow steps={['CNNs', 'K-means', 'GDAL', 'QGIS']} />
              <a className="button button-primary" href={DOI_URL} target="_blank" rel="noreferrer">
                Read the paper <ArrowUpRight size={16} />
              </a>
              <BrowserFrame src={ResearchImg} alt="Research preview" bar={false} />
            </article>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="page-shell">
          <h2 className="contact-title" id="contact-title">
            Have a problem worth untangling?
          </h2>
          <a className="contact-email" href={`mailto:${EMAIL}`}>
            <span>{EMAIL}</span>
            <ArrowUpRight size={26} />
          </a>
          <div className="contact-actions">
            <a className="button button-sun" href={RESUME_URL} target="_blank" rel="noreferrer">
              <FileText size={16} /> Resume
            </a>
            <a className="button button-ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a className="button button-ghost" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <p>&copy; {new Date().getFullYear()} Jia Harisinghani. Built in Mumbai.</p>
          <button className="footer-shortcut" type="button" onClick={() => setEggOpen(true)}>
            <kbd>{shortcut}</kbd> for a small surprise
          </button>
        </div>
      </footer>

      {eggOpen && (
        <aside className="easter-egg" aria-live="polite">
          <div className="easter-egg-title">
            <span>
              <Terminal size={13} /> Small system note
            </span>
            <button className="icon-button icon-button-dark" type="button" onClick={() => setEggOpen(false)} aria-label="Close note">
              <X size={15} />
            </button>
          </div>
          <p>You found the shortcut. The best interfaces leave a little room for curiosity.</p>
          <button className="button button-sun button-sm" type="button" onClick={copyEmail}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Email copied' : 'Copy email address'}
          </button>
        </aside>
      )}

      {selectedProject && <CaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}

export default Home;
