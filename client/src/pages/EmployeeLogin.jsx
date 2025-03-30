import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
    const nav = useNavigate();

        return (
            <div>
            <h1>Employee Login</h1>
            <button className='LoginBtn' onClick={() => nav('/dashboard')}>
                Login
            </button>
            </div>
        );
}

export default EmployeeLogin;
