// Click-to-zoom for images marked with [data-lightbox].
// The image grows from its place in the page to the centre of the viewport (max 800px wide,
// 20px margin) over a dark backdrop, and shrinks back when dismissed.

const MAX_WIDTH = 800;
const PADDING = 20;
const EASING = 'var(--spring-247-25)';
const DURATION = 617;

export function initLightbox() {
  const items = document.querySelectorAll<HTMLElement>('[data-lightbox]');
  if (!items.length) return;
  let active: { close: () => void } | null = null;

  const open = (source: HTMLElement) => {
    const img = source.querySelector('img');
    if (!img || active) return;
    const from = source.getBoundingClientRect();
    const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : from.width / from.height;
    // Largest box of the image's own aspect ratio that fits the padded viewport (capped at 800px wide).
    let width = Math.min(MAX_WIDTH, window.innerWidth - PADDING * 2);
    let height = width / ratio;
    if (height > window.innerHeight - PADDING * 2) {
      height = window.innerHeight - PADDING * 2;
      width = height * ratio;
    }
    const to = { left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2, width, height };

    const backdrop = document.createElement('div');
    backdrop.className = 'lightbox__backdrop';
    const frame = document.createElement('div');
    frame.className = 'lightbox__frame';
    frame.style.borderRadius = getComputedStyle(source).borderRadius;
    const clone = img.cloneNode(true) as HTMLImageElement;
    clone.removeAttribute('loading');
    clone.sizes = `${Math.round(width)}px`;
    clone.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit';
    clone.style.objectPosition = getComputedStyle(img).objectPosition;
    frame.append(clone);
    document.body.append(backdrop, frame);
    source.style.visibility = 'hidden';

    const place = (rect: { left: number; top: number; width: number; height: number }) => {
      frame.style.left = `${rect.left}px`;
      frame.style.top = `${rect.top}px`;
      frame.style.width = `${rect.width}px`;
      frame.style.height = `${rect.height}px`;
    };
    place(from);
    // next frame: animate to the centred box
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      frame.style.transition = `left ${DURATION}ms ${EASING}, top ${DURATION}ms ${EASING}, width ${DURATION}ms ${EASING}, height ${DURATION}ms ${EASING}`;
      place(to);
    });

    const close = () => {
      if (!active) return;
      active = null;
      backdrop.classList.remove('is-open');
      place(source.getBoundingClientRect());
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', close);
      setTimeout(() => {
        source.style.visibility = '';
        backdrop.remove();
        frame.remove();
      }, DURATION);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    backdrop.addEventListener('click', close);
    frame.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', close, { passive: true });
    active = { close };
  };

  items.forEach((item) => {
    if (item.dataset.lightboxReady) return;
    item.dataset.lightboxReady = 'true';
    item.addEventListener('click', () => open(item));
  });
}
