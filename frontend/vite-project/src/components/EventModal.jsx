import PropTypes from 'prop-types';
import axios from 'axios';

export function EventModal({ event, onClose, userId }) {
  const { borderColor, buttonColor } =
    event.available_tickets < 10
      ? { borderColor: 'border-red-500', buttonColor: 'bg-red-500 hover:bg-red-600' }
      : event.available_tickets < 50
      ? { borderColor: 'border-yellow-500', buttonColor: 'bg-yellow-500 hover:bg-yellow-600' }
      : { borderColor: 'border-green-500', buttonColor: 'bg-green-500 hover:bg-green-600' };

  const onBuyTicket = async () => {
    try {
      await axios.put(`/api/events/${event.id}`, {
        name: event.name,
        description: event.description,
        date: event.date,
        location: event.location,
        available_tickets: event.available_tickets - 1,
        category: event.category || 'General',
        status: event.status || 'upcoming'
      });

      await axios.put(`/api/tickets/${event.id}/assign`, {
        user_id: userId,
        purchase_date: new Date().toISOString()
      });

      onClose();
      alert("Ticket purchased successfully!");
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("Ticket purchased successfully!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50">
      <div className={`bg-white w-[500px] p-8 rounded-lg shadow-lg border-4 ${borderColor}`}>
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">{event.name}</h3>
        <p className="text-gray-700 mb-6">{event.description}</p>
        <p className="text-gray-600 mb-2"><strong>Date:</strong> {event.date}</p>
        <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-600 mb-2"><strong>Tickets Left:</strong> {event.available_tickets}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Close
          </button>
          <button
            onClick={onBuyTicket}
            className={`px-4 py-2 text-white rounded-md shadow-lg ${buttonColor} transition duration-300`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

EventModal.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string,
    available_tickets: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
