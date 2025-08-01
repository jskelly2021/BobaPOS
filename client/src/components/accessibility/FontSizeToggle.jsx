import { useLocation } from 'react-router-dom';

const FontSizeToggle = ({ fontSize, setFontSize }) => {
    const { pathname } = useLocation();
    const hideOn = [];
    if (hideOn.includes(pathname)) return null;

    const toggleFontSize = () => {
    setFontSize(prev => (prev === 100 ? 140 : 100));
    };

    return (
        <button className='FontSizeToggleBtn'
            onClick={toggleFontSize}
            aria-label="Toggle font size"
        >
            {fontSize === 100 ? 'Zoom In' : 'Reset Zoom'}
        </button>
    );
}

export default FontSizeToggle;
