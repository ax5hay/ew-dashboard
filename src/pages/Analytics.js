import React, { useState } from 'react';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import LineChartComponent from '../components/charts/LineChart';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { TrendingUp, Download, Filter, AlertTriangle, Database, BarChart2, PieChart, RefreshCw, Zap } from 'lucide-react';

// Import mock data
import { 
  resortData,
  revenueData, 
  visitorData, 
  performanceData,
  parkVisitorData,
  customerSegmentData, 
} from '../data/mockData';

// Create advanced analytics data
const predictionData = [
  { month: 'Jul', predicted: 6500000, lowerBound: 6100000, upperBound: 6900000 },
  { month: 'Aug', predicted: 7200000, lowerBound: 6800000, upperBound: 7600000 },
  { month: 'Sep', predicted: 6800000, lowerBound: 6300000, upperBound: 7300000 },
  { month: 'Oct', predicted: 6300000, lowerBound: 5900000, upperBound: 6700000 },
  { month: 'Nov', predicted: 7500000, lowerBound: 7000000, upperBound: 8000000 },
  { month: 'Dec', predicted: 8200000, lowerBound: 7600000, upperBound: 8800000 },
];

// Correlation analysis data
const correlationData = [
  { 
    factor1: 'Weather (Temperature)', 
    factor2: 'Park Visitors', 
    correlation: 0.72,
    impact: 'High',
    description: 'Strong positive correlation between temperature and visitor numbers up to 35°C, then negative.'
  },
  { 
    factor1: 'Marketing Spend', 
    factor2: 'New Customer Acquisition', 
    correlation: 0.68,
    impact: 'High',
    description: 'Digital marketing shows 2.3x higher ROI than traditional channels for new customer acquisition.'
  },
  { 
    factor1: 'Resort Price', 
    factor2: 'Occupancy Rate', 
    correlation: -0.41,
    impact: 'Medium',
    description: 'Price elasticity varies by season. Monsoon season shows higher price sensitivity.'
  },
  { 
    factor1: 'Event Frequency', 
    factor2: 'Repeat Visitors', 
    correlation: 0.63,
    impact: 'High',
    description: 'Parks with bi-weekly events show 63% higher repeat visitor rates than monthly event schedules.'
  },
  { 
    factor1: 'F&B Variety', 
    factor2: 'Customer Satisfaction', 
    correlation: 0.53,
    impact: 'Medium',
    description: 'Each additional food option increases average customer satisfaction by 0.15 points (scale 1-5).'
  },
  { 
    factor1: 'Staff-to-Guest Ratio', 
    factor2: 'Service Rating', 
    correlation: 0.78,
    impact: 'High',
    description: 'Optimal ratio identified as 1:12 for parks and 1:6 for resort. Higher ratios show diminishing returns.'
  },
];

// Anomaly detection data
const anomalyData = [
  { 
    id: 1,
    date: '2025-03-05', 
    metric: 'Revenue', 
    expected: 195000, 
    actual: 132000,
    deviation: -32.3,
    status: 'Critical',
    cause: 'Unexpected competitor event in the area'
  },
  { 
    id: 2,
    date: '2025-02-22', 
    metric: 'Visitor Count', 
    expected: 2300, 
    actual: 1850,
    deviation: -19.6,
    status: 'Warning',
    cause: 'Weather forecast error'
  },
  { 
    id: 3,
    date: '2025-03-12', 
    metric: 'Booking Rate', 
    expected: 65, 
    actual: 88,
    deviation: 35.4,
    status: 'Positive',
    cause: 'Viral social media post'
  },
  { 
    id: 4,
    date: '2025-02-18', 
    metric: 'Customer Satisfaction', 
    expected: 4.2, 
    actual: 3.5,
    deviation: -16.7,
    status: 'Warning',
    cause: 'Staff shortage and long queues'
  },
];

// Combined revenue and visitor data for multivariate analysis
const combinedRevenueVisitorData = revenueData.map((item, index) => {
  const visitorItem = visitorData[index] || {};
  return {
    month: item.month,
    revenue: item.ztech + item.larisa + item.ewgroup,
    visitors: visitorItem.visitors || 0,
    onlineEngagement: visitorItem.onlineEngagement || 0
  };
});

