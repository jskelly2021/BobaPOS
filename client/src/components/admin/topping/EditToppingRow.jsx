import { useState } from 'react';

const EditToppingRow = ({ topping, onEdit, onSave, onCancel, deleteTopping }) => {
    const [deletingTopping, setDeletingTopping] = useState(false);
    const [deletedTopping, setDeletedTopping] = useState({});

    const handleDeleteClick = (topping) => {
        setDeletingTopping(topping.topping_id);
        setDeletedTopping({ ...topping });
    };

    const handleConfirmDeleteClick = () => {
        deleteTopping(deletedTopping);
        setDeletingTopping(false);
        setDeletedTopping({});
    };

    const handleCancelDeleteClick = () => {
        setDeletingTopping(false);
        setDeletedTopping({});
    };

    return (
        <>
            { deletingTopping === topping.topping_id ? (
                <>
                    <p>Are you sure you want to delete {topping.topping_name}?</p>
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
                            value={topping.topping_name || ''}
                            onChange={(e) => onEdit('topping_name', e.target.value)}
                        />
                    </div>

                    <div>
                        <input 
                            type='number' 
                            value={topping.calories || ''}
                            onChange={(e) => onEdit('calories', e.target.value)}
                        />
                    </div>

                    <div className='Save-Cancel-Btns'>
                        <button className='SaveEditBtn'onClick={() => onSave(topping)}>Save</button>
                        <button className='CancelEditBtn' onClick={() => onCancel()}>Cancel</button>
                        <button className='DeleteBtn' onClick={() => handleDeleteClick(topping)}>Delete</button>
                    </div>
                </>
            )}
        </>
    );
}

export default EditToppingRow;
