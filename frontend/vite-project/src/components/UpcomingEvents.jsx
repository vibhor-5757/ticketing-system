/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EventModal } from './EventModal';

export function UpcomingEvents({ events = [] }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="w-full h-[25%] overflow-scroll  no-scrollbar lg:w-2/3 bg-white p-6 rounded-xl shadow-lg">
      {/* <h2 className="text-3xl font-semibold text-gray-700 mb-4">Events you might be interested in</h2> */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
              <p className="text-gray-600">{event.date} | {event.location}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleViewDetails(event)}
                className="text-blue-600 font-semibold underline hover:text-blue-800"
              >
                View Details
              </button>
              <Link
                to={`/buy/${event.id}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow hover:from-purple-500 hover:to-blue-500 transition duration-300"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={handleCloseModal} />}
    </div>
  );
}
