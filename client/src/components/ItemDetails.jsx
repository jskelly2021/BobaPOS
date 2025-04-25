
const ItemDetails = ({ item, ingredients, totalCalories, totalPrice }) => {
    return (
        <div className='ItemDetails'>
            <div className='DetailsContent'>
                <div className='ItemDescription'>
                    <h2>{item.item_name}</h2>
                    <div className='TotalPrice'>{totalPrice}</div>
                </div>

                <div className='HealthInfo'>
                    <h3>Health Information</h3>

                    <div className='ItemIngredients'>
                        <h4>Ingredients:</h4>
                        <ul className='IngredientsList'>
                            {ingredients.map((ingredient) => (
                                <li key={ingredient.ingredient_id}> 
                                    {ingredient.ingredient_name}
                                </li> 
                            ))}
                        </ul>
                    </div>

                    <div className='ItemCalories'>
                        <h4>Calories:</h4>
                        {totalCalories}
                    </div>
                </div>
            </div>

            <img className='ItemImg'
                src={item.item_img}
                alt={item.item_name}
            />
        </div>
    );
}

export default ItemDetails;
