
const DefaultItemRow = ({ item, onEdit }) => {
    return (
        <>
            <p>{item.item_name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p>{item.calories}</p>
            <img className='ItemImg' src={item.item_img} alt={item.item_name} 
            style={{ 
                display: 'block', 
                margin: '0 auto',
                width: '70px' , 
                height: 'auto'
                }}></img>

            <p>{item.active ? 'Visible' : 'Hidden'}</p>
            <div>
                <button className='EditBtn' onClick={() => onEdit(item)}>Edit</button>
                <button className='DeleteBtn' onClick={() => onEdit(item)}>Delete</button>
            </div>
        </>
    )
}

export default DefaultItemRow;
