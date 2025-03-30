import React from 'react';
import useEmployees from '../hooks/useEmployees';

const EmployeeList = () => {
    const { employees, loadingEmployees, errorEmployees } = useEmployees();

    if (loadingEmployees) return <div>Loading employees...</div>;
    if (errorEmployees) return <div>Error fetching employees: {errorEmployees.message}</div>;

    return(
        <ul>
        {employees.map((employee) => (
            <li key={employee.id}> 
                {employee.employee_name}
            </li> 
        ))}
    </ul>
    );
}

export default EmployeeList;
