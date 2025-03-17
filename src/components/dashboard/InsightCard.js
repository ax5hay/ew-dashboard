import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';

const InsightCard = ({ insight }) => {
  // Determine the icon based on insight type
  const getIcon = () => {
    switch(insight.type) {
      case 'opportunity':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'issue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'information':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // Determine the priority badge color
  const getPriorityColor = () => {
    switch(insight.priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor()}`}>
              {insight.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {insight.description}
          </p>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Impact: {insight.impact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;