import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const walkthroughs = [
  {
    id: 'calculator', title: 'Open Calculator', route: 'DETERMINISTIC ACTION',
    steps: [
      { label: 'Wake', state: 'IDLE', title: '“Wake up Jarvis.”', detail: 'Wake detection activates the session. The wake listener releases the microphone before speech recognition begins.', event: 'wake_jarvis', response: 'Online, Srinivas.' },
      { label: 'Listen', state: 'LISTENING', title: '“Open Calculator.”', detail: 'Speech-to-text produces a transcript. The voice adapter passes the command to JarvisCore.', event: 'user_transcript', response: 'Open Calculator' },
      { label: 'Route', state: 'PROCESSING', title: 'A command, not a question.', detail: 'The intent engine recognizes an application action. Jarvis takes the deterministic tool path rather than asking a language model.', event: 'intent_detected', response: 'open_application → calculator' },
      { label: 'Act', state: 'EXECUTING', title: 'Intent becomes an action.', detail: 'The action engine calls the application tool. It reports a completion result back to the response layer.', event: 'action_completed', response: 'Illustrative result: success · calculator' },
      { label: 'Respond', state: 'SPEAKING', title: '“Opening Calculator.”', detail: 'The response returns through text-to-speech. The HUD receives the public response through the activity stream.', event: 'jarvis_response', response: 'Opening Calculator.' },
    ],
  },
  {
    id: 'question', title: 'What is Node.js?', route: 'LOCAL MODEL ROUTING',
    steps: [
      { label: 'Wake', state: 'IDLE', title: 'Ready for a question.', detail: 'A wake session brings the assistant online. The voice interface and core runtime remain separate components.', event: 'wake_jarvis', response: 'Online, Srinivas.' },
      { label: 'Listen', state: 'LISTENING', title: '“What is Node.js?”', detail: 'Speech recognition supplies the transcript to the core. The HUD can display the recognized question.', event: 'user_transcript', response: 'What is Node.js?' },
      { label: 'Route', state: 'PROCESSING', title: 'Choose the right brain.', detail: 'This general question follows the Fast Brain route. More complex architecture and debugging requests can select the Deep Brain.', event: 'brain_router', response: 'General question → Fast Brain' },
      { label: 'Reason', state: 'PROCESSING', title: 'Local inference, with context.', detail: 'The brain adapter sends the request and relevant memory context to a local model through Ollama.', event: 'local_inference', response: 'Illustrated local-model request' },
      { label: 'Respond', state: 'SPEAKING', title: 'An answer, spoken back.', detail: 'The final answer returns to the voice interface and HUD. This explanation is a fixed demonstration, not a live model response.', event: 'jarvis_response', response: 'Example: Node.js runs JavaScript outside the browser.' },
    ],
  },
];

