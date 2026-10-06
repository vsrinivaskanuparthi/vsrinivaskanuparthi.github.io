export default function ProjectArt({ kind }) {
  const ai = kind === 'ai';
  return <div className={`project-art art-${kind}`} aria-hidden="true">
    <div className="art-label"><span>{ai ? 'THE CURIOSITY PROJECT' : 'FOLLOW THE DATA'}</span><span>{ai ? 'AI / 01' : 'DE / 02'}</span></div>
    {ai ? <svg viewBox="0 0 600 280" className="project-svg" fill="none">
      <defs><radialGradient id="ai-glow"><stop stopColor="#ad94f4" stopOpacity=".24"/><stop offset="1" stopColor="#ad94f4" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="300" cy="140" rx="230" ry="138" fill="url(#ai-glow)"/>
      {[72,103,134].map(r => <circle key={r} cx="300" cy="140" r={r} stroke="#baa2f0" strokeOpacity=".16" strokeDasharray={r === 103 ? '3 9' : undefined}/>)}
      <ellipse cx="300" cy="140" rx="225" ry="61" stroke="#baa2f0" strokeOpacity=".4" transform="rotate(-22 300 140)"/>
      <path d="M115 65 300 140 476 72M152 234 300 140 482 216M300 140 337 20" stroke="#baa2f0" strokeOpacity=".3"/>
      <g fill="#c8b3fa"><circle cx="115" cy="65" r="7"/><circle cx="476" cy="72" r="5"/><circle cx="152" cy="234" r="5"/><circle cx="482" cy="216" r="8"/><circle cx="337" cy="20" r="4"/></g>
      <rect x="255" y="95" width="90" height="90" rx="26" fill="#2a2442" stroke="#bba5ec"/>
      <path d="m300 111 7.5 21.5L329 140l-21.5 7.5L300 169l-7.5-21.5L271 140l21.5-7.5Z" fill="#d5c5f7"/>
      <circle className="ai-signal" cx="115" cy="65" r="15" stroke="#bba5ec"/>
      <text x="89" y="43">IDEAS</text><text x="459" y="52">LEARN</text><text x="127" y="259">EXPLORE</text><text x="456" y="245">BUILD</text>
    </svg> : <svg viewBox="0 0 600 280" className="project-svg" fill="none">
      <path d="M110 74h60q22 0 22 22v22q0 22 22 22h42M110 206h60q22 0 22-22v-22q0-22 22-22h42M344 140h42q22 0 22-22V96q0-22 22-22h60M344 140h42q22 0 22 22v22q0 22 22 22h60" stroke="#72bdcf" strokeOpacity=".4"/>
      <path className="data-signal" d="M100 140h400" stroke="#a0ddeb" strokeDasharray="4 13"/>
      <g fill="#153542" stroke="#528b99">{[53,119,185].map(y => <g key={y}><rect x="67" y={y} width="58" height="42" rx="8"/><rect x="475" y={y} width="58" height="42" rx="8"/></g>)}</g>
      <g stroke="#96d4dc"><path d="M83 68h26M83 78h17M83 134h26M83 144h17M83 200h26M83 210h17"/><path d="M491 79v-8m9 8V63m9 16V68M491 145v-8m9 8v-16m9 16v-11M491 211v-8m9 8v-16m9 16v-11"/></g>
      <rect x="255" y="95" width="90" height="90" rx="24" fill="#153b47" stroke="#90d5dd"/>
      <path d="m300 115 27 13-27 13-27-13 27-13Zm-27 26 27 13 27-13m-54 13 27 13 27-13" stroke="#ade2e6" strokeWidth="2"/>
      <text x="72" y="34">SOURCE</text><text x="266" y="213">TRANSFORM</text><text x="478" y="34">INSIGHT</text>
    </svg>}
    <div className="art-wordmark">{ai ? <>ai<span>academy</span><sup>✦</sup></> : <>data<span>in motion.</span><sup>↗</sup></>}</div>
  </div>;
}
