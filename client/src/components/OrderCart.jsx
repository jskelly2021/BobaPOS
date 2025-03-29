import ItemList from './ItemList';

function OrderCart({ orderItems, onItemButtonClick }) {
    return (
        <div className='OrderCart'>
            <h2>Your Order</h2>
            <ul>
                <ItemList items={orderItems} onItemButtonClick={onItemButtonClick} />
            </ul>
        </div>
    );
}

export default OrderCart;
