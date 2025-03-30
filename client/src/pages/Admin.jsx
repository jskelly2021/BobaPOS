import React from 'react';
import { useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import useEmployees from '../hooks/useEmployees';

function Inventory() {
    const nav = useNavigate();

    const { ingredients, loadingIngredients, errorIngredients } = useIngredients();
    const { employees, loadingEmployees, errorEmployees } = useEmployees();

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
        </div>
    );
}

export default Inventory;
