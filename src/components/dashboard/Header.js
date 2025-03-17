import React, { useState } from 'react';
import DateRangeSelector from './DateRangeSelector';
import { Menu, Search, Bell, HelpCircle, Calendar } from 'lucide-react';

const Header = ({ toggleSidebar, isSidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New booking at Larisa Resort', time: '10 minutes ago', read: false },
    { id: 2, text: 'Z-Tech visitor count exceeded target', time: '2 hours ago', read: false },
    { id: 3, text: 'Monthly revenue report available', time: 'Yesterday', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="ml-4 flex items-center">
            <div className="text-xl font-bold text-gray-800">
              You Asked For a Presentation, Here's a Product Instead
            </div>
            <div className="ml-4 text-sm text-gray-500 flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>Today, {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
            />
          </div>

          {/* Date Range Selector */}
          <DateRangeSelector />

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg">
                <div className="rounded-md bg-white shadow-xs">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-sm">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-gray-500 text-center">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <button className="text-xs text-center w-full text-indigo-600 hover:text-indigo-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help */}
          <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
            <HelpCircle size={20} />
          </button>

          {/* Profile - Hidden when sidebar is expanded on mobile */}
          <div className="hidden md:flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;