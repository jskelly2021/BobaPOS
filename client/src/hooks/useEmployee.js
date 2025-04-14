import { useState, useEffect } from 'react';
import { fetchAllEmployees, updateEmployee, deleteEmployee, createEmployee, getNextEmployeeId} from '../services/employeeService';

// Returns a list of all employees
const useEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [category, setCategory] = useState(null);
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

    const removeEmployee = async (employee) => {
        try {
            await deleteEmployee(employee);
            setEmployees(prevEmployees => prevEmployees.filter(e => e.employee_id !== employee.employee_id));
            console.log(`Deleted employee ${employee.employee_name}`);
        } catch (e) {
            console.error('Error deleting employee: ', e);
        }
    }

    const addEmployee = async (employee) => {
        try {
            console.log(employee.employee_id);
            const newEmployee = await createEmployee(employee);
            setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
            console.log(`Created employee ${newEmployee.employee_id}`);
        } catch (e) {
            console.error('Error creating employee: ', e);
        }
    }

    const nextId = async () => {
        try {
            const nextId = await getNextEmployeeId();
            return nextId
        } catch (e) {
            console.error('Error retrieving next employee id: ', e);
        }
    }

    return { employees, loadingEmployee, errorEmployee, editEmployee, removeEmployee, addEmployee, nextId };
}

export default useEmployee;
