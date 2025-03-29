
export const fetchItems = async () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const itemURL = `${API_BASE_URL}/items`;
    try {
        const response = await fetch(itemURL);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
    } catch (e) {
        setError(e);
    } finally {
        setLoading(false);
    }
}
