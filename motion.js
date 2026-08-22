// Shared scroll/motion helpers for The Growth Files pages.
export function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach((el, i) => {
    // Elements already in view on load appear instantly, no slide/fade — avoids a harsh jump right on landing.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }
    el.style.transition = 'opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)';
    el.style.transitionDelay = ((i % 6) * 0.07) + 's';
    obs.observe(el);
  });
}

export function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const text = el.textContent;
      const m = text.match(/[\d.]+/);
      obs.unobserve(el);
      if (!m) return;
      const target = parseFloat(m[0]);
      const decimals = (m[0].split('.')[1] || '').length;
      const prefix = text.slice(0, m.index);
      const suffix = text.slice(m.index + m[0].length);
      const dur = 2000;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  els.forEach((el) => obs.observe(el));
}

export function initMarqueeHover() {
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    const wrap = el.parentElement;
    if (!wrap) return;
    wrap.addEventListener('mouseenter', () => { el.style.animationPlayState = 'paused'; });
    wrap.addEventListener('mouseleave', () => { el.style.animationPlayState = 'running'; });
  });
}

export function initProgressBars() {
  const els = document.querySelectorAll('[data-progress]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const pct = e.target.getAttribute('data-progress');
        e.target.style.transition = 'width 1.1s cubic-bezier(.16,1,.3,1)';
        e.target.style.width = pct + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  els.forEach((el) => obs.observe(el));
}

export function initAll() {
  initReveal();
  initCounters();
  initMarqueeHover();
  initProgressBars();
}

export function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:#22c55e;opacity:0.45;z-index:9999;width:0%;transition:width 0.1s linear;';
  document.body.appendChild(bar);
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  };
  document.addEventListener('scroll', update, { passive: true });
  update();
}
