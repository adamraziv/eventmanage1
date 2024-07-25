import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, addWeeks, isSameDay, addDays } from 'date-fns';

const CalendarView = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewOption, setViewOption] = useState(1);

  const getWeekDates = (date, weeks) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = addDays(endOfWeek(date, { weekStartsOn: 1 }), 7 * (weeks - 1));
    return eachDayOfInterval({ start, end });
  };

  const weekDates = getWeekDates(currentDate, viewOption);

  const organizers = [...new Set(events.map(event => event.organizer))];

  const handlePrevPeriod = () => setCurrentDate(date => addWeeks(date, -viewOption));
  const handleNextPeriod = () => setCurrentDate(date => addWeeks(date, viewOption));

  const getEventForDateAndOrganizer = (date, organizer) => {
    return events.find(event => 
      isSameDay(new Date(event.startDate), date) && 
      event.organizer === organizer
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Events Calendar</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevPeriod} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Previous
        </button>
        <h2 className="text-2xl font-bold">
          {format(weekDates[0], 'dd MMM')} - {format(weekDates[weekDates.length - 1], 'dd MMM yyyy')}
        </h2>
        <button onClick={handleNextPeriod} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Next
        </button>
      </div>
      <div className="mb-4">
        <select 
          value={viewOption} 
          onChange={(e) => setViewOption(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={1}>1 Week</option>
          <option value={4}>4 Weeks</option>
          <option value={8}>8 Weeks</option>
          <option value={52}>52 Weeks</option>
        </select>
      </div>
      <div className="flex-grow bg-white shadow-md rounded-lg p-4 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 sticky left-0 bg-white z-10">Organizer</th>
              {weekDates.map(date => (
                <th key={date.toString()} className="border p-2">
                  {format(date, viewOption >= 52 ? 'dd MMM' : 'EEE dd')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {organizers.map(organizer => {
              const hasEvents = weekDates.some(date => getEventForDateAndOrganizer(date, organizer));
              if (!hasEvents) return null;
              return (
                <tr key={organizer}>
                  <td className="border p-2 sticky left-0 bg-white z-10">{organizer}</td>
                  {weekDates.map(date => {
                    const event = getEventForDateAndOrganizer(date, organizer);
                    return (
                      <td key={date.toString()} className="border p-2">
                        {event && (
                          <div
                            className={`p-2 rounded cursor-pointer ${
                              event.status === 'accepted' ? 'bg-green-500' :
                              event.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                            } text-white text-xs`}
                            onClick={() => setSelectedEvent(event)}
                          >
                            {event.name}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="relative p-5 border w-96 shadow-lg rounded-md bg-white" 
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.name}</h2>
            <p><strong>Date:</strong> {format(new Date(selectedEvent.startDate), 'dd MMM yyyy')}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
            <p><strong>Link:</strong> <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{selectedEvent.link}</a></p>
            <p><strong>Status:</strong> {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}</p>
            <button onClick={() => setSelectedEvent(null)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;