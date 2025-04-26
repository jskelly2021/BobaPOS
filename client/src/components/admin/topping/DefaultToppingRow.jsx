
const DefaultToppingRow = ({ topping, onEdit }) => {
    return (
        <>
            <p>{topping.topping_name}</p>
            <p>${topping.price}</p>
            <p>{topping.calories}</p>
            <div>
                <button className='EditBtn' onClick={() => onEdit(topping)}>Edit</button>
            </div>
        </>
    )
}

export default DefaultToppingRow;
