import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Returns a list of all employees from the backend
export const fetchAllEmployees = async () => {
    const itemURL = `${API_BASE_URL}/employees`;

    try {
        const { data } = await axios.get(itemURL, {withCredentials: true});
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
        }, {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to update employee ${e.message}`);
    }
}

// Deletes a specific employee
export const deleteEmployee = async (employee) => {
    const deleteURL = `${API_BASE_URL}/employees/${employee.employee_id}`;

    try {
        const { data } = await axios.delete(deleteURL, {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to delete employee: ${e.message}`);
    }
}

// Creates a new employee
export const createEmployee = async (employee) => {
    const createURL = `${API_BASE_URL}/employees`;

    try {
        const { data } = await axios.post(createURL, {
            employee_name: employee.employee_name,
            employee_id: employee.employee_id,
            position: employee.position,
            passwords: employee.passwords
        }, 
        {withCredentials: true});
        console.log(`Created employee: `, data);
        return data;
    } catch (e) {
        throw new Error(`Failed to create employee: ${e.message}`);
    }
}

// Retrieves the next available employee id
export const getNextEmployeeId = async () => {
    const url = `${API_BASE_URL}/employees/next-id`;
    try {
        const { data } = await axios.get(url, {withCredentials: true});
        return data;
    } catch (e) {
        throw new Error(`Failed to retrieve next employee id: ${e.message}`);
    }
}
