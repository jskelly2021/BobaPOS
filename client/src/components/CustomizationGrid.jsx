
const CustomizationGrid = ({ toppings, selectedToppings, quantities, onChange }) => {
    const getLabel = (topping, label) => {
        return selectedToppings[topping.topping_id].quantity === label ? 'active' : '';
    };

    return (
        <ul className="ToppingGrid">
        {toppings.map((topping) => (
            <li key={topping.topping_id} className="ToppingItem">
                <div className="NamePrice">
                    <div className="ToppingName">{topping.topping_name}</div>
                    <div className="ToppingPrice">$0.00</div>
                </div>
                <div className="ToppingCalories">Calories: {topping.calories}</div>
                <div className="ButtonGroup">
                    {quantities.map(label => (
                        <button
                            key={label}
                            className={`quantityBtn ${getLabel(topping, label)}`}
                            onClick={() => onChange(topping, label)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </li>
        ))}
    </ul>
    );
}

export default CustomizationGrid;
