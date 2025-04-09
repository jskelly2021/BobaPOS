import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
    const nav = useNavigate();

        return (
            <div>
                <button className='UserModeBtn' onClick={() => nav('/')}>
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
