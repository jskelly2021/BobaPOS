
const ItemButton = ({ item, onClick }) => {
    return (
        <button className='ItemButton' onClick={() => onClick(item)}>
            <img className='ItemImg' src={item.item_img} alt={item.item_name}></img>
            <div className='ItemDetails'>
                <p className='ItemName'>{item.item_name}</p>
                <p className='ItemPrice'>{item.price}</p>
                <p className='ItemTopping'>
                    {item.toppings && item.toppings.length > 0 ? (
                    item.toppings.map((topping) => (topping.quantity > 0 && (
                    <p key={topping.topping_id}>
                        {topping.topping_name} {topping.quantity === 1 ? "(Regular)" : topping.quantity === 0.5 ? "(Light)" : ""}
                    </p>)))) : ( <p></p> )}
                </p>
            </div>
        </button>
    );
};

export default ItemButton;
