import React from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import EventCard from '../components/dashboard/EventCard';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import LineChartComponent from '../components/charts/LineChart';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { Users, Hotel, Calendar, DollarSign, Star, Coffee } from 'lucide-react';

// Import mock data
import { 
  resortData, 
  upcomingEventsData,
} from '../data/mockData';

// Filter events only for Larisa Resort
const larisaEvents = upcomingEventsData.filter(event => 
  event.location.toLowerCase().includes('larisa') || 
  event.location.toLowerCase().includes('resort')
);

const LarisaAnalytics = () => {
  // Calculate metrics
  const latestOccupancy = resortData.occupancyRate[resortData.occupancyRate.length - 1].occupancy;
  const latestAvgRate = resortData.occupancyRate[resortData.occupancyRate.length - 1].averageRate;
  const totalRooms = resortData.roomTypeDistribution.reduce((sum, room) => sum + room.count, 0);
  const overallSatisfaction = (resortData.guestSatisfaction.reduce((sum, item) => sum + item.score, 0) / resortData.guestSatisfaction.length).toFixed(1);
  
  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Larisa Resort Analytics</h1>
        <DateRangeSelector />
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Current Occupancy" 
          value={`${latestOccupancy}%`} 
          change="4%" 
          changeType="positive" 
          icon={Hotel} 
          color="blue" 
        />
        <KpiCard 
          title="Average Room Rate" 
          value={formatCurrency(latestAvgRate)} 
          change="6.2%" 
          changeType="positive" 
          icon={DollarSign} 
          color="green" 
        />
        <KpiCard 
          title="Guest Satisfaction" 
          value={`${overallSatisfaction}/5`} 
          change="0.3" 
          changeType="positive" 
          icon={Star} 
          color="purple" 
        />
        <KpiCard 
          title="Upcoming Events" 
          value={larisaEvents.length.toString()} 
          icon={Calendar} 
          color="yellow" 
        />
      </div>
      
      {/* Occupancy and Rate Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LineChartComponent 
            title="Occupancy Rate Trend"
            data={resortData.occupancyRate} 
            lines={[
              { dataKey: 'occupancy', name: 'Occupancy Rate (%)', color: '#4F46E5' }
            ]}
            yAxisTickFormatter={(value) => `${value}%`}
            tooltipFormatter={(value) => [`${value}%`, 'Occupancy Rate']}
            height={280}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LineChartComponent 
            title="Average Room Rate"
            data={resortData.occupancyRate}
            lines={[
              { dataKey: 'averageRate', name: 'Average Rate', color: '#10B981' }
            ]}
            isCurrency={true}
            height={280}
          />
        </div>
      </div>
      
      {/* Room Types and Guest Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Room Type Distribution</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {resortData.roomTypeDistribution.map((room, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{room.type}</h3>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm text-gray-500">Total Rooms:</span>
                  <span className="font-medium">{room.count}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-sm text-gray-500">Current Occupancy:</span>
                  <span className="font-medium">{room.occupancy}%</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${room.occupancy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Coffee className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-medium">Total Capacity</h3>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700">{totalRooms}</p>
                <p className="text-sm text-gray-600">Total Rooms</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {Math.round(totalRooms * (latestOccupancy/100))}
                </p>
                <p className="text-sm text-gray-600">Currently Occupied</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-700">
                  {totalRooms - Math.round(totalRooms * (latestOccupancy/100))}
                </p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Guest Satisfaction Ratings</h2>
          <BarChartComponent 
            data={resortData.guestSatisfaction}
            bars={[
              { dataKey: 'score', name: 'Score (out of 5)', color: '#8B5CF6' }
            ]}
            xAxisDataKey="category"
            height={240}
            yAxisTickFormatter={(value) => value}
            tooltipFormatter={(value) => [`${value}/5`, 'Rating']}
          />
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-purple-800">Overall Experience</h3>
                <p className="text-sm text-gray-600 mt-1">Combined guest satisfaction rating</p>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 opacity-50" />
                <span className="ml-2 font-bold">{overallSatisfaction}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PieChartComponent 
            title="Booking Channels"
            data={resortData.bookingChannels}
            dataKey="percentage"
            nameKey="channel"
            height={280}
            isPercentage={true}
          />
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Resort Events</h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              {larisaEvents.length} Events
            </span>
          </div>
          <div>
            {larisaEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-center">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LarisaAnalytics;