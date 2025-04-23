import ItemButton from "./ItemButton";

function ItemMenu({ loadingItem, errorItem, menuItems, onItemButtonClick}) {
    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    return (
        <div className='ItemMenu'>
            <ul className='MenuItemList'>
                {menuItems.map((item) => (
                    <li key={item.id}> 
                        <ItemButton item={item} onClick={() => onItemButtonClick(item, 'order')}/>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default ItemMenu;
