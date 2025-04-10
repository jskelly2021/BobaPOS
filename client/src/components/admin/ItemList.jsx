import React, {useState} from 'react';
import useItems from '../../hooks/useItem';

const ItemList = () => {
    const { items, loadingItem, errorItem, editItem} = useItems();
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({});

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    const handleEditClick = (item) => {
        setEditingItemId(item.item_id);
        setEditedItem({...item});
    }

    const handleCancelClick = () => {
        setEditingItemId(null);
    }

    const handleOnEditChange = (field, value) => { 
        setEditedItem({
            ...editedItem,
            [field]: value
        })
    }

    const handleSaveClick = async () => {
        await editItem(editedItem);
        setEditingItemId(null);
    }


    return (
        <div>
            <h2>Items</h2>

            <ul className='List ItemList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Category</h3>
                    <h3>Price</h3>
                    <h3>Active</h3>
                    <div></div>
                </li>
                {items.map((item) => (
                    <li key={item.item_id}>
                        {editingItemId === item.item_id ? (
                            <>
                                <input 
                                    type='text'
                                    value={editedItem.item_name || ''}
                                    onChange={(e) => handleOnEditChange('item_name', e.target.value)}>
                                </input>
                                <input 
                                    type='text'
                                    value={editedItem.category || ''}
                                    onChange={(e) => handleOnEditChange('category', e.target.value)}>
                                </input>
                                <input 
                                    type='number' 
                                    value={editedItem.price || ''}
                                    onChange={(e) => handleOnEditChange('price', e.target.value)}>
                                </input>
                                <input 
                                    type='checkbox'
                                    checked={editedItem.active || false}
                                    onChange={(e) => handleOnEditChange('active', e.target.checked)}>
                                </input>
                                <button className='SaveEditBtn'onClick={() => handleSaveClick(item)}>Save</button>
                                <button className='CancelEditBtn' onClick={() => handleCancelClick()}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>{item.item_name}</h3>
                                <h3>{item.category}</h3>
                                <h3>{item.price}</h3>
                                <h3>{item.active ? 1 : 0}</h3>
                                <div>
                                    <button className='EditBtn' onClick={() => handleEditClick(item)}>Edit</button>
                                </div>
                            </>
                        )}
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
