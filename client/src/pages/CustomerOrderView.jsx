import React from 'react';
import { useNavigate } from 'react-router-dom';

import './CustomerOrderView.css'

import useOrderItem from '../hooks/useOrderItem';
import useItem from '../hooks/useItem';
import ItemMenu from '../components/ItemMenu'
import OrderCart from '../components/OrderCart';
import CategorySelector from '../components/CategorySelector';


function OrderView() {
    const nav = useNavigate();
    const { items, loadingItem, errorItem, updateCategory, getCategory } = useItem("BREWED");
    const { orderItems, addToOrder, removeFromOrder, orderPrice } = useOrderItem(nav);

    return (
        <div className='OrderView CustomerOrderView'>

            <div className='content'>
                <CategorySelector changeCategory={updateCategory} />
                <h1>{getCategory()}</h1>
                <ItemMenu loadingItem={loadingItem} errorItem={errorItem} menuItems={items} onItemButtonClick={addToOrder} />
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
        </div>
    );
}

export default OrderView;
