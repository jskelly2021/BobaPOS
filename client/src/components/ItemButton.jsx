
const ItemButton = ({ item, onClick}) => {
    return (
        <button className='ItemButton' onClick={() => onClick(item)}>
            {item.item_name} - ${item.price}
        </button>
    );
};

export default ItemButton;
