import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EmployeesList from '../components/admin/EmployeesList';
import IngredientsList from '../components/admin/IngredientsList';
import ItemsList from '../components/admin/ItemsList';

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
            </div>

            <h1>Admin</h1>
            {activePage === 'ingredients' && <IngredientsList />}
            {activePage === 'items' && <ItemsList />}
            {activePage === 'employees' && <EmployeesList />}
        </div>
    );
}

export default Inventory;
