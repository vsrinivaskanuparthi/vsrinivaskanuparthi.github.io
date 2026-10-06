/* Progressive enhancement: content, links and project details work without JavaScript. */
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
if ('IntersectionObserver' in window) {
  const links = [...nav.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Keep the mobile menu state consistent when changing viewport size.
const mobileViewport = window.matchMedia('(max-width: 760px)');
mobileViewport.addEventListener('change', () => closeMenu());

// Decorative reading progress; requestAnimationFrame batches scroll updates.
let progressPending = false;
function updateReadingProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
  document.documentElement.style.setProperty('--reading-progress', progress);
  progressPending = false;
}
function scheduleProgress() {
  if (!progressPending) {
    progressPending = true;
    requestAnimationFrame(updateReadingProgress);
  }
}
window.addEventListener('scroll', scheduleProgress, { passive: true });
window.addEventListener('resize', scheduleProgress);
window.addEventListener('load', scheduleProgress);
updateReadingProgress();

// Content stays visible if JavaScript or observation is unavailable.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-enter');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.personal-card, .project, .dma-spotlight, .metrics, .architecture, .contact-panel').forEach(element => revealObserver.observe(element));
}
