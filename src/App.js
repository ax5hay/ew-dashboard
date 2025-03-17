import Events from './pages/Events';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import React, { useState } from 'react';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Sidebar from './components/layout/Sidebar';
import Header from './components/dashboard/Header';
import ZTechAnalytics from './pages/ZTechAnalytics';
import LarisaAnalytics from './pages/LarisaAnalytics';
import EWGroupAnalytics from './pages/EWGroupAnalytics';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
          isSidebarCollapsed={sidebarCollapsed}
          setCurrentPage={setCurrentPage} // Pass this to allow header to navigate to profile page
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;