import Events from './pages/Events';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Sidebar from './components/layout/Sidebar';
import React, { useState, useEffect } from 'react';
import Header from './components/dashboard/Header';
import ZTechAnalytics from './pages/ZTechAnalytics';
import LarisaAnalytics from './pages/LarisaAnalytics';
import EWGroupAnalytics from './pages/EWGroupAnalytics';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Auto-collapse sidebar on mobile devices
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    // Check on initial load
    checkScreenSize();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Handle page switching
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'ztech':
        return <ZTechAnalytics />;
      case 'larisa':
        return <LarisaAnalytics />;
      case 'ewgroup':
        return <EWGroupAnalytics />;
      case 'customers':
        return <Customers />;
      case 'events':
        return <Events />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  // Close sidebar when page changes on mobile
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className={`${sidebarCollapsed ? 'hidden md:block md:w-16' : 'w-64'} transition-all duration-300 z-30 ${isMobile && !sidebarCollapsed ? 'absolute h-full' : ''}`}>
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
          isSidebarCollapsed={sidebarCollapsed}
          setCurrentPage={handlePageChange}
          isMobile={isMobile}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;