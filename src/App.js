import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, Calendar, List } from 'lucide-react';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import CalendarView from './CalendarView';

const App = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleSetEvents = (newEvents) => {
    setEvents(newEvents);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <nav className="w-64 bg-white shadow-lg">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Event Manager</h1>
            <ul>
              <li className="mb-3">
                <Link to="/" className="flex items-center text-gray-700 hover:text-blue-500">
                  <Home className="mr-2" size={20} />
                  Home
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/events" className="flex items-center text-gray-700 hover:text-blue-500">
                  <List className="mr-2" size={20} />
                  Events
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="flex items-center text-gray-700 hover:text-blue-500">
                  <Calendar className="mr-2" size={20} />
                  Calendar
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 p-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage events={events} />} />
            <Route path="/events" element={<EventsPage events={events} setEvents={handleSetEvents} />} />
            <Route path="/calendar" element={<CalendarView events={events} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;