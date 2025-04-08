import useItem from '../hooks/useItem';

const CategorySelector = () => {
    const { updateCategory } = useItem();

    return (
        <div className='CategorySelector'>
            <button onClick={() => updateCategory("brewed")}>Brewed Tea</button>
            <button onClick={() => updateCategory("milk")}>Milk Tea</button>
            <button onClick={() => updateCategory("fruit")}>Fruit Tea</button>
            <button onClick={() => updateCategory("creama")}>Creama</button>
        </div>
    );
}

export default CategorySelector;