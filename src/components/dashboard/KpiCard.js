import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KpiCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  // Determine if the change is positive or negative
  const isPositive = changeType === 'positive';
  
  // Define color classes based on the color prop
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
  };
  
  const iconBgClass = colorClasses[color] || 'bg-indigo-500';
  
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconBgClass} rounded-md p-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change && (
                  <div 
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                    )}
                    <span className="sr-only">{isPositive ? 'Increased' : 'Decreased'} by</span>
                    {change}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;