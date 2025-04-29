import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Unauthorized.css';

export default function Unauthorized() {
  return (
    <div className="Unauthorized">
      <div className="Unauthorized__container">
        <h1>403 - Unauthorized</h1>
        <p>Sorry, you don't have permission to view this page.</p>
        <div className="Unauthorized__actions">
          <Link to="/welcome" className="Unauthorized__link">Return to Home</Link>
          <Link to="/login" className="Unauthorized__link">Go to Login</Link>
        </div>
      </div>
    </div>
  );
}
