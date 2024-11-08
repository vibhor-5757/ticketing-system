import { useState, useEffect } from 'react';
import AggregatedData from '../components/AggregatedData';
import Navbar from '../components/Navbar';

export function AnalyticsPage() {
    const [ticketData, setTicketData] = useState(null);
    const [monthData, setMonthData] = useState(null);
    const [statusData, setStatusData] = useState(null);
    const [categoriesData, setCategoriesData] = useState(null);

    useEffect(() => {
        const fetchGeneralAggregateData = async () => {
            try {
                const [ticketSalesRes, monthlySalesRes, categoriesRes, statusRes] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/reports/ticket-sales/total_sales').then(res => res.json()),
                    fetch('http://127.0.0.1:8000/api/reports/ticket-sales/monthly_sales').then(res => res.json()),
                    fetch('http://127.0.0.1:8000/api/reports/ticket-sales/popular_categories').then(res => res.json()),
                    fetch('http://127.0.0.1:8000/api/reports/ticket-sales/sales_by_status').then(res => res.json())
                ]);

                setTicketData({
                    labels: ticketSalesRes.data.map(item => item.eventName),
                    datasets: [{ data: ticketSalesRes.data.map(item => item.totalTicketsSold), backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3'] }],
                });

                setMonthData({
                    labels: monthlySalesRes.data.map(item => item._id),
                    datasets: [{ label: 'Tickets Purchased', data: monthlySalesRes.data.map(item => item.totalTicketsSold), backgroundColor: '#4caf50' }],
                });

                setCategoriesData({
                    labels: categoriesRes.data.map(item => item._id),
                    datasets: [{ data: categoriesRes.data.map(item => item.totalTicketsSold), backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3'] }],
                });

                setStatusData({
                    labels: statusRes.data.map(item => item._id),
                    datasets: [{ data: statusRes.data.map(item => item.totalTicketsSold), backgroundColor: ['#2196f3', '#f44336', '#ff9800'] }],
                });
            } catch (error) {
                console.error('Error fetching general analytics data:', error);
            }
        };

        fetchGeneralAggregateData();
    }, []);

    return (
        <div className="analytics-page w-full bg-[#f0f4f8] flex flex-col items-center">
            <Navbar />
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Event Analytics</h1>
            <div className='h-[1200px] w-[1000px] border-red-600'>
                <AggregatedData ticketData={ticketData} monthData={monthData} statusData={statusData} categoriesData={categoriesData} />
            </div>
        </div>
    );
}

export default AnalyticsPage;
