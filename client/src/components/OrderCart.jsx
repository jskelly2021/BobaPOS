import ItemList from './ItemList';

function OrderCart() {
    return (
        <div>
            <h2>Your Order</h2>
            <ul>
                <ItemList />
            </ul>
        </div>
    );
}

export default OrderCart;
