// src/pages/EventsPage.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { AddEventPopup } from '../components/AddEventPopup';

export function EventsPage() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddEventPopup, setShowAddEventPopup] = useState(false);

    const fetchEvents = async (query = "") => {
        setLoading(true);
        try {
            const url = query
                ? `http://127.0.0.1:8000/api/events/search?query=${query}`
                : 'http://127.0.0.1:8000/api/events';
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch events");
            }
            const data = await res.json();
            setEvents(data || []);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(searchQuery);
    }, [searchQuery]);

    const handleAddEvent = async (eventData) => {
      try {
          // Create the event
          const res = await fetch('http://127.0.0.1:8000/api/events', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(eventData),
          });
          if (!res.ok) {
              throw new Error("Failed to create event");
          }
          const newEvent = await res.json();
          console.log("newevent: ", newEvent)
  
          // Create tickets based on available_tickets
          for (let i = 0; i < eventData.available_tickets; i++) {
              const ticketData = {
                  event_id: newEvent.id,
                  ticket_type: eventData.ticket_type,
                  price: eventData.ticket_price,
                  status: eventData.ticket_status,
                  user_id: eventData.user_id || null,
                  purchase_date: eventData.purchase_date || null,
              };
              console.log(ticketData)
  
              const ticketRes = await fetch('http://127.0.0.1:8000/api/tickets', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(ticketData),
              });
  
              if (!ticketRes.ok) {
                  console.error("Failed to create ticket", await ticketRes.text());
              }
          }
  
          setEvents((prevEvents) => [...prevEvents, newEvent]);
          setShowAddEventPopup(false);
      } catch (error) {
          console.error("Error creating event:", error);
      }
  };
  

    return (
        <div className="w-screen bg-[#f0f4f8] min-h-screen flex flex-col items-start justify-start">
            <Navbar onSearch={setSearchQuery} />
            <div className="w-full border p-8 space-y-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Events</h2>

                <button
                    onClick={() => setShowAddEventPopup(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Event
                </button>

                {loading ? (
                    <div className="text-gray-500">Loading events...</div>
                ) : (
                    <UpcomingEvents events={events} />
                )}

                {showAddEventPopup && (
                    <AddEventPopup
                        onClose={() => setShowAddEventPopup(false)}
                        onAddEvent={handleAddEvent}
                    />
                )}
            </div>
        </div>
    );
}

export default EventsPage;
