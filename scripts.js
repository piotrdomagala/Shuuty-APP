// Przykładowa funkcja obsługująca zmianę języka
function zmienJezyk(jezyk) {
  // Implementacja zmiany języka
  console.log('Zmieniono język na: ' + jezyk);
}

// Przykładowa funkcja obsługująca menu rozwijane
function toggleMenu() {
  const menu = document.querySelector('nav ul');
  menu.classList.toggle('active');
}

// Dodanie nasłuchiwania na kliknięcie przycisku menu
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
