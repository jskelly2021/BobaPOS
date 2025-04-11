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
                    <h3>Visibility</h3>
                    <div></div>
                </li>
                {items.map((item) => (
                    <li key={item.item_id}>
                        {editingItemId === item.item_id ? (
                            <>
                                <input 
                                    type='text'
                                    value={editedItem.item_name || ''}
                                    onChange={(e) => handleOnEditChange('item_name', e.target.value)}/>

                                <div className='RadioBtns'>
                                    <label>
                                        <input type="radio" name="category" value="BREWED"
                                            checked={editedItem.category === 'BREWED'}
                                            onChange={(e) => handleOnEditChange('category', e.target.value)}
                                        />
                                        BREWED
                                    </label>

                                    <label>
                                        <input type="radio" name="category" value="MILK"
                                            checked={editedItem.category === 'MILK'}
                                            onChange={(e) => handleOnEditChange('category', e.target.value)}
                                        />
                                        MILK
                                    </label>

                                    <label>
                                        <input type="radio" name="category" value="FRUIT"
                                            checked={editedItem.category === 'FRUIT'}
                                            onChange={(e) => handleOnEditChange('category', e.target.value)}
                                        />
                                        FRUIT
                                    </label>

                                    <label>
                                        <input type="radio" name="category" value="CREAMA"
                                            checked={editedItem.category === 'CREAMA'}
                                            onChange={(e) => handleOnEditChange('category', e.target.value)}
                                        />
                                        CREAMA
                                    </label>
                                </div>

                                <input 
                                    type='number' 
                                    value={editedItem.price || ''}
                                    onChange={(e) => handleOnEditChange('price', e.target.value)}/>

                                <div className='RadioBtns'>
                                    <label>
                                        <input type="radio" name="visibility" value='1'
                                            checked={editedItem.active === 1}
                                            onChange={(e) => handleOnEditChange('active', 1)}
                                        />
                                        Show
                                    </label>

                                    <label>
                                        <input type="radio" name="visibility" value='0'
                                                checked={editedItem.active === 0}
                                                onChange={(e) => handleOnEditChange('active', 0)}
                                            />
                                        Hide
                                    </label>
                                </div>

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
