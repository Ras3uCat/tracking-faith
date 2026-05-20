// effects.js — Tracking Faith motion system
// (1) Golden dust particle field reactive to mouse
// (2) Scramble-letter hover on hero title
// (3) Sticky-pin scroll stack for Parallel Stories
// (4) Animated SVG path for the Canon timeline
// (5) Layered parallax / words-behind-image
// (6) Footer bordered-reveal nav return
// All effects respect prefers-reduced-motion and a global window.TF_EFFECTS flag.

(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ENABLED = () => window.TF_EFFECTS !== false && !reduce;

  // ============================================================
  // (1) PARTICLE FIELD — golden dust motes, light mouse parallax
  // ============================================================
  function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let mouseX = 0.5, mouseY = 0.5; // 0..1
    let targetMx = 0.5, targetMy = 0.5;

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function seed() {
      const count = Math.round(Math.min(520, (w * h) / 2400));
      particles = [];
      for (let i = 0; i < count; i++) {
        const big = Math.random() < 0.18; // a few brighter motes
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (big ? 1.4 : 0.5) + Math.random() * (big ? 2.2 : 1.4),
          vx: (Math.random() - 0.5) * 0.14,
          vy: 0.04 + Math.random() * 0.22,
          tw: Math.random() * Math.PI * 2,
          ts: 0.6 + Math.random() * 1.6,
          d: 0.35 + Math.random() * 0.75,
          big,
        });
      }
    }
    function frame(t) {
      if (!ENABLED()) { ctx.clearRect(0, 0, w, h); return; }
      // ease mouse
      mouseX += (targetMx - mouseX) * 0.06;
      mouseY += (targetMy - mouseY) * 0.06;
      const px = (mouseX - 0.5) * 40;
      const py = (mouseY - 0.5) * 20;

      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.tw += 0.02 * p.ts;
        if (p.y > h + 4) { p.y = -4; p.x = Math.random() * w; }
        if (p.x < -4)    p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const dx = p.x + px * p.d;
        const dy = p.y + py * p.d;
        const a = (p.big ? 0.55 : 0.35) + (p.big ? 0.35 : 0.25) * (0.5 + 0.5 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(184,137,61,${a.toFixed(3)})`;
        ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
        ctx.fill();
        // soft halo on big motes
        if (p.big) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(216,165,80,${(a * 0.18).toFixed(3)})`;
          ctx.arc(dx, dy, p.r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(frame);
    }
    function pointermove(e) {
      const r = canvas.getBoundingClientRect();
      targetMx = (e.clientX - r.left) / r.width;
      targetMy = (e.clientY - r.top) / r.height;
    }

    const ro = new ResizeObserver(() => { resize(); seed(); });
    ro.observe(canvas);
    resize(); seed();
    window.addEventListener('pointermove', pointermove, { passive: true });
    requestAnimationFrame(frame);

    // sudden "shake" when mouse moves fast (newmixcoffee-style)
    let lastX = 0, lastY = 0, lastT = 0;
    window.addEventListener('pointermove', (e) => {
      const now = performance.now();
      const dt = Math.max(8, now - lastT);
      const vx = (e.clientX - lastX) / dt;
      const vy = (e.clientY - lastY) / dt;
      const speed = Math.hypot(vx, vy);
      if (speed > 1.6) {
        // jolt particles toward velocity direction
        for (const p of particles) {
          p.vx += vx * 0.10 * (Math.random() - 0.2) * p.d;
          p.vy += vy * 0.10 * (Math.random() - 0.2) * p.d;
        }
      }
      // damping
      for (const p of particles) {
        p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.0006;
      }
      lastX = e.clientX; lastY = e.clientY; lastT = now;
    }, { passive: true });
  }

  // ============================================================
  // (2) SCRAMBLE-TEXT on hover — newmixcoffee-style static
  // ============================================================
  function initScramble() {
    const targets = document.querySelectorAll('[data-scramble]');
    const GLYPHS = 'אבגדהוזחטיכלמנסעפצקרשת*+×÷•◇◆∴∵§¶†‡⁂';
    targets.forEach(el => {
      const original = el.textContent;
      let raf = 0;
      let active = false;
      function scramble() {
        const t = performance.now() / 1000;
        let out = '';
        for (let i = 0; i < original.length; i++) {
          const ch = original[i];
          if (ch === ' ' || ch === '\n') { out += ch; continue; }
          // probability that THIS char is scrambled
          // higher near where the wave is
          const w = Math.sin(t * 4 + i * 0.6) * 0.5 + 0.5;
          if (active && w > 0.55) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            out += ch;
          }
        }
        el.textContent = out;
        raf = requestAnimationFrame(scramble);
      }
      el.addEventListener('mouseenter', () => {
        if (!ENABLED()) return;
        active = true;
        if (!raf) scramble();
      });
      el.addEventListener('mouseleave', () => {
        active = false;
        setTimeout(() => {
          cancelAnimationFrame(raf); raf = 0;
          el.textContent = original;
        }, 250);
      });
    });
  }

  // ============================================================
  // (3) STICKY-PIN parallel stories — cards fly up as you scroll
  // ============================================================
  function initStickyStack() {
    const stage = document.querySelector('[data-sticky-stack]');
    if (!stage) return;
    const cards = stage.querySelectorAll('.stack-card');
    const title = stage.querySelector('.stack-title');
    const subtitle = stage.querySelector('.stack-subtitle');
    const pin = stage.querySelector('.stack-pin');

    function onScroll() {
      if (!ENABLED()) {
        cards.forEach(c => { c.style.transform = ''; c.style.opacity = ''; });
        return;
      }
      const rect = stage.getBoundingClientRect();
      const total = stage.offsetHeight - window.innerHeight;
      const passed = Math.max(0, -rect.top);
      const prog = Math.min(1, passed / Math.max(1, total)); // 0..1

      // Title hides fully in first 22% of progress, then stays out.
      const titleP = Math.min(1, prog / 0.22);
      if (title) {
        title.style.transform = `translateY(${-titleP * 80}px)`;
        title.style.opacity = String(1 - titleP);
      }
      if (subtitle) {
        subtitle.style.transform = `translateY(${-titleP * 60}px)`;
        subtitle.style.opacity = String(1 - titleP);
      }

      // Cards land in a centered, staggered fan so previous cards stay
      // partially visible. We center the fan around the deck's midline
      // so the whole stack sits visually centered.
      const STACK_OFFSET = 56;
      const fanCenter = ((cards.length - 1) * STACK_OFFSET) / 2;
      cards.forEach((c, i) => {
        const start = 0.22 + i * 0.14;
        const end   = start + 0.20;
        const p = Math.max(0, Math.min(1, (prog - start) / (end - start)));
        const eased = 1 - Math.pow(1 - p, 3);
        const startY = window.innerHeight * 0.65;
        const endY = i * STACK_OFFSET - fanCenter;
        const ty = startY + (endY - startY) * eased;
        const rot = (1 - eased) * (i % 2 === 0 ? -2.2 : 2.2);
        const scale = 0.93 + eased * 0.07;
        c.style.transform = `translateY(${ty}px) rotate(${rot}deg) scale(${scale})`;
        c.style.opacity = String(0.2 + eased * 0.8);
        c.style.zIndex = String(10 + i);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  // ============================================================
  // (4) CANON TIMELINE — generate a path that starts after the
  //     heading, threads through each dot, and ends connecting
  //     to the "open the full timeline" button.
  // ============================================================
  function initTimelinePath() {
    const path = document.querySelector('#tl-path');
    if (!path) return;
    const stage = path.closest('[data-tl-stage]');
    const bgPath = stage.querySelector('.tl-path-bg');
    const svg = stage.querySelector('.tl-svg');
    const events = [...stage.querySelectorAll('.tl-event')];
    const head = stage.querySelector('.section-head');
    const endEl = stage.querySelector('[data-tl-end] .btn') || stage.querySelector('[data-tl-end]');

    const VB_W = 240;
    const VB_H = 1600;
    const CX = VB_W / 2;
    const SIDE = 56; // amount the snake bulges left/right between dots
    const PAD = 40;  // px of breathing space at start/end

    let total = 0;
    let thresholds = [];

    function build() {
      const stageH = Math.max(1, stage.scrollHeight);
      const toVB = (px) => (px / stageH) * VB_H;

      // Anchor points (viewBox y)
      const startY = toVB(
        head ? head.offsetTop + head.offsetHeight + PAD : PAD
      );
      const endY = toVB(
        endEl
          ? endEl.getBoundingClientRect().top - stage.getBoundingClientRect().top - 2
          : stageH - PAD
      );
      const dotYs = events.map(ev => {
        const dot = ev.querySelector('.tl-dot');
        if (!dot) return toVB(ev.offsetTop + ev.offsetHeight / 2);
        // pixel y of dot's center within the stage
        const stageBox = stage.getBoundingClientRect();
        const dotBox = dot.getBoundingClientRect();
        return toVB((dotBox.top - stageBox.top) + dotBox.height / 2);
      });

      const ys = [startY, ...dotYs, endY];

      // Build a cubic-bezier snake that exactly hits CX at every anchor.
      // Between consecutive anchors, control points sit on one side
      // (alternating) to produce the bulge.
      let d = `M ${CX} ${ys[0].toFixed(2)}`;
      let cumLengths = [0];
      for (let i = 1; i < ys.length; i++) {
        const y0 = ys[i - 1];
        const y1 = ys[i];
        const span = y1 - y0;
        const side = (i % 2 === 1) ? -SIDE : SIDE;
        const cp1x = CX + side, cp1y = y0 + span * 0.30;
        const cp2x = CX + side, cp2y = y1 - span * 0.30;
        d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, `
           + `${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, `
           + `${CX} ${y1.toFixed(2)}`;
      }

      path.setAttribute('d', d);
      if (bgPath) bgPath.setAttribute('d', d);

      total = path.getTotalLength();
      path.style.strokeDasharray = total;

      // Sample path for length→y lookup so dot ignition syncs with the
      // snake tip even though we curve sideways between anchors.
      const samples = 240;
      const lut = [];
      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const pt = path.getPointAtLength(t * total);
        lut.push({ t, y: pt.y });
      }
      function tForY(targetY) {
        for (let i = 0; i < lut.length - 1; i++) {
          if ((lut[i].y - targetY) * (lut[i + 1].y - targetY) <= 0) {
            const a = lut[i], b = lut[i + 1];
            const span = b.y - a.y || 1;
            const k = (targetY - a.y) / span;
            return a.t + (b.t - a.t) * k;
          }
        }
        return targetY < lut[0].y ? 0 : 1;
      }
      thresholds = dotYs.map(tForY);
      onScroll();
    }

    function onScroll() {
      if (!ENABLED()) {
        path.style.strokeDashoffset = '0';
        events.forEach(ev => {
          ev.querySelector('.tl-dot')?.classList.add('is-on');
          ev.querySelector('.tl-card')?.classList.add('is-on');
        });
        return;
      }
      const rect = stage.getBoundingClientRect();
      // Snake's full draw spans the entire stage scroll-life: starts when
      // the stage top enters the lower viewport, completes when the stage
      // bottom is well above the viewport (the sticky-footer scroll room
      // below provides the runway for this to actually happen).
      const start = window.innerHeight * 0.85;
      const end   = -rect.height + window.innerHeight * 0.25;
      const range = start - end;
      const prog = Math.max(0, Math.min(1, (start - rect.top) / range));
      path.style.strokeDashoffset = String(total * (1 - prog));

      events.forEach((ev, i) => {
        const lit = prog >= thresholds[i];
        ev.querySelector('.tl-dot')?.classList.toggle('is-on', lit);
        ev.querySelector('.tl-card')?.classList.toggle('is-on', lit);
      });
    }

    // Build once everything has settled — fonts can shift dot positions
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(build);
    }
    build();
    const ro = new ResizeObserver(build);
    ro.observe(stage);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', build);
  }

  // ============================================================
  // (5) LAYERED PARALLAX — words scrolling behind manuscript plate
  // ============================================================
  function initParallax() {
    const stages = document.querySelectorAll('[data-parallax]');
    function onScroll() {
      stages.forEach(stage => {
        const rect = stage.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const offset = (rect.top + rect.height / 2 - center) / window.innerHeight;
        stage.querySelectorAll('[data-depth]').forEach(el => {
          const d = parseFloat(el.getAttribute('data-depth')) || 0;
          const y = ENABLED() ? offset * d * -120 : 0;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
        });
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  // ============================================================
  // (6) FOOTER reveal + topbar fade-on-scroll
  //     Footer is fixed at bottom; main is sticky-bottom offset by
  //     the footer's height. Once main pins, the 90vh runway scrolls
  //     behind it, driving the gold border animation only.
  // ============================================================
  function initFooterReveal() {
    const foot = document.querySelector('.foot');
    const topbar = document.getElementById('topbar');
    if (!foot || !topbar) return;

    // Publish the footer height so main's sticky-bottom can use it.
    function publishFootHeight() {
      document.documentElement.style.setProperty('--foot-h', foot.offsetHeight + 'px');
    }
    publishFootHeight();
    const ro = new ResizeObserver(publishFootHeight);
    ro.observe(foot);

    let footerVisible = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { footerVisible = en.isIntersecting; });
      sync();
    }, { threshold: 0.05 });
    io.observe(foot);

    function sync() {
      const scrolled = window.scrollY > 200;
      topbar.classList.toggle('topbar--bordered', footerVisible);
      topbar.classList.toggle('topbar--hidden', scrolled && !footerVisible);

      // Border draw — progress = how far we've scrolled into the runway.
      const runway = document.querySelector('.foot-runway');
      if (!runway) return;
      const rRect = runway.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = Math.max(1, rRect.height);
      const entered = winH - rRect.top;
      const prog = Math.max(0, Math.min(1, entered / total));
      const p = prog * 4;
      const t = Math.max(0, Math.min(1, p));
      const r = Math.max(0, Math.min(1, p - 1));
      const b = Math.max(0, Math.min(1, p - 2));
      const l = Math.max(0, Math.min(1, p - 3));
      foot.style.setProperty('--ft-t', (t * 100).toFixed(2) + '%');
      foot.style.setProperty('--ft-r', (r * 100).toFixed(2) + '%');
      foot.style.setProperty('--ft-b', (b * 100).toFixed(2) + '%');
      foot.style.setProperty('--ft-l', (l * 100).toFixed(2) + '%');

      // Editorial-policy reveal — fades in during the SECOND HALF
      // of the border animation, so it lands as the frame closes.
      const manifesto = document.querySelector('[data-foot-manifesto]');
      if (manifesto) {
        const mProg = Math.max(0, Math.min(1, (prog - 0.5) * 2));
        manifesto.style.opacity = mProg.toFixed(3);
        manifesto.setAttribute('aria-hidden', mProg < 0.5 ? 'true' : 'false');
        manifesto.style.pointerEvents = mProg > 0.5 ? 'auto' : 'none';
      }
    }
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  // ============================================================
  // (7) Reveal-on-scroll for prose blocks
  // ============================================================
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
  }

  // ============================================================
  // (8) Marquee — Obys-style infinite ribbon
  // ============================================================
  function initMarquee() {
    document.querySelectorAll('[data-marquee]').forEach(m => {
      // duplicate content for seamless loop
      const inner = m.querySelector('.marquee__row');
      if (!inner) return;
      inner.innerHTML = inner.innerHTML + inner.innerHTML;
    });
  }

  // ============================================================
  // Init everything; re-init on view changes
  // ============================================================
  function bootAll() {
    initParticles();
    initScramble();
    initStickyStack();
    initTimelinePath();
    initParallax();
    initFooterReveal();
    initReveal();
    initMarquee();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootAll);
  } else { bootAll(); }

  // Expose so tweaks can rebind after view change
  window.TF_Effects = { boot: bootAll };
})();
