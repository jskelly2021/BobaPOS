import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './CashierOrderView.css'

import useOrderItem from '../hooks/useOrderItem';
import useItem from '../hooks/useItem';
import ItemMenu from '../components/ItemMenu'
import OrderCart from '../components/OrderCart';
import CategorySelector from '../components/CategorySelector';
import ToppingsModule from '../components/ToppingsModule';
import useToppings from '../hooks/useToppings';

function OrderView() {
    const nav = useNavigate();
    const { items, loadingItem, errorItem, updateCategory, getCategory } = useItem("BREWED");
    const { orderItems, addToOrder, removeFromOrder } = useOrderItem(nav);
    const { toppings, defaultToppings, getDefaultToppings } = useToppings();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = async (item) => {
        await getDefaultToppings(item);
        setSelectedItem(item);
    };

    const handleAddWithToppings = (item, selectedToppings, quantity) => {
        const itemWithToppings = {
            ...item,
            toppings: selectedToppings,
            quantity: quantity
        };
        addToOrder(itemWithToppings);
        setSelectedItem(null);
    };

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    return (
        <div className='OrderView CashierOrderView'>
            <button className='DashboardBtn' onClick={() => nav('/dashboard')}>
                Dashboard
            </button>

            <div className='content'>
                <CategorySelector changeCategory={updateCategory} />
                <h1>{getCategory()}</h1>
                <ItemMenu menuItems={items} onItemButtonClick={handleItemClick} />
                <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />
            </div>

            <button className='ReviewOrderBtn' onClick={() => nav('/review')}>
                Review Order
            </button>

            {selectedItem && (
                <ToppingsModule
                    item={selectedItem}
                    toppings={toppings}
                    defaultToppings={defaultToppings}
                    onConfirm={handleAddWithToppings}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
}

export default OrderView;
