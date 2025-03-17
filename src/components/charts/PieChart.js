import React from 'react';
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
    if (!showLabels) return null;
    
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
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-base font-medium text-gray-900 mb-3">{title}</h3>}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
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
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;