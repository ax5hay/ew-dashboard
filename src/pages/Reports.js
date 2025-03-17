import React, { useState } from 'react';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import LineChartComponent from '../components/charts/LineChart';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { FileText, Download, BarChart2, PieChart, TrendingUp, Calendar, Users, DollarSign } from 'lucide-react';

// Import mock data
import { 
  resortData,
  revenueData, 
  visitorData, 
  performanceData,
  customerSegmentData,
} from '../data/mockData';

// Report type definitions
const reportTypes = [
  {
    id: 'revenue',
    name: 'Revenue Analysis',
    description: 'Detailed breakdown of revenue sources, trends, and projections.',
    icon: DollarSign,
    color: 'blue',
    frequency: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annual']
  },
  {
    id: 'visitors',
    name: 'Visitor Analytics',
    description: 'Visitor patterns, demographics, and engagement metrics.',
    icon: Users,
    color: 'green',
    frequency: ['Weekly', 'Monthly', 'Quarterly', 'Annual']
  },
  {
    id: 'performance',
    name: 'Business Performance',
    description: 'Key performance indicators across all business units.',
    icon: BarChart2,
    color: 'purple',
    frequency: ['Monthly', 'Quarterly', 'Annual']
  },
  {
    id: 'occupancy',
    name: 'Occupancy Reports',
    description: 'Larisa Resort occupancy rates, booking patterns, and forecasts.',
    icon: TrendingUp,
    color: 'yellow',
    frequency: ['Daily', 'Weekly', 'Monthly']
  },
  {
    id: 'events',
    name: 'Event Performance',
    description: 'Analysis of event attendance, revenue, and operational metrics.',
    icon: Calendar,
    color: 'red',
    frequency: ['Per Event', 'Monthly', 'Quarterly']
  },
  {
    id: 'segments',
    name: 'Customer Segmentation',
    description: 'Detailed analysis of customer segments and behavior patterns.',
    icon: PieChart,
    color: 'indigo',
    frequency: ['Monthly', 'Quarterly', 'Annual']
  }
];

// Mock scheduled reports
const scheduledReports = [
  {
    id: 1,
    name: 'Executive Dashboard',
    type: 'Business Performance',
    frequency: 'Weekly',
    recipients: ['CEO', 'CFO', 'Board Members'],
    lastSent: '2025-03-15',
    nextScheduled: '2025-03-22'
  },
  {
    id: 2,
    name: 'Z-Tech Parks Visitor Analysis',
    type: 'Visitor Analytics',
    frequency: 'Monthly',
    recipients: ['Operations Manager', 'Marketing Team'],
    lastSent: '2025-03-01',
    nextScheduled: '2025-04-01'
  },
  {
    id: 3,
    name: 'Larisa Resort Revenue Report',
    type: 'Revenue Analysis',
    frequency: 'Monthly',
    recipients: ['Resort Manager', 'Finance Team'],
    lastSent: '2025-03-01',
    nextScheduled: '2025-04-01'
  },
  {
    id: 4,
    name: 'Quarterly Business Review',
    type: 'Business Performance',
    frequency: 'Quarterly',
    recipients: ['All Leadership'],
    lastSent: '2025-01-01',
    nextScheduled: '2025-04-01'
  }
];

// Report generation history
const reportHistory = [
  {
    id: 101,
    name: 'Executive Dashboard',
    type: 'Business Performance',
    generatedOn: '2025-03-15',
    generatedBy: 'System (Scheduled)',
    format: 'PDF'
  },
  {
    id: 102,
    name: 'Z-Tech Revenue Analysis',
    type: 'Revenue Analysis',
    generatedOn: '2025-03-14',
    generatedBy: 'John Smith',
    format: 'Excel'
  },
  {
    id: 103,
    name: 'Customer Segmentation Q1',
    type: 'Customer Segmentation',
    generatedOn: '2025-03-12',
    generatedBy: 'Sarah Johnson',
    format: 'PDF'
  },
  {
    id: 104,
    name: 'Event Performance - Summer Festival',
    type: 'Event Performance',
    generatedOn: '2025-03-10',
    generatedBy: 'Michael Lee',
    format: 'Excel'
  },
  {
    id: 105,
    name: 'Larisa Resort Occupancy Report',
    type: 'Occupancy Reports',
    generatedOn: '2025-03-08',
    generatedBy: 'System (Scheduled)',
    format: 'PDF'
  }
];

