import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Command,
  Github,
  Linkedin,
  Mail,
  Menu,
  Terminal,
  X,
} from 'lucide-react';

import AlgorificImg from '../Images/Algorific.png';
import CodementorImg from '../Images/Codementor.png';
import SignoraImg from '../Images/Signora.png';
import DashboardImg from '../Images/Dashboard.png';
import ResearchImg from '../Images/Research.png';
import JiaImg from '../Images/Jia.png';

const projects = [
  {
    number: '01',
    type: 'developer tool / in progress',
    name: 'CodeMentor',
    tagline: 'A gentler way to understand what your code is doing.',
    description:
      'An IDE-like developer tool built around a code editor, code execution, an interactive terminal, and an AI assistant for Python.',
    tags: ['Python', 'Docker', 'AI assistant'],
    imageSrc: CodementorImg,
    linkText: 'Visit website',
    linkUrl: 'https://codementor-fm3u.onrender.com/',
    role: 'Developer tool design and full-stack implementation',
    overview:
      'CodeMentor is an IDE-like coding environment designed to make programming more interactive and understandable.',
    architecture:
      'The environment connects a code editor to backend execution, an interactive terminal, and a Docker-based runtime.',
    details:
      'Organized around line-by-line execution, explanations, and animations that make program states clear.',
    challenges:
      'Making execution feel understandable without hiding the underlying engineering.',
    learned:
      'Developer tools can be approachable without becoming less serious.',
  },
  {
    number: '02',
    type: 'education / visualization',
    name: 'Algorific',
    tagline: 'Data structures, made visible.',
    description:
      'A data structures education and visualization project using motion and clear visual states to make logic easy to follow.',
    tags: ['Data structures', 'Visualization', 'Learning'],
    imageSrc: AlgorificImg,
    linkText: 'Visit website',
    linkUrl: 'https://algorific.vercel.app/ds',
    role: 'Frontend and interaction development',
    overview:
      'Algorific is a visual way to understand data structures without staring at a wall of code.',
    architecture:
      'Brings together theory, visual explanations, and interactive learning elements.',
    details:
      'Each step gives the learner a way to connect the concept to what is happening on screen.',
    challenges:
      'Keeping the scope focused while making the algorithm genuinely useful.',
    learned:
      'A focused explanation can be more valuable than a long list of shallow features.',
  },
  {
    number: '03',
    type: 'computer vision / research',
    name: 'Sign-to-text',
    tagline: 'Listening with the eyes.',
    description:
      'A real-time sign-to-text project combining computer vision with research to explore accessible communication.',
    tags: ['Computer vision', 'Real time', 'Accessibility'],
    imageSrc: SignoraImg,
    linkText: 'Visit GitHub repo',
    linkUrl: 'https://github.com/ria30102004/Sign-Language-Translate',
    role: 'Machine learning, research, and full-stack development',
    overview:
      'A major project exploring real-time sign-to-text translation for communities.',
    architecture:
      'Combines a real-time model, visual communication, and full-stack experience.',
    details:
      'Developed with research into the model and the broader learning experience around accessibility.',
    challenges:
      'Designing for real communication needs with reliable system performance.',
    learned:
      'Technical decisions carry weight when interfaces impact how people communicate.',
  },
];

