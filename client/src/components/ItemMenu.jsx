import ItemButton from "./ItemButton";

function ItemMenu({ menuItems, onItemButtonClick}) {
    return (
        <div className='ItemMenu'>
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
