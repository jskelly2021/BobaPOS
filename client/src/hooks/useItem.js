import { useState, useEffect } from 'react';
import { fetchItems, updateItem } from '../services/itemService';

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
                    active: item.active
                } : i
            )
          );
          console.log(`Updated item ${item.item_id}`);
        } catch (e) {
          console.error('Error updating item: ', e);
        }
      };

    return { items, loadingItem, errorItem, updateCategory, editItem};
}

export default useItem;
