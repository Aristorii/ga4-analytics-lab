'use strict';
// Итоговый js/script.js после темы 7: форма заявок + CTA из темы 6.
// Google Tag устанавливается отдельно в head каждой HTML-страницы.
(() => {
  const leadForm = document.querySelector('#lead-form');
  if (!leadForm) return;
  const params = new URLSearchParams(window.location.search);
  const defaults = {utm_source:'direct', utm_medium:'none', utm_campaign:'not_set'};
  for (const [key, fallback] of Object.entries(defaults)) {
    leadForm.elements.namedItem(key).value = params.get(key)?.trim() || fallback;
  }
  const requestId = leadForm.elements.namedItem('request_id');
  leadForm.addEventListener('submit', event => {
  const requestId = leadForm.elements.namedItem('request_id');
  if (requestId && !requestId.value) {
    requestId.value = 'REQ-' + crypto.randomUUID().toUpperCase();
  }
  // Ничего не блокируем, просто даем браузеру отправить форму
  document.querySelector('#form-status').textContent = 
    'POST отправляется. Подтвердите сохранение по request_id в таблице: ' + (requestId ? requestId.value : '');
});
  leadForm.addEventListener('reset', () => {
    setTimeout(() => {
      requestId.value = '';
      for (const [key, fallback] of Object.entries(defaults)) {
        leadForm.elements.namedItem(key).value = params.get(key)?.trim() || fallback;
      }
      document.querySelector('#form-status').textContent = 'Можно заполнить новую заявку.';
    }, 0);
  });
})();

// CTA из существующего сайта темы 6 — без изменений.
const programCta = document.querySelector('#program-cta');
if (programCta) {
  programCta.addEventListener('click', () => {
    document.querySelector('#program-preview').hidden = false;
    if (typeof gtag === 'function') {
      gtag('event', 'cta_click', {
        button_name: 'program',
        page_section: 'hero'
      });
    }
  });
}
