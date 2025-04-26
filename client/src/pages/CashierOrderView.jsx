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
import useIngredient from '../hooks/useIngredient';

function OrderView() {
    const nav = useNavigate();
    const { items, loadingItem, errorItem, updateCategory, getCategory } = useItem("RECOMMENDED");
    const { orderItems, addToOrder, removeFromOrder, updateItemInOrder } = useOrderItem(nav);
    const { toppings, defaultToppings, getDefaultToppings, setDefaultToppings } = useToppings();
    const { ingredients, getIngredientsInItem } = useIngredient()
    const [selectedItem, setSelectedItem] = useState(null);
    const [customizeMode, setCustomizeMode] = useState('order');

    const handleMenuItemClick = async (item) => {
        setCustomizeMode('ordering');
        await getIngredientsInItem(item);
        await getDefaultToppings(item);
        setSelectedItem(item);
    };

    const handleOrderItemClick = async (item) => {
        setCustomizeMode('editing');
        setDefaultToppings(item.toppings);
        setSelectedItem(item);
    };

    const handleAddWithToppings = (item, selectedToppings, quantity, totalPrice) => {
        const itemWithToppings = {
            ...item,
            toppings: selectedToppings,
            quantity: quantity,
            priceWithToppings: totalPrice
        };

        if (customizeMode === 'ordering') {
            addToOrder(itemWithToppings);
        }
        else if (customizeMode === 'editing') {
            updateItemInOrder(itemWithToppings);
        }

        setSelectedItem(null);
    };

    const handleRemoveFromOrder = (item) => {
        removeFromOrder(item);
        setSelectedItem(null);
    }

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
                <ItemMenu menuItems={items} onItemButtonClick={handleMenuItemClick} />
                <OrderCart orderItems={orderItems} onItemButtonClick={handleOrderItemClick} />
            </div>

            <button className='ReviewOrderBtn' onClick={() => nav('/review')}>
                Review Order
            </button>

            {selectedItem && (
                <ToppingsModule
                    item={selectedItem}
                    ingredients={ingredients}
                    toppings={toppings}
                    defaultToppings={defaultToppings}
                    onConfirm={handleAddWithToppings}
                    onClose={() => setSelectedItem(null)}
                    onRemove={handleRemoveFromOrder}
                    mode={customizeMode}
                />
            )}
        </div>
    );
}

export default OrderView;
