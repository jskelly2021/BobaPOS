import React from 'react';
import useIngredient from '../../hooks/useIngredient';

const IngredientList = () => {
    const { ingredients, loadingIngredient, errorIngredient } = useIngredient();

    if (loadingIngredient) return <div>Loading ingredients...</div>;
    if (errorIngredient) return <div>Error fetching ingredients: {errorIngredient.message}</div>;

    return(
        <ul>
            {ingredients.map((ingredient) => (
                <li key={ingredient.id}> 
                    <p>{ingredient.ingredient_name}</p>
                    <p>{ingredient.quantity}</p>
                </li> 
            ))}
        </ul>
    );
}

export default IngredientList;
