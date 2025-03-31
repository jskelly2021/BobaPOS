import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Returns a list of all items from the backend
export const fetchItems = async () => {
    const itemURL = `${API_BASE_URL}/items`;

    try {
        const { data } = await axios.get(itemURL);
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch items: ${e.message}`);
    }
}
