import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtVerify } from 'jose'; // Import jwtVerify from jose
import Navbar from '../components/Navbar';
import { UpcomingEvents } from '../components/UpcomingEvents';
import UserCalendar from '../components/Calendar';

export function HomePage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [purchasedEventIds, setPurchasedEventIds] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdFromToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode({env.secret_key}) 
          );
          setUserId(payload.sub);
        } catch (error) {
          console.error("Error verifying token:", error);
          // Clear the token if it's invalid
          localStorage.removeItem('token');
        }
      }
    };
    

    fetchUserIdFromToken();

    const fetchEvents = async () => {
      try {
        const eventsResponse = await axios.get('http://127.0.0.1:8000/api/events/');
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchPurchasedEvents = async () => {
      if (!userId) return;
      try {
        const purchasedEventsResponse = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/purchased-events`);
        setPurchasedEventIds(purchasedEventsResponse.data);
        console.log("purchasedEventsResponse:", purchasedEventsResponse);
      } catch (error) {
        console.error("Error fetching purchased events:", error);
      }
    };

    fetchPurchasedEvents();
  }, [userId]);

  const upcomingEvents = events.filter(
    (event) => !purchasedEventIds.includes(event.id)
  );
// console.log(upcomingEvents)
  const purchasedEvents = events.filter(
    (event) => purchasedEventIds.includes(event.id)
  );

  return (
    <div className="w-screen h-full bg-[#f0f4f8] min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full h-[155rem] flex flex-col lg:flex-row p-8 lg:space-x- space-y-6 lg:space-y-0">
        {/* Event List Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Events you might be interested in
          </h2>
          <UpcomingEvents events={upcomingEvents} />
        </div>

        {/* Calendar Section */}
        <div className="w-full h-[670px] lg:w-1/3 bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-4">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Your Event Calendar
          </h2>
          <UserCalendar date={date} setDate={setDate} events={purchasedEvents} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
