import { useEffect, useRef, useState } from 'react';
import { careers, expertise, profile, projects, work } from './data';
import Icon from './components/Icon';
import WorkspaceHero from './components/WorkspaceHero';
import JarvisLab, { JarvisProjectCard } from './components/JarvisLab';
import QuickJump from './components/QuickJump';
import ProjectArt from './components/ProjectArt';
import CaseStudy from './components/CaseStudy';

const navigation = [['projects', 'Projects'], ['work', 'Impact'], ['about', 'About'], ['experience', 'Journey']];
const filters = ['All projects', 'Live', 'Local prototype', 'Not yet deployed'];

function SectionHeading({ number, label, title, description }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number}</span> / {label}</p><h2>{title}</h2></div>{description && <p className="section-description">{description}</p>}</div>;
}

function Header({ onQuickJump }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [theme, setTheme] = useState('dark');
  const menuButton = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    document.documentElement.classList.add('is-interactive');
    setTheme(document.documentElement.dataset.theme || 'dark');
    const onEscape = event => { if (event.key === 'Escape') { setMenuOpen(false); if (header.current?.contains(document.activeElement)) menuButton.current?.focus(); } };
    const onOutside = event => { if (!header.current?.contains(event.target)) setMenuOpen(false); };
    const media = matchMedia('(min-width: 821px)');
    const onResize = () => setMenuOpen(false);
    document.addEventListener('keydown', onEscape);
    document.addEventListener('pointerdown', onOutside);
    media.addEventListener('change', onResize);
    let frame;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = [...document.querySelectorAll('main > section[id]')];
        const current = sections.filter(section => section.getBoundingClientRect().top <= 180).at(-1);
        setActive(current?.id || '');
        const total = document.documentElement.scrollHeight - innerHeight;
        document.documentElement.style.setProperty('--progress', total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('pointerdown', onOutside);
      media.removeEventListener('change', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Storage may be unavailable in private browsing. */ }
  };
  return <header className="site-header" ref={header}>
    <div className="container header-inner">
      <a className="brand" href="#top" aria-label="Srinivas Kanuparthi home"><span className="brand-mark">sk<span>.</span></span><span className="brand-text">Srinivas Kanuparthi<span>ENGINEER & BUILDER</span></span></a>
      <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">{navigation.map(([id, label]) => <a href={`#${id}`} key={id} aria-current={active === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Icon name="northeast"/></a></nav>
      <div className="header-controls"><button className="icon-button quick-jump-toggle js-control" aria-label="Open quick navigation" onClick={onQuickJump}><Icon name="search"/></button><button className="icon-button theme-toggle js-control" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={toggleTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'}/></button><button ref={menuButton} className="icon-button menu-toggle js-control" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'}/></button></div>
    </div>
  </header>;
}

