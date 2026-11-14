// Starts scroll-triggered entrance animations (see styles/motion.css).
// An element counts as "in view" once half of it is visible (or it fills half the viewport, for tall elements).

export function initMotion() {
  const targets = document.querySelectorAll<HTMLElement>('[data-appear="in-view"]:not(.is-inview), .split-text:not(.is-inview)');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-inview'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const needed = el.classList.contains('split-text') ? 0 : 0.5;
        const fillsViewport = entry.intersectionRect.height >= window.innerHeight * 0.5;
        if (entry.intersectionRatio < needed && !fillsViewport) continue;
        el.classList.add('is-inview');
        observer.unobserve(el);
      }
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  targets.forEach((el) => observer.observe(el));
}
