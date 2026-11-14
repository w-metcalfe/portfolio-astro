// Contact form submission via Netlify Forms.
// The fields are posted URL-encoded (with the hidden form-name field) to the site root, where Netlify picks them up;
// on success the visitor is sent to the thank-you page. Netlify Forms only exists on the deployed site, so on
// `astro dev` / `astro preview` a submission ends in the error state.

type State = 'default' | 'pending' | 'success' | 'error';

const LABELS: Record<State, string> = {
  default: 'Submit',
  pending: 'Submit',
  success: 'Thank you!',
  error: 'Something went wrong',
};

export function initContactForm() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = form.querySelector<HTMLElement>('[data-label]');
    if (!button || !label) return;

    const setState = (state: State) => {
      button.dataset.state = state;
      label.textContent = LABELS[state];
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (button.dataset.state === 'pending') return;
      const data = new FormData(form);
      // Filled-in spam trap: pretend it worked and drop the message (Netlify also filters it server-side).
      if (data.get('company')) return setState('success');

      setState('pending');
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
        });
        if (!response.ok) throw new Error(`Form submission answered ${response.status}`);
        setState('success');
        form.reset();
        if (form.dataset.redirect) window.location.assign(form.dataset.redirect);
      } catch (error) {
        console.error(error);
        setState('error');
        window.setTimeout(() => setState('default'), 3000);
      }
    });
  });
}
