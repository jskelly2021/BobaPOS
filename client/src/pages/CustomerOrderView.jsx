import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CustomerOrderView.css'

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
    const { orderItems, addToOrder, removeFromOrder, orderPrice } = useOrderItem(nav);
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

    return (
        <div className='OrderView CustomerOrderView'>
            <div className='content'>
                <CategorySelector changeCategory={updateCategory} />
                <h1>{getCategory()}</h1>
                <ItemMenu loadingItem={loadingItem} errorItem={errorItem} menuItems={items} onItemButtonClick={handleItemClick} />
                <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />
            </div>

            <div className='UtilBar'>
                <button className='CancelBtn' onClick={() => nav('/welcome')}>
                    Cancel Order
                </button>

                <button className='LanguagesBtn'>
                    Languages
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
                    toppings={toppings}
                    defaultToppings={defaultToppings}
                    onConfirm={handleAddWithToppings}
                    onClose={() => setSelectedItem(null)}
                    mode={'order'}
                />
            )}
        </div>
    );
}

export default OrderView;
