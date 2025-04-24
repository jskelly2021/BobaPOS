import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchToppings = async () => {
    const res = await axios.get(`${API_BASE_URL}/toppings`, {
        withCredentials: true
    });
    return res.data;
};

export const updateTopping = async (topping) => {
    const res = await axios.put(`${API_BASE_URL}/toppings/${topping.topping_id}`, {
        topping_name: topping.topping_name,
        calories: topping.calories
    }, {withCredentials: true});
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
        }, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to create topping ${e.message}`);
    }
}

// Delete an topping
export const deleteTopping = async (topping) => {
    const deleteURL = `${API_BASE_URL}/toppings/${topping.topping_id}`;

    try {
        const { data } = await axios.delete(deleteURL, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to delete topping ${e.message}`);
    }
}

// Retrieves the next available topping id
export const getNextToppingId = async () => {
    const url = `${API_BASE_URL}/toppings/next-id`;
    try {
        const { data } = await axios.get(url, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to retrieve next topping id: ${e.message}`);
    }
}

// Retrieves the default toppings on an item
export const getDefaultToppingsOnItem = async (item) => {
    const url = `${API_BASE_URL}/toppings/default/${item.item_id}`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw new Error(`Failed to retrieve default toppings on: ${item.item_name}`);
    }
}

// Updates the default toppings on an item
export const updateDefaultToppingsOnItem = async (item, toppings) => {
    const url = `${API_BASE_URL}/toppings/default/${item.item_id}`;
    try {

        const currentToppings = new Map(
            (await getDefaultToppingsOnItem(item)).map(t => [t.topping_id, t.quantity])
        );

        console.log(currentToppings);

        for (const topping of toppings) {
            const body = {
                topping_id: topping.topping_id,
                quantity: topping.quantity
            }

            const isExisting = currentToppings.has(topping.topping_id);

            if (!isExisting) {
                if (topping.quantity === 'none') continue;
                await axios.post(url, body);
            }
            else {
                if (currentToppings[topping.topping_id] === topping.quantity) continue;
                await axios.put(url, body);
            }
        }
    } catch (e) {
        throw new Error(`Failed to retrieve default toppings on item: ${item.item_id}`);
    }
}
