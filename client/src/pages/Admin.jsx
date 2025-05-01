import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Admin.css'
import EmployeeList from '../components/admin/employee/EmployeeList';
import IngredientList from '../components/admin/ingredient/IngredientList';
import ItemList from '../components/admin/item/ItemList';
import ToppingList from '../components/admin/topping/ToppingList'
import LocationSelector from '../components/admin/LocationSelector';

function Inventory() {
    const nav = useNavigate();
    const [activePage, setActivePage] = useState('ingredients');

    const getLabel = (page) => {
        return activePage === page ? 'active' : '';
    };

    return (
        <div className='Admin'>

            <div className='AdminPages'>
                <button className={`${getLabel('dashboard')}`} onClick={() => nav('/dashboard')}>Dashboard</button>
                <button className={`${getLabel('ingredients')}`} onClick={() => setActivePage('ingredients')}>Ingredients</button>
                <button className={`${getLabel('items')}`} onClick={() => setActivePage('items')}>Items</button>
                <button className={`${getLabel('employees')}`} onClick={() => setActivePage('employees')}>Employees</button>
                <button className={`${getLabel('toppings')}`} onClick={() => setActivePage('toppings')}>Toppings</button>
                <button className={`${getLabel('location')}`} onClick={() => setActivePage('location')}>Location</button>
            </div>

            <h1>Admin</h1>

            {activePage === 'ingredients' && <IngredientList />}
            {activePage === 'items' && <ItemList />}
            {activePage === 'employees' && <EmployeeList />}
            {activePage === 'toppings' && <ToppingList />}
            {activePage === 'location' && <LocationSelector />}
        </div>
    );
}

export default Inventory;
