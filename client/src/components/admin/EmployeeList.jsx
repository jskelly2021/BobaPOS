import React from 'react';
import useEmployees from '../../hooks/useEmployee';

const EmployeeList = () => {
    const { employees, loadingEmployee, errorEmployee } = useEmployees();

    if (loadingEmployee) return <div>Loading employees...</div>;
    if (errorEmployee) return <div>Error fetching employees: {errorEmployee.message}</div>;

    return(
        <div>
            <h2>Employees</h2>
            <ul className='List EmployeeList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Position</h3>
                </li>
                {employees.map((employee) => (
                    <li key={employee.employee_id}> 
                        <p>{employee.employee_name}</p>
                        <p>{employee.position}</p>
                    </li> 
            ))}
            </ul>
        </div>
    );
}

export default EmployeeList;
