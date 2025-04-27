import React, { useState } from 'react';
import useIngredient from '../../../hooks/useIngredient';
import DefaultIngredientRow from './DefaultIngredientRow';
import EditIngredientRow from './EditIngredientRow';

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
                            <EditIngredientRow
                                ingredient={ingredient}
                                onSave={handleSaveClick}
                                onCancel={handleCancelClick}
                            />
                        ) : (
                            <DefaultIngredientRow
                                ingredient={ingredient}
                            />
                        )}
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
