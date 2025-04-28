import { useState } from 'react';
import StatusLabel from './StatusLabel';

const EditIngredientRow = ({ ingredient, onEdit, onSave, onCancel, onDelete }) => {
    const [deletingIngredient, setDeletingIngredient] = useState(false);
    const [deletedIngredient, setDeletedIngredient] = useState({});

    const handleDeleteClick = (ingredient) => {
        setDeletingIngredient(ingredient.ingredient_id);
        setDeletedIngredient({ ...ingredient });
    };

    const handleConfirmDeleteClick = () => {
        onDelete(deletedIngredient);
        setDeletingIngredient(false);
        setDeletedIngredient({});
    };

    const handleCancelDeleteClick = () => {
        setDeletingIngredient(false);
        setDeletedIngredient({});
    };

    return (
        <>
        { deletingIngredient === ingredient.ingredient_id ? (
            <>
            <p>Are you sure you want to delete {ingredient.ingredient_name}?</p>
            <div>
                <button className='ConfirmDeleteBtn' onClick={handleConfirmDeleteClick}>Confirm</button>
                <button className='CancelDeleteBtn' onClick={handleCancelDeleteClick}>Cancel</button>
            </div>
            </>
        )
        : (
            <>
            <div>
                <input 
                    type='text'
                    value={ingredient.ingredient_name || ''}
                    onChange={(e) => onEdit('ingredient_name', e.target.value)}
                />
            </div>

            <div>
                <input
                    type='number'
                    value={ingredient.quantity || ''}
                    onChange={(e) => onEdit('quantity', e.target.value)}
                />
            </div>

            <div>
                <input
                    type='number'
                    value={ingredient.threshold || ''}
                    onChange={(e) => onEdit('threshold', e.target.value)}
                />
            </div>

            <div></div>

            <StatusLabel ingredient={ingredient} />

            <div className='Save-Cancel-Btns'>
                <button className='SaveEditBtn'onClick={() => onSave(ingredient)}>Save</button>
                <button className='CancelEditBtn' onClick={() => onCancel()}>Cancel</button>
                <button className='DeleteBtn' onClick={() => handleDeleteClick(ingredient)}>Delete</button>
            </div>
        </>
        )}
        </>
    );
}

export default EditIngredientRow;
