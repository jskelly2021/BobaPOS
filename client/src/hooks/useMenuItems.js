import { useState, useEffect } from 'react';
import { fetchItems } from '../services/itemService';

const useMenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMenuItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchItems();
                setMenuItems(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadMenuItems();
    }, []);

    return { menuItems, loading, error };
}

export default useMenuItems;
