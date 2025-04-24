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
export const updateIngredientQuantity = async (ingredientId, newQuantity) => {
    const updateURL = `${API_BASE_URL}/ingredients/${ingredientId}`;

    try {
        const { data } = await axios.put(updateURL, { quantity: newQuantity }, {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to upate ingredient ${e.message}`);
    }
}

// Returns all ingredients in a given item
export const fetchIngredientsInItem = async (item) => {
    const fetchURL = `${API_BASE_URL}/toppings/item/${item.item_id}`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch ingredients: ${e.message}`);
    }
}
