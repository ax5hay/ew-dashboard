import React from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import InsightCard from '../components/dashboard/InsightCard';
import LineChartComponent from '../components/charts/LineChart';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { TrendingUp, DollarSign, BarChart2, PieChart, ArrowUp, ArrowDown, Activity } from 'lucide-react';

// Import mock data
import { 
  revenueData,
  insightsData,
  performanceData,
  customerSegmentData,
} from '../data/mockData';

const EWGroupAnalytics = () => {
  // Calculate totals and metrics
  const totalRevenue = performanceData.reduce((sum, business) => sum + business.revenue, 0);
  const totalProfit = performanceData.reduce((sum, business) => sum + (business.profit || business.revenue * 0.4), 0);
  const profitMargin = (totalProfit / totalRevenue * 100).toFixed(1);
  const avgGrowth = (performanceData.reduce((sum, business) => sum + business.growth, 0) / performanceData.length).toFixed(1);
  
  // Format helpers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Combine monthly revenue across all businesses
  const combinedRevenueData = revenueData.map(month => ({
    month: month.month,
    total: month.ztech + month.larisa + month.ewgroup,
    ztech: month.ztech,
    larisa: month.larisa,
    ewgroup: month.ewgroup
  }));
  
  // Compare performance metrics between businesses
  const prepareComparisonData = (metric) => {
    return performanceData.map(business => ({
      name: business.name,
      value: business[metric] || 0
    }));
  };
  
  const revenueComparison = prepareComparisonData('revenue');
  const growthComparison = prepareComparisonData('growth');
  
  // Ensure customerSegmentData has growth property
  const enhancedCustomerSegmentData = customerSegmentData.map(segment => ({
    ...segment,
    growth: segment.growth || Math.floor(Math.random() * 15) - 5 // Add random growth if missing
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Collective Business Performance (Curerntly Running on Mock Data)</h1>
        <DateRangeSelector />
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          change="10.2%" 
          changeType="positive" 
          icon={DollarSign} 
          color="blue" 
        />
        <KpiCard 
          title="Total Profit" 
          value={formatCurrency(totalProfit)} 
          change="12.6%" 
          changeType="positive" 
          icon={TrendingUp} 
          color="green" 
        />
        <KpiCard 
          title="Profit Margin" 
          value={`${profitMargin}%`} 
          change="1.8%" 
          changeType="positive" 
          icon={PieChart} 
          color="purple" 
        />
        <KpiCard 
          title="Avg Growth Rate" 
          value={`${avgGrowth}%`} 
          change="0.5%" 
          changeType="positive" 
          icon={BarChart2} 
          color="yellow" 
        />
      </div>
      
      {/* Revenue and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LineChartComponent 
            title="Group Revenue Trend"
            data={combinedRevenueData} 
            lines={[
              { dataKey: 'total', name: 'Total Revenue', color: '#4F46E5' }
            ]}
            isCurrency={true}
            height={280}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <BarChartComponent 
            title="Business Unit Revenue Comparison"
            data={revenueComparison}
            bars={[
              { dataKey: 'value', name: 'Revenue', color: '#10B981' }
            ]}
            xAxisDataKey="name"
            isCurrency={true}
            height={280}
          />
        </div>
      </div>
      
      {/* Business Performance Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Business Unit Performance</h2>
        <div className="space-y-4">
          {performanceData.map((business, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{business.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  business.growth >= 10 ? 'bg-green-100 text-green-800' : 
                  business.growth >= 5 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {business.growth > 0 ? '+' : ''}{business.growth}%
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-sm font-medium">{formatCurrency(business.revenue)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expenses</p>
                  <p className="text-sm font-medium">{formatCurrency(business.expenses || business.revenue * 0.6)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Profit</p>
                  <p className="text-sm font-medium">{formatCurrency(business.profit || business.revenue * 0.4)}</p>
                </div>
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
      
      {/* Growth and Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Growth Rate Comparison</h2>
          <BarChartComponent 
            data={growthComparison}
            bars={[
              { dataKey: 'value', name: 'Growth Rate (%)', color: '#8B5CF6' }
            ]}
            xAxisDataKey="name"
            yAxisTickFormatter={(value) => `${value}%`}
            tooltipFormatter={(value) => [`${value}%`, 'Growth Rate']}
            height={240}
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceData.map((business, index) => (
              <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3">
                <div className={`p-2 rounded-full ${
                  business.growth >= 10 ? 'bg-green-100' : 
                  business.growth >= 5 ? 'bg-yellow-100' : 
                  'bg-red-100'
                }`}>
                  {business.growth >= 5 ? (
                    <ArrowUp className={`h-5 w-5 ${
                      business.growth >= 10 ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{business.name}</p>
                  <p className="text-xs text-gray-500">
                    {business.growth > 0 ? '+' : ''}{business.growth}% growth
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Segments Analysis</h2>
          <div className="flex justify-center mb-3">
            <PieChartComponent 
              data={enhancedCustomerSegmentData}
              dataKey="value"
              nameKey="name"
              height={240}
              isPercentage={true}
              innerRadius={60}
              outerRadius={100}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {enhancedCustomerSegmentData.map((segment, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm font-medium">{segment.name}</p>
                <p className="text-xl font-bold">{segment.value}%</p>
                <div className="flex items-center justify-center mt-2">
                  <span className={`text-xs ${segment.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {segment.growth > 0 ? '+' : ''}{segment.growth}%
                  </span>
                  <Activity className={`h-3 w-3 ml-1 ${segment.growth > 0 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Strategic Business Insights</h2>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
            {insightsData.filter(i => i.priority === 'High').length} High Priority
          </span>
        </div>
        <div>
          {insightsData.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-center">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            View All Insights
          </button>
        </div>
      </div>
      
      {/* Investment Opportunities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Investment Allocation Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <h3 className="font-medium text-blue-800">Technology Infrastructure</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Cross-business technology investments to unify data and improve analytics capabilities.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Potential ROI</span>
              <span className="text-sm font-medium text-blue-800">28-32%</span>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <h3 className="font-medium text-green-800">Larisa Resort Expansion</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Additional luxury accommodations to capitalize on growing high-end tourism.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Potential ROI</span>
              <span className="text-sm font-medium text-green-800">22-25%</span>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <h3 className="font-medium text-purple-800">Z-Tech New Attraction</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Next-generation interactive experience to boost visitor numbers and engagement.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Potential ROI</span>
              <span className="text-sm font-medium text-purple-800">18-24%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EWGroupAnalytics;