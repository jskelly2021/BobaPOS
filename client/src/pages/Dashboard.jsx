import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react'; 

function Dashboard() {
    const nav = useNavigate();
    const { user } = useContext(AuthContext);
    const userName = user ? user.employee_name : 'Customer'; // Fallback to 'Guest' if user is null

    return (
        <div className='Dashboard'>
            <h1>Dashboard</h1>
            <h4>Currently Logged in as:   
                 {userName} ({user ? user.position : 'Customer'})
            </h4>

            <div className='DashboardNav'>
                <button className='LogoutBtn' onClick={() => nav('/')}>
                    Logout
                </button>

                <button className='MenuBtn' onClick={() => nav('/menu/cashier')}>
                    Menu
                </button>

                <button className='AdminBtn' onClick={() => nav('/admin')}>
                    Admin
                </button>

                <button className='AnalyticsBtn' onClick={() => nav('/analytics')}>
                    Analytics
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
