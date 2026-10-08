document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => {
    gtag('event', 'nav_click', {
      link_text: link.textContent.trim(),
      from_page: document.title
    });
  });
});
let readCounted = false;
setTimeout(() => {
  if (readCounted || document.hidden) return;
  readCounted = true;
  gtag('event', 'read_30s', {
    page_path: window.location.pathname
  });
}, 30000);
const leadFormFields = document.querySelector('#lead-form');
if (leadFormFields) {
  leadFormFields.addEventListener('invalid', (event) => {
    gtag('event', 'form_error', {
      field_name: event.target.name || 'unknown',
      form_id: 'lead-form'
    });
  }, true);
}
const params = new URLSearchParams(window.location.search);
const source = params.get('utm_source');

if (source) {
  gtag('event', 'utm_visit', {
    utm_source: source,
    utm_medium: params.get('utm_medium') || 'not_set',
    utm_campaign: params.get('utm_campaign') || 'not_set',
    landing_page: window.location.pathname
  });
}