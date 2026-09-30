import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
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
const RESUME_URL = `https://drive.google.com/file/d/1xYkANHX_shGsL-w3X8mTsQRkZ2_6kwRu/view?usp=sharing`;

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

const skillGroups = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Java'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { label: 'Backend and databases', items: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'InfluxDB'] },
  { label: 'Machine learning and GIS', items: ['CNNs', 'K-means', 'Random Forest', 'GDAL', 'QGIS'] },
  { label: 'Tools', items: ['Docker', 'Git', 'Vercel', 'Netlify'] },
];

const projects = [
  {
    id: 'codementor',
    kind: 'Developer tool, in progress',
    name: 'CodeMentor',
    tagline: 'A gentler way to understand what your code is doing.',
    description:
      'An IDE-like Python learning environment with browser-based code execution, an interactive terminal, step-by-step execution, and an AI assistant.',
    tags: ['React', 'Node.js', 'Docker', 'AI assistant'],
    imageSrc: CodementorImg,
    linkText: 'Visit website',
    linkUrl: 'https://codementor-fm3u.onrender.com/',
    overview:
      'CodeMentor is a browser-based Python environment that shows what your code is doing as it runs, not only what it prints.',
    problem:
      'Beginners can run a program and still have no idea why it behaves the way it does. Most editors show the output and nothing about what happened in between.',
    solution:
      'You write Python in an IDE-like editor and run it in the browser. You can follow execution line by line with explanations and animations of the program state, type input into an interactive terminal, and ask an AI assistant when something does not make sense.',
    role: 'I designed and built it end to end: the editor interface, the execution backend, and the Docker-based runtime.',
    architecture:
      'A React front end sends code to a Node.js backend, which runs it in a Docker-based execution environment and returns the results to the editor and terminal. The step-by-step view and the AI assistant sit on top of that execution flow.',
    challenges:
      'Showing every step of a program without burying the learner in detail. The hardest part was making execution understandable while staying honest about what the interpreter actually does.',
    learned:
      'Learning tools can be approachable without watering down the engineering underneath them.',
  },
  {
    id: 'algorific',
    kind: 'Education and visualization',
    name: 'Algorific',
    tagline: 'Data structures, made visible.',
    description:
      'An interactive data structures platform that uses motion and clear visual states so you can watch the logic happen instead of decoding it.',
    tags: ['JavaScript', 'React', 'Visualization'],
    imageSrc: AlgorificImg,
    linkText: 'Visit website',
    linkUrl: 'https://algorific.vercel.app/ds',
    overview:
      'Algorific teaches data structures visually, so you can watch a structure change instead of reading a wall of code.',
    problem:
      'Data structures are usually taught with static diagrams and dense code, which hides how a structure changes from one operation to the next.',
    solution:
      'Each topic pairs a short explanation with an animated visualization of its operations and interactive elements, including small games, so learners can check that the idea has landed.',
    role: 'I built the front end and the interactions.',
    architecture:
      'A JavaScript and React front end where every data structure follows the same pattern: explanation first, then an animated visualization, then practice. It is deployed on Vercel.',
    challenges:
      'Keeping the scope tight. It was tempting to keep adding structures and features, but a smaller set explained well is worth more than a long list explained shallowly.',
    learned: 'A focused explanation beats a long feature list.',
  },
  {
    id: 'sign-to-text',
    kind: 'Computer vision and research',
    name: 'Sign-to-text',
    tagline: 'Listening with the eyes.',
    description:
      'A real-time sign-to-text project that combines computer vision with research to explore more accessible communication.',
    tags: ['Computer vision', 'Real time', 'Accessibility'],
    imageSrc: SignoraImg,
    linkText: 'Visit GitHub repo',
    linkUrl: 'https://github.com/ria30102004/Sign-Language-Translate',
    overview:
      'Sign-to-text is a real-time project that turns signing into written text using computer vision.',
    problem:
      'Conversations between signers and non-signers usually depend on an interpreter or a shared written channel. I wanted to see how far a real-time model could close that gap.',
    solution:
      'The system recognizes signs from live video and shows the predicted text as it happens, wrapped in a web application so anyone can try it.',
    role: 'I worked on the model, the research behind it, and the full-stack application around it.',
    architecture:
      'A computer vision model recognizes signs from a live video feed, and a web application displays the predicted text back to the user in real time.',
    challenges:
      'Real-time performance. A translation that lags or misfires is not useful in a conversation, so responsiveness and reliability mattered as much as accuracy.',
    learned:
      'When software affects how people communicate, reliability is a design requirement, not a nice-to-have.',
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

function HeroCode() {
  const reduce = prefersReducedMotion();
  const [line, setLine] = useState(reduce ? 6 : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    setLine(0);
    const timers = [];
    for (let i = 1; i <= 6; i += 1) {
      timers.push(window.setTimeout(() => setLine(i), 1000 + i * 750));
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [run, reduce]);

  const done = line === 6;

  return (
    <div className="hero-art">
      <div
        className="code-window"
        aria-hidden="true"
      >
        <div className="code-bar">
          <span />
          <span />
          <span />
          <span className="code-file">lesson.py</span>
        </div>
        <div className="code-body">
          <div className="code-lines">
            {codeLines.map((codeLine, index) => (
              <div
                className={line === index + 1 ? 'code-line is-active' : 'code-line'}
                key={index}
              >
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

function ProjectRow({ project, onOpen }) {
  return (
    <article className="project">
      <button
        className="project-media"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open the ${project.name} case study`}
      >
        <BrowserFrame src={project.imageSrc} alt={`${project.name} screenshot`} title={project.name} />
        <span className="project-media-cue">Read case study</span>
      </button>
      <div className="project-body">
        <p className="project-kind">{project.kind}</p>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-desc">{project.description}</p>
        <ul className="chips" aria-label={`${project.name} technologies`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="project-links">
          <a className="link-arrow" href={project.linkUrl} target="_blank" rel="noreferrer">
            {project.linkText} <ArrowUpRight size={15} />
          </a>
          <button className="link-quiet" type="button" onClick={() => onOpen(project)}>
            Read case study
          </button>
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

  const sections = [
    ['Overview', project.overview],
    ['The problem', project.problem],
    ['What it does', project.solution],
    ['My role', project.role],
    ['How it works', project.architecture],
    ['Challenges', project.challenges],
    ['What I learned', project.learned],
  ];

  return (
    <div className="case-backdrop" role="presentation" onClick={onClose}>
      <article
        className="case-study"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        tabIndex={-1}
        ref={dialogRef}
        onKeyDown={trapFocus}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="case-header">
          <p className="project-kind">{project.kind}</p>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close case study">
            <X size={18} />
          </button>
        </div>
        <div className="case-hero">
          <div>
            <h2 className="case-title" id="case-study-title">{project.name}</h2>
            <p className="case-tagline">{project.tagline}</p>
          </div>
          <BrowserFrame src={project.imageSrc} alt={`${project.name} screenshot`} title={project.name} />
        </div>
        <div className="case-grid">
          {sections.map(([label, text]) => (
            <div className="case-block" key={label}>
              <h3 className="case-label">{label}</h3>
              <p>{text}</p>
            </div>
          ))}
          <div className="case-block">
            <h3 className="case-label">Built with</h3>
            <ul className="chips">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="case-footer">
          <a className="link-arrow" href={project.linkUrl} target="_blank" rel="noreferrer">
            {project.linkText} <ArrowUpRight size={15} />
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
  const shortcut = isMac ? '⌘ J' : 'Ctrl J';

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
            <a className="header-link" href={RESUME_URL} target="_blank" rel="noreferrer">
              <FileText size={15} /> Resume
            </a>
            <a className="pill" href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>
              Let&apos;s talk <ArrowUpRight size={14} />
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
            <p className="hero-role">Computer engineer and software developer</p>
            <h1 className="hero-title" id="hero-title">
              I build things that make the complex feel clear and simple.
            </h1>
            <p className="hero-copy">
              I&apos;m Jia, a computer engineer from Mumbai. I build developer tools, visual
              learning products, and real-time systems, and I care most about the moment
              something finally clicks.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work" onClick={(event) => scrollToSection(event, 'work')}>
                See my work <ArrowDown className="icon-down" size={16} />
              </a>
              <a className="button button-secondary" href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>
                <Mail size={16} /> Say hello
              </a>
            </div>
            <p className="hero-status">
              <i className="status-dot" /> Open to new opportunities. Based in Mumbai.
            </p>
          </div>
          <HeroCode />
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="page-shell">
          <div className="section-head">
            <h2 className="section-title" id="about-title">The person behind the interface</h2>
          </div>
          <div className="about-layout">
            <p className="about-lede">
              I like the hard parts: the fuzzy requirements, the weird edge cases, and the
              moment a system finally clicks.
            </p>
            <div className="about-detail">
              <p>
                My work sits between building and explaining. I&apos;ve made developer tools,
                algorithm visualizations, and computer vision projects, and I&apos;ve built systems
                that turn live data into useful decisions.
              </p>
              <p>
                I earned my B.E. in Computer Engineering at Thadomal Shahani Engineering College
                in Mumbai. The projects below are where I&apos;ve been learning in public.
              </p>
              <dl className="facts">
                <div className="fact">
                  <dt>Degree</dt>
                  <dd>B.E. Computer Engineering</dd>
                </div>
                <div className="fact">
                  <dt>School</dt>
                  <dd>Thadomal Shahani Engineering College</dd>
                </div>
                <div className="fact">
                  <dt>Home base</dt>
                  <dd>Mumbai, India</dd>
                </div>
                <div className="fact">
                  <dt>I reach for</dt>
                  <dd>Developer tools, real-time systems, and interactive products</dd>
                </div>
                <div className="fact">
                  <dt>Exploring</dt>
                  <dd>AI-assisted developer tools, system design, and agentic AI research</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="skills" aria-labelledby="skills-title">
        <div className="page-shell">
          <div className="section-head">
            <h2 className="section-title" id="skills-title">What I work with</h2>
            <p className="section-sub">The tools I reach for across the stack, from interfaces to models.</p>
          </div>
          <dl className="skills">
            {skillGroups.map((group) => (
              <div className="skill-row" key={group.label}>
                <dt>{group.label}</dt>
                <dd>
                  <ul className="chips chips-lg">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="page-shell">
          <div className="section-head">
            <h2 className="section-title" id="work-title">Built with curiosity, shipped with care</h2>
            <p className="section-sub">Three projects, each one about making something hard easier to see.</p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="experience" aria-labelledby="experience-title">
        <div className="page-shell">
          <div className="section-head">
            <h2 className="section-title" id="experience-title">
              Systems are only useful when they change something
            </h2>
          </div>
          <div className="split">
            <div className="split-text">
              <h3 className="split-title">Machine Learning and Full Stack Developer</h3>
              <p className="split-meta">AB Engineers, Mumbai. June to July 2025.</p>
              <p className="split-copy">
                I worked on both sides of an industrial monitoring system: the live application
                and the model that predicts when equipment needs attention.
              </p>
              <ul className="bullets">
                <li>Built a real-time monitoring dashboard with React, Tailwind CSS, Node.js, and InfluxDB.</li>
                <li>Developed a Random Forest model for predictive maintenance.</li>
                <li>Worked on deployment and optimization.</li>
                <li>Helped improve monitoring efficiency and reduce operational downtime.</li>
              </ul>
              <div className="stats">
                <div className="stat">
                  <span className="stat-value">35%</span>
                  <span className="stat-label">improvement in operational efficiency</span>
                </div>
                <div className="stat">
                  <span className="stat-value">90%</span>
                  <span className="stat-label">model accuracy</span>
                </div>
              </div>
              <p className="fine-print">
                Both figures are averages measured over the three months after the system was built.
              </p>
            </div>
            <BrowserFrame src={DashboardImg} alt="Monitoring dashboard preview" title="Monitoring dashboard" />
          </div>
        </div>
      </section>

      <section className="section" id="research" aria-labelledby="research-title">
        <div className="page-shell">
          <div className="section-head">
            <h2 className="section-title" id="research-title">Looking closely at a changing city</h2>
          </div>
          <div className="split split-reverse">
            <div className="split-text">
              <p className="about-lede">Research taught me to sit with ambiguity before trying to solve it.</p>
              <h3 className="paper-title">
                Automated slum classification using deep convolutional neural networks and K-means clustering
              </h3>
              <p className="split-copy">
                I worked on a way to identify informal settlements from high-resolution satellite
                imagery across the Mumbai Metropolitan Region, classifying land-use patterns with
                a pipeline of deep learning and GIS tools.
              </p>
              <ol className="pipeline" aria-label="Research pipeline">
                <li>CNNs</li>
                <li>K-means</li>
                <li>GDAL</li>
                <li>QGIS</li>
              </ol>
              <dl className="paper-meta">
                <div>
                  <dt>Presented at</dt>
                  <dd>ICATES 2025, International Conference on Advancing Technology in Engineering and Science</dd>
                </div>
                <div>
                  <dt>Published in</dt>
                  <dd>IET Conference Proceedings, 2025</dd>
                </div>
                <div>
                  <dt>DOI</dt>
                  <dd>10.1049/icp.2025.4694</dd>
                </div>
              </dl>
              <a className="button button-primary" href={DOI_URL} target="_blank" rel="noreferrer">
                Read the paper <ArrowUpRight size={16} />
              </a>
            </div>
            <BrowserFrame src={ResearchImg} alt="Research preview" bar={false} />
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="page-shell">
          <h2 className="contact-title" id="contact-title">Have a problem worth untangling?</h2>
          <p className="contact-copy">
            If you&apos;re building something thoughtful, I&apos;d love to hear what you&apos;re working on.
          </p>
          <a className="contact-email" href={`mailto:${EMAIL}`}>
            <span>{EMAIL}</span>
            <ArrowUpRight size={26} />
          </a>
          <div className="contact-actions">
            <a className="button button-light" href={RESUME_URL} target="_blank" rel="noreferrer">
              <FileText size={16} /> View resume
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
          <button className="button button-light button-sm" type="button" onClick={copyEmail}>
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
