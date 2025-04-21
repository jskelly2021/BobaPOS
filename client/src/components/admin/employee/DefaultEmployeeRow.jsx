
const DefaultEmployeeRow = ({ employee, onEdit }) => {
    return (
        <>
            <p>{employee.employee_name}</p>
            <p>{employee.employee_id}</p>
            <p>{employee.position}</p>
            <p>{employee.passwords}</p>
            <div>
                <button className='EditBtn' onClick={() => onEdit(employee)}>Edit</button>
            </div>
        </>
    )
}

export default DefaultEmployeeRow;
