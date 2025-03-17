import React from 'react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({
  data,
  bars = [],
  xAxisDataKey = 'name',
  title,
  height = 300,
  isCurrency = false,
  stacked = false,
  tooltipFormatter,
  yAxisTickFormatter,
  barRadius = [4, 4, 0, 0] // top-left, top-right, bottom-right, bottom-left
}) => {
  // Generate colors for bars if not provided
  const defaultColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Apply default formatters if not provided
  const defaultTooltipFormatter = (value, name) => {
    if (isCurrency) {
      return [formatCurrency(value), name];
    }
    return [formatNumber(value), name];
  };
  
  const defaultYAxisTickFormatter = (value) => {
    if (isCurrency) {
      return value >= 1000000 
        ? `₹${(value / 1000000).toFixed(1)}M` 
        : `₹${(value / 1000).toFixed(0)}K`;
    }
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value;
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-base font-medium text-gray-900 mb-3">{title}</h3>}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey={xAxisDataKey}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={yAxisTickFormatter || defaultYAxisTickFormatter}
            />
            <Tooltip 
              formatter={tooltipFormatter || defaultTooltipFormatter}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px' }}
            />
            {bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                name={bar.name || bar.dataKey}
                fill={bar.color || defaultColors[index % defaultColors.length]}
                stackId={stacked ? 'stack' : undefined}
                radius={barRadius}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;