function Projects() {
  const [filter, setFilter] = useState('All projects');
  const visible = projects.filter(project => filter === 'All projects' || (filter === 'Live' && !!project.url) || (filter === 'Local prototype' && project.status === 'local') || (filter === 'Not yet deployed' && !project.url && project.status !== 'local'));
  return <section className="section projects-section" id="projects" aria-labelledby="projects-title"><div className="container">
    <SectionHeading number="01" label="PERSONAL PROJECTS" title={<>Ideas don’t stay<br/><em>ideas for long.</em></>} description="Beyond the day job. Ideas I’m exploring, platforms I’m building, and things I want to exist."/>
    <div className="project-toolbar"><div className="filter-group js-control" role="group" aria-label="Filter personal projects">{filters.map(name => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}{name === 'All projects' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div><span className="project-count" role="status">{visible.length} {visible.length === 1 ? 'PROJECT' : 'PROJECTS'} / INDEPENDENTLY BUILT</span></div>
    <h3 id="projects-title" className="sr-only">Personal projects and learning platforms</h3>
    <div className="projects-grid">{visible.map(project => project.id === 'jarvis' ? <JarvisProjectCard key={project.id} project={project}/> : <article key={project.id} className={`project-card project-${project.visual}`}><ProjectArt kind={project.visual}/><div className="project-content"><div className="project-meta"><span>{project.category}</span><span className={project.url ? 'project-status live' : 'project-status'}><span className="status-dot"/>{project.url ? 'Live project' : 'Not yet deployed'}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-card-footer"><span className="project-number">/{project.number}</span>{project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer">{project.linkLabel} <Icon name="northeast"/></a> : <a href={`mailto:${profile.email}?subject=Data%20Engineering%20Learning%20Platform`}>Ask about the platform <Icon name="northeast"/></a>}</div></div></article>)}</div>
    <p className="section-footnote"><Icon name="spark"/> Always learning. Always building. Have an idea? <a href="#contact">Let’s compare notes.</a></p>
  </div></section>;
}

function Impact({ onCaseStudy }) {
  return <section className="section impact-section" id="work"><div className="container"><SectionHeading number="02" label="PROFESSIONAL IMPACT" title={<>Good engineering.<br/><em>Real outcomes.</em></>} description="A few problems I’ve helped solve across enterprise platforms, database modernization, and cloud delivery."/>
    <article className="featured-work"><div className="featured-copy"><p className="eyebrow"><span className="status-dot"/> FEATURED / AIRBUS</p><h3>From prototype<br/>to <em>possibility.</em></h3><h4>Database Migration Accelerator</h4><p>Technical ownership of an internal Oracle-to-PostgreSQL migration platform. Making execution faster, failures rarer, and enterprise adoption more achievable.</p><button className="button button-outline js-control" onClick={onCaseStudy}>Read the case study <Icon name="northeast"/></button><noscript><p>My contribution: parallel migration execution, reliability and responsiveness improvements, live status tracking, corporate SSO, and enterprise-readiness activities.</p></noscript></div>
      <div className="migration-visual"><div className="migration-top"><span>MIGRATION / REIMAGINED</span><Icon name="database"/></div><div className="migration-diagram"><div className="database-block source-db"><Icon name="database"/><strong>Oracle</strong><span>SOURCE</span></div><div className="migration-bridge"><div className="bridge-line"/><span>Node.js + ora2pg</span><Icon/></div><div className="database-block target-db"><Icon name="database"/><strong>PostgreSQL</strong><span>TARGET</span></div></div><div className="migration-features"><span><Icon name="check"/> Parallel execution</span><span><Icon name="check"/> Live status visibility</span><span><Icon name="check"/> Corporate SSO</span></div><p>Progressing toward industrialization</p></div>
    </article>
    <div className="impact-grid">{work.map((item, index) => <article className="impact-card" key={item.title}><div className="impact-top"><span>{item.company}</span><span>0{index + 1}</span></div><div className={`impact-value ${index === 3 ? 'impact-value-text' : ''}`}>{item.value}<span>{item.unit}</span></div><p className="impact-metric">{item.metric}</p><h3>{item.title}</h3><p>{item.description}</p><details><summary>My contribution <Icon name="plus"/></summary><p>{item.detail}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></details></article>)}</div>
    <p className="muted-note">Professional work summaries. Employer source code and internal materials are not published here.</p>
  </div></section>;
}

function About() {
  const [selected, setSelected] = useState('services');
  const current = expertise.find(item => item.id === selected);
  const chooseTab = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % expertise.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + expertise.length) % expertise.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = expertise.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setSelected(expertise[next].id);
    document.getElementById(`tab-${expertise[next].id}`)?.focus();
  };
  return <section className="section about-section" id="about"><div className="container">
    <SectionHeading number="03" label="THE PERSON BEHIND THE SYSTEMS" title={<>Backend depth.<br/><em>Builder’s curiosity.</em></>}/>
    <div className="about-layout"><figure className="portrait-frame"><div className="portrait-image"><img src="./srinivas-portrait.webp" width="780" height="780" loading="lazy" alt="Srinivas Kanuparthi wearing a navy blazer"/><span className="portrait-stamp" aria-hidden="true">SK.<br/><small>ENGINEER / BUILDER</small></span></div><figcaption><span><Icon name="location"/> Bengaluru, India</span><span>EST. 2017</span></figcaption></figure><div className="about-copy"><p className="about-lead">I like taking complex problems <br/>and making them <em>work simply.</em></p><p>I’m a Lead Software Engineer at Airbus, focused on backend architecture, cloud-native applications, and database modernization.</p><p>My work combines hands-on engineering with system design, performance optimization, enterprise governance, and technical leadership. Node.js and AWS are my core focus; my UI experience helps me collaborate across the stack.</p><p>Outside that work, I’m exploring AI engineering, generative AI, and developer productivity—and turning that curiosity into my own learning platforms.</p><div className="about-facts"><div><strong>9<span>+</span></strong><span>YEARS IN ENGINEERING</span></div><div><strong>5</strong><span>ENGINEERS LED AT AIRBUS</span></div></div><div className="credential"><Icon name="cloud"/><div><span>AWS CERTIFIED</span><strong>Solutions Architect – Professional</strong></div><Icon name="check"/></div></div></div>
    <div className="toolkit-panel"><div className="toolkit-heading"><p className="eyebrow">THE ENGINEERING TOOLKIT</p><p>From the API to the infrastructure.</p></div><div className="expertise-tabs js-control" role="tablist" aria-label="Engineering expertise">{expertise.map((item, index) => <button id={`tab-${item.id}`} key={item.id} role="tab" aria-selected={selected === item.id} aria-controls="expertise-panel" tabIndex={selected === item.id ? 0 : -1} onClick={() => setSelected(item.id)} onKeyDown={event => chooseTab(event, index)}><Icon name={item.icon}/>{item.name}<span>0{index + 1}</span></button>)}</div><div className="expertise-content" id="expertise-panel" role="tabpanel" aria-labelledby={`tab-${selected}`} tabIndex="0"><div><h3>{current.title}</h3><p>{current.description}</p></div><div className="skill-tags">{current.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div><noscript><div className="nojs-expertise">{expertise.slice(1).map(item => <p key={item.id}><strong>{item.name}: </strong>{item.tools.join(' · ')}</p>)}</div></noscript></div>
  </div></section>;
}

