window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        document.body.style.height = window.innerHeight + 'px';
        document.body.style.width = window.innerWidth + 'px';
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const lang = getCookie('lang') || 'en';
    applyLanguage(lang);

    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const lang = event.currentTarget.getAttribute('data-lang');
            setCookie('lang', lang, 365);
            applyLanguage(lang);
        });
    });

    document.getElementById('privacy-link').addEventListener('click', function(event) {
        event.preventDefault();
        const lang = getCookie('lang') || 'en';
        const file = lang === 'pl' ? 'documents/privacy.html' : 'documents/privacy_en.html';
        window.location.href = file;
    });

    document.getElementById('terms-link').addEventListener('click', function(event) {
        event.preventDefault();
        const lang = getCookie('lang') || 'en';
        const file = lang === 'pl' ? 'documents/terms.html' : 'documents/terms_en.html';
        window.location.href = file;
    });
});

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
