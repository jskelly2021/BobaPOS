import React, { useState } from 'react';
import useIngredient from '../../hooks/useIngredient';

const IngredientList = () => {
    const { ingredients, loadingIngredient, errorIngredient, updateQuantity } = useIngredient();
    const [orderAmounts, setOrderAmounts] = useState({});

    if (loadingIngredient) return <div>Loading ingredients...</div>;
    if (errorIngredient) return <div>Error fetching ingredients: {errorIngredient.message}</div>;

    const handleOnInputChange = (ingredient, value) => {
        setOrderAmounts(prevAmounts => ({
            ...prevAmounts,
            [ingredient.ingredient_id]: value
        }))
    }

    const handleOrderBtnClick = (ingredient) => {
        const id = ingredient.ingredient_id;
        const quantityToAdd = Number(orderAmounts[id]) || 0;

        if (quantityToAdd <= 0) return;

        updateQuantity(id, quantityToAdd);
        setOrderAmounts(prevAmounts => ({
            ...prevAmounts,
            [id]: ''
        }))
    }

    return(
        <div>
            <h2>Ingredients</h2>

            <ul className='List IngredientList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Quantity</h3>
                    <h3>Order Product</h3>
                </li>
                {ingredients.map(ingredient => (
                    <li key={ingredient.ingredient_id}> 
                        <p>{ingredient.ingredient_name}</p>
                        <p>{ingredient.quantity}</p>

                        <div className='OrderProductForm'>
                            <input 
                                type='number' 
                                min='0.1'
                                value={orderAmounts[ingredient.ingredient_id] || ''}
                                onChange={(e) => handleOnInputChange(ingredient, e.target.value)}
                                placeholder='Enter Amount'>
                            </input>

                            <button className='OrderBtn' onClick={() => handleOrderBtnClick(ingredient)}>
                                Order
                            </button>
                        </div>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
