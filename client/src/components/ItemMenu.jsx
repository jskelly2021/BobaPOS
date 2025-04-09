import ItemButton from "./ItemButton";

function ItemMenu({ menuItems, onItemButtonClick}) {
    return (
        <div className='ItemMenu'>
            <h1>Cashier Menu</h1>

            <ul className='MenuItemList'>
                {menuItems.map((item) => (
                    <li key={item.id}> 
                        <ItemButton item={item} onClick={() => onItemButtonClick(item)}/>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default ItemMenu;
