
const ItemButton = ({ item, onClick }) => {
    return (
        <button className='ItemButton' onClick={() => onClick(item)}>
            <img className='ItemImg'
                src={item.item_img}
                alt={item.item_name}
            />

            <div className='ItemDetails'>
                <p className='ItemName'>
                    {item.item_name}
                </p>

                <p className='ItemPrice'>
                    {item.price}
                </p>

                <p className='ItemQuantity'>
                    Quantity: {item.quantity}
                </p>

                <div className='ItemTopping'>
                    <strong>Toppings: </strong>
                        {item.toppings?.length > 0 ? (
                            item.toppings
                                .filter(t => t.quantity !== 0 && t.quantity !== 'none')
                                .map((topping, i) => (
                                    <span key={i}>
                                        {topping.topping_name} ({topping.quantity})
                                        {i < item.toppings.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                        ) : (
                            <span>None</span>
                        )}
                    </div>
            </div>
        </button>
    );
};

export default ItemButton;
