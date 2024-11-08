import { useState } from 'react';

export function AddEventPopup({ onClose, onAddEvent }) {
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        available_tickets: 0,
        ticket_type: 'Regular',
        ticket_price: 50.0,
        ticket_status: 'available',
        user_id: '',
        purchase_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: name === 'available_tickets' || name === 'ticket_price' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent(eventData);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add New Event</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Event Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Event Name"
                            value={eventData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={eventData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={eventData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Available Tickets</label>
                        <input
                            type="number"
                            name="available_tickets"
                            placeholder="Number of Tickets"
                            value={eventData.available_tickets}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Ticket Type</label>
                        <select
                            name="ticket_type"
                            value={eventData.ticket_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="VIP">VIP</option>
                            <option value="Regular">Regular</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Ticket Price</label>
                        <input
                            type="number"
                            name="ticket_price"
                            placeholder="Price per Ticket"
                            value={eventData.ticket_price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Ticket Status</label>
                        <input
                            type="text"
                            name="ticket_status"
                            placeholder="Ticket Status"
                            value={eventData.ticket_status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">User ID (Optional)</label>
                        <input
                            type="text"
                            name="user_id"
                            placeholder="User ID"
                            value={eventData.user_id}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Purchase Date (Optional)</label>
                        <input
                            type="datetime-local"
                            name="purchase_date"
                            value={eventData.purchase_date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEventPopup;
