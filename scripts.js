document.addEventListener('DOMContentLoaded', () => {
  const languageLinks = document.querySelectorAll('.language-switcher a');

  languageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = link.getAttribute('data-lang');

      // Usuń klasę 'active' ze wszystkich linków
      languageLinks.forEach(link => link.classList.remove('active'));

      // Dodaj klasę 'active' do klikniętego linku
      link.classList.add('active');

      // Tutaj możesz dodać funkcję zmieniającą treść strony na wybrany język
      console.log('Zmieniono język na: ' + selectedLang);
    });
  });
});
