// Newsletter signup: validates the email, subscribes it through Mailchimp and redirects to the thank-you page.
// Mailchimp's JSONP endpoint (post-json) reports whether the signup worked, so a rejected address shakes the field
// instead of showing the thank-you page. If that endpoint doesn't answer (blocked script, timeout), the form falls back
// to the original fire-and-forget POST and redirects, as the Framer site did.

const EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function initNewsletter() {
  document.querySelectorAll<HTMLElement>('[data-newsletter]').forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = 'true';
    const form = root.querySelector('form');
    const input = root.querySelector<HTMLInputElement>('input[type="email"]');
    const loading = root.querySelector<HTMLElement>('.signup__loading');
    if (!form || !input) return;
    let busy = false;

    const fail = () => {
      root.classList.remove('is-error');
      void root.offsetWidth; // restart the shake animation
      root.classList.add('is-error');
    };
    const setBusy = (value: boolean) => {
      busy = value;
      if (loading) loading.hidden = !value;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (busy) return;
      const email = input.value;
      if (email === '' || !EMAIL.test(email.toLowerCase())) return fail();
      setBusy(true);
      const params = new URLSearchParams(JSON.parse(root.dataset.params || '{}'));
      params.set('MERGE0', email);
      const host = root.dataset.host;
      const done = () => {
        setBusy(false);
        input.value = '';
        if (root.dataset.redirect) window.location.assign(root.dataset.redirect);
      };
      const result = await subscribeJsonp(host, params);
      if (result === 'ok') return done();
      if (result === 'rejected') {
        setBusy(false);
        return fail();
      }
      // No answer from the JSONP endpoint: plain POST, whose result can't be read.
      try {
        await fetch(`https://${host}/subscribe/post`, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: params.toString(),
        });
        done();
      } catch (error) {
        console.error(error);
        setBusy(false);
        fail();
      }
    });
  });
}

type JsonpResult = 'ok' | 'rejected' | 'unavailable';

/** Subscribes via Mailchimp's JSONP endpoint. "Already subscribed" counts as ok. */
function subscribeJsonp(host: string | undefined, params: URLSearchParams, timeout = 8000): Promise<JsonpResult> {
  return new Promise((resolve) => {
    if (!host) return resolve('unavailable');
    const callback = `mcSignup${Date.now()}`;
    const script = document.createElement('script');
    const w = window as unknown as Record<string, unknown>;
    let settled = false;
    const finish = (result: JsonpResult) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      delete w[callback];
      script.remove();
      resolve(result);
    };
    const timer = window.setTimeout(() => finish('unavailable'), timeout);
    w[callback] = (response: { result?: string; msg?: string }) => {
      const msg = response?.msg ?? '';
      if (response?.result === 'success' || /already subscribed/i.test(msg)) return finish('ok');
      console.warn('Newsletter signup:', msg);
      // Only a clear verdict on the address itself counts as rejected; any other error (rate limit, captcha, a
      // changed form) falls back to the plain POST so a signup is never lost to an unexpected answer.
      finish(/valid email|invalid|fake|bounced|domain/i.test(msg) ? 'rejected' : 'unavailable');
    };
    script.onerror = () => finish('unavailable');
    const query = new URLSearchParams(params);
    query.set('EMAIL', params.get('MERGE0') ?? '');
    query.set('c', callback);
    script.src = `https://${host}/subscribe/post-json?${query.toString()}`;
    document.head.append(script);
  });
}
