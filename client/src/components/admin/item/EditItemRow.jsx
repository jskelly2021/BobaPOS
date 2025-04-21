import { useState } from 'react';
import RadioSelector from '../RadioSelector';

const EditItemRow = ({ item, onEdit, onSave, onCancel, deleteItem }) => {
    const [deletingItem, setDeletingItem] = useState(false);
    const [deletedItem, setDeletedItem] = useState({});

    const handleDeleteClick = (item) => {
        setDeletingItem(item.item_id);
        setDeletedItem({ ...item });
    };

    const handleConfirmDeleteClick = () => {
        deleteItem(deletedItem);
        setDeletingItem(false);
        setDeleteItem({});
    };

    const handleCancelDeleteClick = () => {
        setDeletingItem(false);
        setDeleteItem({});
    };

    const categoryOptions = [{ option: 'BREWED', value: 'BREWED' },
                            { option: 'MILK',   value: 'MILK' },
                            { option: 'FRUIT',  value: 'FRUIT' },
                            { option: 'CREAMA', value: 'CREAMA'}];

    const visibilityOptions = [{ option: 'Show', value: 1 },  { option: 'Hide',   value: 0 }];

    return (
        <>
            { deletingItem === item.item_id ? (
                <>
                    <p>Are you sure you want to delete {item.item_name}?</p>
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
                            value={editedItem.item_name || ''}
                            onChange={(e) => handleOnEditChange('item_name', e.target.value)}
                        />
                    </div>

                    <RadioSelector
                        name='category'
                        options={categoryOptions}
                        selectedValue={editedItem.category}
                        onChange={(value) => handleOnEditChange('category', value)}
                    />

                    <div>
                        <input 
                            type='number' 
                            value={editedItem.price || ''}
                            onChange={(e) => handleOnEditChange('price', e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type='number'
                            value={editedItem.calories || ''}
                            onChange={(e) => handleOnEditChange('calories', e.target.value)}
                        />
                    </div>

                    <div>
                        <input 
                            type='text'
                            value={editedItem.item_img || ''}
                            onChange={(e) => handleOnEditChange('item_img', e.target.value)}
                        />
                    </div>

                    <RadioSelector
                        name='visibility'
                        options={visibilityOptions}
                        selectedValue={editedItem.active}
                        onChange={(value) => handleOnEditChange('active', value)}
                    />

                    <div className='Save-Cancel-Btns'>
                        <button className='SaveEditBtn'onClick={() => onSave(item)}>Save</button>
                        <button className='CancelEditBtn' onClick={() => onCancel()}>Cancel</button>
                        <button className='DeleteBtn' onClick={() => handleDeleteClick(item)}>Delete</button>
                    </div>
                </>
            )}
        </>
    );
}

export default EditItemRow;
