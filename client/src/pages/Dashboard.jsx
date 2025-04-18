import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

function Dashboard() {
    const nav = useNavigate();

    return (
        <div className='Dashboard'>
            <h1>Dashboard</h1>
            <h4>Currently Logged in as:</h4>

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
