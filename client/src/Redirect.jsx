import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect() {
    const nav = useNavigate();

    useEffect(() => {
        let userMode = localStorage.getItem('userMode');

        if (!userMode) {
            localStorage.setItem('userMode', 'employee');
            userMode = 'employee';
        }

        if (userMode === 'employee') {
            nav('/login');
        }
    
        else if (userMode === 'customer') {
            nav('/welcome');
        }
    }, [nav])

    return null;
}

export default Redirect;