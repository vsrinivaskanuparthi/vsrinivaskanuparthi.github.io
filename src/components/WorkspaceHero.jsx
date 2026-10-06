import { useState } from 'react';
import Icon from './Icon';
import SystemMap from './SystemMap';
import { profile } from '../data';

const worlds = [
  { id: 'jarvis', name: 'JARVIS', label: 'PERSONAL AI', icon: 'activity', description: 'A voice-driven local assistant. A real command center. My most personal experiment in AI.', status: 'LOCAL PROTOTYPE', href: '#jarvis', action: 'Step inside Jarvis', color: '#80e4ed' },
  { id: 'academy', name: 'AI Academy', label: 'LEARN / EXPLORE', icon: 'spark', description: 'Turning curiosity about artificial intelligence into a dedicated learning platform.', status: 'LIVE PROJECT', href: 'https://ai-learning-platform-3fp.pages.dev/', action: 'Visit AI Academy', color: '#c8afff' },
  { id: 'data', name: 'Data Engineering', label: 'CONNECT / BUILD', icon: 'database', description: 'A learning platform for the systems and ideas behind how data becomes useful.', status: 'NOT YET DEPLOYED', href: '#projects', action: 'Explore my projects', color: '#c5f277' },
];

function ProjectConstellation() {
  const [selected, setSelected] = useState('jarvis');
  const world = worlds.find(item => item.id === selected);
  return <div className={`constellation world-${world.id}`} style={{ '--world-color': world.color }}>
    <div className="constellation-top"><span><i/> A BUILDER’S UNIVERSE</span><span>03 CONNECTED IDEAS</span></div>
    <div className="constellation-space">
      <svg className="universe-lines" viewBox="0 0 660 380" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs><radialGradient id="universe-glow"><stop stopColor="currentColor" stopOpacity=".15"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></radialGradient></defs>
        <ellipse cx="328" cy="193" rx="220" ry="178" fill="url(#universe-glow)"/>
        <ellipse className="universe-orbit" cx="328" cy="193" rx="210" ry="112" transform="rotate(-22 328 193)"/>
        <ellipse className="universe-orbit orbit-two" cx="328" cy="193" rx="155" ry="170" transform="rotate(35 328 193)"/>
        <circle className="universe-core-orbit" cx="328" cy="193" r="94"/>
        <path className="universe-path" d="M330 193 120 95M330 193 525 124M330 193 428 315"/>
        <path className="universe-packets" d="M330 193 120 95M330 193 525 124M330 193 428 315"/>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => <path key={i} d="M328 37v8" stroke="currentColor" strokeOpacity=".25" transform={`rotate(${i * 30} 328 193)`}/>)}
        <g fill="currentColor"><circle cx="150" cy="251" r="2"/><circle cx="455" cy="58" r="2"/><circle cx="290" cy="337" r="2"/><circle cx="549" cy="243" r="1.5"/></g>
      </svg>
      <a className="universe-core" href="#about" aria-label="Meet Srinivas"><span className="core-outline"/><img src="./srinivas-portrait.webp" alt="" width="86" height="86" fetchPriority="high"/><span className="core-caption">THE BUILDER</span></a>
      {worlds.map((item, index) => <button key={item.id} className={`world-node world-node-${item.id} ${selected === item.id ? 'selected' : ''}`} aria-pressed={selected === item.id} aria-label={`Explore ${item.name} project`} onClick={() => setSelected(item.id)}><span className="world-node-icon"><Icon name={item.icon}/></span><span><small>{item.label}</small><strong>{item.name}</strong></span><span className="world-node-index">0{index+1}</span></button>)}
      <span className="universe-note note-west">IDEAS BECOME SYSTEMS.</span><span className="universe-note note-east">SELECT A PROJECT ↗</span>
    </div>
    <div className="world-inspector" aria-live="polite" aria-atomic="true"><div><span className="world-status">{world.status}</span><h3>{world.name}</h3><p>{world.description}</p></div><a className="world-open" href={world.href} {...(world.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><span>{world.action}</span><Icon name="northeast"/></a></div>
  </div>;
}

export default function WorkspaceHero({ onQuickJump }) {
  const [view, setView] = useState('projects');
  return <section className="workspace-hero" id="top" aria-labelledby="hero-title">
    <div className="workspace-grid-bg" aria-hidden="true"/>
    <div className="container workspace-intro"><div className="workspace-location"><span className="status-dot"/> BENGALURU, INDIA <span>12.97° N / 77.59° E</span></div><button className="workspace-search js-control" onClick={onQuickJump}><Icon name="search"/> Jump to anything <kbd>⌘ / Ctrl K</kbd></button></div>
    <div className="container workspace-layout"><div className="workspace-copy"><p className="eyebrow">SRINIVAS KANUPARTHI / ENGINEER & BUILDER</p><h1 id="hero-title">Systems by trade.<br/><em>Curiosity<br/>by default.</em></h1><p>I build enterprise systems at Airbus.<br/>Then follow my curiosity into AI assistants,<br className="desktop-break"/> learning platforms, and whatever comes next.</p><div className="workspace-actions"><a className="button" href="#jarvis">Enter the Jarvis lab <Icon name="northeast"/></a><a className="text-link" href={profile.resume} download="Srinivas-Kanuparthi-Resume.pdf">Résumé <Icon name="download"/></a></div><div className="workspace-credentials"><strong>9<span>+</span><small>YEARS BUILDING</small></strong><div><span>LEAD SOFTWARE ENGINEER</span><b>Airbus</b><small>Node.js · TypeScript · AWS</small></div></div></div>
      <div className="workspace-window"><div className="workspace-window-bar"><span className="window-dots" aria-hidden="true"><i/><i/><i/></span><span>SRINIVAS / WORKSPACE</span><div className="workspace-views js-control" role="group" aria-label="Workspace view"><button aria-pressed={view === 'projects'} onClick={() => setView('projects')}>Projects</button><button aria-pressed={view === 'technology'} onClick={() => setView('technology')}>Technology</button></div></div>{view === 'projects' ? <ProjectConstellation/> : <div className="workspace-tech"><SystemMap/></div>}</div>
    </div>
    <div className="container workspace-bottom"><a href="#projects"><Icon name="down"/> Explore the work behind the interface</a><span>A PERSONAL PORTFOLIO. AN OPEN WORKSPACE.</span></div>
    <div className="experience-strip"><div className="container strip-inner"><span className="strip-label">EXPERIENCE <br/>BUILT AT</span><span className="company-airbus">AIRBUS</span><span>Capgemini</span><span className="company-cgi">CGI</span><span>Anblicks</span><span className="strip-detail">Enterprise depth.<br/>A builder’s mindset.</span></div></div>
  </section>;
}
