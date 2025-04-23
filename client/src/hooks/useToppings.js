import { useState, useEffect } from 'react';
import { fetchToppings, updateTopping, createTopping, deleteTopping, getNextToppingId,
    getDefaultToppingsOnItem, updateDefaultToppingsOnItem } from '../services/toppingService';

const useTopping = () => {
    const [toppings, setToppings] = useState([]);
    const [defaultToppings, setDefaultToppings] = useState([]);
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


    const removeTopping = async (topping) => {
        try {
            await deleteTopping(topping);
            setToppings(prevToppings => prevToppings.filter(t => t.topping_id !== topping.topping_id));
            console.log(`Deleted topping ${topping.topping_name}`);
        } catch (e) {
            console.error('Error deleting topping: ', e);
        }
    }

    const addTopping = async (topping) => {
        try {
            const newTopping = await createTopping(topping);
            setToppings(prevToppings => [...prevToppings, newTopping]);
            console.log(`Created topping ${newTopping.topping_id}`);
        } catch (e) {
            console.error('Error creating topping: ', e);
        }
    }

    const nextId = async () => {
        try {
            const nextId = await getNextToppingId();
            return nextId
        } catch (e) {
            console.error('Error retrieving next Topping id: ', e);
        }
    }

    const getDefaultToppings = async (item) => {
        try {
            setDefaultToppings(await getDefaultToppingsOnItem(item));
        } catch (e) {
            console.error('Error retrieving default toppings: ', e);
        }
    }

    const updateDefaultToppings = async (item, defaultToppings) => {
        try {
            await updateDefaultToppingsOnItem(item, defaultToppings);
        } catch (e) {
            console.error('Error updating default toppings: ', e);
        }
    }

    return { toppings, defaultToppings, loadingTopping, errorTopping,
        editTopping, removeTopping, addTopping, nextId, getDefaultToppings, updateDefaultToppings};
};

export default useTopping;
