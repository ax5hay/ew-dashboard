import React, { useState } from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import PieChartComponent from '../components/charts/PieChart';
import BarChartComponent from '../components/charts/BarChart';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { Calendar, Users, DollarSign, TrendingUp, Filter, Search, Map, Clock, Tag } from 'lucide-react';

// Import mock data
import { upcomingEventsData } from '../data/mockData';

// Create additional mock data for events page
const eventsStatusData = [
  { name: 'Confirmed', value: 65 },
  { name: 'Planning', value: 25 },
  { name: 'Pending', value: 7 },
  { name: 'Cancelled', value: 3 },
];

const eventsTypeData = [
  { name: 'Public', value: 52 },
  { name: 'Private', value: 28 },
  { name: 'Corporate', value: 20 },
];

const eventPerformanceData = [
  { month: 'Jan', revenue: 3800000, attendees: 21500 },
  { month: 'Feb', revenue: 4200000, attendees: 24200 },
  { month: 'Mar', revenue: 4700000, attendees: 28400 },
  { month: 'Apr', revenue: 5200000, attendees: 32000 },
  { month: 'May', revenue: 5600000, attendees: 35800 },
  { month: 'Jun', revenue: 6100000, attendees: 39500 },
];

// Extended event data
const allEventsData = [
  ...upcomingEventsData,
  { 
    id: 7, 
    name: 'Tech Innovation Summit', 
    location: 'EW Convention Center', 
    date: '2025-08-15', 
    expected: 1800, 
    type: 'Corporate',
    status: 'Planning',
    revenue: 4200000
  },
  { 
    id: 8, 
    name: 'Monsoon Cultural Festival', 
    location: 'Z-Tech Central Park', 
    date: '2025-07-20', 
    expected: 10500, 
    type: 'Public',
    status: 'Confirmed',
    revenue: 1600000
  },
  { 
    id: 9, 
    name: 'Wine & Dine Evening', 
    location: 'Larisa Resort', 
    date: '2025-08-22', 
    expected: 300, 
    type: 'Private',
    status: 'Confirmed',
    revenue: 3200000
  },
  { 
    id: 10, 
    name: 'Adventure Sports Challenge', 
    location: 'Z-Tech Adventure Park', 
    date: '2025-09-05', 
    expected: 7500, 
    type: 'Public',
    status: 'Planning',
    revenue: 900000
  },
  { 
    id: 11, 
    name: 'Luxury Product Launch', 
    location: 'Larisa Resort', 
    date: '2025-07-30', 
    expected: 500, 
    type: 'Corporate',
    status: 'Pending',
    revenue: 2700000
  },
  { 
    id: 12, 
    name: 'Industry Leadership Conclave', 
    location: 'EW Convention Center', 
    date: '2025-08-10', 
    expected: 1000, 
    type: 'Corporate',
    status: 'Confirmed',
    revenue: 3800000
  },
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  // Calculate totals
  const totalEvents = allEventsData.length;
  const totalAttendees = allEventsData.reduce((sum, event) => sum + event.expected, 0);
  const totalRevenue = allEventsData.reduce((sum, event) => sum + event.revenue, 0);
  
  // Get unique locations for filter
  const uniqueLocations = [...new Set(allEventsData.map(event => event.location))];
  
  // Filter events based on search and filters
  const filteredEvents = allEventsData.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
    
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });
  
  // Sort events by date (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Format helpers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Events Management (Can be Segmented or Collective)</h1>
        <DateRangeSelector />
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Events" 
          value={totalEvents.toString()} 
          change="25%" 
          changeType="positive" 
          icon={Calendar} 
          color="blue" 
        />
        <KpiCard 
          title="Expected Attendees" 
          value={totalAttendees.toLocaleString()} 
          change="18.5%" 
          changeType="positive" 
          icon={Users} 
          color="green" 
        />
        <KpiCard 
          title="Projected Revenue" 
          value={formatCurrency(totalRevenue)} 
          change="22.3%" 
          changeType="positive" 
          icon={DollarSign} 
          color="purple" 
        />
        <KpiCard 
          title="Avg. Revenue/Attendee" 
          value={formatCurrency(Math.round(totalRevenue / totalAttendees))} 
          change="3.8%" 
          changeType="positive" 
          icon={TrendingUp} 
          color="yellow" 
        />
      </div>
      
      {/* Event Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Event Performance</h2>
          <BarChartComponent 
            data={eventPerformanceData}
            bars={[
              { dataKey: 'revenue', name: 'Revenue (₹)', color: '#4F46E5' },
              { dataKey: 'attendees', name: 'Attendees', color: '#10B981' }
            ]}
            xAxisDataKey="month"
            tooltipFormatter={(value, name) => [
              name === 'Revenue (₹)' ? formatCurrency(value) : value.toLocaleString(),
              name
            ]}
            height={280}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Event Status</h2>
            <PieChartComponent 
              data={eventsStatusData}
              dataKey="value"
              nameKey="name"
              height={200}
              isPercentage={true}
              colors={['#10B981', '#6366F1', '#F59E0B', '#EF4444']}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Event Types</h2>
            <PieChartComponent 
              data={eventsTypeData}
              dataKey="value"
              nameKey="name"
              height={200}
              isPercentage={true}
              colors={['#8B5CF6', '#EC4899', '#3B82F6']}
            />
          </div>
        </div>
      </div>
      
      {/* Events List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-medium text-gray-900 mb-2 md:mb-0">Upcoming Events</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-10 py-2 border border-gray-300 rounded-md text-sm leading-5 focus:outline-none focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm leading-5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Planning">Planning</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm leading-5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Types</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Corporate">Corporate</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm leading-5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Map className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Map className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      event.type === 'Public' ? 'bg-purple-100 text-purple-800' :
                      event.type === 'Private' ? 'bg-pink-100 text-pink-800' :
                      event.type === 'Corporate' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      event.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      event.status === 'Planning' ? 'bg-indigo-100 text-indigo-800' :
                      event.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{event.expected.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(event.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{sortedEvents.length}</span> of <span className="font-medium">{allEventsData.length}</span> events
          </div>
          <div className="flex items-center space-x-2">
            <button className="border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Event Planning Tools */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Event Planning Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <h3 className="font-medium text-blue-800">Event Capacity Planner</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Optimize venue capacity utilization and staff allocation for maximum efficiency.
            </p>
            <button className="text-sm text-blue-600 font-medium">
              Open Planner →
            </button>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <h3 className="font-medium text-green-800">Revenue Forecasting</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Predict event revenue based on historical data, attendance, and pricing models.
            </p>
            <button className="text-sm text-green-600 font-medium">
              View Forecasts →
            </button>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <h3 className="font-medium text-purple-800">Marketing Campaign Tracker</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Monitor event promotion campaigns and ticket sales conversion rates.
            </p>
            <button className="text-sm text-purple-600 font-medium">
              Track Campaigns →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;