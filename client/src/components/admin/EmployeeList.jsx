import React, { useState } from 'react';
import useEmployees from '../../hooks/useEmployee';

const EmployeeList = () => {
    const { employees, loadingEmployee, errorEmployee } = useEmployees();
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    if (loadingEmployee) return <div>Loading employees...</div>;
    if (errorEmployee) return <div>Error fetching employees: {errorEmployee.message}</div>;

    return(
        <div>
            <h2>Employees</h2>
            <ul className='List EmployeeList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Position</h3>
                    <h3>Password</h3>
                    <div></div>
                </li>
                {employees.map((employee) => (
                    <li key={employee.employee_id}>
                        {editingEmployeeId === employee.employee_id ? (
                            <>
                                <input type='text'></input>
                                <input type='text'></input>
                                <input type='text'></input>
                                <div>
                                    <button className='CancelEditBtn'>Cancel</button>
                                    <button className='SaveEditBtn'>Save</button>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <p>{employee.employee_name}</p>
                                <p>{employee.position}</p>
                                <p>{employee.passwords}</p>
                                <div>
                                    <button className='EditBtn'>Edit</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeList;
