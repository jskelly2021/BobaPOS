import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopSellingProducts from '../components/analytics/TopSellingProducts';
import SalesDuringDayChart from '../components/analytics/SalesDuringDay';
import SalesOverDays from '../components/analytics/SalesOverDays';
import SalesOverWeeksChart from '../components/analytics/SalesOverWeeks';
import SalesOverMonthsChart from '../components/analytics/SalesOverMonths';
import ProductUsage from '../components/analytics/ProductUsage';
import ZReport from '../components/analytics/ZReport';
import './Analytics.css';

const Analytics = () => {
    const nav = useNavigate();
    const [activePage, setActivePage] = useState('TopSellingProducts');

    // start and end times for the SalesDuringDayChart by hour
    const startTimeDay = new Date('2024-12-01T08:00:00Z').toISOString();
    const endTimeDay = new Date('2024-12-01T22:00:00Z').toISOString();

    const startTimeWeek = new Date('2024-12-01T00:00:00Z').toISOString();
    const endTimeWeek = new Date('2024-12-31T23:59:59Z').toISOString();

    const startTimeMonth = new Date('2024-08-01T00:00:00Z').toISOString();
    const endTimeMonth = new Date('2025-02-01T23:59:59Z').toISOString();

    return (
        <div className='Analytics'>
            <div className='AnalyticsPages'>
                <button className='DashboardBtn' onClick={() => nav('/dashboard')}>Dashboard</button>
                <button onClick={() => setActivePage('TopSellingProducts')}>Top Selling Products</button>
                <button onClick={() => setActivePage('SalesDuringDays')}>Sales During Days</button>
                <button onClick={() => setActivePage('SalesOverDays')}>Sales Over Days</button>
                <button onClick={() => setActivePage('SalesOverWeeks')}>Sales Over Weeks</button>
                <button onClick={() => setActivePage('SalesOverMonths')}>Sales Over Months</button>
                <button onClick={() => setActivePage('ProductUsage')}>Product Usage</button>
                <button onClick={() => setActivePage('ZReport')}>Daily Report</button>
            </div>

            <h1>Analytics Dashboard</h1>

            {activePage === 'TopSellingProducts' && <TopSellingProducts />}
            {activePage === 'SalesDuringDays' && <SalesDuringDayChart start={startTimeDay} end={endTimeDay} />}
            {activePage === 'SalesOverDays' && <SalesOverDays />}
            {activePage === 'SalesOverWeeks' && <SalesOverWeeksChart start={startTimeWeek} end={endTimeWeek} />}
            {activePage === 'SalesOverMonths' && <SalesOverMonthsChart start={startTimeMonth} end={endTimeMonth} />}
            {activePage === 'ProductUsage' && <ProductUsage />}
            {activePage === 'ZReport' && <ZReport />}
        </div>
    );
};

export default Analytics;
