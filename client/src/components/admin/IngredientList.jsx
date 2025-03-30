import React from 'react';
import useIngredient from '../../hooks/useIngredient';

const IngredientList = () => {
    const { ingredients, loadingIngredient, errorIngredient } = useIngredient();

    if (loadingIngredient) return <div>Loading ingredients...</div>;
    if (errorIngredient) return <div>Error fetching ingredients: {errorIngredient.message}</div>;

    return(
        <div>
            <h2>Ingredients</h2>

            <ul className='List IngredientList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Quantity</h3>
                </li>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}> 
                        <p>{ingredient.ingredient_name}</p>
                        <p>{ingredient.quantity}</p>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
