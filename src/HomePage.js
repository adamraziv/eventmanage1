import React from 'react';

const HomePage = ({ events }) => {
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

  const upcomingEvents = events
    .filter(event => new Date(event.startDate) <= twoWeeksFromNow && event.status !== 'pending')
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const pendingEvents = events
    .filter(event => event.status === 'pending')
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

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
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <p><strong>Date:</strong> {isSingleDayEvent ? formatDate(event.startDate) : `${formatDate(event.startDate, false)} to ${formatDate(event.endDate)}`}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Status:</strong> {event.status.charAt(0).toUpperCase() + event.status.slice(1)}</p>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mr Chris's Event Management</h1>
      
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events (Next 2 Weeks)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Pending Confirmation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
