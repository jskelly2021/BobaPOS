import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './CustomerOrderView.css'

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
    const { items, loadingItem, errorItem, displayedCategory, updateCategory, getCategory } = useItem("RECOMMENDED");
    const { orderItems, addToOrder, removeFromOrder, updateItemInOrder, orderPrice } = useOrderItem(nav);
    const { toppings, defaultToppings, getDefaultToppings, setDefaultToppings } = useToppings();
    const { itemIngredients, getIngredientsInItem } = useIngredient()
    const [selectedItem, setSelectedItem] = useState(null);
    const [customizeMode, setCustomizeMode] = useState('order');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.body.classList.add('customer-page');
        return () => {
            document.body.classList.remove('customer-page');
        };
    }, []);

    const handleMenuItemClick = async (item) => {
        setCustomizeMode('ordering');
        await getIngredientsInItem(item);
        await getDefaultToppings(item);
        setSelectedItem(item);
    };

    const handleOrderItemClick = async (item) => {
        setCustomizeMode('editing');
        await getIngredientsInItem(item);
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

    return (
        <div className='OrderView CustomerOrderView'>
            <div className='content'>
                <div className="SearchContainer">
                    <input
                        type="text"
                        placeholder="Search for a drink..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="SearchBar"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="ClearSearchBtn"
                        >
                            Clear
                        </button>
                    )}
                </div>
                <CategorySelector currentCategory={displayedCategory} changeCategory={updateCategory} />

                {(() => {
                    const { title, sub } = getCategory();
                    return (
                        <>
                            <h1>{title}</h1>
                            {sub && <h2>{sub}</h2>}
                        </>
                    );
                })()}
                <ItemMenu
                    loadingItem={loadingItem}
                    errorItem={errorItem}
                    menuItems={items.filter(item =>
                        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                    onItemButtonClick={handleMenuItemClick}
                />
                      
                <OrderCart orderItems={orderItems} onItemButtonClick={handleOrderItemClick} />
            </div>

            <div className='UtilBar'>
                <button className='CancelBtn' onClick={() => nav('/welcome')}>
                    Cancel Order
                </button>

                <div className="Separator"></div>

                <button className="OrderPriceLabel">
                    {'$' + orderPrice()}
                </button>

                <button className='ReviewOrderBtn' onClick={() => nav('/review')}>
                    Review Order
                </button>
            </div>

            {selectedItem && (
                <ToppingsModule
                    item={selectedItem}
                    itemIngredients={itemIngredients}
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
