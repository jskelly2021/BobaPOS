import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchToppings = async () => {
    const res = await axios.get(`${API_BASE_URL}/toppings`);
    return res.data;
};

export const updateTopping = async (topping) => {
    const res = await axios.put(`${API_BASE_URL}/toppings/${topping.topping_id}`, {
        topping_name: topping.topping_name,
        calories: topping.calories
    });
    return res.data;
};

// Create a new topping
export const createTopping = async (topping) => {
    const createURL = `${API_BASE_URL}/toppings`;

    try {
        const { data } = await axios.post(createURL, {
            topping_id: topping.topping_id,
            topping_name: topping.topping_name,
            calories: topping.calories,
        });
        return data;
    } catch (e) {
        throw new Error(`Failed to create topping ${e.message}`);
    }
}

// Delete an topping
export const deleteTopping = async (topping) => {
    const deleteURL = `${API_BASE_URL}/toppings/${topping.topping_id}`;

    try {
        const { data } = await axios.delete(deleteURL);
        return data;
    } catch (e) {
        throw new Error(`Failed to delete topping ${e.message}`);
    }
}

// Retrieves the next available topping id
export const getNextToppingId = async () => {
    const url = `${API_BASE_URL}/toppings/next-id`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw new Error(`Failed to retrieve next topping id: ${e.message}`);
    }
}
