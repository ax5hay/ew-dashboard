import React, { useState } from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import PieChartComponent from '../components/charts/PieChart';
import LineChartComponent from '../components/charts/LineChart';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { Users, UserPlus, Filter, Search, Mail, Phone, MapPin, Star, MessageSquare } from 'lucide-react';

// Import mock data
import { 
  resortData,
  customerSegmentData,
  visitorDemographics,
} from '../data/mockData';

// Create additional mock data for customers page
const customerData = [
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    email: 'rahul.sharma@example.com', 
    phone: '+91 98765 43210',
    location: 'Mumbai',
    segment: 'Families',
    lastVisit: '2025-03-01',
    totalSpend: 120000,
    totalVisits: 8,
    satisfaction: 4.8
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    email: 'priya.patel@example.com', 
    phone: '+91 87654 32109',
    location: 'Delhi',
    segment: 'Corporate',
    lastVisit: '2025-02-15',
    totalSpend: 350000,
    totalVisits: 12,
    satisfaction: 4.5
  },
  { 
    id: 3, 
    name: 'Vikram Singh', 
    email: 'vikram.singh@example.com', 
    phone: '+91 76543 21098',
    location: 'Bangalore',
    segment: 'Tourists',
    lastVisit: '2025-03-10',
    totalSpend: 85000,
    totalVisits: 3,
    satisfaction: 4.2
  },
  { 
    id: 4, 
    name: 'Neha Gupta', 
    email: 'neha.gupta@example.com', 
    phone: '+91 65432 10987',
    location: 'Chennai',
    segment: 'Families',
    lastVisit: '2025-01-25',
    totalSpend: 95000,
    totalVisits: 5,
    satisfaction: 4.9
  },
  { 
    id: 5, 
    name: 'Amit Kumar', 
    email: 'amit.kumar@example.com', 
    phone: '+91 54321 09876',
    location: 'Hyderabad',
    segment: 'Corporate',
    lastVisit: '2025-02-28',
    totalSpend: 280000,
    totalVisits: 7,
    satisfaction: 4.3
  },
  { 
    id: 6, 
    name: 'Sneha Reddy', 
    email: 'sneha.reddy@example.com', 
    phone: '+91 43210 98765',
    location: 'Pune',
    segment: 'Tourists',
    lastVisit: '2025-03-05',
    totalSpend: 62000,
    totalVisits: 2,
    satisfaction: 4.7
  },
  { 
    id: 7, 
    name: 'Arjun Mehta', 
    email: 'arjun.mehta@example.com', 
    phone: '+91 32109 87654',
    location: 'Kolkata',
    segment: 'Others',
    lastVisit: '2025-02-10',
    totalSpend: 45000,
    totalVisits: 4,
    satisfaction: 4.0
  },
  { 
    id: 8, 
    name: 'Divya Jain', 
    email: 'divya.jain@example.com', 
    phone: '+91 21098 76543',
    location: 'Ahmedabad',
    segment: 'Families',
    lastVisit: '2025-01-18',
    totalSpend: 110000,
    totalVisits: 6,
    satisfaction: 4.6
  }
];

// Customer acquisition data
const customerAcquisitionData = [
  { month: 'Jan', newCustomers: 420, returningCustomers: 850 },
  { month: 'Feb', newCustomers: 480, returningCustomers: 920 },
  { month: 'Mar', newCustomers: 550, returningCustomers: 980 },
  { month: 'Apr', newCustomers: 620, returningCustomers: 1050 },
  { month: 'May', newCustomers: 680, returningCustomers: 1120 },
  { month: 'Jun', newCustomers: 750, returningCustomers: 1230 },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  
  // Calculate totals
  const totalCustomers = customerData.length;
  const totalSpend = customerData.reduce((sum, customer) => sum + customer.totalSpend, 0);
  const averageSatisfaction = (customerData.reduce((sum, customer) => sum + customer.satisfaction, 0) / totalCustomers).toFixed(1);
  
  // Filter customers based on search and segment
  const filteredCustomers = customerData.filter(customer => {
    const matchesSearch = searchQuery === '' || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment;
    
    return matchesSearch && matchesSegment;
  });
  
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
        <h1 className="text-2xl font-bold text-gray-900">Customer Management (The Real Goldmine of Data)</h1>
        <DateRangeSelector />
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Customers" 
          value={totalCustomers.toString()} 
          change="18.5%" 
          changeType="positive" 
          icon={Users} 
          color="blue" 
        />
        <KpiCard 
          title="New This Month" 
          value="750" 
          change="10.3%" 
          changeType="positive" 
          icon={UserPlus} 
          color="green" 
        />
        <KpiCard 
          title="Total Customer Spend" 
          value={formatCurrency(totalSpend)} 
          change="15.2%" 
          changeType="positive" 
          icon={Star} 
          color="purple" 
        />
        <KpiCard 
          title="Avg. Satisfaction" 
          value={`${averageSatisfaction}/5`} 
          change="0.2" 
          changeType="positive" 
          icon={MessageSquare} 
          color="yellow" 
        />
      </div>
      
      {/* Customer Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LineChartComponent 
            title="Customer Acquisition"
            data={customerAcquisitionData} 
            lines={[
              { dataKey: 'newCustomers', name: 'New Customers', color: '#4F46E5' },
              { dataKey: 'returningCustomers', name: 'Returning Customers', color: '#10B981' }
            ]}
            height={280}
          />
        </div>
      </div>
      
      {/* Customer Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Age Distribution</h2>
          <PieChartComponent 
            data={visitorDemographics}
            dataKey="percentage"
            nameKey="ageGroup"
            height={280}
            isPercentage={true}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Channels</h2>
          <PieChartComponent 
            data={resortData.bookingChannels}
            dataKey="percentage"
            nameKey="channel"
            height={280}
            isPercentage={true}
          />
        </div>
      </div>
      
      {/* Customer List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900 mb-2 md:mb-0">Customer Database</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-10 py-2 border border-gray-300 rounded-md text-sm leading-5 focus:outline-none focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm leading-5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Segments</option>
                  {customerSegmentData.map((segment, index) => (
                    <option key={index} value={segment.name}>{segment.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
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
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spend
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-800 font-medium">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {customer.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" /> {customer.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" /> {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.segment === 'Families' ? 'bg-blue-100 text-blue-800' :
                      customer.segment === 'Corporate' ? 'bg-purple-100 text-purple-800' :
                      customer.segment === 'Tourists' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(customer.lastVisit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(customer.totalSpend)}
                    <div className="text-xs text-gray-500">{customer.totalVisits} visits</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{customer.satisfaction}</div>
                      <div className="ml-1 flex">
                        {[...Array(Math.floor(customer.satisfaction))].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        {customer.satisfaction % 1 > 0 && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current opacity-50" />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{totalCustomers}</span> customers
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
    </div>
  );
};

export default Customers;