function Reactor({ state, playing }) {
  return <div className={`lab-reactor ${playing ? 'is-playing' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 400 400" fill="none">
      <defs><radialGradient id="reactor-field"><stop stopColor="currentColor" stopOpacity=".2"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></radialGradient></defs>
      <circle cx="200" cy="200" r="185" fill="url(#reactor-field)"/>
      <g className="reactor-ticks">{Array.from({ length: 60 }, (_, i) => <path key={i} d={`M200 20v${i % 5 === 0 ? 12 : 5}`} transform={`rotate(${i * 6} 200 200)`}/>)}</g>
      <g className="reactor-rotate"><circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="2" strokeDasharray="240 80 60 110"/><circle cx="200" cy="200" r="139" stroke="currentColor" strokeOpacity=".25"/><circle cx="200" cy="40" r="3" fill="currentColor"/></g>
      <g className="reactor-counter"><circle cx="200" cy="200" r="122" stroke="currentColor" strokeWidth="3" strokeDasharray="135 100 65 90" strokeOpacity=".5"/><ellipse cx="200" cy="200" rx="154" ry="72" stroke="currentColor" strokeOpacity=".2" transform="rotate(-40 200 200)"/></g>
      <circle cx="200" cy="200" r="91" stroke="currentColor" strokeOpacity=".35"/>
      <circle cx="200" cy="200" r="77" stroke="currentColor" strokeOpacity=".16"/>
      <path d="M20 200h95m170 0h95M200 20v95m0 170v95" stroke="currentColor" strokeOpacity=".15"/>
      <circle cx="200" cy="200" r="50" fill="currentColor" fillOpacity=".035" stroke="currentColor" strokeOpacity=".2"/>
    </svg>
    <div className="reactor-center-copy"><Icon name={state === 'EXECUTING' ? 'code' : state === 'LISTENING' ? 'activity' : 'spark'}/><strong>{state}</strong><span>ILLUSTRATED RUNTIME</span></div>
  </div>;
}

function HudViewer({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    ref.current.showModal(); document.body.style.overflow = 'hidden';
    return () => { ref.current.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, [open]);
  return <dialog ref={ref} className="hud-dialog" aria-labelledby="hud-title" onCancel={onClose}><div className="hud-dialog-top"><div><h2 id="hud-title">The actual Jarvis HUD</h2><p>Captured from my React app · core disconnected · no live telemetry</p></div><button className="icon-button" aria-label="Close Jarvis screen" onClick={onClose}><Icon name="close"/></button></div><img src="./jarvis-hud.webp" width="1728" height="1127" alt="Jarvis V2 command center showing its reactor, voice interface, runtime sequence, resource panels, tactical visualization, and recent activity. The core is offline."/><a className="text-link" href="./jarvis-hud.webp" target="_blank" rel="noopener noreferrer">Open full-resolution image <Icon name="northeast"/></a></dialog>;
}

export function JarvisProjectCard({ project }) {
  return <article className="project-card project-jarvis"><div className="jarvis-card-copy"><div className="project-meta"><span>PERSONAL AI / FLAGSHIP EXPERIMENT</span><span className="project-status"><span className="status-dot"/>Local prototype</span></div><h3>JARVIS<span>A little science fiction.<br/>A lot of engineering.</span></h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="jarvis-card-link" href="#jarvis">Explore the Jarvis lab <Icon name="northeast"/></a></div><a className="jarvis-card-screen" href="#jarvis" aria-label="Explore Jarvis and its actual HUD"><div className="screen-chrome"><span><i/> JARVIS / HUD V2</span><span>ACTUAL INTERFACE</span></div><img src="./jarvis-hud.webp" width="1728" height="1127" alt="The actual Jarvis personal AI command center, captured with its core disconnected." loading="lazy"/><span className="screen-caption"><Icon name="expand"/> See the screen. Explore the system.</span></a></article>;
}

export default function JarvisLab() {
  const [scenarioId, setScenarioId] = useState('calculator');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [screenOpen, setScreenOpen] = useState(false);
  const scenario = walkthroughs.find(item => item.id === scenarioId);
  const current = scenario.steps[step];
  useEffect(() => {
    if (!playing) return;
    if (step === scenario.steps.length - 1) { setPlaying(false); return; }
    const timer = setTimeout(() => setStep(value => value + 1), 2400);
    return () => clearTimeout(timer);
  }, [playing, step, scenario.id, scenario.steps.length]);
  const selectScenario = id => { setScenarioId(id); setStep(0); setPlaying(false); };
  const play = () => { if (step === scenario.steps.length - 1) setStep(0); setPlaying(value => !value); };
  return <section className="jarvis-lab section" id="jarvis" aria-labelledby="jarvis-title"><div className="container">
    <div className="lab-section-heading"><div><p className="eyebrow">THE PERSONAL LAB / PROJECT 01</p><h2 id="jarvis-title">“Wake up, <em>Jarvis.</em>”</h2><p>The assistant I wanted to exist. The system I’m learning by building.</p></div><span className="lab-local-badge"><span className="status-dot"/> LOCAL AI PROTOTYPE</span></div>
    <div className="lab-introduction"><p>A Python assistant with wake-word detection, speech-to-text, deterministic tools, local model routing through Ollama, and a React command center. Its HUD follows runtime state, activity, and Mac telemetry over WebSockets.</p><button className="button button-outline js-control" onClick={() => setScreenOpen(true)}>View the actual HUD <Icon name="expand"/></button><noscript><a href="./jarvis-hud.webp">View the actual Jarvis screen</a></noscript></div>
    <div className="lab-console"><div className="lab-console-bar"><span><Icon name="activity"/> COMMAND ANATOMY</span><span>INTERACTIVE WALKTHROUGH</span></div><div className="lab-demo-label"><span className="status-dot"/><p>Illustrated demo of the real architecture. No microphone, model, or device actions run here.</p></div>
      <div className="lab-scenarios js-control" role="group" aria-label="Choose a Jarvis walkthrough">{walkthroughs.map(item => <button key={item.id} aria-pressed={scenarioId === item.id} onClick={() => selectScenario(item.id)}><span>TRY SAYING</span>“{item.title}”<Icon name="northeast"/></button>)}</div>
      <div className="lab-workspace"><div className="lab-core-panel"><div className="lab-route"><span>ROUTE</span><strong>{scenario.route}</strong></div><Reactor state={current.state} playing={playing}/><div className="lab-wave" aria-hidden="true">{Array.from({length:35},(_,i)=><i key={i} style={{height:`${8+Math.abs(Math.sin(i*2.3))*26}px`,animationDelay:`${i*-.13}s`}}/>)}</div></div><div className="lab-trace"><div className="lab-step-meta"><span>STEP {String(step+1).padStart(2,'0')} / 05</span><span>{current.event}</span></div><div className="lab-step-copy" aria-live="polite" aria-atomic="true"><h3>{current.title}</h3><p>{current.detail}</p><div className="lab-event"><span>EXAMPLE EVENT</span><code>{current.response}</code></div></div><div className="lab-step-list js-control" role="group" aria-label="Walkthrough steps">{scenario.steps.map((item,index)=><button key={item.label} aria-pressed={step===index} aria-label={`Step ${index+1}: ${item.label}`} className={index<step?'step-complete':''} onClick={()=>{setPlaying(false);setStep(index);}}><span>{index<step?<Icon name="check"/>:`0${index+1}`}</span>{item.label}</button>)}</div><div className="lab-playback js-control"><button className="button" onClick={play}><Icon name={playing?'pause':'play'}/>{playing?'Pause walkthrough':step===4?'Replay walkthrough':'Play walkthrough'}</button><button className="icon-button" aria-label="Reset walkthrough" onClick={()=>{setPlaying(false);setStep(0);}}><Icon name="reset"/></button><span>Or select any step above</span></div></div></div>
    </div>
    <div className="lab-engineering"><article><span>01 / SEPARATION</span><h3>A core with clear boundaries.</h3><p>Voice, intent detection, actions, model routing, and response formatting each have their own responsibility.</p></article><article><span>02 / OBSERVABILITY</span><h3>Follow each state and action.</h3><p>The HUD follows public activity events and runtime states. Telemetry sampling runs separately from the voice loop.</p></article><article><span>03 / LOCAL-FIRST</span><h3>Built around my own machine.</h3><p>Local model adapters through Ollama, personal memory, and tools for applications, system information, and files.</p></article></div>
    <p className="lab-build-note">An evolving personal project, not a hosted assistant service. The tactical map and radar in the HUD are visual elements.</p>
    <HudViewer open={screenOpen} onClose={()=>setScreenOpen(false)}/>
  </div></section>;
}
