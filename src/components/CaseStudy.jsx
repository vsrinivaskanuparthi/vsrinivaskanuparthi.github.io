import { useEffect, useRef } from 'react';
import Icon from './Icon';

export default function CaseStudy({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);
  return <dialog ref={ref} className="case-dialog" aria-labelledby="case-title" onCancel={onClose} onClick={event => { if (event.target === ref.current) { const r = ref.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); } }}>
    <div className="dialog-top"><span className="eyebrow">ENGINEERING CASE STUDY / AIRBUS</span><button className="icon-button" onClick={onClose} aria-label="Close case study"><Icon name="close"/></button></div>
    <h2 id="case-title">Database Migration<br/><em>Accelerator.</em></h2>
    <p className="dialog-lead">Taking an early R&D prototype toward a reliable enterprise migration platform.</p>
    <div className="case-flow"><span>Oracle</span><Icon/><span>Node.js + ora2pg</span><Icon/><span>PostgreSQL</span></div>
    <div className="case-sections">
      <section><span>01 / THE CHALLENGE</span><h3>Make migration dependable.</h3><p>The early application suffered from frequent migration failures. My work focused on reliability, execution performance, and the requirements for broader enterprise adoption.</p></section>
      <section><span>02 / MY OWNERSHIP</span><h3>Connect architecture to execution.</h3><ul><li>Redesigned migration execution for parallel processing and reduced overall execution time.</li><li>Improved backend and frontend responsiveness, migration reliability, and live status visibility.</li><li>Implemented corporate SSO and drove data-compliance and industrialization activities with data officers and cross-functional stakeholders.</li></ul></section>
      <section><span>03 / THE DIRECTION</span><h3>A stronger foundation for adoption.</h3><p>Evolved the prototype into a more stable, performant application progressing toward industrialization. The focus remains reliability, performance, and enterprise readiness.</p></section>
    </div>
    <div className="tags"><span>Node.js</span><span>ora2pg</span><span>Oracle</span><span>PostgreSQL</span><span>React</span><span>Corporate SSO</span></div>
    <p className="case-disclaimer">A summary of my professional contribution. Internal source code and company materials are not shared.</p>
  </dialog>;
}
