document.addEventListener('DOMContentLoaded', function() {

    // Remove 'index.html' from URL
    if (window.location.pathname.endsWith('index.html')) {
        window.history.replaceState({}, document.title, window.location.pathname.replace('index.html', ''));
    }

    // Language switching optimization
    const languageBtn = document.getElementById('language-btn');
    const currentLangDisplay = document.getElementById('current-language');
    const languageOptions = document.querySelectorAll('.dropdown-content a');

    const translations = {
        en: {
            title: "Find Those You Seek",
            description: "Arrange activities wherever you are.<br>Meet new people similar to you and<br>plan your time like never before.",
            downloadTitle: "Download the app on mobile",
            footerText: "© 2024 Shuuty. All rights reserved."
        },
        pl: {
            title: "Znajdź tych, których szukasz",
            description: "Zorganizuj aktywności, gdziekolwiek jesteś.<br>Poznaj nowych ludzi podobnych do Ciebie oraz<br>zaplanuj swój czas jak nigdy wcześniej.",
            downloadTitle: "Pobierz aplikację na urządzenia mobilne"
        }
    };

    languageOptions.forEach(option => {
        option.addEventListener('click', event => {
            event.preventDefault();
            const selectedLang = event.currentTarget.getAttribute('data-lang');
            setCookie('lang', selectedLang, 365);
            applyLanguage(selectedLang);
        });
    });

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let c of ca) {
            c = c.trim();
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

    function applyLanguage(lang) {
        document.getElementById('main-title').innerHTML = translations[lang].title;
        document.getElementById('description').innerHTML = translations[lang].description;
        document.getElementById('download-title').innerText = translations[lang].downloadTitle;
        document.getElementById('footer-text').innerText = translations[lang].footerText;

        currentLangDisplay.textContent = lang === 'en' ? 'English' : 'Polski';
        document.querySelector('.dropbtn img').src = `images/${lang === 'en' ? 'english_icon.png' : 'polish_icon.png'}`;
    }

    function getCookie(name) {
        let cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let c of ca) {
            c = c.trim();
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

    const selectedLang = getCookie('lang') || 'en';
    applyLanguage(selectedLang);
});
