import React, { useState } from 'react';
import useIngredient from '../../hooks/useIngredient';

const IngredientList = () => {
    const { ingredients, loadingIngredient, errorIngredient, editIngredient } = useIngredient();
    const [editingIngredientId, setEditingIngredientId] = useState(null);
    const [editedIngredient, setEditedIngredient] = useState({});
    const [orderAmounts, setOrderAmounts] = useState({});

    if (loadingIngredient) return <div>Loading ingredients...</div>;
    if (errorIngredient) return <div>Error fetching ingredients: {errorIngredient.message}</div>;

    const handleOnInputChange = (ingredient, value) => {
        setOrderAmounts(prevAmounts => ({
            ...prevAmounts,
            [ingredient.ingredient_id]: value
        }))
    }

    const handleEditClick = (ingredient) => {
        setEditingIngredientId(ingredient.ingredient_id);
        setEditedIngredient({...ingredient});
    }

    const handleOnEditChange = (field, value) => { 
        setEditedIngredient({
            ...editedIngredient,
            [field]: value
        })
    }

    const handleOrderBtnClick = async (ingredient) => {
        const id = ingredient.ingredient_id;
        const quantityToAdd = Number(orderAmounts[id]) || 0;

        if (quantityToAdd <= 0) return;

        await editIngredient(ingredient, quantityToAdd);
        setOrderAmounts(prevAmounts => ({
            ...prevAmounts,
            [id]: ''
        }))
    }

    const handleSaveClick = async () => {
        await editIngredient(editedIngredient);
        setEditingIngredientId(null);
    }

    const handleCancelClick = () => {
        setEditingIngredientId(null);
        setEditedIngredient({});
    }

    return(
        <div>
            <h2>Ingredients</h2>

            <ul className='List IngredientList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Quantity</h3>
                    <h3>Threshold</h3>
                    <h3>Order Product</h3>
                    <h3>Status</h3>
                    <div></div>
                </li>
                {ingredients.map(ingredient => (
                    <li key={ingredient.ingredient_id}>
                        {editingIngredientId === ingredient.ingredient_id ? (
                            <>
                                <div>
                                    <input 
                                        type='text'
                                        value={ingredient.ingredient_name || ''}
                                        onChange={(e) => handleOnEditChange('ingredient_name', e.target.value)}
                                    />
                                </div>

                                <p>{ingredient.quantity}</p>

                                <div>
                                    <input
                                        type='number'
                                        value={ingredient.threshold || ''}
                                        onChange={(e) => handleOnEditChange('threshold', e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{ingredient.ingredient_name}</p>
                                <p>{ingredient.quantity}</p>
        
                                <div className='Threshold'>
                                    <p>{ingredient.threshold}</p>
                                </div>
                            </>
                        )}

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

                        {Number(ingredient.quantity) >= Number(ingredient.threshold) ? (
                            <div className='StatusLabel GoodStatus'>
                                <p>Good</p>
                            </div>
                        ) : (
                            <div className='StatusLabel BadStatus'>
                                <p>Insufficient</p>
                            </div>
                        )}

                        {editingIngredientId === ingredient.ingredient_id ? (
                            <div className='Save-Cancel-Btns'>
                                <button className='SaveEditBtn'onClick={() => handleSaveClick(ingredient)}>Save</button>
                                <button className='CancelEditBtn' onClick={() => handleCancelClick()}>Cancel</button>
                            </div>
                        ) : (
                            <div className='DefaultBtns'>
                                <button className='EditBtn' onClick={() => handleEditClick(ingredient)}>Edit</button>
                            </div>
                        )}

                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
