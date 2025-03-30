import { useState, useEffect } from 'react';
import { fetchAllEmployees } from '../services/employeeService';

// Returns a list of all employees
const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEmployees = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchAllEmployees();
                setEmployees(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, []);

    return { employees, loading, error };
}

export default useEmployees;
