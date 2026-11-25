// Infinite canvas for /gallery: staggered columns of image cards that wrap in both directions,
// panned by dragging (with inertia), the wheel / trackpad, or the arrow keys.
//
// The page renders each image once as a real <figure> (crawlable, and the no-JS fallback grid);
// this script clones them into as many cards as the viewport needs and positions every card
// with a transform. Each column is a shuffled run of whole passes over the images, so every column
// has the same height (the vertical period) and the row of columns repeats every columns × stride.

import { initLightbox } from './lightbox';

interface Card {
  el: HTMLElement;
  col: number;
  y: number;
  w: number;
  h: number;
  shown: boolean;
}

interface Column {
  x: number;
  offset: number;
  period: number;
}

/** Card width and gap per breakpoint (desktop ≥ 1000px, tablet ≥ 810px, mobile). */
function metrics() {
  const w = window.innerWidth;
  if (w >= 1000) return { width: 400, gap: 56 };
  if (w >= 810) return { width: 320, gap: 44 };
  return { width: 240, gap: 28 };
}

const DOT_SPACING = 40;
const DRAG_THRESHOLD = 5;
const FRICTION = 0.94; // velocity kept per 60fps frame while gliding
const KEY_VELOCITY = 1.4; // px/ms glide for an arrow-key press

