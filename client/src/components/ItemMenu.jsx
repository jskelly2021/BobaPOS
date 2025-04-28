import ItemButton from "./ItemButton";
import useIngredient from "../hooks/useIngredient";

function ItemMenu({ loadingItem, errorItem, menuItems, onItemButtonClick}) {
    const { checkItemStock } = useIngredient();

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    return (
        <div className='ItemMenu'>
            <ul className='MenuItemList'>
                {menuItems.map((item) => (
                    <li key={item.menuItemId}> 
                        {item.active === 1 && (async () => !(await checkItemStock(item)))()  && (
                        <ItemButton
                            item={item}
                            onClick={() => onItemButtonClick(item)}
                        />)}
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default ItemMenu;
