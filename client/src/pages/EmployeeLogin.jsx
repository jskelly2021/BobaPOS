import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeLogin() {
    const nav = useNavigate();

        return (
            <div>
            <h1>Employee Login</h1>
            <button className='LoginBtn' onClick={() => nav('/menu')}>
                Login
            </button>
            </div>
        );
}

export default EmployeeLogin;
