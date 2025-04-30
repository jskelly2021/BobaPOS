import React from 'react';
import ItemButton from './ItemButton';

function ItemMenu({ loadingItem, errorItem, menuItems, onItemButtonClick }) {
  if (loadingItem) return <div>Loading items…</div>;
  if (errorItem)   return <div>Error fetching items: {errorItem.message}</div>;

  // 1) Filter first
  const activeItems = menuItems.filter(item => item.active === 1);

  return (
      <ul className="MenuItemList">
      {activeItems.map(item => (
          <li key={item.id || item.menuItemId}>

            <ItemButton
              item={item}
              onClick={() => onItemButtonClick(item)}
            />
          </li>
        ))}
      </ul>
  );
}

export default ItemMenu;
