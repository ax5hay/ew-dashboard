import React, { useState } from 'react';
import DateRangeSelector from './DateRangeSelector';
import { Menu, Search, Bell, HelpCircle, Calendar, Settings, User, LogOut } from 'lucide-react';

const Header = ({ toggleSidebar, isSidebarCollapsed, setCurrentPage, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New booking at Larisa Resort', time: '10 minutes ago', read: false },
    { id: 2, text: 'Z-Tech visitor count exceeded target', time: '2 hours ago', read: false },
    { id: 3, text: 'Monthly revenue report available', time: 'Yesterday', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Navigate to profile page
  const goToProfile = () => {
    setCurrentPage('profile');
    setShowUserMenu(false);
  };
  
  // Navigate to settings page
  const goToSettings = () => {
    setCurrentPage('settings');
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-2 sm:px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="ml-2 sm:ml-4 flex items-center">
            <div className="text-base sm:text-xl font-bold text-gray-800 truncate max-w-[120px] sm:max-w-none">
              {isMobile ? 'EW Dashboard' : 'Business Intelligence Dashboard'}
            </div>
            <div className="hidden sm:flex ml-4 text-sm text-gray-500 items-center">
              <Calendar size={16} className="mr-1" />
              <span>Today, {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Search (Desktop) */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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

          {/* Search Icon (Mobile) */}
          <button 
            className="md:hidden p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search size={20} />
          </button>

          {/* Mobile Search Input (conditional) */}
          {showMobileSearch && (
            <div className="absolute top-16 left-0 right-0 bg-white p-2 border-b border-gray-200 z-20">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  autoFocus
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowMobileSearch(false)}
                >
                  <span className="text-sm text-gray-500">Done</span>
                </button>
              </div>
            </div>
          )}

          {/* Date Range Selector (hidden on small mobile) */}
          <div className="hidden sm:block">
            <DateRangeSelector />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
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
              <div className="origin-top-right absolute right-0 mt-2 w-80 sm:w-96 rounded-md shadow-lg">
                <div className="rounded-md bg-white shadow-xs max-h-[80vh] overflow-hidden flex flex-col">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto flex-1">
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

          {/* Help (hidden on mobile) */}
          <button className="hidden sm:block p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
            <HelpCircle size={20} />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <div>
              <button 
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex text-sm bg-indigo-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  A
                </div>
              </button>
            </div>
            
            {showUserMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20">
                <button
                  onClick={goToProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  Your Profile
                </button>
                <button
                  onClick={goToSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4 mr-2 text-gray-500" />
                  Settings
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;