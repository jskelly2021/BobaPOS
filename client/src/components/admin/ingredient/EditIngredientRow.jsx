
const EditIngredientRow = ({ ingredient, onSave, onCancel }) => {
    return (
        <>
        <div>
            <input 
                type='text'
                value={ingredient.ingredient_name || ''}
                onChange={(e) => handleOnEditChange('ingredient_name', e.target.value)}
            />
        </div>

        <p>{ingredient.quantity}</p>

        <div>
            <input
                type='number'
                value={ingredient.threshold || ''}
                onChange={(e) => handleOnEditChange('threshold', e.target.value)}
            />
        </div>

        <StatusLabel ingredient={ingredient} />

        <div className='Save-Cancel-Btns'>
            <button className='SaveEditBtn'onClick={() => onSave(ingredient)}>Save</button>
            <button className='CancelEditBtn' onClick={() => onCancel()}>Cancel</button>
        </div>
    </>
    );
}

export default EditIngredientRow;
