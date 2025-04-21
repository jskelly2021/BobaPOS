import React, {useState} from 'react';
import useItems from '../../../hooks/useItem';
import DefaultItemRow from './DefaultItemRow';
import EditItemRow from './EditItemRow';

const ItemList = () => {
    const { items, loadingItem, errorItem, editItem, removeItem, addItem, nextId} = useItems();
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

    const handleAddItem = async () => {
        const id = await nextId();

        const newItem = {
            item_id: id,
            item_name: '',
        };
        await addItem(newItem);
        setEditingItemId(newItem.Item_id);
        setEditedItem({...newItem});
    }

    return (
        <div>
            <h2>Items</h2>
            <ul className='List ItemList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Category</h3>
                    <h3>Price</h3>
                    <h3>Calroies</h3>
                    <h3>Image</h3>
                    <h3>Visibility</h3>
                    <div></div>
                </li>
                {items.map((item) => (
                    <li key={item.item_id}>
                        {editingItemId === item.item_id ? (
                            <EditItemRow 
                                item={editedItem}
                                onEdit={handleOnEditChange}
                                onSave={handleSaveClick}
                                onCancel={handleCancelClick}
                                deleteItem={removeItem}
                            />
                        )
                        : (
                            <DefaultItemRow
                                item={item}
                                onEdit={handleEditClick}
                            />
                        )}
                    </li> 
                ))}
                <button className="AddItemBtn" onClick={() => handleAddItem()}>Add Item</button>
            </ul>
        </div>
    );
}

export default ItemList;
