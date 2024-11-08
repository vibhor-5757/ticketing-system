import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && location.pathname === "/events") {
            if (onSearch) {
                onSearch(searchTerm); // Trigger search when Enter is pressed on Events page
            }
        }
    };

    return (
        <nav className="w-screen bg-blue-800 shadow-lg py-4 mb-2">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-3xl font-bold text-white">TicketMaster</Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                    <Link to="/events" className="text-white hover:text-gray-200">Events</Link>
                    <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
                    <Link to="/analytics" className="text-white hover:text-gray-200">Analytics</Link>
                    <input
                        type="text"
                        placeholder="Search events"
                        className="px-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    onSearch: PropTypes.func,
};
