const programCta = document.querySelector('#program-cta');
if (programCta) {
  programCta.addEventListener('click', () => {
    document.querySelector('#program-preview').hidden = false;
    gtag('event', 'cta_click', {
      button_name: 'program',
      page_section: 'hero'
    });
  });
}