import React, { useState } from 'react';
import useEmployees from '../../hooks/useEmployee';
import RadioSelector from './RadioSelector';

const EmployeeList = () => 
{
    const { employees, loadingEmployee, errorEmployee, editEmployee, removeEmployee, addEmployee} = useEmployees();
    // Edit states
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({});

    // Add states
    const [addingEmployee, setAddingEmployee] = useState(false);
    const [addedEmployee, setAddedEmployee] = useState({});

    // Delete states
    const [deletingEmployee, setDeletingEmployee] = useState(false);
    const [deletedEmployee, setDeletedEmployee] = useState({});

    if (loadingEmployee) return <div>Loading employees...</div>;
    if (errorEmployee) return <div>Error fetching employees: {errorEmployee.message}</div>;

    // Edit functions
    const handleEditClick = (employee) => {
        setEditingEmployeeId(employee.employee_id);
        setEditedEmployee({ ...employee });
    };

    const handleCancelEditClick = () => {
        setEditingEmployeeId(null);
    };

    const handleOnEditChange = (field, value) => {
        setEditedEmployee({
            ...editedEmployee,
            [field]: value
        });
    };

    const handleSaveClick = async () => {
        await editEmployee(editedEmployee);
        setEditingEmployeeId(null);
    };

    // Add functions
    const handleAddEmployeeClick = () => {
        setAddingEmployee(true);
        setAddedEmployee({ employee_name: '', position: '', passwords: '' });
    };

    const handleAddFieldChange = (field, value) => {
        setAddedEmployee({
            ...addedEmployee,
            [field]: value
        });
    };

    const handleAddSaveClick = async () => {
        await addEmployee(addedEmployee);
        setAddingEmployee(false);
        setAddedEmployee({});
    };

    const handleCancelAddClick = () => {
        setAddingEmployee(false);
        setAddedEmployee({});
    };

    // Delete functions
    const handleDeleteClick = (employee) => {
        setDeletingEmployee(employee.employee_id);
        setDeletedEmployee({ ...employee });
    };

    const handleConfirmDeleteClick = async () => {
        await removeEmployee(deletedEmployee);
        setDeletingEmployee(false);
        setDeletedEmployee({});
    };


    const handleCancelDeleteClick = () => {
        setDeletingEmployee(false);
        setDeletedEmployee({});
    };

    return (

        <div>
            <h2>Employees</h2>

            {/* Add Employee Section */}
            {addingEmployee ? (
                <div className="AddEmployeeForm">
                    <h3>Add New Employee</h3>
                    <input 
                        type="text"
                        placeholder="Employee Name"
                        value={addedEmployee.employee_name || ''}
                        onChange={(e) => handleAddFieldChange('employee_name', e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Position"
                        value={addedEmployee.position || ''}
                        onChange={(e) => handleAddFieldChange('position', e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Password"
                        value={addedEmployee.passwords || ''}
                        onChange={(e) => handleAddFieldChange('passwords', e.target.value)}
                    />
                    <div>
                        <button className="SaveAddBtn" onClick={handleAddSaveClick}>Save</button>
                        <button className="CancelAddBtn" onClick={handleCancelAddClick}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button className="AddEmployeeBtn" onClick={handleAddEmployeeClick}>Add Employee</button>
            )}

            {/* Employee List */}
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

                                <input 
                                    type='text'
                                    value={editedEmployee.employee_name || ''}
                                    onChange={(e) => handleOnEditChange('employee_name', e.target.value)}
                                />
                                <input 
                                    type='text'
                                    value={editedEmployee.position || ''}
                                    onChange={(e) => handleOnEditChange('position', e.target.value)}
                                />
                                <input 
                                    type='text'
                                    value={editedEmployee.passwords || ''}
                                    onChange={(e) => handleOnEditChange('passwords', e.target.value)}
                                />
                                <div>
                                    <button className='SaveEditBtn' onClick={handleSaveClick}>Save</button>
                                    <button className='CancelEditBtn' onClick={handleCancelEditClick}>Cancel</button>
                                </div>
                            </>
                        ) : deletingEmployee === employee.employee_id ? (
                            <>
                                <p>Are you sure you want to delete {employee.employee_name}?</p>
                                <div>
                                    <button className='ConfirmDeleteBtn' onClick={handleConfirmDeleteClick}>Confirm</button>
                                    <button className='CancelDeleteBtn' onClick={handleCancelDeleteClick}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{employee.employee_name}</p>
                                <p>{employee.employee_id}</p>
                                <p>{employee.position}</p>
                                <p>{employee.passwords}</p>
                                <div>
                                    <button className='EditBtn' onClick={() => handleEditClick(employee)}>Edit</button>
                                    <button className='DeleteBtn' onClick={() => handleDeleteClick(employee)}>Delete</button>
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
