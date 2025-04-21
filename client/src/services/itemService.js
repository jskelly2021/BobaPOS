import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Returns a list of items from the given category
export const fetchItems = async (category = null) => {
    let itemURL;
    if (!category) {
        itemURL = `${API_BASE_URL}/items`;
    }
    else {
        itemURL = `${API_BASE_URL}/items/category/${category}`;
    }

    try {
        const { data } = await axios.get(itemURL);
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch items: ${e.message}`);
    }
}

// Update Specific Item
export const updateItem = async (item) => {
    const updateURL = `${API_BASE_URL}/items/${item.item_id}`;

    try {
        const { data } = await axios.put(updateURL, {
            item_name: item.item_name,
            category: item.category,
            price: item.price,
            calories: item.calories,
            item_img: item.item_img,
            active: item.active
        });
        return data;
    } catch (e) {
        throw new Error(`Failed to update item ${e.message}`);
    }
}

// Create a new item
export const createItem = async (item) => {
    const createURL = `${API_BASE_URL}/items`;

    try {
        const { data } = await axios.post(createURL, {
            item_name: item.item_name,
            category: item.category,
            price: item.price,
            item_img: item.item_img,
            active: item.active
        });
        return data;
    } catch (e) {
        throw new Error(`Failed to create item ${e.message}`);
    }
}

// Delete an item
export const deleteItem = async (itemId) => {
    const deleteURL = `${API_BASE_URL}/items/${itemId}`;

    try {
        const { data } = await axios.delete(deleteURL);
        return data;
    } catch (e) {
        throw new Error(`Failed to delete item ${e.message}`);
    }
}

// Update item quantity
export const updateItemQuantity = async (itemId, quantity) => {
    const updateQuantityURL = `${API_BASE_URL}/items/${itemId}/quantity`;

    try {
        const { data } = await axios.put(updateQuantityURL, { quantity });
        return data;
    } catch (e) {
        throw new Error(`Failed to update item quantity ${e.message}`);
    }
}

// Retrieves the next available item id
export const getNextItemId = async () => {
    const url = `${API_BASE_URL}/items/next-id`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw new Error(`Failed to retrieve next item id: ${e.message}`);
    }
}