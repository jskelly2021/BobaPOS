import { useState, useEffect } from 'react';
import { fetchAllIngredients } from '../services/ingredientService';

// Returns a list of all ingredients
const useIngredient = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loadingIngredient, setLoading] = useState(true);
    const [errorIngredient, setError] = useState(null);

    useEffect(() => {
        const loadIngredients = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchAllIngredients();
                setIngredients(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadIngredients();
    }, []);

    return { ingredients, loadingIngredient, errorIngredient };
}

export default useIngredient;
