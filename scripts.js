function changeLanguage(lang) {
    applyLanguage(lang);
}

function applyLanguage(lang) {
    const langElements = {
        en: {
            currentLanguage: 'English',
            languageBtn: '<img src="images/english_icon.png" alt="English"> English',
            mainTitle: 'Find Those You Seek',
            description: 'Arrange activities wherever you are.<br>Meet new people similar to you and<br>plan your time like never before.',
            downloadTitle: 'Download the app on mobile',
            footerText: '© 2024 Shuuty. All rights reserved.',
            supportLink: 'Support',
            privacyLink: 'Privacy',
            termsLink: 'Terms'
        },
        pl: {
            currentLanguage: 'Polski',
            languageBtn: '<img src="images/polish_icon.png" alt="Polski"> Polski',
            mainTitle: 'Znajdź tych których szukasz',
            description: 'Umów się na aktywność, gdziekolwiek jesteś.<br>Poznaj nowych ludzi podobnych do Ciebie oraz<br>zaplanuj swój czas jak nigdy wcześniej.',
            downloadTitle: 'Pobierz aplikację na urządzenia mobilne',
            footerText: '© 2024 Shuuty. Wszelkie prawa zastrzeżone.',
            supportLink: 'Wsparcie',
            privacyLink: 'Prywatność',
            termsLink: 'Regulamin'
        }
    };

    const selectedLang = langElements[lang];

    const elements = {
        currentLanguage: document.getElementById('current-language'),
        languageBtn: document.getElementById('language-btn'),
        mainTitle: document.getElementById('main-title'),
        description: document.getElementById('description'),
        downloadTitle: document.getElementById('download-title'),
        footerText: document.getElementById('footer-text'),
        supportLink: document.getElementById('support-link'),
        privacyLink: document.getElementById('privacy-link'),
        termsLink: document.getElementById('terms-link')
    };

    for (const [key, element] of Object.entries(elements)) {
        if (element) {
            if (key === 'languageBtn' || key === 'description') {
                element.innerHTML = selectedLang[key];
            } else {
                element.innerText = selectedLang[key];
            }
        } else {
            console.warn(`Element with id ${key} not found`);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const lang = event.currentTarget.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Set default language to English
    applyLanguage('en');

    // Infinite scroll functionality for mobile only
    if (window.matchMedia("(max-width: 768px)").matches) {
        const leftSection = document.querySelector('.left-section');
        const images = Array.from(leftSection.querySelectorAll('img'));

        // Clone the images for infinite scroll effect
        images.forEach(img => {
            const clone = img.cloneNode(true);
            leftSection.appendChild(clone);
        });

        let isScrolling;
        leftSection.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);

            isScrolling = setTimeout(() => {
                if (leftSection.scrollLeft >= leftSection.scrollWidth / 2) {
                    leftSection.scrollLeft -= leftSection.scrollWidth / 2;
                } else if (leftSection.scrollLeft <= 0) {
                    leftSection.scrollLeft += leftSection.scrollWidth / 2;
                }
            }, 100);
        });
    }

    // Modal window functionality
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.getElementById('close-button');

    document.getElementById('privacy-link').addEventListener('click', function(event) {
        event.preventDefault();
        fetch('documents/privacy.md')
            .then(response => response.text())
            .then(text => {
                modalBody.innerHTML = marked(text);
                modal.style.display = 'block';
            });
    });

    document.getElementById('terms-link').addEventListener('click', function(event) {
        event.preventDefault();
        fetch('documents/terms.md')
            .then(response => response.text())
            .then(text => {
                modalBody.innerHTML = marked(text);
                modal.style.display = 'block';
            });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
