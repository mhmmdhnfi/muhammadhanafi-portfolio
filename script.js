/* ─── OSCILLOSCOPE CANVAS ─────────────────────────────────
   Ambient animated signal line in hero — signature element
   Represents control signal / waveform from an I&C panel
──────────────────────────────────────────────────────────── */
(function initOscilloscope() {
  const canvas = document.getElementById('oscilloscope');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, t = 0;
  const signals = [
    { amp: 0.12, freq: 0.8,  phase: 0,    speed: 0.012, y: 0.3 },
    { amp: 0.07, freq: 1.6,  phase: 1.2,  speed: 0.018, y: 0.5 },
    { amp: 0.05, freq: 3.2,  phase: 2.4,  speed: 0.025, y: 0.68 },
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function drawSignal(sig) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(77, 159, 255, 0.5)';
    ctx.lineWidth = 1.2;

    for (let x = 0; x <= W; x += 2) {
      const progress = x / W;
      const y = sig.y * H
        + Math.sin(progress * sig.freq * Math.PI * 2 + sig.phase + t * sig.speed * 60) * sig.amp * H
        + Math.sin(progress * sig.freq * Math.PI * 4 + t * sig.speed * 40) * sig.amp * 0.4 * H;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(77, 159, 255, 0.04)';
    ctx.lineWidth = 1;
    const cols = 12, rows = 8;
    for (let i = 0; i <= cols; i++) {
      const x = (i / cols) * W;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let i = 0; i <= rows; i++) {
      const y = (i / rows) * H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function drawScanLine() {
    const x = ((t * 0.3) % 1) * W;
    const grad = ctx.createLinearGradient(x - 60, 0, x, 0);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, 'rgba(77, 159, 255, 0.06)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - 60, 0, 60, H);
  }

  function frame(timestamp) {
    t = timestamp / 1000;
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    signals.forEach(drawSignal);
    drawScanLine();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();


/* ─── MOBILE SIDEBAR TOGGLE ───────────────────────────────── */
const burger  = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');

burger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  burger.classList.toggle('open');
});

// Close sidebar when nav link tapped on mobile
sidebar.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    burger.classList.remove('open');
  });
});


/* ─── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = window.innerWidth <= 768 ? 64 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ─── ACTIVE NAV HIGHLIGHT (scroll spy) ──────────────────── */
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('section[id]');

const scrollSpy = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === id);
      });
    });
  },
  { threshold: 0.35, rootMargin: '0px 0px -30% 0px' }
);

sections.forEach(s => scrollSpy.observe(s));


/* ─── REVEAL ON SCROLL ────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;

      // Stagger siblings in same parent
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll('.reveal')
      );
      const idx = siblings.indexOf(entry.target);
      const delay = idx * 70;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── SKILL BAR ANIMATION ─────────────────────────────────── */
const skillBarObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.dataset.w;
        // Small delay so CSS transition fires after render
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = w + '%'; }, 120);
        });
      });
      skillBarObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.skill-cat').forEach(cat => skillBarObserver.observe(cat));


/* ─── COUNTER ANIMATION ───────────────────────────────────── */
function animateCounter(el, target, duration = 1400) {
  const isFloat = target % 1 !== 0;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = eased * target;
    el.textContent = isFloat ? val.toFixed(2) : Math.round(val);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.metric-val').forEach(el => {
        const raw = el.textContent.replace('+', '');
        const target = parseFloat(raw);
        const hasPlus = el.textContent.includes('+');
        animateCounter(el, target);
        if (hasPlus) {
          setTimeout(() => { el.textContent = el.textContent + '+'; }, 1500);
        }
      });
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

const metricsEl = document.querySelector('.hero-metrics');
if (metricsEl) counterObserver.observe(metricsEl);
