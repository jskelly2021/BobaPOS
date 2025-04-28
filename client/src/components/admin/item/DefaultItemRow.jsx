
const DefaultItemRow = ({ item, onEdit, onOpenToppings, onOpenIngredients }) => {
    return (
        <>
            <p>{item.item_name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p>{item.calories}</p>
            <img className='ItemImg' src={item.item_img} alt={item.item_name}/>
            <p>{item.active ? 'Visible' : 'Hidden'}</p>
            <div className='DefaultBtns'>
                <button className='EditBtn' onClick={() => onEdit(item)}>Edit</button>
                <button onClick={() => onOpenToppings(item)}>Toppings</button>
                <button onClick={() => onOpenIngredients(item)}>Ingredients</button>
            </div>
        </>
    )
}

export default DefaultItemRow;
