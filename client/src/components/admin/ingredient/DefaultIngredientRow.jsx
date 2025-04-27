import StatusLabel from './StatusLabel';

const DefaultIngredientRow = ({ ingredient, onEdit,  }) => {
    return (
        <>
            <p>{ingredient.ingredient_name}</p>
            <p>{ingredient.quantity}</p>

            <div className='Threshold'>
                <p>{ingredient.threshold}</p>
            </div>

            <div className='DefaultBtns'>
                <button className='EditBtn' onClick={() => onEdit(ingredient)}>Edit</button>
            </div>

            <div className='OrderProductForm'>
                <input 
                    type='number' 
                    min='0.1'
                    value={orderAmounts[ingredient.ingredient_id] || ''}
                    onChange={(e) => handleOnInputChange(ingredient, e.target.value)}
                    placeholder='Enter Amount'>
                </input>

                <button className='OrderBtn' onClick={() => handleOrderBtnClick(ingredient)}>
                    Order
                </button>
            </div>

            <StatusLabel ingredient={ingredient} />
        </>
    );
}

export default DefaultIngredientRow;
