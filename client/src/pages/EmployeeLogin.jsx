import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeLogin() {
    return (
        <div>
          <h1>Employee Login</h1>
          <button>
            <Link to="/menu">Login</Link>
          </button>
        </div>
      );
}

export default EmployeeLogin;