// Combine monthly revenue across all businesses
const combinedRevenueData = revenueData.map(month => ({
  month: month.month,
  total: month.ztech + month.larisa + month.ewgroup
}));

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('revenue');
  const [selectedFrequency, setSelectedFrequency] = useState('Monthly');
  
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
  
  // Get the selected report details
  const selectedReport = reportTypes.find(report => report.id === selectedReportType);
  
  // Render different report previews based on selection
  const renderReportPreview = () => {
    switch(selectedReportType) {
      case 'revenue':
        return (
          <div className="space-y-6">
            <LineChartComponent 
              title="Revenue Trend"
              data={combinedRevenueData} 
              lines={[
                { dataKey: 'total', name: 'Total Revenue', color: '#4F46E5' }
              ]}
              isCurrency={true}
              height={300}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceData.map((business, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{business.name}</h3>
                    <span className="text-sm">{formatCurrency(business.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-blue-600" 
                      style={{ width: `${(business.revenue/6000000)*100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'visitors':
        return (
          <div className="space-y-6">
            <BarChartComponent 
              title="Visitor Trends"
              data={visitorData}
              bars={[
                { dataKey: 'visitors', name: 'Physical Visitors', color: '#4F46E5' },
                { dataKey: 'onlineEngagement', name: 'Online Engagement', color: '#10B981' }
              ]}
              xAxisDataKey="month"
              height={300}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800">Key Findings</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-blue-500 mr-2"></span>
                    <span>Visitor numbers increased by 18.5% compared to previous period</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-blue-500 mr-2"></span>
                    <span>Online engagement shows 25.2% higher growth rate than physical visits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-blue-500 mr-2"></span>
                    <span>Peak visiting hours remain consistent in the 2-5pm timeframe</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-800">Recommendations</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-green-500 mr-2"></span>
                    <span>Increase off-peak hour attractions to balance visitor distribution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-green-500 mr-2"></span>
                    <span>Enhance digital engagement with interactive pre-visit content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-green-500 mr-2"></span>
                    <span>Implement targeted marketing for demographics with lowest attendance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'occupancy':
        return (
          <div className="space-y-6">
            <BarChartComponent 
              title="Larisa Resort Occupancy Rate"
              data={resortData.occupancyRate}
              bars={[
                { dataKey: 'occupancy', name: 'Occupancy %', color: '#10B981' }
              ]}
              xAxisDataKey="month"
              yAxisTickFormatter={(value) => `${value}%`}
              tooltipFormatter={(value) => [`${value}%`, 'Occupancy Rate']}
              height={300}
            />
            <div className="bg-white">
              <h3 className="font-medium mb-3">Room Type Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Rooms
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Occupancy Rate
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg. Daily Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resortData.roomTypeDistribution.map((room, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {room.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.occupancy}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(room.type === 'Standard' ? 8500 : 
                                         room.type === 'Deluxe' ? 12500 : 
                                         room.type === 'Suite' ? 18000 : 25000)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        case 'segments':
            return (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Customer Segment Distribution</h3>
                    <div className="h-64">
                      {/* Use the existing PieChartComponent that you already have in your project */}
                      <PieChartComponent 
                        data={customerSegmentData}
                        dataKey="value"
                        nameKey="name"
                        height={250}
                        isPercentage={true}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {customerSegmentData.map((segment, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            index === 0 ? 'bg-indigo-500' :
                            index === 1 ? 'bg-green-500' :
                            index === 2 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <div className="text-sm">
                            <span className="font-medium">{segment.name}</span>
                            <span className="text-gray-500 ml-2">{segment.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Segment Analysis</h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Families</span>
                          <span className="font-medium">₹4,500 avg. spend</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500">78% return rate</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Corporate</span>
                          <span className="font-medium">₹12,800 avg. spend</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500">65% return rate</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Tourists</span>
                          <span className="font-medium">₹8,200 avg. spend</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500">32% return rate</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Others</span>
                          <span className="font-medium">₹3,600 avg. spend</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500">45% return rate</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-800 mb-2">Segment Growth Opportunities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium mb-1">Corporate Packages</div>
                      <p className="text-gray-600">Potential 22% revenue increase with targeted corporate retreat packages.</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium mb-1">Family Activities</div>
                      <p className="text-gray-600">Increase family visit frequency with seasonal activity programs.</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium mb-1">Tourist Partnerships</div>
                      <p className="text-gray-600">Form partnerships with tour operators to boost tourist segment by 18%.</p>
                    </div>
                  </div>
                </div>
              </div>
            );
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Select a report type</h3>
              <p className="mt-1 text-sm text-gray-500">Choose a report type from the left to preview its content.</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics (Again, Just a Taste of What I can Accomplish)</h1>
        <DateRangeSelector />
      </div>
      
      {/* Report Generation Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Generate Reports</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Report Type Selection */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Report Type</label>
                <div className="space-y-2">
                  {reportTypes.map(report => (
                    <button
                      key={report.id}
                      className={`w-full flex items-center p-3 rounded-lg border text-left ${
                        selectedReportType === report.id 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedReportType(report.id)}
                    >
                      <div className={`p-2 rounded-md ${
                        report.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        report.color === 'green' ? 'bg-green-100 text-green-600' :
                        report.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        report.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                        report.color === 'red' ? 'bg-red-100 text-red-600' :
                        'bg-indigo-100 text-indigo-600'
                      }`}>
                        {React.createElement(report.icon, { className: 'h-5 w-5' })}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedReport && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Frequency</label>
                  <select
                    value={selectedFrequency}
                    onChange={(e) => setSelectedFrequency(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {selectedReport.frequency.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                  
                  <div className="mt-6 space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Generate Report
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Schedule Report
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Report Preview */}
            <div className="lg:col-span-3 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedReport ? `${selectedReport.name} - ${selectedFrequency}` : 'Report Preview'}
                </h3>
                
                {selectedReport && (
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <FileText className="h-4 w-4 mr-1" />
                      PDF
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Download className="h-4 w-4 mr-1" />
                      Excel
                    </button>
                  </div>
                )}
              </div>
              
              {renderReportPreview()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scheduled Reports */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Scheduled Reports</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequency
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Sent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Scheduled
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.frequency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.recipients.join(', ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(report.lastSent)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(report.nextScheduled)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Report History */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Download</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportHistory.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(report.generatedOn)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.generatedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.format === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 flex items-center justify-center">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;