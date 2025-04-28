import React, { useState } from 'react';
import useItems from '../../../hooks/useItem';
import EditItemRow from './EditItemRow';
import DefaultItemRow from './DefaultItemRow';
import useToppings from '../../../hooks/useToppings';
import useIngredient from '../../../hooks/useIngredient';
import ToppingsModule from '../../ToppingsModule';
import IngredientModal from '../../IngredientModal';

const ItemList = () => {
    const { items, loadingItem, errorItem, editItem, removeItem, addItem, nextId} = useItems();
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const { toppings, defaultToppings, getDefaultToppings, updateDefaultToppings } = useToppings();
    const { ingredients, itemIngredients, getIngredientsInItem, updateItemIngredientQuantities } = useIngredient();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showToppings, setShowToppings] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    const handleEditClick = (item) => {
        setEditingItemId(item.item_id);
        setEditedItem({...item});
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

    const handleCancelClick = () => {
        setEditingItemId(null);
        setEditedItem({});
    }

    const handleAddItem = async () => {
        const id = await nextId();

        const newItem = {
            item_id: id,
            item_name: '',
            category: '',
            price: 0,
            calories: 0,
            item_img: '',
            active: 1
        };
        await addItem(newItem);
        setEditingItemId(newItem.item_id);
        setEditedItem({...newItem});
    }

    const handleOpenToppingsClick = async (item) => {
        await getDefaultToppings(item);
        setShowToppings(true);
        setSelectedItem(item);
    };

    const handleUpdateDefaultToppings = async (item, selectedToppings) => {
        await updateDefaultToppings(item, selectedToppings)
        setShowToppings(false);
        setSelectedItem(null);
    };

    const handleOpenIngredientsClick = async (item) => {
        await getIngredientsInItem(item);
        setShowIngredients(true);
        setSelectedItem(item);
    }

    const handleUpdateItemIngredients = async (item, ingredientQuantities) => {
        await updateItemIngredientQuantities(item, ingredientQuantities);
        setShowIngredients(false);
        setSelectedItem(null);
    }

    const handleCancelToppings = () => {
        setShowToppings(false);
        setSelectedItem(null);
    }

    const handleCancelIngredients = () => {
        setShowIngredients(false);
        setSelectedItem(null);
    }

    return (
        <div>
            <h2>Items</h2>
            <ul className='List ItemList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Category</h3>
                    <h3>Price</h3>
                    <h3>Calories</h3>
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
                                onOpenToppings={handleOpenToppingsClick}
                                onOpenIngredients={handleOpenIngredientsClick}
                            />
                        )}
                    </li> 
                ))}
                <button className="AddItemBtn" onClick={() => handleAddItem()}>Add Item</button>
            </ul>

            {selectedItem && showToppings && (
                <ToppingsModule
                    item={selectedItem}
                    itemIngredients={[]}
                    toppings={toppings}
                    defaultToppings={defaultToppings}
                    onConfirm={handleUpdateDefaultToppings}
                    onClose={handleCancelToppings}
                    mode={'admin'}
                />
            )}

            {selectedItem && showIngredients && (
                <IngredientModal
                    item={selectedItem}
                    ingredients={ingredients}
                    itemIngredients={itemIngredients}
                    onConfirm={handleUpdateItemIngredients}
                    onClose={handleCancelIngredients}
                />
            )}
        </div>
    );
}

export default ItemList;
