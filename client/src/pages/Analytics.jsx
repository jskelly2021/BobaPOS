import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import SalesDuringDayChart from '../components/analytics/SalesDuringDay';
import SalesOverWeeksChart from '../components/analytics/SalesOverWeeks';
import SalesOverMonthsChart from '../components/analytics/SalesOverMonths';
import useAnalytics from '../hooks/useAnalytics';

const Analytics = () => {
    const nav = useNavigate();
    const [activePage, setActivePage] = useState('TopSellingProducts');
    const { topSellingData, salesOverDaysData, loading, error } = useAnalytics();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];
    // start and end times for the SalesDuringDayChart by hour
    const startTimeDay = new Date('2024-12-01T08:00:00Z').toISOString();
    const endTimeDay = new Date('2024-12-01T22:00:00Z').toISOString();

    const startTimeWeek = new Date('2024-12-01T00:00:00Z').toISOString();
    const endTimeWeek = new Date('2024-12-31T23:59:59Z').toISOString();

    const startTimeMonth = new Date('2024-08-01T00:00:00Z').toISOString();
    const endTimeMonth = new Date('2025-02-01T23:59:59Z').toISOString();


    if (loading) return <p>Loading analytics data...</p>;
    if (error) return <p>Error fetching analytics data: {error.message}</p>;

    return (
        <div>
            <div className='AnalyticPages'>
                <button className='DashboardBtn' onClick={() => nav('/dashboard')}>Dashboard</button>
                <button onClick={() => setActivePage('TopSellingProducts')}>Top Selling Products</button>
                <button onClick={() => setActivePage('SalesDuringDays')}>Sales During Days</button>
                <button onClick={() => setActivePage('SalesOverDays')}>Sales Over Days</button>
                <button onClick={() => setActivePage('SalesOverWeeks')}>Sales Over Weeks</button>
                <button onClick={() => setActivePage('SalesOverMonths')}>Sales Over Months</button>
                <button onClick={() => setActivePage('ProductUsage')}>Product Usage</button>
                <button onClick={() => setActivePage('XReport')}>X-Report</button>
                <button onClick={() => setActivePage('ZReport')}>Z-Report</button>
            </div>

            <h1>Analytics Dashboard</h1>

            {activePage === 'TopSellingProducts' && <IngredientList />}
            {activePage === 'SalesDuringDays' && <ItemList />}
            {activePage === 'SalesOverDays' && <EmployeeList />}
            {activePage === 'SalesOverWeeks' && <EmployeeList />}
            {activePage === 'SalesOverMonths' && <EmployeeList />}
            {activePage === 'ProductUsage' && <EmployeeList />}
            {activePage === 'XReport' && <EmployeeList />}
            {activePage === 'ZReport' && <EmployeeList />}


            <h2>Top Selling Products</h2>
            <PieChart width={500} height={400}>
                <Pie
                data={topSellingData}
                cx={250}
                cy={200}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                {topSellingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>

            <h2>Sales Over Days</h2>
            <LineChart width={600} height={400} data={salesOverDaysData}>
                <XAxis dataKey="period" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
            </LineChart>

            <SalesDuringDayChart start={startTimeDay} end={endTimeDay} />

            {/* Add additional chart components here in the same pattern */}
            <SalesOverWeeksChart start={startTimeWeek} end={endTimeWeek} />
            <SalesOverMonthsChart start={startTimeMonth} end={endTimeMonth} />
        </div>
    );
};

export default Analytics;
