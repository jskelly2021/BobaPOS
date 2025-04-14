import React, {useState} from 'react';
import useItems from '../../hooks/useItem';
import RadioSelector from './RadioSelector';

const ItemList = () => {
    const { items, loadingItem, errorItem, editItem, removeItem, addItem} = useItems();
    // Edit states
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({});

    // Add states
    const [addingItem, setAddingItem] = useState(false);
    const [addedItem, setAddedItem] = useState({});

    // Delete states
    const [deletingItem, setDeletingItem] = useState(false);
    const [deletedItem, setDeletedItem] = useState({});

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;


    // Edit functions
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

    // Add functions
    const handleAddItemClick = () => {
        setAddingItem(true);
        setAddedItem({ item_name: '', category: '', price: 0, active: 1 }); 
    }

    const handleAddFieldChange = (field, value) => {
        setAddedItem({
            ...addedItem,
            [field]: value
        });
    }

    const handleAddSaveClick = async () => {
        await addItem(addedItem);
        setAddingItem(false);
        setAddedItem({});
    }

    const handleCancelAddClick = () => {
        setAddingItem(false);
        setAddedItem({});
    }

    // Delete functions
    const handleDeleteClick = (item) => {
        setDeletingItem(item.item_id);
        setDeletedItem({...item});
    }

    const handleDeleteConfirm = async () => {
        await removeItem(deletingItem);
        setDeletingItem(false);
        setDeletedItem({});
    }   

    const handleDeleteCancel = () => {
        setDeletingItem(false);
        setDeletedItem({});
    }

    // Category and visibility options
    // Category options: BREWED, MILK, FRUIT, CREAMA

    const categoryOptions = [{ option: 'BREWED', value: 'BREWED' },
                             { option: 'MILK',   value: 'MILK' },
                             { option: 'FRUIT',  value: 'FRUIT' },
                             { option: 'CREAMA', value: 'CREAMA'}];

    const visibilityOptions = [{ option: 'Show', value: 1 },  { option: 'Hide',   value: 0 }];

    return (
        <div>
            <h2>Items</h2>

            {/* Add Item Section */}
            {addingItem ? (
                <div className="AddItemForm">
                    <h3>Add New Item</h3>
                    <input 
                        type="text"
                        placeholder="Item Name"
                        value={addedItem.item_name || ''}
                        onChange={(e) => handleAddFieldChange('item_name', e.target.value)}
                    />
                    <RadioSelector
                        name='category'
                        options={categoryOptions}
                        selectedValue={editedItem.category}
                        onChange={(value) => handleOnEditChange('category', value)}
                    />
                    <input 
                        type="text"
                        placeholder="Price"
                        value={addedItem.price || ''}
                        onChange={(e) => handleAddFieldChange('price', e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Image URL"
                        value={addedItem.item_img || ''}
                        onChange={(e) => handleAddFieldChange('item_img', e.target.value)}
                    />
                    <RadioSelector
                        name='visibility'
                        options={visibilityOptions}
                        selectedValue={addedItem.active}
                        onChange={(value) => handleAddFieldChange('active', value)}
                    />
                    <div className='AddItemBtns'>
                        <button className="SaveAddBtn" onClick={handleAddSaveClick}>Save</button>
                        <button className="CancelAddBtn" onClick={handleCancelAddClick}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button className="AddItemBtn" onClick={handleAddItemClick}>Add Item</button>
            )}
            {/* Item List Section */}
            <ul className='List ItemList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Category</h3>
                    <h3>Price</h3>
                    <h3>Image</h3>
                    {/*Image*/}
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
                                    <button className='SaveEditBtn'onClick={() => handleSaveClick(item)}>Save</button>
                                    <button className='CancelEditBtn' onClick={() => handleCancelClick()}>Cancel</button>
                                </div>

                            </>
                        ) : deletingItem === item.item_id ? (
                            <>
                                <p>Are you sure you want to delete {item.item_name}?</p>
                                <div>
                                    <button className='ConfirmDeleteBtn' onClick={handleDeleteConfirm}>Confirm</button>
                                    <button className='CancelDeleteBtn' onClick={handleDeleteCancel}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{item.item_name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <img className='ItemImg' src={item.item_img} alt={item.item_name} 
                                style={{ 
                                    display: 'block', 
                                    margin: '0 auto',
                                    width: '70px' , 
                                    height: 'auto'
                                    }}></img>

                                <p>{item.active ? 'Visible' : 'Hidden'}</p>
                                <div>
                                    <button className='EditBtn' onClick={() => handleEditClick(item)}>Edit</button>
                                    <button className='DeleteBtn' onClick={() => handleDeleteClick(item)}>Delete</button>
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