function Experience() {
  return <section className="section journey-section" id="experience"><div className="container journey-layout"><div className="journey-intro"><p className="eyebrow"><span>04</span> / THE JOURNEY</p><h2>Every chapter.<br/><em>A stronger foundation.</em></h2><p>Building, modernizing, and delivering enterprise software since 2017.</p><div className="education"><span className="eyebrow">EDUCATION</span><strong>B.Tech, Computer Science<br/>& Engineering</strong><p>Jawaharlal Nehru Technological University<br/>2013–2017</p></div><div className="recognition"><Icon name="spark"/><p><strong>Recognized along the way.</strong>Airbus Spot Award for Innovation and First Prize — Avionics Proof of Concept.</p></div></div><div className="timeline">{careers.map((career, index) => <article className={`career ${index === 0 ? 'career-current' : ''}`} key={career.company}><span className="career-year">{career.year}</span><div className="career-content"><div className="career-dates"><span>{career.dates}</span>{index === 0 && <span className="current-badge">CURRENT</span>}</div><h3>{career.company}</h3><p className="career-role">{career.role}</p><p>{career.description}</p></div></article>)}</div></div></section>;
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('Email copied'); }
    catch { setCopyStatus('Copy unavailable. Select the email address below.'); }
    timer.current = setTimeout(() => setCopyStatus(''), 5000);
  };
  return <section className="contact-section" id="contact"><div className="container"><div className="contact-panel"><div className="contact-orbit" aria-hidden="true"><span/><span/><span/></div><div className="contact-copy"><p className="eyebrow"><span>05</span> / START A CONVERSATION</p><h2>Good things start<br/>with <em>a hello.</em><span className="contact-asterisk" aria-hidden="true">✳</span></h2><p>A backend challenge, a cloud engineering opportunity, or an idea worth building. I’d love to hear about it.</p><div className="contact-actions"><a className="button" href={`mailto:${profile.email}`}>Let’s talk <Icon name="northeast"/></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Icon name="northeast"/></a></div><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="icon-button js-control" onClick={copyEmail} aria-label="Copy email address"><Icon name={copyStatus === 'Email copied' ? 'check' : 'copy'}/></button></div><p className="copy-status" role="status">{copyStatus}</p></div></div></div></section>;
}

export default function App() {
  const [caseOpen, setCaseOpen] = useState(false);
  const [jumpOpen, setJumpOpen] = useState(false);
  useEffect(() => {
    const onShortcut = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!document.querySelector('dialog[open]')) setJumpOpen(true);
      }
    };
    document.addEventListener('keydown', onShortcut);
    return () => document.removeEventListener('keydown', onShortcut);
  }, []);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('has-entered');
      observer.unobserve(entry.target);
    }), { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .featured-work, .about-layout, .toolkit-panel, .contact-panel').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><Header onQuickJump={() => setJumpOpen(true)}/><main id="main" tabIndex="-1"><WorkspaceHero onQuickJump={() => setJumpOpen(true)}/><Projects/><JarvisLab/><Impact onCaseStudy={() => setCaseOpen(true)}/><About/><Experience/><Contact/></main><footer className="site-footer"><div className="container footer-inner"><a className="footer-brand" href="#top" aria-label="Back to top">sk<span>.</span></a><span>© 2026 Srinivas Kanuparthi<br/><small>Built with curiosity. Engineered with care.</small></span><a className="back-to-top" href="#top">Back to top <Icon name="down"/></a></div></footer><QuickJump open={jumpOpen} onClose={() => setJumpOpen(false)}/><CaseStudy open={caseOpen} onClose={() => setCaseOpen(false)}/></>;
}
