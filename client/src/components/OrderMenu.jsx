import ItemList from './ItemList';

function OrderMenu({ menuItems, onItemButtonClick}) {
    return (
        <div className='OrderMenu'>
            <h1>Cashier Menu</h1>
            <ItemList items={menuItems} onItemButtonClick={onItemButtonClick} />
        </div>
    );
}

export default OrderMenu;
