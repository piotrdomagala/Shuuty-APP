document.addEventListener('DOMContentLoaded', function() {
    // Zmiana adresu URL na główną stronę bez 'index.html'
    if (window.location.pathname.endsWith('index.html')) {
        window.history.replaceState({}, document.title, window.location.pathname.replace('index.html', ''));
    }

    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const lang = event.currentTarget.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Set default language to English
    applyLanguage(getCookie('lang') || 'en');

    // Event listeners for the links in the footer
    document.getElementById('privacy-link').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'documents/privacy.html';
    });

    document.getElementById('terms-link').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'documents/terms.html';
    });

    document.getElementById('support-link').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'documents/support.html';
    });

    // Monitor orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
});

function handleOrientationChange() {
    // Reset scroll position to top when orientation changes
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function changeLanguage(lang) {
    setCookie('lang', lang, 365);
    applyLanguage(lang);
    // Reload page to apply language changes
    location.reload();
}

const langElements = {
    en: {
        currentLanguage: 'English',
        mainTitle: 'Find Those You Seek',
        description: 'Arrange activities wherever you are.<br>Meet new people similar to you and<br>plan your time like never before.',
        downloadTitle: 'Download the app on mobile',
        supportLink: 'Support',
        privacyLink: 'Privacy',
        termsLink: 'Terms',
        footerText: '© 2025 Shuuty. All rights reserved.',
        languageIcon: 'images/english_icon.png'
    },
    pl: {
        currentLanguage: 'Polski',
        mainTitle: 'Znajdź tych, których szukasz',
        description: 'Umów się na aktywność, gdziekolwiek jesteś.<br>Poznaj nowych ludzi podobnych do Ciebie<br>i zaplanuj swój czas jak nigdy wcześniej.',
        downloadTitle: 'Pobierz aplikację na telefon',
        supportLink: 'Wsparcie',
        privacyLink: 'Prywatność',
        termsLink: 'Regulamin',
        footerText: '© 2025 Shuuty. Wszelkie prawa zastrzeżone.',
        languageIcon: 'images/polish_icon.png'
    }
};

function applyLanguage(lang) {
    if (!langElements[lang]) lang = 'en'; // Domyślny język, jeśli coś pójdzie nie tak
    
    const elementsToUpdate = {
        'main-title': 'mainTitle',
        'description': 'description',
        'download-title': 'downloadTitle',
        'support-link': 'supportLink',
        'privacy-link': 'privacyLink',
        'terms-link': 'termsLink',
        'footer-text': 'footerText'
    };

    for (const [id, key] of Object.entries(elementsToUpdate)) {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'description') {
                element.innerHTML = langElements[lang][key]; // Używamy innerHTML dla opisu
            } else {
                element.innerText = langElements[lang][key];
            }
        }
    }

    const languageIcon = document.getElementById('language-icon');
    if (languageIcon) {
        languageIcon.src = langElements[lang].languageIcon;
    }

    const currentLanguage = document.getElementById('current-language');
    if (currentLanguage) {
        currentLanguage.innerText = langElements[lang].currentLanguage;
    }
}
