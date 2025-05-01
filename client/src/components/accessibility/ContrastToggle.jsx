import { useLocation } from 'react-router-dom';

const ContrastToggle = ({ highContrast, setHighContrast }) => {
    const { pathname } = useLocation();
    const hideOn = [];
    if (hideOn.includes(pathname)) return null;

    return (
        <button className='ContrastToggleBtn'
            onClick={() => setHighContrast(!highContrast)}
            aria-pressed={highContrast}
            aria-label="Toggle high contrast mode"
        >
            {highContrast ? 'Normal Contrast' : 'High Contrast'}
        </button>
    );
}

export default ContrastToggle;