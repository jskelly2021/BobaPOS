
const CategorySelector = ({ currentCategory, changeCategory }) => {
    const getLabel = (newCategory) => {
        return currentCategory === newCategory ? 'active' : '';
    };

    return (
        <div className='CategorySelector'>
            <button className={`${getLabel('ALL')}`} onClick={() => changeCategory("ALL")}>All Drinks</button>
            <button className={`${getLabel('RECOMMENDED')}`} onClick={() => changeCategory("RECOMMENDED")}>Recommended</button>
            <button className={`${getLabel('BREWED')}`} onClick={() => changeCategory("BREWED")}>Brewed Tea</button>
            <button className={`${getLabel('MILK')}`} onClick={() => changeCategory("MILK")}>Milk Tea</button>
            <button className={`${getLabel('FRUIT')}`} onClick={() => changeCategory("FRUIT")}>Fruit Tea</button>
            <button className={`${getLabel('CREAMA')}`} onClick={() => changeCategory("CREAMA")}>Creama</button>
        </div>
    );
}

export default CategorySelector;
