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


// Create a new ingredient
export const createIngredient = async (ingredient) => {
    const createURL = `${API_BASE_URL}/ingredients`;

    try {
        const { data } = await axios.post(createURL, {
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.ingredient_name,
            category: ingredient.category,
            quantity: ingredient.quantity,
            threshold: ingredient.threshold
        }, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to create ingredient ${e.message}`);
    }
}

// Delete an ingredient
export const deleteIngredient = async (ingredient) => {
    const deleteURL = `${API_BASE_URL}/ingredients/${ingredient.ingredient_id}`;

    try {
        const { data } = await axios.delete(deleteURL, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to delete ingredient ${e.message}`);
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

// Retrieves the next available ingredient id
export const getNextIngredientId = async () => {
    const url = `${API_BASE_URL}/ingredients/next-id`;
    try {
        const { data } = await axios.get(url, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to retrieve next ingredient id: ${e.message}`);
    }
}

// Updates the ingredients on an item
export const updateIngredientInItem = async (item, ingredients) => {
    const url = `${API_BASE_URL}/ingredients/item/${item.item_id}`;
    try {

        const currentIngredients = new Map(
            (await fetchIngredientsInItem(item)).map(i => [i.ingredient_id, i.quantity])
        );

        for (const ingredient of ingredients) {
            const body = {
                ingredient_id: ingredient.ingredient_id,
                quantity: ingredient.quantity
            }

            const isExisting = currentIngredients.has(ingredient.ingredient_id);

            if (!isExisting) {
                if (ingredient.quantity === 0) continue;
                await axios.post(url, body, { withCredentials: true });
            }
            else {
                if (currentIngredients[ingredient.ingredient_id] === ingredient.quantity) continue;
                await axios.put(url, body, { withCredentials: true });
            }
        }
    } catch (e) {
        throw new Error(`Failed to update the ingredient quantities in item: ${e.message}`);
    }
}
