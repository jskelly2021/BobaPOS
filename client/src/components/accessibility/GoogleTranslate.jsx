// src/components/GoogleTranslate.jsx
import { useEffect } from 'react';

const GoogleTranslate = () => {
    useEffect(() => {
        // 1) Define/override the init callback
        window.googleTranslateElementInit = () => {
        try {
            new window.google.translate.TranslateElement( {
                pageLanguage: 'en',
                layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
            },
            'google_translate_element'
            );
        } catch (err) {
            // swallow any errors from Google’s own code
            console.debug('Google Translate init error', err);
        }
        };

        // 2) Inject the script exactly once
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // if it’s already loaded (e.g. returning to the page), re-run
            window.googleTranslateElementInit();
        }
    }, []);

    return (
        <div id="google_translate_element" />
    );
}

export default GoogleTranslate;
