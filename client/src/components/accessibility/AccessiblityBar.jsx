import React, { useState, useEffect } from 'react';

import FontSizeToggle from './FontSizeToggle';
import ContrastToggle from './ContrastToggle';
import GoogleTranslate from './GoogleTranslate';

const AccessibilityBar = () => {
    // load saved preference
    const [highContrast, setHighContrast] = useState(
        () => localStorage.getItem('highContrast') === 'on'
    );

    // saved font size preference
    const [fontSize, setFontSize] = useState(() => {
        const stored = localStorage.getItem('fontSize');
        return stored ? parseInt(stored) : 100;
    });

    // Apply or remove class on <html> and persist choice
    useEffect(() => {
        const root = document.documentElement;
        if (highContrast) {
        root.classList.add('high-contrast');
        } else {
        root.classList.remove('high-contrast');
        }
        localStorage.setItem('highContrast', highContrast ? 'on' : 'off');
    }, [highContrast]);

    // Apply font size to <html> and persist choice
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    return (
        <div className='AccessibilityBar'>

            <div className='Spacer'></div>


            <ContrastToggle
                highContrast={highContrast}
                setHighContrast={setHighContrast}
            />

            <FontSizeToggle
                fontSize={fontSize}
                setFontSize={setFontSize}
            />
        </div>
    );
}

export default AccessibilityBar;
