
import React from 'react'
import useProductUsage from '../../hooks/useProductUsage';
import ProductUsageChart from './ProductUsageChart';

const ProductUsage = () => {
    const { usageData, loading, error, getUsageFromLast24Hours, 
        getUsageFromLast14Days, getUsageFromLast3Months, getUsageFromLastYear } = useProductUsage();

    return (
        <div>
            <ProductUsageChart loading={loading} error={error} data={usageData} />

            <button onClick={() => getUsageFromLast24Hours(6)}>Last 24 Hours</button>
            <button onClick={() => getUsageFromLast14Days(6)}>Last 14 Days</button>
            <button onClick={() => getUsageFromLast3Months(6)}>Last 3 Months</button>
            <button onClick={() => getUsageFromLastYear(6)}>Last Year</button>

        </div>
    );
}

export default ProductUsage;