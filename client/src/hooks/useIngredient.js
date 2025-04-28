import { useState, useEffect } from 'react';
import { fetchAllIngredients, updateIngredient, 
    fetchIngredientsInItem, createIngredient, deleteIngredient, getNextIngredientId } from '../services/ingredientService';

// Returns a list of all ingredients
const useIngredient = () => {
    const [ingredients, setIngredients] = useState([]);
    const [itemIngredients, setItemIngredients] = useState([]);
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

    const removeIngredient = async (ingredient) => {
        try {
            await deleteIngredient(ingredient);
            setIngredients(prevIngredients => prevIngredients.filter(i => i.ingredient_id !== ingredient.ingredient_id));
            console.log(`Deleted ingredient ${ingredient.ingredient_name}`);
        } catch (e) {
            console.error('Error deleting ingredient: ', e);
        }
    }

    const addIngredient = async (ingredient) => {
        try {
            const newIngredient = await createIngredient(ingredient);
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
            console.log(`Created ingredient ${newIngredient.ingredient_id}`);
        } catch (e) {
            console.error('Error creating ingredient: ', e);
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
            setItemIngredients(await fetchIngredientsInItem(item));
        } catch (e) {
            console.error('Error getting ingredients on item', e);
        }
    }

    const nextId = async () => {
        try {
            const nextId = await getNextIngredientId();
            return nextId
        } catch (e) {
            console.error('Error retrieving next Ingredient id: ', e);
        }
    }

    return { ingredients, itemIngredients, loadingIngredient, errorIngredient,
        addIngredient, removeIngredient, editIngredient, orderIngredient, getIngredientsInItem, nextId };
}

export default useIngredient;
