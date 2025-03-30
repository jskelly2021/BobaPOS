import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Returns a list of all employees from the backend
export const fetchAllEmployees = async () => {
    const itemURL = `${API_BASE_URL}/employees`;

    try {
        const { data } = await axios.get(itemURL);
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch employees: ${e.message}`);
    }
}
