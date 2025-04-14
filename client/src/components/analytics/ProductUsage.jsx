
import React from 'react'
import useProductUsage from '../../hooks/useProductUsage';
import ProductUsageChart from './ProductUsageChart';
import useIngredient from '../../hooks/useIngredient';

const ProductUsage = () => {
    const { usageData, loading, error, ingredientId,
        getUsageFromLast24Hours, getUsageFromLast14Days,
        getUsageFromLast3Months, getUsageFromLastYear, setIngredient } = useProductUsage();
    const { ingredients } = useIngredient();

    return (
        <div>
            <ProductUsageChart loading={loading} error={error} data={usageData} />

            <select value={ingredientId} onChange={(e) => setIngredient(e.target.value)}>
                <option value="" disabled>Select an ingredient</option>
                {ingredients.map(ingredient => (
                    <option key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                        <button onClick={() => setIngredient(ingredient.ingredient_id)}>{ingredient.ingredient_name}</button>
                    </option>
                ))}
            </select>

            <button onClick={() => getUsageFromLast24Hours(ingredientId)}>Last 24 Hours</button>
            <button onClick={() => getUsageFromLast14Days(ingredientId)}>Last 14 Days</button>
            <button onClick={() => getUsageFromLast3Months(ingredientId)}>Last 3 Months</button>
            <button onClick={() => getUsageFromLastYear(ingredientId)}>Last Year</button>

        </div>
    );
}

export default ProductUsage;