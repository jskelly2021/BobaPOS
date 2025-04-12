import React, { useState } from 'react';
import useEmployees from '../../hooks/useEmployee';
import RadioSelector from './RadioSelector';

const EmployeeList = () => {
    const { employees, loadingEmployee, errorEmployee, editEmployee } = useEmployees();
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({});

    if (loadingEmployee) return <div>Loading employees...</div>;
    if (errorEmployee) return <div>Error fetching employees: {errorEmployee.message}</div>;

    const handleEditClick = (employee) => {
        setEditingEmployeeId(employee.employee_id);
        setEditedEmployee({...employee});
    }

    const handleCancelClick = () => {
        setEditingEmployeeId(null);
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

    const positionOptions = [{ option: 'MANAGER', value: 'MANAGER' }, { option: 'CASHIER', value: 'CASHIER' }];

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
                            <>
                                <div>
                                    <input 
                                        type='text'
                                        value={editedEmployee.employee_name || ''}
                                        onChange={(e) => handleOnEditChange('employee_name', e.target.value)}/>
                                </div>

                                <p>{employee.employee_id}</p>

                                <RadioSelector
                                    name='position'
                                    options={positionOptions}
                                    selectedValue={editedEmployee.position}
                                    onChange={(value) => handleOnEditChange('position', value)}
                                />

                                <div>
                                    <input 
                                        type='text'
                                        value={editedEmployee.passwords || ''}
                                        onChange={(e) => handleOnEditChange('passwords', e.target.value)}/>
                                </div>

                                <div className='Save-Cancel-Btns'>
                                    <button className='SaveEditBtn'onClick={() => handleSaveclick(employee)}>Save</button>
                                    <button className='CancelEditBtn' onClick={() => handleCancelClick()}>Cancel</button>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <p>{employee.employee_name}</p>
                                <p>{employee.employee_id}</p>
                                <p>{employee.position}</p>
                                <p>{employee.passwords}</p>
                                <div>
                                    <button className='EditBtn' onClick={() => handleEditClick(employee)}>Edit</button>
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
