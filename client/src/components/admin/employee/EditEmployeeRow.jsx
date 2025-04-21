import { useState } from 'react';
import RadioSelector from '../RadioSelector';

const EditEmployeeRow = ({ employee, onEdit, onSave, onCancel, deleteEmployee }) => {
    const [deletingEmployee, setDeletingEmployee] = useState(false);
    const [deletedEmployee, setDeletedEmployee] = useState({});

    const positionOptions = [{ option: 'MANAGER', value: 'MANAGER' }, { option: 'CASHIER', value: 'CASHIER' }];

    const handleDeleteClick = (employee) => {
        setDeletingEmployee(employee.employee_id);
        setDeletedEmployee({ ...employee });
    };

    const handleConfirmDeleteClick = () => {
        deleteEmployee(deletedEmployee);
        setDeletingEmployee(false);
        setDeletedEmployee({});
    };

    const handleCancelDeleteClick = () => {
        setDeletingEmployee(false);
        setDeletedEmployee({});
    };

    return (
        <>
            {deletingEmployee === employee.employee_id ? (
                <>
                    <p>Are you sure you want to delete {employee.employee_name}?</p>
                    <div>
                        <button className='ConfirmDeleteBtn' onClick={() => handleConfirmDeleteClick()}>Confirm</button>
                        <button className='CancelDeleteBtn' onClick={() => handleCancelDeleteClick()}>Cancel</button>
                    </div>
                </>
            )
            : (
                <>
                    <div>
                        <input 
                            type='text'
                            value={employee.employee_name || ''}
                            onChange={(e) => onEdit('employee_name', e.target.value)}/>
                    </div>

                    <p>{employee.employee_id}</p>

                    <RadioSelector
                        name='position'
                        options={positionOptions}
                        selectedValue={employee.position}
                        onChange={(value) => onEdit('position', value)}
                    />

                    <div>
                        <input 
                            type='text'
                            value={employee.passwords || ''}
                            onChange={(e) => onEdit('passwords', e.target.value)}/>
                    </div>

                    <div className='Save-Cancel-Btns'>
                        <button className='SaveEditBtn'onClick={() => onSave()}>Save</button>
                        <button className='CancelEditBtn' onClick={() => onCancel()}>Cancel</button>
                        <button className='DeleteBtn' onClick={() => handleDeleteClick(employee)}>Delete</button>
                    </div>
                </>
            )}
        </>
    );
}

export default EditEmployeeRow;
