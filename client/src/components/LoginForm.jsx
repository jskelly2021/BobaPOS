// client/src/components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [employee_name, setEmployeeName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This is important for sessions to work in your browser
      body: JSON.stringify({ employee_name, password }),
    });
    if (response.ok) {
      // Redirect or update UI as needed
      window.location.href = '/dashboard';
    } else {
      // Handle error (e.g., show message)
      console.error('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Employee Name:
        <input
          type="text"
          value={employee_name}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
