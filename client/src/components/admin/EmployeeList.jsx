import React, { useState } from 'react';
import useEmployees from '../../hooks/useEmployee';
import EditEmployeeRow from './EditEmployeeRow';
import DefaultEmployeeRow from './DefaultEmployeeRow';

const EmployeeList = () => {
    const { employees, loadingEmployee, errorEmployee, editEmployee, removeEmployee, addEmployee, nextId} = useEmployees();
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({});

    if (loadingEmployee) return <div>Loading employees...</div>;
    if (errorEmployee) return <div>Error fetching employees: {errorEmployee.message}</div>;

    const handleEditClick = (employee) => {
        setEditingEmployeeId(employee.employee_id);
        setEditedEmployee({...employee});
    }

    const handleOnEditChange = (field, value) => {
        setEditedEmployee({
            ...editedEmployee,
            [field]: value
        })
    }

    const handleSaveclick = async () => {
        await editEmployee(editedEmployee);
        setEditingEmployeeId(null);
    }

    const handleCancelClick = () => {
        setEditingEmployeeId(null);
        setEditedEmployee({});
    }

    const handleAddEmployee = async () => {
        const newEmployee = {
            employee_name: '',
            employee_id: nextId(),
            position: 'CASHIER',
            passwords: ''
        };
        await addEmployee(newEmployee);
    }

    return(
        <div>
            <h2>Employees</h2>
            <ul className='List EmployeeList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Id</h3>
                    <h3>Position</h3>
                    <h3>Password</h3>
                    <div></div>
                </li>
                {employees.map((employee) => (
                    <li key={employee.employee_id}>
                        {editingEmployeeId === employee.employee_id ? (
                            <EditEmployeeRow 
                                employee={editedEmployee}
                                onEdit={handleOnEditChange}
                                onSave={handleSaveclick}
                                onCancel={handleCancelClick}
                                deleteEmployee={removeEmployee}
                            />
                        )
                        : (
                            <DefaultEmployeeRow
                                employee={employee}
                                onEdit={handleEditClick}
                            />
                        )}
                    </li>
                ))}
            </ul>

            <button className="AddEmployeeBtn" onClick={() => handleAddEmployee()}>Add Employee</button>
        </div>
    );
}

export default EmployeeList;
