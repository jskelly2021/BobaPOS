import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.css'

function EmployeeLogin() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    const [employeeName, setEmployeeName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Function to handle form submission and login process
    const handleLogin = async (e) => {
        const url = `${API_BASE_URL}/auth/login`;

        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ employee_name: employeeName, passwords: password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred.');
        }
    };

    const handleToggleMode = () => {
        localStorage.setItem("userMode", "customer");
        navigate('/welcome');
    }

    return (
        <div>
            <button className='UserModeBtn' onClick={() => handleToggleMode()}>
                Toggle User Mode
            </button>

            <h1>Employee Login</h1>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="employeeName">Employee Name:</label>
                    <input
                        id="employeeName"
                        type="text"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className='LoginBtn' type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default EmployeeLogin;
