import { useState, useEffect } from 'react';
import { fetchItems, updateItem, createItem, deleteItem, getNextItemId } from '../services/itemService';

// Returns a list of items
const useItem = (defaultCategory = null) => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState(defaultCategory);
    const [loadingItem, setLoading] = useState(true);
    const [errorItem, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchItems(category);
                setItems(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, [category]);

    const updateCategory = (newCategory) => {
        setCategory(newCategory);
    }

    const editItem = async (item) => {
        try {
            await updateItem(item);

            setItems(prevItems =>
                prevItems.map(i =>
                    i.item_id === item.item_id ? {
                        ...i,
                        item_name: item.item_name,
                        category: item.category,
                        price: item.price,
                        calories: item.calories,
                        item_img: item.item_img,
                        active: item.active
                    } : i
                )
            );
            console.log(`Updated item ${item.item_id}`);
        } catch (e) {
            console.error('Error updating item: ', e);
        }
      };

    const removeItem = async (itemId) => {
        try {
            await deleteItem(itemId);
            setItems(prevItems => prevItems.filter(i => i.item_id !== itemId));
            console.log(`Deleted item ${itemId}`);
        } catch (e) {
            console.error('Error deleting item: ', e);
        }
    }

    const addItem = async (item) => {
        try {
            const newItem = await createItem(item);
            setItems(prevItems => [...prevItems, newItem]);
            console.log(`Created item ${newItem.item_id}`);
        } catch (e) {
            console.error('Error creating item: ', e);
        }
    }

    const getCategory = () => 
    {
        switch (category) {
            case "BREWED":
                return "Brewed Tea";
            case "MILK":
                return "Milk Tea";
            case "FRUIT":
                return "Fruit Tea";
            case "CREAMA":
                return "Creama";
            default:
                break;
        }
    }

    const nextId = async () => {
        try {
            const nextId = await getNextItemId();
            return nextId
        } catch (e) {
            console.error('Error retrieving next Item id: ', e);
        }
    }

    return { items, loadingItem, errorItem, updateCategory, editItem, removeItem, addItem, getCategory, nextId};
}

export default useItem;
