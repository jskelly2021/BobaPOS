import { useState, useEffect } from 'react';
import { fetchAllIngredients } from '../services/ingredientService';

// Returns a list of all ingredients
const useIngredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loadingIngredients, setLoading] = useState(true);
    const [errorIngredients, setError] = useState(null);

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

    return { ingredients, loadingIngredients, errorIngredients };
}

export default useIngredients;
