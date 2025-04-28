import { useState, useEffect } from 'react';
import { fetchAllIngredients, updateIngredient, fetchIngredientsInItem } from '../services/ingredientService';

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

    const editIngredient = async (ingredient) => {
        try {
            await updateIngredient(ingredient);
            setIngredients((prevIngredients) =>
                prevIngredients.map(i =>
                    i.ingredient_id === ingredient.ingredient_id ? {
                        ...i,
                        ingredient_name: ingredient.ingredient_name,
                        quantity: ingredient.quantity,
                        threshold: ingredient.threshold
                    } : i
                )
            );
            console.log(`Updated ingredient ${ingredient.ingredient_id}`);
        } catch (e) {
            console.error('Error updating ingredient quantity: ', e);
        }
    }

    const orderIngredient = async (ingredient, quantityToAdd) => {
        try {
            const newQuantity = Number(ingredient.quantity) + quantityToAdd;

            const updatedIngredient = {
                ...ingredient,
                quantity: newQuantity,
            };

            await updateIngredient(updatedIngredient);
            setIngredients((prevIngredients) =>
                prevIngredients.map(i =>
                    i.ingredient_id === ingredient.ingredient_id ? {
                        ...i,
                        ingredient_name: ingredient.ingredient_name,
                        quantity: newQuantity,
                        threshold: ingredient.threshold
                    } : i
                )
            );
            console.log(`Updated ingredient ${ingredient.ingredient_id}`);
        } catch (e) {
            console.error('Error updating ingredient quantity: ', e);
        }
    }

    const getIngredientsInItem = async (item) => {
        try {
            setIngredients(await fetchIngredientsInItem(item));
        } catch (e) {
            console.error('Error getting ingredients on item', e);
        }
    }

    const checkItemStock = async (item) => {
        try {
            console.log(item.item_name);
            const ingredientsInItem = await fetchIngredientsInItem(item);
            for (const ingredient of ingredientsInItem) {
                console.log(`${ingredient.ingredient_name} quantity: ${ingredient.quantity} threshold: ${ingredient.threshold}`);
                if (Number(ingredient.quantity) < Number(ingredient.threshold)) {
                    console.log(`Threshold met for ${ingredient.ingredient_name} in ${item.item_name}`);
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error("Error checking item stock:", error);
            return false;
        }
    }

    return { ingredients, loadingIngredient, errorIngredient,
        editIngredient, orderIngredient, getIngredientsInItem, checkItemStock };
}

export default useIngredient;
