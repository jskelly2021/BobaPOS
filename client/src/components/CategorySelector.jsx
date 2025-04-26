
const CategorySelector = ({changeCategory}) => {
    return (
        <div className='CategorySelector'>
            <button onClick={() => changeCategory("RECOMMENDED")}>Recommended</button>
            <button onClick={() => changeCategory("BREWED")}>Brewed Tea</button>
            <button onClick={() => changeCategory("MILK")}>Milk Tea</button>
            <button onClick={() => changeCategory("FRUIT")}>Fruit Tea</button>
            <button onClick={() => changeCategory("CREAMA")}>Creama</button>
        </div>
    );
}

export default CategorySelector;
