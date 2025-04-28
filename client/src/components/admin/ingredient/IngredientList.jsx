import React, { useState } from 'react';
import useIngredient from '../../../hooks/useIngredient';
import DefaultIngredientRow from './DefaultIngredientRow';
import EditIngredientRow from './EditIngredientRow';

const IngredientList = () => {
    const { ingredients, loadingIngredient, errorIngredient, editIngredient, orderIngredient } = useIngredient();
    const [editingIngredientId, setEditingIngredientId] = useState(null);
    const [editedIngredient, setEditedIngredient] = useState({});

    if (loadingIngredient) return <div>Loading ingredients...</div>;
    if (errorIngredient) return <div>Error fetching ingredients: {errorIngredient.message}</div>;

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
                                ingredient={editedIngredient}
                                onEdit={handleOnEditChange}
                                onSave={handleSaveClick}
                                onCancel={handleCancelClick}
                            />
                        ) : (
                            <DefaultIngredientRow
                                ingredient={ingredient}
                                onEdit={handleEditClick}
                                orderIngredient={orderIngredient}
                            />
                        )}
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
