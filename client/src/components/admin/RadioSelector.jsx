
const RadioSelector = ({ name, options, selectedValue, onChange }) => {
    return (
        <div className='Selectors'>
            <div className='RadioBtns'>
                {options.map(({option, value}) => (
                    <label key={value}>
                        <input type="radio" 
                            name={name} 
                            value={value}
                            checked={selectedValue === value}
                            onChange={() => onChange(value)}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default RadioSelector;
