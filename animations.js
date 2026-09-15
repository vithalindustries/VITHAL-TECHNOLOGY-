/* ============================================================
   VITHAL TECHNOLOGY — Animations Engine
   Intro sequence, particles, scroll reveal, cursor glow.
   Respects prefers-reduced-motion on every effect.
   ============================================================ */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTRO_SEEN_KEY = 'vt_intro_seen';
  const INTRO_VERSION = '1.0';

  /* ---------------------------------------------------------
     1. INTRO SEQUENCE
     Dark screen -> glow -> blurred logo -> sharp -> neon ring
     -> particles -> pulse -> tagline -> zoom into homepage.
     --------------------------------------------------------- */
  const intro = document.getElementById('intro');
  const skipBtn = document.getElementById('intro-skip');

  function finishIntro() {
    if (!intro || intro.classList.contains('is-done')) return;
    intro.classList.add('is-leaving');
    document.body.classList.add('is-loaded');
    try { localStorage.setItem(INTRO_SEEN_KEY, INTRO_VERSION); } catch (e) {}
    const onEnd = (e) => {
      if (e.propertyName !== 'opacity' && e.type !== 'animationend') return;
      intro.classList.add('is-done');
      intro.remove();
      window.dispatchEvent(new CustomEvent('vt:intro-complete'));
    };
    intro.addEventListener('animationend', onEnd, { once: true });
    setTimeout(() => {           // safety fallback
      if (!intro.classList.contains('is-done')) { intro.classList.add('is-done'); intro.remove(); }
    }, 1600);
  }

  function runIntro() {
    if (!intro) { document.body.classList.add('is-loaded'); return; }

    let seen = false;
    try { seen = localStorage.getItem(INTRO_SEEN_KEY) === INTRO_VERSION; } catch (e) {}

    // Reduced motion or returning visitor -> very short intro
    const baseDelay = prefersReducedMotion ? 250 : (seen ? 900 : 2600);

    intro.classList.add('is-playing');
    document.body.classList.add('is-locked'); // prevent scroll during intro

    setTimeout(() => {
      document.body.classList.remove('is-locked');
      finishIntro();
    }, baseDelay);

    if (skipBtn) skipBtn.addEventListener('click', finishIntro);
    intro.addEventListener('click', (e) => {
      if (e.target === intro) finishIntro();   // click empty space to skip
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntro);
  } else {
    runIntro();
  }

  /* ---------------------------------------------------------
     2. PARTICLE FIELD (intro + hero canvas)
     Lightweight 2D canvas — paused when off-screen and when
     reduced motion is requested.
     --------------------------------------------------------- */
  function particleField(canvas, opts) {
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    const colors = opts.colors || ['#00c2ff', '#8b5cf6', '#e94cff', '#00f0ff'];
    let particles = [], raf = null, running = false, w = 0, h = 0;
    const density = opts.density || 9000;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      const count = Math.min(90, Math.floor((w * h) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        c: colors[Math.floor(Math.random() * colors.length)],
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2
      }));
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.tw += 0.03;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    function start() { if (!running && w > 0) { running = true; tick(); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? start() : stop();
    }, { threshold: 0.05 });
    io.observe(canvas);

    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });
  }

  document.querySelectorAll('[data-particles]').forEach((c) => {
    particleField(c, { density: 9000, colors: ['#00c2ff', '#8b5cf6', '#e94cff', '#00f0ff'] });
  });

  /* ---------------------------------------------------------
     3. SCROLL REVEAL — IntersectionObserver driven.
     data-reveal="up|left|right|scale" + optional data-delay.
     --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('is-visible'), delay);
          revealIO.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealIO.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------
     4. NAVBAR STATE — deeper opacity + shadow while scrolling
     --------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     5. SMOOTH ANCHOR SCROLLING (native + offset for sticky bar)
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------------------------------------------------------
     6. FUTURISTIC CURSOR GLOW — desktop, pointer:fine only.
     Purely decorative: pointer-events none, never blocks clicks.
     --------------------------------------------------------- */
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (finePointer && !prefersReducedMotion) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    let gx = -100, gy = -100, cx = -100, cy = -100, rafId = null;
    const loop = () => {
      cx += (gx - cx) * 0.16;
      cy += (gy - cy) * 0.16;
      glow.style.transform = `translate(${cx - 180}px, ${cy - 180}px)`;
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; }, { passive: true });
    loop();
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
  }

  /* ---------------------------------------------------------
     7. STATIC COUNTERS — only real, verifiable values from
     the site itself (service lines, hardware products, etc.)
     --------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        counterIO.unobserve(el);
        const target = parseInt(el.dataset.count, 10);
        const dur = 1200;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => counterIO.observe(el));
  } else {
    counters.forEach((el) => { el.textContent = el.dataset.count; });
  }

  /* ---------------------------------------------------------
     8. TECH BADGE FLOAT — staggered CSS animation delays
     --------------------------------------------------------- */
  document.querySelectorAll('.tech-badge').forEach((b, i) => {
    b.style.animationDelay = `${(i % 9) * 0.35}s`;
  });
})();
