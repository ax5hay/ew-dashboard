import React, { useState } from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import EventCard from '../components/dashboard/EventCard';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import LineChartComponent from '../components/charts/LineChart';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { Users, Map, Calendar, DollarSign, Droplet, MapPin } from 'lucide-react';

// Import mock data
import { 
  visitorData, 
  parkVisitorData, 
  upcomingEventsData,
  visitorDemographics, 
} from '../data/mockData';

// Filter events only for Z-Tech Parks
const ztechEvents = upcomingEventsData.filter(event => 
  event.location.toLowerCase().includes('z-tech') || 
  event.location.toLowerCase().includes('park')
);

const ZTechAnalytics = () => {
  const [selectedPark, setSelectedPark] = useState('all');
  
  // Total calculations
  const totalVisitors = visitorData.reduce((sum, data) => sum + data.visitors, 0);
  const totalRevenue = parkVisitorData.reduce((sum, park) => sum + park.revenue, 0);
  const averageSatisfaction = (parkVisitorData.reduce((sum, park) => sum + park.satisfaction, 0) / parkVisitorData.length).toFixed(1);

  // Format helpers
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
        <h1 className="text-2xl font-bold text-gray-900">Z-Tech Parks Analytics</h1>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
            value={selectedPark}
            onChange={(e) => setSelectedPark(e.target.value)}
          >
            <option value="all">All Parks</option>
            {parkVisitorData.map((park, index) => (
              <option key={index} value={park.park}>
                {park.park}
              </option>
            ))}
          </select>
          
          <DateRangeSelector />
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Visitors" 
          value={totalVisitors.toLocaleString()} 
          change="8.5%" 
          changeType="positive" 
          icon={Users} 
          color="blue" 
        />
        <KpiCard 
          title="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          change="12.3%" 
          changeType="positive" 
          icon={DollarSign} 
          color="green" 
        />
        <KpiCard 
          title="Visitor Satisfaction" 
          value={`${averageSatisfaction}/5`} 
          change="0.2" 
          changeType="positive" 
          icon={Map} 
          color="purple" 
        />
        <KpiCard 
          title="Upcoming Events" 
          value={ztechEvents.length.toString()} 
          icon={Calendar} 
          color="yellow" 
        />
      </div>
      
      {/* Visitor Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LineChartComponent 
            title="Visitor Trends"
            data={visitorData} 
            lines={[
              { dataKey: 'visitors', name: 'Physical Visitors', color: '#4F46E5' },
              { dataKey: 'onlineEngagement', name: 'Online Engagement', color: '#8B5CF6' }
            ]}
            height={280}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <BarChartComponent 
            title="Park Performance Comparison"
            data={parkVisitorData}
            bars={[
              { dataKey: 'visitors', name: 'Visitors', color: '#4F46E5' },
              { dataKey: 'revenue', name: 'Revenue (₹10K)', color: '#10B981' }
            ]}
            xAxisDataKey="park"
            tooltipFormatter={(value, name) => [
              name === 'Revenue (₹10K)' ? formatCurrency(value) : value.toLocaleString(),
              name
            ]}
            height={280}
          />
        </div>
      </div>
      
      {/* WiFi Insights and Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">WiFi Sign-up Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">WiFi Conversion Rate</h3>
              </div>
              <p className="text-3xl font-bold text-blue-700">72%</p>
              <p className="text-sm text-gray-600 mt-1">Visitors who complete WiFi registration</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Location Data Collection</h3>
              </div>
              <p className="text-3xl font-bold text-green-700">85%</p>
              <p className="text-sm text-gray-600 mt-1">Visitors sharing location information</p>
            </div>
            
            <div className="col-span-1 md:col-span-2 mt-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Registration Completion by Question Type</h3>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '96%' }}></div>
              </div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span>Name/Email: 96%</span>
                <span>Age: 87%</span>
                <span>Location: 85%</span>
                <span>Interests: 68%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PieChartComponent 
            title="Visitor Demographics by Age"
            data={visitorDemographics}
            dataKey="percentage"
            nameKey="ageGroup"
            height={280}
            isPercentage={true}
          />
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Z-Tech Events</h2>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            {ztechEvents.length} Events
          </span>
        </div>
        <div>
          {ztechEvents.map((event) => (
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
  );
};

export default ZTechAnalytics;