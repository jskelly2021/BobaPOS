import React from 'react';
import { useNavigate } from 'react-router-dom';

import EmployeeList from '../components/EmployeeList';
import IngredientList from '../components/IngredientList';

function Inventory() {
    const nav = useNavigate();

    return (
        <div className='Admin'>
            <button className='DashboardBtn' onClick={() => nav('/dashboard')}>
                Dashboard
            </button>
            <div className='AdminPages'>
                <button>
                    Ingredients
                </button>
                <button>
                    Items
                </button>
                <button>
                    Employees
                </button>
            </div>
            <h1>Admin</h1>
            <IngredientList />
            <EmployeeList />
        </div>
    );
}

export default Inventory;
