import { useLocation } from 'react-router-dom';

const ContrastToggle = ({ highContrast, setHighContrast }) => {
    const { pathname } = useLocation();
    const showOn = ['/welcome', '/dashboard'];
    if (!showOn.includes(pathname)) return null;

    return (
    <button
        onClick={() => setHighContrast(!highContrast)}
        aria-pressed={highContrast}
        aria-label="Toggle high contrast mode"
        style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        }}
    >
        {highContrast ? 'Normal Contrast' : 'High Contrast'}
    </button>
    );
}

export default ContrastToggle;