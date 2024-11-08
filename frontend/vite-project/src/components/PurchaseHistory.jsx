import PropTypes from 'prop-types';

export default function PurchaseHistory({ history }) {
    return (
      <div className="overflow-auto max-h-80">
        {history.map((event) => (
          <div key={event.id} className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{event.name}</h3>
            <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-500">{event.location}</p>
          </div>
        ))}
      </div>
    );
}

PurchaseHistory.propTypes = {
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        location: PropTypes.string,
      })
    ).isRequired,
};
