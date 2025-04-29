import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './EmployeeLogin.css'

function EmployeeLogin() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
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

            // parse the login response
            const data = await response.json();
        
            // if login failed, show the message and bail out
            if (!response.ok) {
                setError(data.message || 'Login failed.');
                return;
            }
        
            // only now do we fetch the user session
            const userRes = await fetch(
                `${API_BASE_URL}/auth/user`, 
                { credentials: 'include' }
            );
            const userData = await userRes.json();
            setUser(userData);
            localStorage.removeItem('userMode');
            navigate('/dashboard');
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
        <div className='EmployeeLoginModule'>
            <div className='EmployeeLoginWrapper'>
                <div className='ButtonContainer'>
                    <button className='UserModeBtn' onClick={() => handleToggleMode()}>
                        Toggle User Mode
                    </button>
                </div>

                <h1>Employee Login</h1>

                {error && <div style={{ color: 'red' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            id="employeeName"
                            type="text"
                            placeholder="Employee Name"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
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
        </div>
    );
}

export default EmployeeLogin;
