
const DefaultToppingRow = ({ topping, onEdit }) => {
    return (
        <>
            <p>{topping.topping_name}</p>
            <p>price coming soon...</p>
            <p>{topping.calories}</p>
            <div>
                <button className='EditBtn' onClick={() => onEdit(topping)}>Edit</button>
            </div>
        </>
    )
}

export default DefaultToppingRow;
