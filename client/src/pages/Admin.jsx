import React from 'react';
import { useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';

function Inventory() {
    const nav = useNavigate();

    const { ingredients, loadingIngredients, errorIngredients } = useIngredients();

    if (loadingIngredients) return <div>Loading ingredients...</div>;
    if (errorIngredients) return <div>Error fetching ingredients: {errorIngredients.message}</div>;

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
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}> 
                        {ingredient.ingredient_name}
                    </li> 
                ))}
            </ul>

        </div>
    );
}

export default Inventory;
