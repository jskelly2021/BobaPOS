import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Admin.css'
import EmployeeList from '../components/admin/employee/EmployeeList';
import IngredientList from '../components/admin/IngredientList';
import ItemList from '../components/admin/item/ItemList';

function Inventory() {
    const nav = useNavigate();
    const [activePage, setActivePage] = useState('ingredients');

    return (
        <div className='Admin'>

            <div className='AdminPages'>
                <button className='DashboardBtn' onClick={() => nav('/dashboard')}>Dashboard</button>
                <button onClick={() => setActivePage('ingredients')}>Ingredients</button>
                <button onClick={() => setActivePage('items')}>Items</button>
                <button onClick={() => setActivePage('employees')}>Employees</button>
            </div>

            <h1>Admin</h1>

            {activePage === 'ingredients' && <IngredientList />}
            {activePage === 'items' && <ItemList />}
            {activePage === 'employees' && <EmployeeList />}
        </div>
    );
}

export default Inventory;
