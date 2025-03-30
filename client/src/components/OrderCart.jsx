import ItemButton from './ItemButton';

function OrderCart({ orderItems, onItemButtonClick }) {
    return (
        <div className='OrderCart'>
            <h2>Your Order</h2>

            <ul className='OrderItemList'>
                {orderItems.map((item) => (
                    <li key={item.id}> 
                        <ItemButton item={item} onClick={() => onItemButtonClick(item)}/>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default OrderCart;
