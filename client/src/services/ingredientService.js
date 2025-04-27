import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Returns a list of all ingredients from the backend
export const fetchAllIngredients = async () => {
    const fetchURL = `${API_BASE_URL}/ingredients`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch ingredients: ${e.message}`);
    }
}

// Updates the quantity of specific ingredient
export const updateIngredient = async (ingredient) => {
    const updateURL = `${API_BASE_URL}/ingredients/${ingredient.ingredient_id}`;

    try {
        const { data } = await axios.put(updateURL, {
                ingredient_name: ingredient.ingredient_name,
                quantity: ingredient.quantity,
                threshold: ingredient.threshold
            },
            {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to upate ingredient ${e.message}`);
    }
}

// Returns all ingredients in a given item
export const fetchIngredientsInItem = async (item) => {
    const fetchURL = `${API_BASE_URL}/ingredients/item/${item.item_id}`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch ingredients: ${e.message}`);
    }
}
