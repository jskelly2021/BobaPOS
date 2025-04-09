import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
    const nav = useNavigate();

    const handleToggleMode = () => {
        localStorage.setItem("userMode", "cashier");
        nav('/');
    }

    return (
        <div>
            <button className='UserModeBtn' onClick={() => handleToggleMode()}>
                Toggle User Mode
            </button>
            <h1>Welcome</h1>
            <button className='StartBtn' onClick={() => nav('/menu/customer')}>
                Start Order
            </button>
        </div>
    );
}

export default EmployeeLogin;
