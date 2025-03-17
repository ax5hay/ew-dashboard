import React from 'react';
import { Home, Map, Hotel, Briefcase, Users, Calendar, BarChart2, Settings, ChevronLeft, ChevronRight, Database, Activity } from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'ztech', name: 'Z-Tech Parks', icon: Map },
    { id: 'larisa', name: 'Larisa Resort', icon: Hotel },
    { id: 'ewgroup', name: 'EW Group', icon: Briefcase },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: Activity, hideOnSmall: true },
    { id: 'reports', name: 'Reports', icon: BarChart2, hideOnSmall: true },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Group menu items for mobile view
  const primaryMenuItems = menuItems.filter(item => !item.hideOnSmall);
  const secondaryMenuItems = menuItems.filter(item => item.hideOnSmall);

  return (
    <div className={`bg-indigo-900 text-white h-full flex flex-col`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-800">
        {!collapsed && (
          <div className="text-xl font-semibold truncate">EW Group</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-indigo-800 focus:outline-none"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      {/* Primary Menu Items (shown on all screens) */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        <nav className="px-2 space-y-1">
          {primaryMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-2 py-3 rounded-md w-full ${
                  currentPage === item.id ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                } transition-colors duration-200`}
                onClick={() => setCurrentPage(item.id)}
                aria-label={item.name}
              >
                <Icon size={20} className={collapsed ? '' : 'mr-3'} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Secondary Menu Items (hidden on small screens) */}
        {secondaryMenuItems.length > 0 && (
          <div className="mt-2 px-2">
            {!collapsed && (
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider px-2 py-1">
                Advanced
              </div>
            )}
            <nav className="space-y-1 mt-1">
              {secondaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-2 py-3 rounded-md w-full ${
                      currentPage === item.id ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                    } transition-colors duration-200`}
                    onClick={() => setCurrentPage(item.id)}
                    aria-label={item.name}
                  >
                    <Icon size={20} className={collapsed ? '' : 'mr-3'} />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
      
      {/* User Profile */}
      <div 
        className="p-4 border-t border-indigo-800 flex items-center cursor-pointer hover:bg-indigo-800"
        onClick={() => setCurrentPage('profile')}
      >
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
          A
        </div>
        {!collapsed && (
          <div className="ml-3 truncate">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-indigo-300">View Profile</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;