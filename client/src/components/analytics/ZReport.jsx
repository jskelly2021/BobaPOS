import React, { useEffect, useState } from 'react';
import { fetchZReportData } from '../../services/analyticsService';
import './ZReport.css';

const ZReport = () => {
    const [totals, setTotals] = useState(null);
    const [ingredientUsage, setIngredientUsage] = useState({});
    const [itemSales, setItemSales] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadZReport = async () => {
            try {
                const { totals, ingredientUsage, itemSales } = await fetchZReportData();
                setTotals(totals);
                setIngredientUsage(ingredientUsage);
                setItemSales(itemSales);
            } catch (err) {
                console.error("ZReport error:", err);
                setError("Failed to load Z-Report.");
            } finally {
                setLoading(false);
            }
        };

        loadZReport();
    }, []);

    if (loading) return <p>Loading Z-Report...</p>;
    if (error) return <p>{error}</p>;

    const amountLine = (label, value, bold = false) => (
        <div className={`amount-line${bold ? ' bold' : ''}`}>
            <span>{label}</span><span>${Number(value).toFixed(2)}</span>
        </div>
    );

    return (
        <div className="ZReport">
            <h2>Z-Out Reset Report</h2>
            <p>Big Bad Boba Boys</p>
            <p>1025 University Dr #105</p>
            <p>College Station, TX 77840</p>
            <p>Report generated: {new Date().toLocaleString()}</p>

            <section>
                <div className="section-title">Tender Summary</div>
                {amountLine('Card Sales', totals.total_card_sales)}
                {amountLine('Mobile Sales', totals.total_mobile_sales)}
                {amountLine('Cash Sales', totals.total_cash_sales)}
                {amountLine('Tendering Total', totals.total_sales, true)}
                {amountLine('Credit Card Tips', totals.total_tips)}
                {amountLine('Total Tips', totals.total_tips)}
                {amountLine('Tax', totals.total_tax)}
            </section>

            <section>
                <div className="section-title">Items Sold</div>
                {Object.entries(itemSales).filter(([, count]) => count > 0).map(([name, count]) => (
                    <div className="amount-line" key={name}>
                        <span>{name}</span><span>{count}</span>
                    </div>
                ))}
            </section>

            <section>
                <div className="section-title">Ingredient Usage</div>
                {Object.entries(ingredientUsage).map(([name, usage]) => (
                    <div className="amount-line" key={name}>
                        <span>{name}</span><span>{usage}</span>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ZReport;
