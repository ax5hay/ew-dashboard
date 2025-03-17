import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Calendar, BarChart2 } from 'lucide-react';

import KpiCard from '../components/dashboard/KpiCard';
import EventCard from '../components/dashboard/EventCard';
import InsightCard from '../components/dashboard/InsightCard';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import LineChartComponent from '../components/charts/LineChart';

import { formatCurrency } from '../utils/formatters';
import BusinessSelector from '../components/dashboard/BusinessSelector';

// Import mock data
import { 

  resortData,
  revenueData, 
  visitorData, 
  insightsData,
  performanceData,
  parkVisitorData,
  upcomingEventsData,
  customerSegmentData,
} from '../data/mockData';

const Dashboard = () => {
  const [selectedBusiness, setSelectedBusiness] = useState('all');
  
  // Filter data based on selected business
  const filteredEvents = selectedBusiness === 'all' 
    ? upcomingEventsData.slice(0, 4) 
    : upcomingEventsData.filter(event => event.location.toLowerCase().includes(selectedBusiness.toLowerCase())).slice(0, 4);
  
  // Configure line chart for revenue trends
  const revenueChartLines = [
    { dataKey: 'ztech', name: 'Z-Tech Parks', color: '#4F46E5' },
    { dataKey: 'larisa', name: 'Larisa Resort', color: '#10B981' },
    { dataKey: 'ewgroup', name: 'EW Group', color: '#F59E0B' }
  ];
  
  return (
    <div className="space-y-6">
      {/* Business Selector */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Business Overview</h1>
        <BusinessSelector 
          selectedBusiness={selectedBusiness} 
          onChange={setSelectedBusiness} 
        />
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Revenue" 
          value={formatCurrency(15100000)} 
          change="12%" 
          changeType="positive" 
          icon={DollarSign} 
          color="blue" 
        />
        <KpiCard 
          title="Total Visitors" 
          value="52,100" 
          change="8.5%" 
          changeType="positive" 
          icon={Users} 
          color="green" 
        />
        <KpiCard 
          title="Growth Rate" 
          value="9.8%" 
          change="2.3%" 
          changeType="positive" 
          icon={TrendingUp} 
          color="purple" 
        />
        <KpiCard 
          title="Upcoming Events" 
          value="12" 
          icon={Calendar} 
          color="yellow" 
        />
      </div>
      
      {/* Charts Section - First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LineChartComponent 
            title="Revenue Trend"
            data={revenueData} 
            lines={revenueChartLines}
            isCurrency={true}
            height={280}
          />
        </div>
        
        {/* Visitor Analytics Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <BarChartComponent 
            title="Visitor Analytics"
            data={visitorData}
            bars={[
              { dataKey: 'visitors', name: 'Physical Visitors', color: '#4F46E5' },
              { dataKey: 'onlineEngagement', name: 'Online Engagement', color: '#8B5CF6' }
            ]}
            xAxisDataKey="month"
            height={280}
          />
        </div>
      </div>
      
      {/* Charts Section - Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resort Occupancy Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <BarChartComponent 
            title="Larisa Resort Occupancy"
            data={resortData.occupancyRate}
            bars={[
              { dataKey: 'occupancy', name: 'Occupancy (%)', color: '#10B981' }
            ]}
            xAxisDataKey="month"
            yAxisTickFormatter={(value) => `${value}%`}
            tooltipFormatter={(value) => [`${value}%`, 'Occupancy Rate']}
            height={280}
          />
        </div>
        
        {/* Customer Segments Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PieChartComponent 
            title="Customer Segments"
            data={customerSegmentData}
            dataKey="value"
            nameKey="name"
            height={280}
            isPercentage={true}
          />
        </div>
        
        {/* Park Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <BarChartComponent 
            title="Z-Tech Park Performance"
            data={parkVisitorData}
            bars={[
              { dataKey: 'visitors', name: 'Visitors', color: '#4F46E5' }
            ]}
            xAxisDataKey="park"
            height={280}
          />
        </div>
      </div>
      
      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              {upcomingEventsData.length} Total
            </span>
          </div>
          <div>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-center">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All Events
            </button>
          </div>
        </div>
        
        {/* AI Insights */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">AI-Powered Insights</h2>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
              {insightsData.filter(i => i.priority === 'High').length} High Priority
            </span>
          </div>
          <div>
            {insightsData.slice(0, 4).map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-center">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All Insights
            </button>
          </div>
        </div>
      </div>
      
      {/* Business Performance Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Business Unit Performance</h2>
        <div className="space-y-4">
          {performanceData.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{item.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.growth >= 10 ? 'bg-green-100 text-green-800' : 
                  item.growth >= 5 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {item.growth > 0 ? '+' : ''}{item.growth}%
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Revenue: {formatCurrency(item.revenue)} | Satisfaction: {item.satisfaction}/5
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-blue-600" 
                  style={{ width: `${(item.revenue/6000000)*100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;