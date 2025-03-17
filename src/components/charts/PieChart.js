import React, { useState, useEffect } from 'react';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#0EA5E9', '#14B8A6'];

const PieChartComponent = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  title,
  height = 300,
  isCurrency = false,
  isPercentage = false,
  tooltipFormatter,
  colors = COLORS,
  showLabels = true,
  innerRadius = 0, // 0 for pie, > 0 for donut
  outerRadius = 80,
}) => {
  const [chartHeight, setChartHeight] = useState(height);
  const [isMobile, setIsMobile] = useState(false);
  const [adjustedOuterRadius, setAdjustedOuterRadius] = useState(outerRadius);
  const [adjustedInnerRadius, setAdjustedInnerRadius] = useState(innerRadius);
  
  // Adjust chart dimensions based on screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      const small = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Adjust height and radius for smaller screens
      if (mobile) {
        setChartHeight(Math.min(height, 200));
        setAdjustedOuterRadius(Math.min(outerRadius, 60));
        setAdjustedInnerRadius(innerRadius === 0 ? 0 : Math.min(innerRadius, 30));
      } else if (small) {
        setChartHeight(Math.min(height, 240));
        setAdjustedOuterRadius(Math.min(outerRadius, 70));
        setAdjustedInnerRadius(innerRadius === 0 ? 0 : Math.min(innerRadius, 35));
      } else {
        setChartHeight(height);
        setAdjustedOuterRadius(outerRadius);
        setAdjustedInnerRadius(innerRadius);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [height, outerRadius, innerRadius]);
  
  // Apply default formatters if not provided
  const defaultTooltipFormatter = (value, name, entry) => {
    let formattedValue;
    if (isCurrency) {
      formattedValue = formatCurrency(value);
    } else if (isPercentage) {
      formattedValue = formatPercent(value);
    } else {
      formattedValue = formatNumber(value);
    }
    return [`${formattedValue}`, entry.payload[nameKey]];
  };

  // Custom label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    if (!showLabels || isMobile) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Only show label if segment is large enough
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">{title}</h3>}
      <div style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={adjustedInnerRadius}
              outerRadius={adjustedOuterRadius}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
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
            />
            <Legend
              layout={isMobile ? "horizontal" : "vertical"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              align={isMobile ? "center" : "right"}
              iconSize={isMobile ? 8 : 10}
              wrapperStyle={{ 
                fontSize: isMobile ? '10px' : '12px',
                paddingLeft: isMobile ? 0 : 20,
                paddingTop: isMobile ? 10 : 0 
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;