function ProjectVisual({ project }) {
  return (
    <div className="project-visual-card" aria-label={`${project.name} preview`}>
      <div className="visual-window-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="visual-window-title">{project.name}</span>
      </div>
      <div className="visual-content-box">
        {project.imageSrc ? (
          <img src={project.imageSrc} alt={project.name} className="project-screenshot" />
        ) : (
          <div className="image-placeholder-box">
            <span>Add image placeholder</span>
            <span className="placeholder-subtext">({project.name})</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project, onClose }) {
  return (
    <div className="case-study-backdrop" role="presentation" onClick={onClose}>
      <article
        className="case-study"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="case-study-header">
          <p className="project-type">{project.type}</p>
          <button
            className="case-study-close"
            type="button"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={18} />
          </button>
        </div>
        <div className="case-study-hero">
          <div>
            <p className="section-index">case study / {project.number}</p>
            <h2 className="case-study-title" id="case-study-title">
              {project.name === 'CodeMentor' ? <>Code<em>Mentor</em></> : project.name === 'Algorific' ? <>Algo<em>rific</em></> : <>Sign-<em>to-text</em></>}
            </h2>
            <p className="case-study-tagline">{project.tagline}</p>
          </div>
          <ProjectVisual project={project} />
        </div>
        <div className="case-study-grid">
          <div>
            <p className="case-label">01 / overview</p>
            <p>{project.overview}</p>
          </div>
          <div>
            <p className="case-label">02 / what it does</p>
            <p>{project.description}</p>
          </div>
          <div>
            <p className="case-label">03 / Jia&apos;s role</p>
            <p>{project.role}</p>
          </div>
          <div>
            <p className="case-label">04 / technical architecture</p>
            <p>{project.architecture}</p>
          </div>
          <div>
            <p className="case-label">05 / implementation details</p>
            <p>{project.details}</p>
          </div>
          <div>
            <p className="case-label">06 / challenges</p>
            <p>{project.challenges}</p>
          </div>
          <div>
            <p className="case-label">07 / what I learned</p>
            <p>{project.learned}</p>
          </div>
          <div>
            <p className="case-label">08 / tech stack</p>
            <ul className="tech-list">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        </div>
        <div className="case-study-footer">
          <span>Detailed links and live demos will be added when available.</span>
          <button className="button-quiet" type="button" onClick={onClose}>Back to work <ArrowUpRight size={14} /></button>
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'j') {
        event.preventDefault();
        setEggOpen((current) => !current);
      }
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setEggOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('jia2.harisinghani@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="portfolio">
      <header className="site-header">
        <div className="page-shell header-inner">
          <a className="wordmark" href="#top" onClick={(e) => scrollToSection(e, 'top')} data-testid="link-home">
            <span className="wordmark-mark">
                <img src={JiaImg} alt="Jia Harisinghani" />
            </span>
            <span>Jia Harisinghani</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} data-testid="link-nav-about">About</a>
            <a href="#work" onClick={(e) => scrollToSection(e, 'work')} data-testid="link-nav-work">Work</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} data-testid="link-nav-experience">Experience</a>
            <a href="#research" onClick={(e) => scrollToSection(e, 'research')} data-testid="link-nav-research">Research</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} data-testid="link-nav-contact">Contact</a>
          </nav>
          <div className="header-actions">
            <a className="header-social" href="https://github.com/Jia2005" target="_blank" rel="noreferrer">GitHub</a>
            <a className="header-social" href="https://linkedin.com/in/jia-harisinghani" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="header-contact" href="#contact" onClick={(e) => scrollToSection(e, 'contact')} data-testid="link-header-email">
              Let&apos;s talk <ArrowUpRight size={14} strokeWidth={1.6} />
            </a>
          </div>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
          {menuOpen && (
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} data-testid="link-mobile-about">About</a>
              <a href="#work" onClick={(e) => scrollToSection(e, 'work')} data-testid="link-mobile-work">Work</a>
              <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} data-testid="link-mobile-experience">Experience</a>
              <a href="#research" onClick={(e) => scrollToSection(e, 'research')} data-testid="link-mobile-research">Research</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} data-testid="link-mobile-contact">Contact</a>
            </nav>
          )}
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="page-shell hero-grid">
          <div>
            <p className="eyebrow reveal">Computer engineer / web developer</p>
            <h1 className="hero-title reveal reveal-delay-1" id="hero-title">
              I build things<br />
              that make the<br />
              <em>complex</em> feel clear.
            </h1>
            <p className="hero-copy reveal reveal-delay-2">
              I&apos;m Jia, a Computer Engineering graduate and web developer from
              <strong> Mumbai, India.</strong> I care about the layer where
              thoughtful interfaces meet serious engineering.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <a className="button-primary" href="#work" onClick={(e) => scrollToSection(e, 'work')} data-testid="link-hero-work">
                See the work <ArrowDown size={15} strokeWidth={1.7} />
              </a>
              <a className="button-quiet" href="#contact" onClick={(e) => scrollToSection(e, 'contact')} data-testid="link-hero-email">
                <Mail size={15} strokeWidth={1.7} /> Say hello
              </a>
            </div>
            <div className="hero-meta reveal reveal-delay-3">
              <span><i className="status-dot" /> Open to meaningful work</span>
              <i className="hero-meta-divider" />
              <span>Based in Mumbai</span>
            </div>
          </div>
          <div className="hero-art reveal reveal-delay-2" aria-label="Abstract CodeMentor interface diagram">
            <div className="orbit" />
            <div className="code-window">
              <div className="window-bar"><i /><i /><i /><span className="window-file">lesson.py</span></div>
              <div className="code-body">
                <div className="code-line"><span className="line-number">01</span><span><span className="syntax-keyword">def</span> <span className="syntax-function">make_it_clear</span>(concept):</span></div>
                <div className="code-line"><span className="line-number">02</span><span>&nbsp;&nbsp;steps = <span className="syntax-function">explain</span>(concept)</span></div>
                <div className="code-line"><span className="line-number">03</span><span>&nbsp;&nbsp;<span className="syntax-keyword">for</span> step <span className="syntax-keyword">in</span> steps:</span></div>
                <div className="code-line"><span className="line-number">04</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">show</span>(step)</span></div>
                <div className="code-line"><span className="line-number">05</span><span>&nbsp;&nbsp;<span className="syntax-keyword">return</span> <span className="syntax-string">&quot;aha&quot;</span></span></div>
                <div className="code-line"><span className="line-number">06</span><span className="syntax-comment"># one line at a time</span></div>
              </div>
              <div className="terminal-strip"><span>›</span> execution complete <Check size={12} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="page-shell">
          <div className="section-heading">
            <p className="section-index">01 / a little context</p>
            <h2 className="section-title" id="about-title">
              The person behind<br />
              the <em>interface.</em>
            </h2>
          </div>
          <div className="about-layout">
            <p className="about-lede">
              I like the hard parts — the fuzzy requirements, the weird edge cases, the moment a system finally clicks.
            </p>
            <div className="about-detail">
              <p>
                My work sits between building and explaining. I&apos;ve worked on developer tools, algorithm visualizations, computer vision, and systems that turn live data into useful decisions.
              </p>
              <p>
                I earned my B.E. in Computer Engineering at Thadomal Shahani Engineering College, Mumbai. The projects below are where I&apos;ve been learning in public.
              </p>
              <div className="facts">
                <div className="fact">
                  <span className="fact-label">Degree</span>
                  <span className="fact-value">B.E. Computer Engineering</span>
                </div>
                <div className="fact">
                  <span className="fact-label">School</span>
                  <span className="fact-value">Thadomal Shahani Engineering College</span>
                </div>
                <div className="fact">
                  <span className="fact-label">Home base</span>
                  <span className="fact-value">Mumbai, India</span>
                </div>
                <div className="fact">
                  <span className="fact-label">I reach for</span>
                  <span className="fact-value">React, systems, visual explanations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50" id="work" aria-labelledby="work-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">02 / selected work</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900" id="work-title">
              Built with curiosity,<br />
              shipped with <em>care.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {projects.map((project) => (
              <article 
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow" 
                key={project.name} 
                data-testid={`card-project-${project.name.toLowerCase().replace('-', '')}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-sm text-gray-400">{project.number}</span>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">{project.type}</p>
                </div>
                <ProjectVisual project={project} />
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-2">
                  {project.name === 'CodeMentor' ? <>Code<em>Mentor</em></> : project.name === 'Algorific' ? <>Algo<em>rific</em></> : <>Sign-<em>to-text</em></>}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{project.tagline}</p>
                <p className="text-sm text-gray-500 mb-6 flex-grow">{project.description}</p>
                <ul className="flex flex-wrap gap-2 list-none p-0 mb-6" aria-label={`${project.name} topics`}>
                  {project.tags.map((tag) => (
                    <li key={tag} className="text-xs px-3 py-1 bg-gray-100 rounded-full font-mono text-gray-600">{tag}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <a
                    href={project.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline bg-transparent border-none p-0"
                  >
                    {project.linkText} <ArrowUpRight size={14} />
                  </a>
                  <button
                    className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 bg-transparent border-none p-0 cursor-pointer"
                    type="button"
                    onClick={() => setSelectedProject(project)}
                  >
                    Case study
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience" aria-labelledby="experience-title" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
        <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
          <div className="section-heading">
            <p className="section-index">03 / where it meets the real world</p>
            <h2 className="section-title" id="experience-title">
              Systems are only useful<br />
              when they change <em>something.</em>
            </h2>
          </div>
          <div className="research-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', margin: 'auto 0', width: '100%' }}>
            <div>
              <p className="eyebrow">AB Engineers / June–July 2025</p>
              <h3 className="research-title">Monitoring that looks <em>forward.</em></h3>
              <p className="research-copy">
                At AB Engineers, I worked on real-time monitoring and predictive maintenance using React, Tailwind, Node, InfluxDB, and Random Forest. The project reported approximately 35% operational efficiency improvement and approximately 90% model accuracy.
              </p>
              <p className="research-note">Real-time signals → useful prediction → less guesswork</p>
            </div>
            
            <div className="project-visual-card" aria-label="Dashboard preview">
              <div className="visual-window-bar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="visual-content-box" style={{ height: '220px' }}>
                <img src={DashboardImg} alt="Dashboard Preview" className="project-screenshot" style={{ borderRadius: '8px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-lavender" id="research" aria-labelledby="research-title" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
        <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
          <div className="section-heading">
            <p className="section-index">04 / research</p>
            <h2 className="section-title" id="research-title">
              Looking closely at<br />
              a changing <em>city.</em>
            </h2>
          </div>
          <div className="research-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', margin: 'auto 0', width: '100%' }}>
            <div>
              <p className="about-lede">
                Research taught me to sit with ambiguity before trying to solve it.
              </p>
              <div className="about-detail" style={{ marginTop: '1.5rem' }}>
                <p>
                  I worked on research into automated slum classification using deep convolutional neural networks and k-means clustering in the Mumbai metropolitan region.
                </p>
                <p>
                  The work was presented at an international engineering and technology conference and published via IET Conference Proceedings.
                </p>
                <p className="research-note">Publication details available through IET Digital Library</p>
              </div>
            </div>

            <div className="project-visual-card" aria-label="Research preview">
              <div className="visual-window-bar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="visual-content-box" style={{ height: '220px' }}>
                {ResearchImg ? (
                  <img src={ResearchImg} alt="Research Preview" className="project-screenshot" style={{ borderRadius: '8px' }} />
                ) : (
                  <div className="image-placeholder-box">
                    <span>Research Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="page-shell">
          <div className="contact-content">
            <p className="contact-kicker">05 / your turn</p>
            <h2 className="contact-title" id="contact-title">Have a problem<br />worth <em>untangling?</em></h2>
            <p className="contact-copy">If you&apos;re building something thoughtful, I&apos;d love to hear what you&apos;re working on.</p>
            <a className="contact-email" href="mailto:jia2.harisinghani@gmail.com" data-testid="link-contact-email">
              jia2.harisinghani@gmail.com <ArrowUpRight size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <p className="footer-note">© Jia Harisinghani / built in Mumbai</p>
          <div className="footer-links">
            <a className="footer-link" href="https://github.com/Jia2005" target="_blank" rel="noreferrer" data-testid="link-footer-github"><Github size={13} /> GitHub</a>
            <a className="footer-link" href="https://linkedin.com/in/jia-harisinghani" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin"><Linkedin size={13} /> LinkedIn</a>
            <button className="footer-link" type="button" onClick={() => setEggOpen(true)} data-testid="button-easter-egg"><Command size={13} /> Cmd J</button>
          </div>
        </div>
      </footer>

      {eggOpen && (
        <aside className="easter-egg" aria-live="polite" data-testid="status-easter-egg">
          <div className="easter-egg-title">
            <span><Terminal size={12} /> small system note</span>
            <button className="easter-egg-close" type="button" onClick={() => setEggOpen(false)} aria-label="Close technical note" data-testid="button-close-easter-egg"><X size={14} /></button>
          </div>
          <p>you found the shortcut. the best interfaces leave a little room for curiosity.</p>
          <button className="button-quiet" type="button" onClick={copyEmail} data-testid="button-copy-email">
            {copied ? <Check size={14} /> : <Code2 size={14} />}
            {copied ? 'Email copied' : 'Copy email address'}
          </button>
        </aside>
      )}
      {selectedProject && (
        <ProjectCaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  );
}

function App() {
  return <Home />;
}

export default App;
