const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Returns a list of all items from the backend
export const fetchItems = async () => {
    const itemURL = `${API_BASE_URL}/items`;

    try {
        const response = await fetch(itemURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        throw new Error('Failed to fetch items: ${e.message)');
    }
}
