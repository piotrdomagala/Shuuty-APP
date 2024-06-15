function changeLanguage(lang) {
    applyLanguage(lang);
}

function applyLanguage(lang) {
    const langElements = {
        en: {
            currentLanguage: 'English',
            languageBtn: '<img src="images/english_icon.png" alt="English"> English',
            title: 'Shuuty',
            mainTitle: 'Find Those You Seek',
            description: 'Arrange activities wherever you are.<br>Meet new people similar to you and<br>plan your time like never before.',
            downloadTitle: 'Download the App',
            footerText: '&copy; 2024 Shuuty. All rights reserved.',
            supportLink: 'Support',
            privacyLink: 'Privacy',
            termsLink: 'Terms'
        },
        pl: {
            currentLanguage: 'Polski',
            languageBtn: '<img src="images/polish_icon.png" alt="Polski"> Polski',
            title: 'Shuuty',
            mainTitle: 'Znajdź tych których szukasz',
            description: 'Umów się na aktywność, gdziekolwiek jesteś.<br>Poznaj nowych ludzi podobnych do Ciebie oraz<br>zaplanuj swój czas jak nigdy wcześniej.',
            downloadTitle: 'Pobierz aplikację',
            footerText: '&copy; 2024 Shuuty. Wszelkie prawa zastrzeżone.',
            supportLink: 'Wsparcie',
            privacyLink: 'Warunki',
            termsLink: 'Regulamin'
        }
    };

    const selectedLang = langElements[lang];

    const elements = {
        currentLanguage: document.getElementById('current-language'),
        languageBtn: document.getElementById('language-btn'),
        title: document.getElementById('title'),
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
});
