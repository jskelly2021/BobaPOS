import ItemButton from "./ItemButton";

function MenuItemsList({ menuItems, onItemButtonClick}) {
    return (
        <div className='ItemSelection'>
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

export default MenuItemsList;
