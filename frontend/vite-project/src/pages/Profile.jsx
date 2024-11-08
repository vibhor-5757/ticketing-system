// import { useState, useEffect } from 'react';
// import { jwtVerify } from 'jose';

// import Navbar from '../components/Navbar';
// import Stats from '../components/Stats';
// import { UpcomingEvents } from '../components/UpcomingEvents';
// import PurchaseHistory from '../components/PurchaseHistory';
// import AggregatedData from '../components/AggregatedData';

// export function UserProfilePage() {
//     const [profile, setProfile] = useState({});
//     const [purchaseHistory, setPurchaseHistory] = useState([]);
//     const [upcomingEvents, setUpcomingEvents] = useState([]);
//     const [ticketData, setTicketData] = useState(null);
//     const [monthData, setMonthData] = useState(null);
//     const [statusData, setStatusData] = useState(null);
//     const [categoriesData, setCategoriesData] = useState(null);
//     const [userId, setUserId] = useState("");

//     useEffect(() => {
//         const fetchUserIdFromToken = async () => {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 try {
//                     const { payload } = await jwtVerify(token, new TextEncoder().encode('dgUHbHpF3bH74UT99nDRRM6+af/LhID0EXNzn2wg/JaG7lI9uyCOsWmxRLPXWu4Z'));
//                     setUserId(payload.sub);
//                 } catch (error) {
//                     console.error("Error verifying token:", error);
//                 }
//             }
//         };
//         fetchUserIdFromToken();
//     }, []);

//     useEffect(() => {
//         if (!userId) return;
//         // console.log("user: ", userId);
//         const fetchUserProfile = async () => {
//             try {
//                 const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
//                 const data = await res.json();
//                 setProfile(data);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//         };

//         const fetchPurchaseHistory = async () => {
//             try {
//                 const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/purchased-history`);
//                 const data = await res.json();
//                 setPurchaseHistory(data);
//             } catch (error) {
//                 console.error("Error fetching purchase history:", error);
//             }
//         };

//         const fetchUpcomingEvents = async () => {
//             try {
//                 const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/upcoming-events`);
//                 const data = await res.json();
//                 setUpcomingEvents(data);
//             } catch (error) {
//                 console.error("Error fetching upcoming events:", error);
//             }
//         };

//         const fetchAggregateData = async () => {
//             try {
//                 const [ticketSalesRes, monthlySalesRes, categoriesRes, statusRes] = await Promise.all([
//                     fetch('http://127.0.0.1:8000/api/reports/ticket-sales/total_sales').then(res => res.json()),
//                     fetch('http://127.0.0.1:8000/api/reports/ticket-sales/monthly_sales').then(res => res.json()),
//                     fetch('http://127.0.0.1:8000/api/reports/ticket-sales/popular_categories').then(res => res.json()),
//                     fetch('http://127.0.0.1:8000/api/reports/ticket-sales/sales_by_status').then(res => res.json())
//                 ]);


//                 // **Ticket Sales Data** - Total tickets sold by event
//                 const ticketSalesData = ticketSalesRes.data.map(item => item.totalTicketsSold);
//                 const ticketCategories = ticketSalesRes.data.map(item => item.eventName);
//                 setTicketData({
//                     labels: ticketCategories,
//                     datasets: [{
//                         data: ticketSalesData,
//                         backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3'],
//                     }]
//                 });
//                 console.log("ticket data: ", ticketSalesData)

//                 // **Monthly Sales Data** - Tickets sold by month (adjust this as per actual data)
//                 const months = monthlySalesRes.data.map(item => item._id); // Extract months
//                 const ticketsPerMonth = monthlySalesRes.data.map(item => item.totalTicketsSold); // Total tickets sold per month
//                 setMonthData({
//                     labels: months,
//                     datasets: [{
//                         label: 'Tickets Purchased',
//                         data: ticketsPerMonth,
//                         backgroundColor: '#4caf50',
//                     }]
//                 });

//                 // **Popular Categories Data** - Categories of events and total tickets sold
//                 const categories = categoriesRes.data.map(item => item._id); // Category names
//                 const ticketsPerCategory = categoriesRes.data.map(item => item.totalTicketsSold); // Tickets per category
//                 setCategoriesData({
//                     labels: categories,
//                     datasets: [{
//                         data: ticketsPerCategory,
//                         backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3'],
//                     }]
//                 });

//                 // **Sales by Event Status Data** - Tickets sold by event status (completed, upcoming, etc.)
//                 const statuses = statusRes.data.map(item => item._id); // Event statuses like 'completed', 'upcoming'
//                 const ticketsPerStatus = statusRes.data.map(item => item.totalTicketsSold); // Total tickets sold by status
//                 setStatusData({
//                     labels: statuses,
//                     datasets: [{
//                         data: ticketsPerStatus,
//                         backgroundColor: ['#2196f3', '#f44336', '#ff9800'],
//                     }]
//                 });
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         // Call the fetchData function when the component mounts


