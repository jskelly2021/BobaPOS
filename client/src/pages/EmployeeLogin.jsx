import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
    const nav = useNavigate();

    const handleToggleMode = () => {
        localStorage.setItem("userMode", "customer");
        nav('/welcome');
    }

    return (
        <div>
            <button className='UserModeBtn' onClick={() => handleToggleMode()}>
                Toggle User Mode
            </button>
            <h1>Employee Login</h1>
            <button className='LoginBtn' onClick={() => nav('/dashboard')}>
                Login
            </button>
        </div>
    );
}

export default EmployeeLogin;
