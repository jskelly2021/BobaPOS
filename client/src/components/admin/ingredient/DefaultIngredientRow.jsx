import { useState } from 'react';
import StatusLabel from './StatusLabel';

const DefaultIngredientRow = ({ ingredient, onEdit, orderIngredient}) => {
    const [orderAmounts, setOrderAmounts] = useState({});

    const handleOnInputChange = (ingredient, value) => {
        setOrderAmounts(prevAmounts => ({
            ...prevAmounts,
            [ingredient.ingredient_id]: value
        }))
    }

    const handleOrderClick = async () => {
        const id = ingredient.ingredient_id;
        const quantityToAdd = Number(orderAmounts[id]) || 0;

        if (quantityToAdd <= 0) return;

        await orderIngredient(ingredient, quantityToAdd);
        setOrderAmounts(prevAmounts => ({
            ...prevAmounts,
            [id]: ''
        }))
    }

    return (
        <>
            <p>{ingredient.ingredient_name}</p>
            <p>{ingredient.quantity}</p>

            <div className='Threshold'>
                <p>{ingredient.threshold}</p>
            </div>

            <div className='OrderProductForm'>
                <input 
                    type='number' 
                    min='0.1'
                    value={orderAmounts[ingredient.ingredient_id] || ''}
                    onChange={(e) => handleOnInputChange(ingredient, e.target.value)}
                    placeholder='Enter Amount'>
                </input>

                <button className='OrderBtn' onClick={() => handleOrderClick()}>
                    Order
                </button>
            </div>

            <StatusLabel ingredient={ingredient} />

            <div className='DefaultBtns'>
                <button className='EditBtn' onClick={() => onEdit(ingredient)}>Edit</button>
            </div>
        </>
    );
}

export default DefaultIngredientRow;
