import { Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAnalytics from '../../hooks/useAnalytics';

const SalesOverDays = ({start, end}) => {
    const { salesOverDaysData, loading, error } = useAnalytics(start, end);

    if (loading) return <p>Loading analytics data...</p>;
    if (error) return <p>Error fetching analytics data: {error.message}</p>;

    return (
        <div>
            <h2>Sales Over Days</h2>
            <LineChart width={600} height={400} data={salesOverDaysData}>
                <XAxis dataKey="period" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default SalesOverDays;