import { useState, useEffect } from 'react';
import { fetchAllEmployees } from '../services/employeeService';

// Returns a list of all employees
const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loadingEmployees, setLoading] = useState(true);
    const [errorEmployees, setError] = useState(null);

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

    return { employees, loadingEmployees, errorEmployees };
}

export default useEmployees;
