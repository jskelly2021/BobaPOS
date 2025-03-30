import React from 'react';
import { useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import useEmployees from '../hooks/useEmployees';

function Inventory() {
    const nav = useNavigate();

    const { ingredients, loadingIngredients, errorIngredients } = useIngredients();
    const { employees, loadingEmployees, errorEmployees } = useEmployees();

    if (loadingIngredients) return <div>Loading ingredients...</div>;
    if (errorIngredients) return <div>Error fetching ingredients: {errorIngredients.message}</div>;

    if (loadingEmployees) return <div>Loading employees...</div>;
    if (errorEmployees) return <div>Error fetching employees: {errorEmployees.message}</div>;

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
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}> 
                        {ingredient.ingredient_name}
                    </li> 
                ))}
            </ul>

            <ul>
                {employees.map((employee, index) => (
                    <li key={index}> 
                        {employee.employee_name}
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default Inventory;
