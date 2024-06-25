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

    // Event listeners for the links in the footer
    document.getElementById('privacy-link').addEventListener('click', function(event) {
        event.preventDefault();
        openMarkdownInNewWindow('documents/privacy.md');
    });

    document.getElementById('terms-link').addEventListener('click', function(event) {
        event.preventDefault();
        openMarkdownInNewWindow('documents/terms.md');
    });
});

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

function openMarkdownInNewWindow(markdownPath) {
    fetch(markdownPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(text => {
            const newWindow = window.open();
            newWindow.document.write(`
                <html>
                    <head>
                        <link rel="stylesheet" href="../css/github-markdown.css">
                        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                    </head>
                    <body>
                        <article class="markdown-body">${marked(text)}</article>
                    </body>
                </html>
            `);
            newWindow.document.close();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
