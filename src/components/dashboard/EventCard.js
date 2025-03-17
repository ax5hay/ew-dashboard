import React from 'react';
import { Map, Calendar, Users, DollarSign } from 'lucide-react';

const EventCard = ({ event }) => {
  // Format date to display in readable format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  
  // Get status badge color
  const getStatusColor = () => {
    switch(event.status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Planning':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get event type icon color
  const getEventTypeColor = () => {
    switch(event.type) {
      case 'Public':
        return 'bg-purple-100 text-purple-800';
      case 'Private':
        return 'bg-indigo-100 text-indigo-800';
      case 'Corporate':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-900">{event.name}</h3>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusColor()}`}>
              {event.status}
            </span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getEventTypeColor()}`}>
              {event.type}
            </span>
          </div>
          
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Map className="h-3 w-3 mr-1" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end text-sm font-medium">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
            <div className="mr-3 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{event.expected.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              <span>₹{(event.revenue/100000).toFixed(1)}L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;