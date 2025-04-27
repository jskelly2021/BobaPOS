import StatusLabel from './StatusLabel';

const EditIngredientRow = ({ ingredient, onEdit, onSave, onCancel }) => {
    return (
        <>
        <div>
            <input 
                type='text'
                value={ingredient.ingredient_name || ''}
                onChange={(e) => onEdit('ingredient_name', e.target.value)}
            />
        </div>

        <div>
            <input
                type='number'
                value={ingredient.quantity || ''}
                onChange={(e) => onEdit('quantity', e.target.value)}
            />
        </div>

        <div>
            <input
                type='number'
                value={ingredient.threshold || ''}
                onChange={(e) => onEdit('threshold', e.target.value)}
            />
        </div>

        <div></div>

        <StatusLabel ingredient={ingredient} />

        <div className='Save-Cancel-Btns'>
            <button className='SaveEditBtn'onClick={() => onSave(ingredient)}>Save</button>
            <button className='CancelEditBtn' onClick={() => onCancel()}>Cancel</button>
        </div>
    </>
    );
}

export default EditIngredientRow;
