import React, { useState, useEffect } from 'react';
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
  const [chartHeight, setChartHeight] = useState(height);
  const [isMobile, setIsMobile] = useState(false);
  
  // Adjust chart height and settings based on screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      
      // Adjust height for mobile
      if (mobile) {
        setChartHeight(Math.min(height, 220));
      } else {
        setChartHeight(height);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [height]);

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

  // Calculate bar size based on data length and screen size
  const getBarSize = () => {
    if (isMobile) {
      return data.length <= 3 ? 25 : data.length <= 6 ? 15 : 10;
    } else {
      return data.length <= 3 ? 40 : data.length <= 6 ? 25 : 15;
    }
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">{title}</h3>}
      <div style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ 
              top: 5, 
              right: isMobile ? 5 : 30, 
              left: isMobile ? 0 : 20, 
              bottom: 5 
            }}
            barSize={getBarSize()}
            maxBarSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey={xAxisDataKey}
              tick={{ fill: '#6B7280', fontSize: isMobile ? 10 : 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickMargin={isMobile ? 5 : 10}
              interval={isMobile ? 'preserveStartEnd' : 0}
              height={isMobile ? 40 : 60}
              tickFormatter={label => {
                // Truncate long labels on mobile
                if (isMobile && label && label.length > 6) {
                  return label.substring(0, 6) + '...';
                }
                return label;
              }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: isMobile ? 10 : 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={yAxisTickFormatter || defaultYAxisTickFormatter}
              width={isMobile ? 35 : 50}
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
              wrapperStyle={{ zIndex: 1000 }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              iconSize={isMobile ? 8 : 10}
              wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }}
            />
            {bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                name={bar.name || bar.dataKey}
                fill={bar.color || defaultColors[index % defaultColors.length]}
                stackId={stacked ? 'stack' : undefined}
                radius={barRadius}
                animationDuration={700}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;