import { ChevronDown, Building } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const BusinessSelector = ({ selectedBusiness, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const businessOptions = [
    { value: 'all', label: 'All Businesses' },
    { value: 'ztech', label: 'Z-Tech Parks & Events' },
    { value: 'larisa', label: 'Larisa Resort' },
    { value: 'ewgroup', label: 'EW Group' }
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
    onChange(value);
    setIsOpen(false);
  };

  const getDisplayLabel = () => {
    const selected = businessOptions.find(option => option.value === selectedBusiness);
    return selected ? selected.label : 'Select Business';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
      >
        <Building size={16} className="mr-2" />
        <span>{getDisplayLabel()}</span>
        <ChevronDown size={16} className="ml-2" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-20">
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1">
              {businessOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`block px-4 py-2 text-sm leading-5 text-left w-full ${
                    selectedBusiness === option.value 
                      ? 'bg-indigo-100 text-indigo-900' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessSelector;