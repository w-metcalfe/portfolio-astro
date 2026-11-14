// Sidebar behaviour: live clock and tablet/mobile drawer toggle.

function initClock() {
  const dateEl = document.querySelector<HTMLElement>('[data-clock-date]');
  const timeEl = document.querySelector<HTMLElement>('[data-clock-time]');
  if (!dateEl || !timeEl) return;
  const dateFormat = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });
  const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const update = () => {
    const now = new Date();
    const date = dateFormat.format(now);
    const time = timeFormat.format(now);
    if (dateEl.textContent !== date) dateEl.textContent = date;
    if (timeEl.textContent !== time) timeEl.textContent = time;
  };
  update();
  setInterval(update, 1000);
}

function initDrawer() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  if (!nav || !toggle) return;
  const mobile = window.matchMedia('(max-width: 809.98px)');
  const compact = window.matchMedia('(max-width: 999.98px)');
  const isOpen = () => nav.dataset.open === 'true';
  const setOpen = (open: boolean, { moveFocus = false } = {}) => {
    nav.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!moveFocus) return;
    if (open) {
      // Wait a frame so the drawer is visible (it is visibility:hidden while closed) before focusing its first link.
      requestAnimationFrame(() => nav.querySelector<HTMLElement>('[data-nav-drawer] a')?.focus());
    } else {
      toggle.focus();
    }
  };
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    // detail === 0: activated with the keyboard (Enter/Space), so move focus into the drawer; mouse and touch leave it.
    setOpen(!isOpen(), { moveFocus: event.detail === 0 });
  });
  // Escape closes the drawer and returns focus to the toggle.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false, { moveFocus: nav.contains(document.activeElement) });
  });
  // Clicking or tapping outside the open drawer only closes it: the click is swallowed so it doesn't also follow
  // a link underneath (capture phase, before the page sees it).
  document.addEventListener(
    'click',
    (event) => {
      if (!isOpen() || nav.contains(event.target as Node)) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    },
    true,
  );
  // Tabbing out of the open drawer closes it, so it never sits open over content the keyboard user has moved on to.
  nav.addEventListener('focusout', (event) => {
    const next = event.relatedTarget as Node | null;
    if (isOpen() && next && !nav.contains(next)) setOpen(false);
  });
  // On mobile the whole closed bar opens the menu (matches the original interaction).
  nav.addEventListener('click', (event) => {
    if (!mobile.matches || nav.dataset.open === 'true') return;
    if ((event.target as HTMLElement).closest('a')) return;
    setOpen(true);
  });
  compact.addEventListener('change', (event) => {
    if (!event.matches) setOpen(false);
  });
}

export function initSidebar() {
  initClock();
  initDrawer();
}
