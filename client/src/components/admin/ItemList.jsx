import React, {useState} from 'react';
import useItems from '../../hooks/useItem';
import RadioSelector from './RadioSelector';

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

    const categoryOptions = [{ option: 'BREWED', value: 'BREWED' },
                             { option: 'MILK',   value: 'MILK' },
                             { option: 'FRUIT',  value: 'FRUIT' },
                             { option: 'CREAMA', value: 'CREAMA'}];

    const visibilityOptions = [{ option: 'Show', value: 1 },  { option: 'Hide',   value: 0 }];

    return (
        <div>
            <h2>Items</h2>

            <ul className='List ItemList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Category</h3>
                    <h3>Price</h3>
                    <h3>Visibility</h3>
                    <div></div>
                </li>
                {items.map((item) => (
                    <li key={item.item_id}>
                        {editingItemId === item.item_id ? (
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

                                <RadioSelector
                                    name='visibility'
                                    options={visibilityOptions}
                                    selectedValue={editedItem.active}
                                    onChange={(value) => handleOnEditChange('active', value)}
                                />

                                <div className='Save-Cancel-Btns'>
                                    <button className='SaveEditBtn'onClick={() => handleSaveClick(item)}>Save</button>
                                    <button className='CancelEditBtn' onClick={() => handleCancelClick()}>Cancel</button>
                                </div>

                            </>
                        ) : (
                            <>
                                <p>{item.item_name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <p>{item.active ? 'Visible' : 'Hidden'}</p>
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