const mod = (n: number, m: number) => ((n % m) + m) % m;
/** Small deterministic hash so the layout is the same on every load. */
const hash = (a: number, b: number) => {
  let h = Math.imul(a + 1, 374761393) ^ Math.imul(b + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

export function initCanvas(root: HTMLElement) {
  const layer = root.querySelector<HTMLElement>('[data-canvas-cards]');
  if (!layer) return;
  const originals = [...layer.querySelectorAll<HTMLElement>('[data-canvas-card]')];
  const count = originals.length;
  if (!count) return;
  const ratios = originals.map((el) => Number(el.dataset.ratio) || 4 / 3);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let cards: Card[] = [];
  let columns: Column[] = [];
  let stride = 0;
  let width = 0;
  let margin = 0;
  let viewW = 0;
  let viewH = 0;
  let panX = 0;
  let panY = 0;
  let firstRender = true;

  // ---------- Layout ----------
  const build = () => {
    const { width: cardW, gap } = metrics();
    viewW = root.clientWidth;
    viewH = root.clientHeight;
    stride = cardW + gap;
    const heights = ratios.map((r) => Math.round(cardW / r));
    const maxH = Math.max(...heights);
    margin = maxH + gap;
    // Enough columns that one wrapping off one edge is never visible at the other.
    const colCount = Math.ceil((viewW + stride) / stride) + 1;
    width = colCount * stride;

    layer.querySelectorAll('[data-canvas-clone]').forEach((el) => el.remove());
    const used = new Set<number>();
    cards = [];
    columns = [];

    // Every column is whole passes over all the images, so all columns share one period and keep
    // the same vertical alignment to each other however far you pan.
    const passHeight = heights.reduce((sum, h) => sum + h + gap, 0);
    const passes = Math.max(1, Math.ceil((viewH + margin * 2) / passHeight));
    const period = passes * passHeight;
    type Item = { index: number; y: number; h: number };
    const placed: Item[][] = [];

    const lay = (order: number[]) => {
      let y = 0;
      return order.map((index) => {
        const item = { index, y, h: heights[index] };
        y += heights[index] + gap;
        return item;
      });
    };
    // How many times a column's images sit beside the same image in a neighbouring column
    // (or repeat back to back down the column, which costs more).
    const clashes = (items: Item[], offset: number, neighbours: { items: Item[]; offset: number }[]) => {
      let score = 0;
      items.forEach((item, j) => {
        const next = items[(j + 1) % items.length];
        if (next.index === item.index) score += 10;
      });
      for (const n of neighbours) {
        for (const a of items) {
          const ac = a.y + offset + a.h / 2;
          for (const b of n.items) {
            if (a.index !== b.index) continue;
            const d = Math.abs(mod(ac - (b.y + n.offset + b.h / 2) + period / 2, period) - period / 2);
            if (d < (a.h + b.h) / 2 + gap + cardW / 2) score += 1;
          }
        }
      }
      return score;
    };

    for (let c = 0; c < colCount; c++) {
      const offset = Math.round(hash(c, 7) * period);
      const neighbours = [];
      if (c > 0) neighbours.push({ items: placed[c - 1], offset: columns[c - 1].offset });
      if (c === colCount - 1 && c > 1) neighbours.push({ items: placed[0], offset: columns[0].offset });
      // Seeded shuffles: keep the order with the fewest clashes (usually none within a few tries).
      let best: Item[] = [];
      let bestScore = Infinity;
      for (let attempt = 0; attempt < 400 && bestScore > 0; attempt++) {
        const order: number[] = [];
        for (let p = 0; p < passes; p++) {
          const pass = Array.from({ length: count }, (_, i) => i);
          for (let i = pass.length - 1; i > 0; i--) {
            const k = Math.floor(hash(c * 1000 + attempt, p * 100 + i) * (i + 1));
            [pass[i], pass[k]] = [pass[k], pass[i]];
          }
          order.push(...pass);
        }
        const items = lay(order);
        const score = clashes(items, offset, neighbours);
        if (score < bestScore) {
          best = items;
          bestScore = score;
        }
      }
      placed.push(best);
      columns.push({ x: c * stride, offset, period });

      best.forEach((item) => {
        let el: HTMLElement;
        if (!used.has(item.index)) {
          used.add(item.index);
          el = originals[item.index];
        } else {
          el = originals[item.index].cloneNode(true) as HTMLElement;
          el.dataset.canvasClone = '';
          el.setAttribute('aria-hidden', 'true');
          // Clones copy the "listener bound" flag, so clear it for initLightbox to bind them
          el.querySelector('[data-lightbox]')?.removeAttribute('data-lightbox-ready');
          layer.append(el);
        }
        el.classList.remove('is-shown');
        el.style.width = `${cardW}px`;
        el.style.height = `${item.h}px`;
        cards.push({ el, col: c, y: item.y, w: cardW, h: item.h, shown: false });
      });
    }
    // Originals not placed (only possible with a single column) stay hidden.
    originals.forEach((el, i) => (el.hidden = !used.has(i)));
    root.classList.add('is-ready');
    firstRender = true;
    initLightbox();
  };

  // ---------- Render ----------
  const render = () => {
    const centreX = viewW / 2;
    const centreY = viewH / 2;
    for (const card of cards) {
      const col = columns[card.col];
      const x = mod(col.x + panX, width) - stride;
      const y = mod(card.y + col.offset + panY, col.period) - margin;
      card.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!card.shown && x + card.w > 0 && x < viewW && y + card.h > 0 && y < viewH) {
        card.shown = true;
        // On load, cards pop in outward from the centre; later ones appear as they're panned into view.
        const delay = firstRender ? Math.hypot(x + card.w / 2 - centreX, y + card.h / 2 - centreY) * 0.35 : 0;
        card.el.style.setProperty('--delay', `${Math.round(delay)}ms`);
        card.el.classList.add('is-shown');
      }
    }
    root.style.backgroundPosition = `${mod(panX, DOT_SPACING)}px ${mod(panY, DOT_SPACING)}px`;
    firstRender = false;
  };

  let frame = 0;
  const requestRender = () => {
    if (!frame) frame = requestAnimationFrame(() => ((frame = 0), render()));
  };

  // ---------- Glide (inertia) ----------
  let vx = 0;
  let vy = 0;
  let glideFrame = 0;
  let glideLast = 0;
  const stopGlide = () => {
    cancelAnimationFrame(glideFrame);
    glideFrame = 0;
    vx = vy = 0;
  };
  const glide = (now: number) => {
    const dt = Math.min(now - glideLast, 50);
    glideLast = now;
    panX += vx * dt;
    panY += vy * dt;
    const decay = Math.pow(FRICTION, dt / 16.67);
    vx *= decay;
    vy *= decay;
    render();
    glideFrame = Math.abs(vx) + Math.abs(vy) > 0.01 ? requestAnimationFrame(glide) : 0;
  };
  const startGlide = (x: number, y: number) => {
    stopGlide();
    if (reducedMotion.matches) return;
    vx = x;
    vy = y;
    glideLast = performance.now();
    glideFrame = requestAnimationFrame(glide);
  };

  // ---------- Drag ----------
  let dragging = false;
  let pointerId = -1;
  let lastX = 0;
  let lastY = 0;
  let lastT = 0;
  let moved = 0;
  let velX = 0;
  let velY = 0;

  root.addEventListener('pointerdown', (event) => {
    if (dragging || (event.pointerType === 'mouse' && event.button !== 0)) return;
    stopGlide();
    dragging = true;
    pointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    lastT = event.timeStamp;
    moved = 0;
    velX = velY = 0;
  });
  window.addEventListener('pointermove', (event) => {
    if (!dragging || event.pointerId !== pointerId) return;
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const dt = Math.max(event.timeStamp - lastT, 1);
    lastX = event.clientX;
    lastY = event.clientY;
    lastT = event.timeStamp;
    panX += dx;
    panY += dy;
    // Smoothed velocity for the release glide
    velX = velX * 0.2 + (dx / dt) * 0.8;
    velY = velY * 0.2 + (dy / dt) * 0.8;
    moved += Math.abs(dx) + Math.abs(dy);
    if (moved > DRAG_THRESHOLD) root.classList.add('is-dragging');
    requestRender();
  });
  const endDrag = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return;
    dragging = false;
    root.classList.remove('is-dragging');
    // No glide if the pointer rested before letting go
    if (event.timeStamp - lastT < 80) startGlide(velX, velY);
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  // A drag that ends over a card must not open it in the lightbox.
  root.addEventListener(
    'click',
    (event) => {
      if (moved > DRAG_THRESHOLD) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    true,
  );
  root.addEventListener('dragstart', (event) => event.preventDefault());

  // ---------- Wheel / trackpad ----------
  root.addEventListener(
    'wheel',
    (event) => {
      if (event.ctrlKey) return; // pinch-zoom: leave to the browser
      event.preventDefault();
      stopGlide();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewH : 1;
      // A plain mouse wheel only reports deltaY; shift turns it sideways.
      const dx = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      const dy = event.shiftKey && !event.deltaX ? 0 : event.deltaY;
      panX -= dx * unit;
      panY -= dy * unit;
      requestRender();
    },
    { passive: false },
  );

  // ---------- Keyboard ----------
  root.addEventListener('keydown', (event) => {
    const dir: Record<string, [number, number]> = {
      ArrowLeft: [1, 0],
      ArrowRight: [-1, 0],
      ArrowUp: [0, 1],
      ArrowDown: [0, -1],
    };
    const d = dir[event.key];
    if (!d) return;
    event.preventDefault();
    if (reducedMotion.matches) {
      panX += d[0] * stride * 0.5;
      panY += d[1] * stride * 0.5;
      requestRender();
    } else {
      startGlide(d[0] * KEY_VELOCITY, d[1] * KEY_VELOCITY);
    }
  });

  // ---------- Resize ----------
  let resizeTimer = 0;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (root.clientWidth === viewW && root.clientHeight === viewH) return;
      build();
      render();
    }, 120);
  }).observe(root);

  build();
  // Start with a column centred horizontally.
  panX = (viewW - (stride - metrics().gap)) / 2 + stride;
  render();
}
