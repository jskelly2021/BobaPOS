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
        setDeletedItem({});
    };

    const handleCancelDeleteClick = () => {
        setDeletingItem(false);
        setDeletedItem({});
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
                            value={item.item_name || ''}
                            onChange={(e) => onEdit('item_name', e.target.value)}
                        />
                    </div>

                    <RadioSelector
                        name='category'
                        options={categoryOptions}
                        selectedValue={item.category}
                        onChange={(value) => onEdit('category', value)}
                    />

                    <div>
                        <input 
                            type='number' 
                            value={item.price || ''}
                            onChange={(e) => onEdit('price', e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type='number'
                            value={item.calories || ''}
                            onChange={(e) => onEdit('calories', e.target.value)}
                        />
                    </div>

                    <div>
                        <input 
                            type='text'
                            value={item.item_img || ''}
                            onChange={(e) => onEdit('item_img', e.target.value)}
                        />
                    </div>

                    <button>Set Toppings</button>


                    <RadioSelector
                        name='visibility'
                        options={visibilityOptions}
                        selectedValue={item.active}
                        onChange={(value) => onEdit('active', value)}
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
