
const ItemButton = ({ item, onClick }) => {
    return (
        <button className='ItemButton' onClick={() => onClick(item)}>
            <img className='ItemImg' src={item.item_img} alt={item.item_name}></img>
            <div className='ItemDetails'>
                <p className='ItemName'>{item.item_name}</p>
                <p className='ItemPrice'>{item.price}</p>
            </div>
        </button>
    );
};

export default ItemButton;
