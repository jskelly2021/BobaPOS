
const DefaultToppingRow = ({ topping }) => {
    return (
        <>
            <p>{topping.topping_name}</p>
            <p>{topping.calories}</p>
            <div>
                <button className='EditBtn' >Edit</button>
            </div>
        </>
    )
}

export default DefaultToppingRow;
