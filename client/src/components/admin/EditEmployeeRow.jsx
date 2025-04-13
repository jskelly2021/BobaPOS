import RadioSelector from './RadioSelector';

const EditEmployeeRow = ({ employee, onEdit, saveEdit, cancelEdit }) => {
    const positionOptions = [{ option: 'MANAGER', value: 'MANAGER' }, { option: 'CASHIER', value: 'CASHIER' }];

    return (
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
                <button className='SaveEditBtn'onClick={() => saveEdit()}>Save</button>
                <button className='CancelEditBtn' onClick={() => cancelEdit()}>Cancel</button>
            </div>
        </>
    );
}

export default EditEmployeeRow;
