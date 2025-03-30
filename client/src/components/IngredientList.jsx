import React from 'react';
import useIngredients from '../hooks/useIngredients';

const IngredientList = () => {
    const { ingredients, loadingIngredients, errorIngredients } = useIngredients();

    if (loadingIngredients) return <div>Loading ingredients...</div>;
    if (errorIngredients) return <div>Error fetching ingredients: {errorIngredients.message}</div>;

    return(
        <ul>
            {ingredients.map((ingredient) => (
                <li key={ingredient.id}> 
                    {ingredient.ingredient_name}
                </li> 
            ))}
        </ul>
    );
}

export default IngredientList;
