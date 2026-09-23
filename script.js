// Menú móvil
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle) toggle.addEventListener('click', () => links.classList.toggle('open'));

// Animaciones de aparición al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contadores animados
const contadores = document.querySelectorAll('[data-count]');
const obsCount = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, fin = +el.dataset.count, dur = 1400, t0 = performance.now();
    const paso = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
    obsCount.unobserve(el);
  });
}, { threshold: 0.5 });
contadores.forEach(el => obsCount.observe(el));
