/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export function EventsList({ events }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="bg-[#ffffff] p-4 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{event.name}</h3>
            <p className="text-gray-500">{event.date} | {event.location}</p>
          </div>
          <div className="space-x-3">
            <Link to={`/event/${event.id}`} className="text-blue-600 font-semibold underline">View Details</Link>
            <Link to={`/buy/${event.id}`} className="px-3 py-1 bg-blue-600 text-white rounded-md">Buy Now</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
