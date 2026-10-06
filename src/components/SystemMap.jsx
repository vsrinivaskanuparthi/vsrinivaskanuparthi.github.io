import { useState } from 'react';
import { systemNodes } from '../data';
import Icon from './Icon';

export default function SystemMap() {
  const [activeId, setActiveId] = useState('services');
  const active = systemNodes.find(node => node.id === activeId);
  return <div className="system-console">
    <div className="console-top"><span><span className="status-dot"/> ENGINEERING / CONNECTED</span><span>SK — 01</span></div>
    <div className="system-map" role="group" aria-label="Explore my engineering focus">
      <svg className="system-lines" viewBox="0 0 500 370" preserveAspectRatio="none" aria-hidden="true">
        <defs><radialGradient id="map-glow"><stop stopColor="#c5f277" stopOpacity=".12"/><stop offset="1" stopColor="#c5f277" stopOpacity="0"/></radialGradient></defs>
        <ellipse cx="250" cy="181" rx="183" ry="164" fill="url(#map-glow)"/>
        <ellipse cx="250" cy="181" rx="184" ry="112" className="orbit-ring" transform="rotate(-24 250 181)"/>
        <ellipse cx="250" cy="181" rx="135" ry="150" className="orbit-ring orbit-secondary" transform="rotate(36 250 181)"/>
        <path d="M100 89 250 181 400 89M100 281 250 181 400 281" className="connection-base"/>
        <path d="M100 89 250 181 400 89M100 281 250 181 400 281" className="connection-flow"/>
        <circle cx="250" cy="181" r="73" className="center-ring"/>
        <g className="map-crosses"><path d="M45 175h8m-4-4v8M451 175h8m-4-4v8M246 29h8m-4-4v8M246 338h8m-4-4v8"/></g>
      </svg>
      {systemNodes.map(node => <button key={node.id} className={`system-node ${node.id === 'services' ? 'node-core' : ''} ${activeId === node.id ? 'is-active' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} onClick={() => setActiveId(node.id)} aria-pressed={activeId === node.id} aria-label={`Explore ${node.label}`}>
        <Icon name={node.icon}/><span>{node.label}</span>
      </button>)}
      <span className="map-coordinate coordinate-left" aria-hidden="true">12.97° N</span><span className="map-coordinate coordinate-right" aria-hidden="true">77.59° E</span>
    </div>
    <div className="console-detail" aria-live="polite" aria-atomic="true"><span className="detail-index">0{systemNodes.findIndex(n => n.id === activeId) + 1}</span><div><strong>{active.caption} <span>/ {active.label}</span></strong><p>{active.description}</p></div></div>
    <div className="console-bottom"><span>SELECT A NODE TO EXPLORE</span><span>CONCEPTUAL TECHNOLOGY MAP</span></div>
  </div>;
}
