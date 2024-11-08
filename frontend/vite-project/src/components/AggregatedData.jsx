/* eslint-disable react/prop-types */
import {
    Chart as ChartJS,
    ArcElement,        
    BarElement,        
    CategoryScale,     
    LinearScale,       
    Tooltip,           
    Legend,            
} from 'chart.js';

import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement, 
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Tooltip, 
    Legend
);

// Helper function to get month name from "YYYY-MM" format
const getMonthName = (dateString) => {
    const date = new Date(dateString + '-01');  
    return date.toLocaleString('default', { month: 'short' }); 
};

export default function AggregatedData({ ticketData, monthData, statusData, categoriesData }) {
    if (!ticketData || !monthData || !statusData || !categoriesData) {
        return <div>Loading...</div>;
    }

    // Transform monthData labels to month names
    const transformedMonthData = {
        ...monthData,
        labels: monthData.labels.map(label => getMonthName(label)),
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Pie Chart: Total Tickets Sold by Event */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Tickets by Event</h3>
          <div className="flex items-center justify-center w-full h-full">
            <Pie data={ticketData} />
          </div>
        </div>

        {/* Bar Chart: Monthly Ticket Purchases */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Monthly Ticket Purchases</h3>
          <div className="flex items-center justify-center w-full h-full">
            <Bar data={transformedMonthData} />
          </div>
        </div>

        {/* Pie Chart: Ticket Sales by Event Status */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ticket Sales by Event Status</h3>
          <div className="flex items-center justify-center w-full h-full">
            <Pie data={statusData} />
          </div>
        </div>

        {/* Pie Chart: Total Tickets Sold by Category */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Tickets by Category</h3>
          <div className="flex items-center justify-center w-full h-full">
            <Pie data={categoriesData} />
          </div>
        </div>
      </div>
    );
}
