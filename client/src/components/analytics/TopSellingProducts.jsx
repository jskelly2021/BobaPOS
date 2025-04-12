import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useAnalytics from '../../hooks/useAnalytics';

const TopSellingProducts = () => {
    const { topSellingData, loading, error } = useAnalytics();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

    if (loading) return <p>Loading analytics data...</p>;
    if (error) return <p>Error fetching analytics data: {error.message}</p>;

    return (
        <div>
            <h2>Top Selling Products</h2>
            <PieChart width={500} height={400}>
                <Pie
                    data={topSellingData}
                    cx={250}
                    cy={200}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                    {topSellingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </div>
    );
}

export default TopSellingProducts;
