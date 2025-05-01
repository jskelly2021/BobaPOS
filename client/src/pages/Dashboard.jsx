// Dashboard.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { AuthContext } from '../context/AuthContext';
import AccessibilityBar from '../components/accessibility/AccessiblityBar';

function Dashboard() {
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  const userName     = user?.employee_name || 'Guest';
  const userPosition = user?.position      || 'Guest';

  useEffect(() => {
              document.body.classList.add('dashboard-page');
              return () => {
                document.body.classList.remove('dashboard-page');
              };
            }, []);

  

  return (
    <div className="Dashboard">
        <AccessibilityBar />

      <h1>Dashboard</h1>
      {/* This div gets replaced by the widget */}
      <h4>
        Currently Logged in as: {userName} ({userPosition})
      </h4>


      <div className="DashboardNav">
        <button onClick={() => nav('/')}>Logout</button>
        <button onClick={() => nav('/menu/cashier')}>Menu</button>
        <button onClick={() => nav('/admin')}>Admin</button>
        <button onClick={() => nav('/analytics')}>Analytics</button>
      </div>

      



    </div>
  );
}

export default Dashboard;
