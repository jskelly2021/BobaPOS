import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const nav = useNavigate();

    return (
        <div className='Dashboard'>
            <button className='LogoutBtn' onClick={() => nav('/')}>
                Logout
            </button>
            <button className='MenuBtn' onClick={() => nav('/menu')}>
                Menu
            </button>
            <button className='InventoryBtn' onClick={() => nav('/inventory')}>
                Inventory
            </button>
        </div>
    );
}

export default Dashboard;
