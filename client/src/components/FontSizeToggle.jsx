import { useLocation } from 'react-router-dom';

const FontSizeToggle = ({ fontSize, setFontSize }) => {
    const { pathname } = useLocation();
    const showOn = ['/welcome', '/dashboard'];
    if (!showOn.includes(pathname)) return null;

    const toggleFontSize = () => {
    setFontSize(prev => (prev === 100 ? 140 : 100));
    };

    return (
    <button
        onClick={toggleFontSize}
        style={{
        position: 'fixed',
        top: '1rem',
        right: '10rem',
        zIndex: 1000,
        }}
        aria-label="Toggle font size"
    >
        {fontSize === 100 ? 'Zoom In' : 'Reset Zoom'}
    </button>
    );
}

export default FontSizeToggle;
