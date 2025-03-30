import { useState, useEffect } from 'react';
import { fetchAllEmployees, updateEmployee } from '../services/employeeService';

// Returns a list of all employees
const useEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loadingEmployee, setLoading] = useState(true);
    const [errorEmployee, setError] = useState(null);

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

    const editEmployee = async (employee) => {
        try {
            await updateEmployee(employee);

            setEmployees(prevEmployees =>
                prevEmployees.map(e =>
                    e.employee_id === employee.employee_id ? { 
                        ...e,
                        employee_name: employee.employee_name,
                        position: employee.position,
                        passwords: employee.passwords
                    } : e
                )
            );
            console.log(`Updated employee ${employee.employee_id}`);
        } catch (e) {
            console.error('Error updating employee: ', e);
        }
    }

    return { employees, loadingEmployee, errorEmployee, editEmployee };
}

export default useEmployee;
