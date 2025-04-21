import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Admin.css'
import EmployeeList from '../components/admin/employee/EmployeeList';
import IngredientList from '../components/admin/IngredientList';
import ItemList from '../components/admin/item/ItemList';
import ToppingList from '../components/admin/topping/ToppingList'

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
                <button onClick={() => setActivePage('toppings')}>Toppings</button>
            </div>

            <h1>Admin</h1>

            {activePage === 'ingredients' && <IngredientList />}
            {activePage === 'items' && <ItemList />}
            {activePage === 'employees' && <EmployeeList />}
            {activePage === 'toppings' && <ToppingList />}
        </div>
    );
}

export default Inventory;
