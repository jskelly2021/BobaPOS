import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Returns a list of all ingredients from the backend
export const fetchAllIngredients = async () => {
    const itemURL = `${API_BASE_URL}/ingredients`;

    try {
        const { data } = await axios.get(itemURL);
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch ingredients: ${e.message}`);
    }
}
