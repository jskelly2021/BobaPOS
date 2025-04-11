import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Admin.css'
import EmployeeList from '../components/admin/EmployeeList';
import IngredientList from '../components/admin/IngredientList';
import ItemList from '../components/admin/ItemList';
import AnalyticsPage from '../components/admin/analyticsPage';

function Inventory() {
    const nav = useNavigate();
    const [activePage, setActivePage] = useState('ingredients');

    return (
        <div className='Admin'>
            <button className='DashboardBtn' onClick={() => nav('/dashboard')}>
                Dashboard
            </button>

            <div className='AdminPages'>
                <button onClick={() => setActivePage('ingredients')}>Ingredients</button>
                <button onClick={() => setActivePage('items')}>Items</button>
                <button onClick={() => setActivePage('employees')}>Employees</button>
                <button onClick={() => setActivePage('analytics')}>Analytics</button>
            </div>

            <h1>Admin</h1>
            {activePage === 'ingredients' && <IngredientList />}
            {activePage === 'items' && <ItemList />}
            {activePage === 'employees' && <EmployeeList />}
            {activePage === 'analytics' && <AnalyticsPage />}
        </div>
    );
}

export default Inventory;
