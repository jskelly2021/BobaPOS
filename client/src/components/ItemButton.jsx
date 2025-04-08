
const ItemButton = ({ item, onClick }) => {
    return (
        <button className='ItemButton' onClick={() => onClick(item)}>
            <img className='ItemImg' src={item.item_img} alt={item.item_name}></img>
            {item.item_name} - ${item.price}
        </button>
    );
};

export default ItemButton;
