import { useState, useEffect } from 'react';
import { fetchAllIngredients, updateIngredientQuantity } from '../services/ingredientService';

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

    const updateQuantity = async (ingredientId, quantityToAdd) => {
        try {
            const ingredient = ingredients.find(i => i.ingredient_id === ingredientId);
            if (!ingredient)
                return;

            const newQuantity = Number(ingredient.quantity) + quantityToAdd;

            await updateIngredientQuantity(ingredientId, newQuantity);
            console.log(`Updated ingredient ${ingredientId}: New quantity = ${newQuantity}`);
            
        } catch (e) {
            console.error('Error updating ingredient quantity: ', e.message());
        }
    }

    return { ingredients, loadingIngredient, errorIngredient, updateQuantity };
}

export default useIngredient;
