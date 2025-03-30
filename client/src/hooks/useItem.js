import { useState, useEffect } from 'react';
import { fetchItems } from '../services/itemService';

// Returns a list of all items
const useItem = () => {
    const [items, setItems] = useState([]);
    const [loadingItem, setLoading] = useState(true);
    const [errorItem, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchItems();
                setItems(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    return { items, loadingItem, errorItem };
}

export default useItem;
