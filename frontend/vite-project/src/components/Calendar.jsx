import PropTypes from 'prop-types';
import { useState } from 'react';

export default function UserCalendar({ date, setDate, events }) {
  const [viewDate, setViewDate] = useState(date);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const currentDate = new Date();

  const isToday = (day) =>
    day === currentDate.getDate() &&
    viewDate.getMonth() === currentDate.getMonth() &&
    viewDate.getFullYear() === currentDate.getFullYear();

  const isSelected = (day) =>
    day === date.getDate() && viewDate.getMonth() === date.getMonth() && viewDate.getFullYear() === date.getFullYear();

  const getEventForDay = (day) =>
    events.find(
      (event) =>
        new Date(event.date).getDate() === day &&
        new Date(event.date).getMonth() === viewDate.getMonth() &&
        new Date(event.date).getFullYear() === viewDate.getFullYear()
    );

  const handlePreviousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  return (
    <div className="h-[90%] bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth} className="text-blue-600 hover:text-blue-800 font-semibold transition">
          &lt; Prev
        </button>
        <div className="text-xl font-semibold text-gray-800">
          {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth} className="text-blue-600 hover:text-blue-800 font-semibold transition">
          Next &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-3 text-center text-gray-800">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div key={idx} className="font-semibold text-gray-600">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="text-gray-200"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
          const day = dayIdx + 1;
          const event = getEventForDay(day);
          const isEventDay = Boolean(event);

          return (
            <button
              key={day}
              onClick={() => setDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
              className={`w-full h-12 rounded-lg flex items-center justify-center transition-colors
                ${isSelected(day) ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-gray-700'}
                ${isToday(day) && !isSelected(day) ? 'border border-blue-400' : ''}
                ${isEventDay && !isSelected(day) ? '!bg-green-700 text-white font-semibold' : ''}
                hover:bg-blue-50`}
              title={isEventDay ? event.name : ''}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

UserCalendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string,
    })
  ).isRequired,
};
