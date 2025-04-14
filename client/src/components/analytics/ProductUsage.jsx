
import React, { useState } from 'react'
import useProductUsage from '../../hooks/useProductUsage';
import ProductUsageChart from './ProductUsageChart';
import useIngredient from '../../hooks/useIngredient';

const ProductUsage = () => {
    const { usageData, loading, error, ingredientId,
        getUsageFromLast24Hours, getUsageFromLast14Days,
        getUsageFromLast3Months, getUsageFromLastYear, setIngredient } = useProductUsage();
    const { ingredients } = useIngredient();

    const [ granularity, setGranularity ] = useState('daily');

    const handleChangeData = (getUsage, newGranularity) => {
        setGranularity(newGranularity);
        getUsage(ingredientId);
    }

    return (
        <div>
            <ProductUsageChart loading={loading} error={error} data={usageData} dateLabelType={granularity}/>

            <select value={ingredientId} onChange={(e) => setIngredient(e.target.value)}>
                <option value="" disabled>Select an ingredient</option>
                {ingredients.map(ingredient => (
                    <option key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                        {ingredient.ingredient_name}
                    </option>
                ))}
            </select>

            <button onClick={() => handleChangeData(getUsageFromLast24Hours, 'hourly')}>Last 24 Hours</button>
            <button onClick={() => handleChangeData(getUsageFromLast14Days, 'daily')}>Last 14 Days</button>
            <button onClick={() => handleChangeData(getUsageFromLast3Months, 'daily')}>Last 3 Months</button>
            <button onClick={() => handleChangeData(getUsageFromLastYear, 'monthly')}>Last Year</button>

        </div>
    );
}

export default ProductUsage;