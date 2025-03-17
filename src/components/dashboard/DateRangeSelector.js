import { Calendar, ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const DateRangeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('30d');
  const dropdownRef = useRef(null);

  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    setSelectedRange(value);
    setIsOpen(false);
    
    // If "Custom Range" is selected, you could open a date picker modal here
    if (value === 'custom') {
      // Logic for opening a custom date range picker would go here
      console.log('Custom range selected');
    }
  };

  const getDisplayLabel = () => {
    const selected = timeRanges.find(range => range.value === selectedRange);
    return selected ? selected.label : 'Select Range';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
      >
        <Calendar size={16} className="mr-2" />
        <span>{getDisplayLabel()}</span>
        <ChevronDown size={16} className="ml-2" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20">
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleSelect(range.value)}
                  className={`block px-4 py-2 text-sm leading-5 text-left w-full ${
                    selectedRange === range.value 
                      ? 'bg-indigo-100 text-indigo-900' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;