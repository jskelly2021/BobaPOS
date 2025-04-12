
const categoryOptions = ['BREWED', 'MILK', 'FRUIT', 'CREAMA'];

const CategorySelector = ({ selected, onChange }) => {
    return (
        <div className='Selectors'>
            <div className='RadioBtns'>
                {categoryOptions.map(category => (
                    <label>
                        <input type="radio" 
                            name="category" 
                            value={category}
                            checked={selected === category}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        {category}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default CategorySelector;