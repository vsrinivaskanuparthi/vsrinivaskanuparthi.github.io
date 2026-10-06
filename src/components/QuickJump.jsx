import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { profile } from '../data';
const destinations = [
  { title: 'Jarvis lab', detail: 'Personal AI · screen & command walkthrough', href: '#jarvis', icon: 'activity', keywords: 'assistant voice local python ollama demo' },
  { title: 'Personal projects', detail: 'Jarvis, AI Academy & Data Engineering', href: '#projects', icon: 'spark', keywords: 'learning ai data platforms' },
  { title: 'Professional impact', detail: 'DMA, cloud applications & performance', href: '#work', icon: 'layers', keywords: 'case study airbus oracle migration' },
  { title: 'About & expertise', detail: 'The person behind the systems', href: '#about', icon: 'code', keywords: 'skills aws backend node typescript' },
  { title: 'Career journey', detail: 'Engineering since 2017', href: '#experience', icon: 'activity', keywords: 'experience companies education' },
  { title: 'Let’s connect', detail: profile.email, href: '#contact', icon: 'mail', keywords: 'contact email linkedin hire' },
  { title: 'Download résumé', detail: 'PDF · Srinivas Kanuparthi', href: profile.resume, icon: 'download', keywords: 'cv resume' },
];
export default function QuickJump({ open, onClose }) {
  const ref = useRef(null);
  const input = useRef(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const results = destinations.filter(item => `${item.title} ${item.detail} ${item.keywords}`.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    ref.current.showModal();
    setQuery(''); setSelected(0);
    input.current.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { ref.current.close(); document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [open]);
  const navigate = (event, item) => {
    onClose();
    if (item.href.startsWith('#')) {
      event?.preventDefault();
      requestAnimationFrame(() => {
        const target = document.querySelector(item.href);
        if (!target) return;
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        history.replaceState(null, '', item.href);
      });
    }
  };
  return <dialog ref={ref} className="jump-dialog" aria-labelledby="jump-title" onCancel={onClose}>
    <div className="jump-top"><h2 id="jump-title">Where would you like to go?</h2><button className="icon-button" aria-label="Close quick navigation" onClick={onClose}><Icon name="close"/></button></div>
    <div className="jump-input"><Icon name="search"/><input ref={input} aria-label="Search portfolio" placeholder="Try Jarvis, AWS, résumé…" value={query} onChange={event => { setQuery(event.target.value); setSelected(0); }} onKeyDown={event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); if (results.length) setSelected(current => (current + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length); } if (event.key === 'Enter' && results[selected]) { event.preventDefault(); document.getElementById(`jump-result-${selected}`)?.click(); } }} aria-describedby="jump-help"/></div>
    <p className="sr-only" role="status">{results.length} destinations. {results[selected]?.title || 'No matches.'}</p>
    <div className="jump-results">{results.map((item, index) => <a id={`jump-result-${index}`} key={item.title} className={index === selected ? 'jump-selected' : ''} href={item.href} download={item.href.endsWith('.pdf') ? 'Srinivas-Kanuparthi-Resume.pdf' : undefined} onClick={event => navigate(event, item)} onFocus={() => setSelected(index)}><Icon name={item.icon}/><span><strong>{item.title}</strong><small>{item.detail}</small></span><Icon name="northeast"/></a>)}{!results.length && <p className="jump-empty">No matches. Try “projects”, “Jarvis”, or “contact”.</p>}</div>
    <div className="jump-footer" id="jump-help"><span>↑ ↓ to choose · Enter to open</span><span>Esc to close</span></div>
  </dialog>;
}
