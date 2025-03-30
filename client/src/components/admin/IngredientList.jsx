import React from 'react';
import useIngredient from '../../hooks/useIngredient';

const IngredientList = () => {
    const { ingredients, loadingIngredient, errorIngredient, updateQuantity } = useIngredient();

    if (loadingIngredient) return <div>Loading ingredients...</div>;
    if (errorIngredient) return <div>Error fetching ingredients: {errorIngredient.message}</div>;

    return(
        <div>
            <h2>Ingredients</h2>

            <ul className='List IngredientList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Quantity</h3>
                    <h3>Place Order</h3>
                </li>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredient_id}> 
                        <p>{ingredient.ingredient_name}</p>
                        <p>{ingredient.quantity}</p>

                        <button className='OrderBtn' onClick={() => updateQuantity(ingredient.ingredient_id, 10)}>
                            Order
                        </button>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
