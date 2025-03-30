import React from 'react';
import useEmployees from '../../hooks/useEmployee';

const EmployeeList = () => {
    const { employees, loadingEmployee, errorEmployee } = useEmployees();

    if (loadingEmployee) return <div>Loading employees...</div>;
    if (errorEmployee) return <div>Error fetching employees: {errorEmployee.message}</div>;

    return(
        <ul>
        {employees.map((employee) => (
            <li key={employee.id}> 
                <p>{employee.employee_name}</p>
                <p>{employee.position}</p>
            </li> 
        ))}
    </ul>
    );
}

export default EmployeeList;
