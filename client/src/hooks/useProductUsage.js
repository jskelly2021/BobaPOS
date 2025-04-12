import { useState, useEffect } from 'react';
import { fetchIngredientUsage } from '../services/analyticsService';

const useProductUsage = () => {
    const [usageData, setUsageData] = useState([]);
    const [ingredientId, setIngredientId] = useState(1);
    const [interval, setInterval] = useState('day');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsageData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchItems(category);
                setUsageData(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadUsageData();
    }, [ingredientId, interval]);

    return { usageData, loading, error };
}

export default useProductUsage;
