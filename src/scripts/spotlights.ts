// Spotlight cards shrink from 112% to 100% as the page scrolls from top to bottom,
// eased with a spring (stiffness 580, damping 50) like the original scroll effect.

const FROM = 1.12;
const TO = 1;
const STIFFNESS = 580;
const DAMPING = 50;

export function initSpotlights() {
  const cards = [...document.querySelectorAll<HTMLElement>('[data-spotlight]')];
  if (!cards.length) return;
  const root = document.documentElement;
  const target = () => {
    const max = root.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    return FROM + (TO - FROM) * progress;
  };
  const apply = (value: number) => cards.forEach((card) => card.style.setProperty('--spotlight-scale', value.toFixed(5)));

  let value = target();
  let velocity = 0;
  let running = false;
  let last = 0;
  apply(value);

  const step = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    const goal = target();
    // integrate in small sub-steps for stability
    for (let t = 0; t < dt; t += 1 / 240) {
      const a = -STIFFNESS * (value - goal) - DAMPING * velocity;
      velocity += a * (1 / 240);
      value += velocity * (1 / 240);
    }
    apply(value);
    if (Math.abs(value - goal) < 0.00005 && Math.abs(velocity) < 0.0005) {
      value = goal;
      apply(value);
      running = false;
      return;
    }
    requestAnimationFrame(step);
  };
  const kick = () => {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(step);
  };
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
}
