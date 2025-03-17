import React, { useState } from 'react';
import { User, Mail, Phone, Clock, MapPin, Calendar, Shield, Key, Upload, Edit2, Save, X, Activity, Download } from 'lucide-react';

// Mock user data
const mockUserData = {
  id: 1,
  name: 'Admin User',
  email: 'admin@ewgroup.in',
  role: 'System Administrator',
  department: 'IT & Data',
  phone: '+91 98765 43210',
  location: 'Chhatarpur, Delhi, India',
  timezone: 'Asia/Kolkata',
  language: 'English',
  joinDate: '2023-04-15',
  lastActive: '2025-03-17T09:45:00',
  profileImage: null,
  notifications: {
    unread: 5,
    total: 28
  },
  permissions: [
    { id: 1, name: 'Dashboard Access', granted: true },
    { id: 2, name: 'User Management', granted: true },
    { id: 3, name: 'Report Generation', granted: true },
    { id: 4, name: 'System Configuration', granted: true },
    { id: 5, name: 'API Access', granted: true },
    { id: 6, name: 'Financial Data', granted: true },
    { id: 7, name: 'Customer Data', granted: true },
    { id: 8, name: 'Event Management', granted: true }
  ],
  securitySettings: {
    twoFactorEnabled: true,
    lastPasswordChange: '2025-01-10',
    passwordExpiryDays: 90,
    loginAttempts: 0,
    sessionTimeout: 120
  },
  recentActivity: [
    { id: 1, action: 'Generated Revenue Report', timestamp: '2025-03-17T08:30:00', details: 'Quarterly Revenue Analysis Q1 2025' },
    { id: 2, action: 'Updated System Settings', timestamp: '2025-03-16T14:45:00', details: 'Modified backup frequency to daily' },
    { id: 3, action: 'Accessed Customer Database', timestamp: '2025-03-16T11:20:00', details: 'Viewed corporate client records' },
    { id: 4, action: 'Modified Event Schedule', timestamp: '2025-03-15T16:15:00', details: 'Updated Summer Festival details' },
    { id: 5, action: 'Login from New Device', timestamp: '2025-03-15T09:00:00', details: 'Windows workstation, Mumbai office' }
  ]
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(mockUserData);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  
  // Handle tab switching
  const handleTabChange = (tab) => {
    if (editMode) {
      if (window.confirm('You have unsaved changes. Discard changes?')) {
        setEditMode(false);
        setActiveTab(tab);
      }
    } else {
      setActiveTab(tab);
    }
  };
  
  // Enter edit mode
  const enableEditMode = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department,
      location: user.location,
      timezone: user.timezone,
      language: user.language
    });
    setEditMode(true);
  };
  
  // Save changes
  const saveChanges = () => {
    setUser({
      ...user,
      ...editData
    });
    setEditMode(false);
  };
  
  // Cancel edit mode
  const cancelEdit = () => {
    setEditMode(false);
  };
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
  };
  
  // Format time helper
  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
  };
  
  // Format time ago helper
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    return formatDate(dateString);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
      
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
        <div className="px-6 py-4 flex flex-col md:flex-row items-start md:items-center">
          <div className="relative -mt-16">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
                <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 text-4xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-1 shadow-md hover:bg-indigo-700">
              <Upload className="h-4 w-4" />
            </button>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.role} • {user.department}</p>
              </div>
              
              {!editMode && (
                <button
                  onClick={enableEditMode}
                  className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
              
              {editMode && (
                <div className="mt-2 md:mt-0 flex space-x-2">
                  <button
                    onClick={saveChanges}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-gray-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                <span>Last active: {formatTimeAgo(user.lastActive)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="px-6 flex overflow-x-auto">
            <button
              onClick={() => handleTabChange('personal')}
              className={`py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === 'personal'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => handleTabChange('activity')}
              className={`ml-8 py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === 'activity'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => handleTabChange('security')}
              className={`ml-8 py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security & Access
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            
            {editMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={editData.department}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editData.location}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    name="timezone"
                    value={editData.timezone}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="Asia/Kolkata">India Standard Time (IST)</option>
                    <option value="UTC">Universal Time Coordinated (UTC)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    name="language"
                    value={editData.language}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.department}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.location}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.timezone === 'Asia/Kolkata' ? 'India Standard Time (IST)' :
                       user.timezone === 'UTC' ? 'Universal Time Coordinated (UTC)' :
                       user.timezone === 'America/New_York' ? 'Eastern Time (ET)' :
                       user.timezone === 'Europe/London' ? 'Greenwich Mean Time (GMT)' :
                       user.timezone}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Language</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.language}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Join Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(user.joinDate)}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {user.recentActivity.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="bg-indigo-100 rounded-full p-1">
                          <Activity className="h-5 w-5 text-indigo-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.details}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right text-sm text-gray-500">
                        <time dateTime={activity.timestamp}>{formatTimeAgo(activity.timestamp)}</time>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                View All Activity
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Security & Access</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-4">
                <h4 className="text-base font-medium text-gray-900 mb-2">Security Settings</h4>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Two-Factor Authentication</dt>
                    <dd className="mt-1 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.securitySettings.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Last Password Change</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(user.securitySettings.lastPasswordChange)}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Password Expires In</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.securitySettings.passwordExpiryDays - Math.floor((new Date() - new Date(user.securitySettings.lastPasswordChange)) / (1000 * 60 * 60 * 24))} days
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Login Attempts</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.securitySettings.loginAttempts} failed attempts</dd>
                  </div>
                </dl>
                
                <div className="mt-4 flex space-x-3">
                  <button type="button" className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Key className="h-4 w-4 mr-1 text-gray-500" />
                    Change Password
                  </button>
                  <button type="button" className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Shield className="h-4 w-4 mr-1 text-gray-500" />
                    Manage 2FA
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-2">System Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {user.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        id={`permission-${permission.id}`}
                        name={`permission-${permission.id}`}
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={permission.granted}
                        readOnly
                      />
                      <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-900">
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <button type="button" className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Request Access
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Your account has administrator privileges. Please ensure you follow security best practices.
                  </p>
                </div>
              </div>
            </div>
            
            <h4 className="text-base font-medium text-gray-900">Account Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-sm text-gray-900 mb-2">Export Personal Data</h5>
                <p className="text-sm text-gray-500 mb-3">Download a copy of your personal data including profile information and activity history.</p>
                <button type="button" className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-1" />
                  Export Data
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-sm text-red-600 mb-2">Deactivate Account</h5>
                <p className="text-sm text-gray-500 mb-3">Temporarily deactivate your account. You can reactivate it later.</p>
                <button type="button" className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50">
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;