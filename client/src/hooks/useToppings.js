import { useState, useEffect } from 'react';
import { fetchToppings, updateTopping } from '../services/toppingService';

const useTopping = () => {
    const [toppings, setToppings] = useState([]);
    const [loadingTopping, setLoading] = useState(true);
    const [errorTopping, setError] = useState(null);

    useEffect(() => {
        const loadToppings = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchToppings();
                setToppings(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadToppings();
    }, []);

    const editTopping = async (topping) => {
        try {
            await updateTopping(topping);
            setToppings(prev =>
                prev.map(t =>
                    t.topping_id === topping.topping_id
                        ? { ...t, ...topping }
                        : t
                )
            );
        } catch (e) {
            console.error("Failed to update topping:", e);
        }
    };

    return { toppings, loadingTopping, errorTopping, editTopping };
};

export default useTopping;