//         fetchUserProfile();
//         fetchPurchaseHistory();
//         fetchUpcomingEvents();
//         fetchAggregateData();
//     }, [userId]);


//     return (
//         <div className="w-screen bg-[#f0f4f8] min-h-screen flex flex-col items-center">
//             <Navbar />
//             <Stats
//                 ticketsPurchased={purchaseHistory.length}
//                 upcomingEvents={upcomingEvents.length}
//                 pastEvents={purchaseHistory.length - upcomingEvents.length}
//             />


//             <div className="w-full max-w-5xl p-8 space-y-8">

//                 {/* User Details */}
//                 <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//                     <h2 className="text-3xl font-semibold text-gray-800 mb-2">{profile.name}</h2>
//                     <p className="text-gray-600 mb-4">{profile.email}</p>
//                     {/* Add more profile details as needed */}
//                 </div>

//                 {/* Statistics Section */}
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Event Statistics</h2>
//                     <AggregatedData ticketData={ticketData} monthData={monthData} statusData={statusData} categoriesData={categoriesData} />
//                 </div>

//                 {/* Upcoming Events Section */}
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
//                     <UpcomingEvents events={upcomingEvents} />
//                 </div>

//                 {/* Purchase History Section */}
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purchase History</h2>
//                     <PurchaseHistory history={purchaseHistory} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserProfilePage;
import { useState, useEffect } from 'react';
import { jwtVerify } from 'jose';

import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import { UpcomingEvents } from '../components/UpcomingEvents';
import PurchaseHistory from '../components/PurchaseHistory';
import AggregatedData from '../components/AggregatedData';

export function UserProfilePage() {
    const [profile, setProfile] = useState({});
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [ticketData, setTicketData] = useState(null);
    const [monthData, setMonthData] = useState(null);
    const [statusData, setStatusData] = useState(null);
    const [categoriesData, setCategoriesData] = useState(null);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUserIdFromToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { payload } = await jwtVerify(token, new TextEncoder().encode({env.secret_key}));
                    setUserId(payload.sub);
                } catch (error) {
                    console.error("Error verifying token:", error);
                }
            }
        };
        fetchUserIdFromToken();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchUserProfileData = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        const fetchPurchaseHistory = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/purchased-history`);
                const data = await res.json();
                setPurchaseHistory(data);
            } catch (error) {
                console.error("Error fetching purchase history:", error);
            }
        };

        const fetchUpcomingEvents = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/upcoming-events`);
                const data = await res.json();
                setUpcomingEvents(data);
            } catch (error) {
                console.error("Error fetching upcoming events:", error);
            }
        };

        const fetchUserAggregateData = async () => {
            try {
                const [ticketSalesRes, monthlySalesRes, categoriesRes, statusRes] = await Promise.all([
                    fetch(`http://127.0.0.1:8000/api/user-reports/${userId}/ticket-sales/total_sales`).then(res => res.json()),
                    fetch(`http://127.0.0.1:8000/api/user-reports/${userId}/ticket-sales/monthly_sales`).then(res => res.json()),
                    fetch(`http://127.0.0.1:8000/api/user-reports/${userId}/ticket-sales/popular_categories`).then(res => res.json()),
                    fetch(`http://127.0.0.1:8000/api/user-reports/${userId}/ticket-sales/sales_by_status`).then(res => res.json())
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
                console.error('Error fetching data:', error);
            }
        };

        fetchUserProfileData();
        fetchPurchaseHistory();
        fetchUpcomingEvents();
        fetchUserAggregateData();
    }, [userId]);

    return (
        <div className="w-screen bg-[#f0f4f8] min-h-screen flex flex-col items-center">
            <Navbar />
            <Stats
                ticketsPurchased={purchaseHistory.length}
                upcomingEvents={upcomingEvents.length}
                pastEvents={purchaseHistory.length - upcomingEvents.length}
            />

            <div className="w-full max-w-7xl p-8 space-y-8">

                {/* User Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">{profile.name}</h2>
                    <p className="text-gray-600 mb-4">{profile.email}</p>
                </div>

                {/* Statistics Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Event Statistics</h2>
                    <AggregatedData ticketData={ticketData} monthData={monthData} statusData={statusData} categoriesData={categoriesData} />
                </div>

                {/* Upcoming Events Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                    <UpcomingEvents events={upcomingEvents} />
                </div>

                {/* Purchase History Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purchase History</h2>
                    <PurchaseHistory history={purchaseHistory} />
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;

