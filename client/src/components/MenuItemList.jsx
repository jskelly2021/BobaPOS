import ItemButton from "./ItemButton";

function MenuItemList({ menuItems, onItemButtonClick}) {
    return (
        <div className='MenuItemList'>
            <h1>Cashier Menu</h1>

            <ul className='ItemList'>
                {menuItems.map((item) => (
                    <li key={item.id}> 
                        <ItemButton item={item} onClick={() => onItemButtonClick(item)}/>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default MenuItemList;
