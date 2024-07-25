import React, { useState } from 'react';

const EventsPage = ({ events, setEvents }) => {
  const [filters, setFilters] = useState({ startDate: '', endDate: '', organizer: '' });
  const [newEvent, setNewEvent] = useState({
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    link: '',
    status: 'pending',
  });

  const organizerOptions = [
    'SBF', 'SCS', 'SCCI', 'SGTECH', 'SMF', 'SCALA', 'STARTUPSG', 'ACCM', 'ACE.SG', 'Moody', 'GSMA', 'JETRO', 'BCG'
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleNewEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    const newEventWithId = { ...newEvent, id: Date.now().toString() };
    setEvents([...events, newEventWithId]);
    setNewEvent({
      id: '',
      name: '',
      startDate: '',
      endDate: '',
      location: '',
      organizer: '',
      link: '',
      status: 'pending',
    });
  };

  const removeEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const updateEventStatus = (id, newStatus) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
  };

  const filteredEvents = events.filter(
    (event) =>
      (!filters.startDate || new Date(event.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(event.endDate) <= new Date(filters.endDate)) &&
      (filters.organizer ? event.organizer === filters.organizer : true)
  );

  const formatDate = (dateString, includeYear = true) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
  };

  const EventCard = ({ event }) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    const isSingleDayEvent = startDate.getTime() === endDate.getTime();

    return (
      <div key={event.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <p>
          <strong>Date:</strong>{' '}
          {isSingleDayEvent
            ? formatDate(event.startDate)
            : `${formatDate(event.startDate, false)} to ${formatDate(event.endDate)}`}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Organizer:</strong> {event.organizer}
        </p>
        <p>
          <strong>Link:</strong>{' '}
          <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            {event.link}
          </a>
        </p>
        <p>
          <strong>Status:</strong> {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </p>
        <div className="mt-4 space-x-2">
          {event.status !== 'accepted' && (
            <button
              onClick={() => updateEventStatus(event.id, 'accepted')}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Accept
            </button>
          )}
          {event.status !== 'rejected' && (
            <button
              onClick={() => updateEventStatus(event.id, 'rejected')}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Reject
            </button>
          )}
          {event.status !== 'pending' && (
            <button
              onClick={() => updateEventStatus(event.id, 'pending')}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Mark as Pending
            </button>
          )}
          <button
            onClick={() => removeEvent(event.id)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Add New Event Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleNewEventChange}
              placeholder="Event Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={newEvent.startDate}
              onChange={handleNewEventChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={newEvent.endDate}
              onChange={handleNewEventChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleNewEventChange}
              placeholder="Location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizer">
              Organizer
            </label>
            <select
              name="organizer"
              value={newEvent.organizer}
              onChange={handleNewEventChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Organizer</option>
              {organizerOptions.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
              Event Link
            </label>
            <input
              type="text"
              name="link"
              value={newEvent.link}
              onChange={handleNewEventChange}
              placeholder="Event Link"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-2">
            <button
              onClick={addEvent}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Filter Events</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterStartDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterEndDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterOrganizer">
              Organizer
            </label>
            <select
              name="organizer"
              value={filters.organizer}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">All Organizers</option>
              {organizerOptions.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
