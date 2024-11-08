import PropTypes from 'prop-types';

export default function Stats({ ticketsPurchased, upcomingEvents, pastEvents }) {
    return (
        <div className="w-screen bg-blue-600 rounded-xl shadow-2xl p-8 text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Your Ticket Stats</h2>
            <div className="flex justify-around text-white">
                <div className="text-center">
                    <p className="text-5xl font-bold">{ticketsPurchased}</p>
                    <p className="text-lg mt-1">Tickets Purchased</p>
                </div>
                <div className="text-center">
                    <p className="text-5xl font-bold">{upcomingEvents}</p>
                    <p className="text-lg mt-1">Upcoming Events</p>
                </div>
                <div className="text-center">
                    <p className="text-5xl font-bold">{pastEvents}</p>
                    <p className="text-lg mt-1">Past Events</p>
                </div>
            </div>
        </div>
    );
}

Stats.propTypes = {
    ticketsPurchased: PropTypes.number.isRequired,
    upcomingEvents: PropTypes.number.isRequired,
    pastEvents: PropTypes.number.isRequired,
};

Stats.defaultProps = {
    ticketsPurchased: 0,
    upcomingEvents: 0,
    pastEvents: 0,
};
