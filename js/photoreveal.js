/* ===== Liquid reveal untuk elemen [data-liquid] =====
   Foto dasar tetap tampil; saat kursor bergerak, versi "berwarna" dilukis di bawah kursor
   lewat kuas lembut di <canvas>, lalu memudar sendiri.
   - Tanpa atribut data-reveal-src : versi berwarna dibuat otomatis dari foto yang sama (warna: data-tint="#hex,#hex,#hex").
   - Dengan data-reveal-src="..."  : memakai file foto kedua milikmu (harus ukuran & komposisi sama).
   - data-brush="95"               : radius kuas dalam px. */
document.querySelectorAll('[data-liquid]').forEach(box => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const base = box.querySelector('img');
  const revealSrc = box.dataset.revealSrc || '';
  const BRUSH = +box.dataset.brush || 95, DECAY = 0.016, IDLE_MAX = 120;

  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  box.appendChild(cv);
  const ctx = cv.getContext('2d');
  const brush = document.createElement('canvas'), bctx = brush.getContext('2d');

  let cover = null, W = 0, H = 0, dpr = 1, radius = BRUSH;
  let points = [], last = null, idle = 0, running = false;
  let source = base;                                       // gambar yang dijadikan sumber warna

  function whenLoaded(im, cb) {
    if (im.complete && im.naturalWidth) cb(); else im.addEventListener('load', cb, { once: true });
  }
  if (revealSrc) { source = new Image(); source.src = revealSrc; }
  whenLoaded(source, measure);
  if (revealSrc) whenLoaded(base, measure);

  function objectPos() {                                   // baca object-position dari CSS (mis. "52% 50%")
    const p = getComputedStyle(base).objectPosition.split(' ').map(v => v.endsWith('%') ? parseFloat(v) / 100 : 0.5);
    return [p[0] ?? 0.5, p[1] ?? 0.5];
  }

  function measure() {
    const r = box.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
    if (!W || !H) return;
    cv.width = W; cv.height = H;
    radius = BRUSH * dpr;
    brush.width = brush.height = Math.ceil(radius * 2);
    if (!source.naturalWidth) return;

    // gambar sumber digambar ulang dengan "cover" agar sejajar persis dengan foto dasar
    cover = document.createElement('canvas'); cover.width = W; cover.height = H;
    const c = cover.getContext('2d');
    const [px, py] = objectPos();
    const s = Math.max(W / source.naturalWidth, H / source.naturalHeight);
    const w = source.naturalWidth * s, h = source.naturalHeight * s;
    c.drawImage(source, (W - w) * px, (H - h) * py, w, h);

    if (!revealSrc) {                                      // mode otomatis: warnai foto hitam-putih
      const g = c.createLinearGradient(0, 0, W, H);
      const tint = (box.dataset.tint || '#F5A623,#FF7A59,#4C8DFF').split(',').map(t => t.trim());
      tint.forEach((col, i) => g.addColorStop(tint.length > 1 ? i / (tint.length - 1) : 0, col));
      c.globalCompositeOperation = 'color';
      c.globalAlpha = .9; c.fillStyle = g; c.fillRect(0, 0, W, H);
      c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
    }
  }
  new ResizeObserver(measure).observe(box);

  function stamp(x, y) {
    const d = brush.width, c = d / 2;
    bctx.globalCompositeOperation = 'source-over';
    bctx.clearRect(0, 0, d, d);
    const g = bctx.createRadialGradient(c, c, 0, c, c, c);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(.55, 'rgba(255,255,255,.82)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    bctx.fillStyle = g; bctx.fillRect(0, 0, d, d);
    bctx.globalCompositeOperation = 'source-in';           // hanya piksel berwarna di bawah kuas lembut
    bctx.drawImage(cover, Math.round(x - c), Math.round(y - c), d, d, 0, 0, d, d);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(brush, Math.round(x - c), Math.round(y - c));
  }

  function tick() {
    const drawing = points.length > 0;
    if (drawing) idle = 0; else idle++;
    if (idle > IDLE_MAX) { ctx.clearRect(0, 0, W, H); running = false; return; }
    const fade = drawing ? DECAY : Math.min(DECAY + idle * 0.004, 0.5);
    ctx.globalCompositeOperation = 'destination-out';      // jejak lama memudar
    ctx.fillStyle = `rgba(0,0,0,${fade})`;
    ctx.fillRect(0, 0, W, H);
    if (drawing && cover) { points.forEach(p => stamp(p.x, p.y)); points = []; }
    requestAnimationFrame(tick);
  }

  addEventListener('pointermove', e => {
    if (!W) return;
    const r = box.getBoundingClientRect();
    const x = (e.clientX - r.left) * dpr, y = (e.clientY - r.top) * dpr;
    if (x < -radius || y < -radius || x > W + radius || y > H + radius) { last = null; return; }
    if (last) {
      const dist = Math.hypot(x - last.x, y - last.y);
      const step = Math.max(radius * 0.3, 1);
      const n = Math.min(Math.ceil(dist / step), 60);
      for (let i = 1; i <= n; i++) points.push({ x: last.x + (x - last.x) * i / n, y: last.y + (y - last.y) * i / n });
    } else points.push({ x, y });
    last = { x, y };
    idle = 0;
    if (!running) { running = true; requestAnimationFrame(tick); }
  }, { passive: true });
});