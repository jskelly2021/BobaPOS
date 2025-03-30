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

// Updates a specific employee
export const updateEmployee = async (employee) => {
    const updateURL = `${API_BASE_URL}/employees/${employee.employee_id}`;

    try {
        const { data } = await axios.put(updateURL, {
            employee_name: employee.employee_name,
            position: employee.position,
            passwords: employee.passwords
        });
        return data;
    } catch (e) {
        throw new Error(`Failed to update employee ${e.message}`);
    }
}