const Analytics = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState('predictive');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  
  // Simulated analysis refresh
  const refreshAnalysis = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };
  
  // Format helpers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatPercent = (value) => {
    return `${Math.abs(value).toFixed(1)}%`;
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
  };
  
  // Render the appropriate analysis content
  const renderAnalysisContent = () => {
    switch (selectedAnalysis) {
      case 'predictive':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Revenue Forecasting</h2>
                <DateRangeSelector />
              </div>
              
              <LineChartComponent 
                data={[...revenueData, ...predictionData.map(item => ({ 
                  month: item.month, 
                  ztech: null, 
                  larisa: null, 
                  ewgroup: null,
                  predicted: item.predicted,
                  lowerBound: item.lowerBound,
                  upperBound: item.upperBound
                }))]} 
                lines={[
                  { dataKey: 'ztech', name: 'Z-Tech Actual', color: '#4F46E5' },
                  { dataKey: 'larisa', name: 'Larisa Actual', color: '#10B981' },
                  { dataKey: 'ewgroup', name: 'EW Group Actual', color: '#F59E0B' },
                  { dataKey: 'predicted', name: 'Predicted Total', color: '#8B5CF6', strokeWidth: 3, strokeDasharray: '5 5' },
                ]}
                height={350}
                isCurrency={true}
              />
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-medium text-purple-800 mb-2">Key Prediction Insights</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-1.5 w-1.5 mt-1.5 rounded-full bg-purple-600"></div>
                      <p className="ml-2 text-gray-700">Expected 27% revenue growth in Q4 compared to previous year</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-1.5 w-1.5 mt-1.5 rounded-full bg-purple-600"></div>
                      <p className="ml-2 text-gray-700">Holiday season (Nov-Dec) shows highest forecasted revenue</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-1.5 w-1.5 mt-1.5 rounded-full bg-purple-600"></div>
                      <p className="ml-2 text-gray-700">Prediction confidence: 88% (based on 3-year historical data)</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-1.5 w-1.5 mt-1.5 rounded-full bg-purple-600"></div>
                      <p className="ml-2 text-gray-700">Forecast accounts for seasonality and upcoming events</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Risk Factors</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-1.5 w-1.5 mt-1.5 rounded-full bg-blue-600"></div>
                      <p className="ml-2 text-gray-700">Weather anomalies could impact outdoor event attendance by up to 35%</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-1.5 w-1.5 mt-1.5 rounded-full bg-blue-600"></div>
                      <p className="ml-2 text-gray-700">Competitor's planned expansion may affect market share by 8-12%</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-1.5 w-1.5 mt-1.5 rounded-full bg-blue-600"></div>
                      <p className="ml-2 text-gray-700">Economic factors indicate 95% probability of 5% discretionary spending growth</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Visitor Trend Prediction</h2>
                <BarChartComponent 
                  data={visitorData} 
                  bars={[
                    { dataKey: 'visitors', name: 'Actual Visitors', color: '#4F46E5' },
                    { dataKey: 'onlineEngagement', name: 'Online Engagement', color: '#10B981' }
                  ]}
                  xAxisDataKey="month"
                  height={300}
                />
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Projection</h3>
                  <p className="mt-1 text-sm text-gray-600">AI models predict a <span className="font-medium text-green-600">22% increase</span> in visitor numbers over the next quarter, with a <span className="font-medium text-purple-600">38% growth</span> in online engagement metrics.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Segment Growth Prediction</h2>
                <div className="grid grid-cols-2 gap-4">
                  {customerSegmentData.map((segment, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">{segment.name}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {segment.value}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">+{(segment.growth || 8).toFixed(1)}%</span>
                        <span>predicted growth</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, segment.value + (segment.growth || 8))}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'correlation':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Multivariate Analysis</h2>
                <DateRangeSelector />
              </div>
              
              <LineChartComponent 
                data={combinedRevenueVisitorData} 
                lines={[
                  { dataKey: 'revenue', name: 'Total Revenue (₹)', color: '#4F46E5' },
                  { dataKey: 'visitors', name: 'Physical Visitors', color: '#10B981' },
                  { dataKey: 'onlineEngagement', name: 'Online Engagement', color: '#8B5CF6' }
                ]}
                height={350}
              />
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-medium text-indigo-900 mb-2">Key Correlation Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center mb-1 text-indigo-700">
                      <Zap className="h-4 w-4 mr-1" />
                      <span className="font-medium">Revenue / Visitors</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Correlation:</span>
                      <span className="font-medium">0.87 (Strong)</span>
                    </div>
                    <p className="mt-1 text-gray-600 text-xs">1,000 additional visitors correlates to ₹250,000 revenue increase</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center mb-1 text-purple-700">
                      <Zap className="h-4 w-4 mr-1" />
                      <span className="font-medium">Online / Visitors</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Correlation:</span>
                      <span className="font-medium">0.72 (Strong)</span>
                    </div>
                    <p className="mt-1 text-gray-600 text-xs">Online engagement converts to physical visits at 16% rate</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center mb-1 text-green-700">
                      <Zap className="h-4 w-4 mr-1" />
                      <span className="font-medium">Time Lag Effect</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finding:</span>
                      <span className="font-medium">4-6 weeks</span>
                    </div>
                    <p className="mt-1 text-gray-600 text-xs">Online engagement precedes physical visits by 4-6 weeks</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Business Factor Correlations</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Factor 1
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Factor 2
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Correlation
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Impact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Insight
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {correlationData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.factor1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.factor2}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${
                              item.correlation > 0.6 ? 'text-green-700' : 
                              item.correlation > 0.3 ? 'text-yellow-700' : 
                              item.correlation > 0 ? 'text-blue-700' : 'text-red-700'
                            }`}>
                              {Math.abs(item.correlation).toFixed(2)}
                            </span>
                            {item.correlation >= 0 ? (
                              <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                            ) : (
                              <TrendingUp className="h-4 w-4 ml-1 text-red-500 transform rotate-180" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.impact === 'High' ? 'bg-green-100 text-green-800' : 
                            item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.impact}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'anomaly':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Anomaly Detection</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={refreshAnalysis}
                    disabled={isRefreshing}
                    className={`flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium ${
                      isRefreshing ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`} />
                    {isRefreshing ? 'Analyzing...' : 'Run Analysis'}
                  </button>
                  <button
                    onClick={() => setShowInsights(!showInsights)}
                    className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {showInsights ? 'Hide Insights' : 'Show Insights'}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-red-800">Critical Anomalies</h3>
                    <span className="w-6 h-6 flex items-center justify-center bg-red-200 text-red-800 rounded-full text-xs font-medium">
                      1
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Significant deviations requiring immediate attention.</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-yellow-800">Warning Anomalies</h3>
                    <span className="w-6 h-6 flex items-center justify-center bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">
                      2
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Moderate deviations requiring investigation.</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-green-800">Positive Anomalies</h3>
                    <span className="w-6 h-6 flex items-center justify-center bg-green-200 text-green-800 rounded-full text-xs font-medium">
                      1
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Positive deviations worth analyzing for replication.</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expected
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actual
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deviation
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      {showInsights && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Probable Cause
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {anomalyData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(item.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.metric}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.metric === 'Revenue' ? formatCurrency(item.expected) : 
                           item.metric === 'Customer Satisfaction' ? item.expected.toFixed(1) :
                           item.expected.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.metric === 'Revenue' ? formatCurrency(item.actual) : 
                           item.metric === 'Customer Satisfaction' ? item.actual.toFixed(1) :
                           item.actual.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            item.deviation > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.deviation > 0 ? '+' : ''}{formatPercent(item.deviation)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === 'Critical' ? 'bg-red-100 text-red-800' : 
                            item.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        {showInsights && (
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.cause}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {showInsights && (
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">AI-Generated Insights</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Revenue anomaly on March 5th coincides with a major competitor event that wasn't factored into forecasts. Consider monitoring competitor events calendar.</p>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Customer satisfaction drop on February 18th correlates with 32% staff absence due to seasonal illness. Recommended: develop flexible staffing contingency plan.</p>
                    </div>
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Positive booking rate anomaly on March 12th attributed to viral social media post by influencer (1.2M followers). Opportunity: develop systematic influencer engagement strategy.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Database className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Select an analysis type</h3>
              <p className="mt-1 text-sm text-gray-500">Choose an analysis type from the left to view insights.</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics (Only a Small Taste into What I can Actually Do)</h1>
      
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Analysis Type Selector */}
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-medium text-gray-900">Analysis Types</h2>
            </div>
            <div className="p-4 space-y-2">
              <button
                onClick={() => setSelectedAnalysis('predictive')}
                className={`w-full flex items-center p-2 rounded-md ${
                  selectedAnalysis === 'predictive' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart2 className="h-5 w-5 mr-2" />
                Predictive Analytics
              </button>
              
              <button
                onClick={() => setSelectedAnalysis('correlation')}
                className={`w-full flex items-center p-2 rounded-md ${
                  selectedAnalysis === 'correlation' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <PieChart className="h-5 w-5 mr-2" />
                Correlation Analysis
              </button>
              
              <button
                onClick={() => setSelectedAnalysis('anomaly')}
                className={`w-full flex items-center p-2 rounded-md ${
                  selectedAnalysis === 'anomaly' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Anomaly Detection
              </button>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Analysis Tools</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <Download className="h-4 w-4 mr-2 text-gray-500" />
                  Export Analysis
                </button>
                <button className="w-full flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <Zap className="h-4 w-4 mr-2 text-gray-500" />
                  Create Custom Model
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
            <h3 className="font-medium mb-2">AI Recommendation</h3>
            <p className="text-sm mb-3 text-indigo-100">Based on your data patterns, we recommend exploring:</p>
            <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-3 rounded text-sm font-medium">
              Customer Segmentation Clustering
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {renderAnalysisContent()}
        </div>
      </div>
    </div>
  );
};

export default Analytics;