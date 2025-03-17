import React, { useState } from 'react';
import { User, Bell, Lock, Database, Users, Globe, Mail, Check, Shield, Cpu, Server } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    weeklyReports: true,
    eventReminders: true,
    securityAlerts: true,
    marketingUpdates: false
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  
  // Mock user data
  const userData = {
    name: 'Admin User',
    email: 'admin@ewgroup.in',
    role: 'System Administrator',
    lastLogin: '2025-03-17T08:30:00',
    department: 'IT & Data',
    phone: '+91 98765 43210',
    timezone: 'Asia/Kolkata',
    language: 'English'
  };
  
  // Mock system settings
  const systemSettings = {
    dataRetention: '90 days',
    backupFrequency: 'Daily',
    autoLogout: '30 minutes',
    maxLoginAttempts: 5,
    passwordExpiry: '90 days',
    sessionTimeout: '2 hours',
    environmentMode: 'Production'
  };
  
  // Mock API settings
  const apiSettings = {
    apiKey: 'ewg_sk_f8d3a92c7e194b5fb8f7e9c2d1b3a5c7',
    webhookUrl: 'https://api.ewgroup.in/webhooks/data',
    maxRequestsPerMinute: 120,
    allowedOrigins: ['ewgroup.in', 'ztech-india.com', 'larisaresort.com'],
    enabledServices: ['analytics', 'reservations', 'events', 'customers']
  };
  
  // Handle notification toggle
  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    
    // Show success message
    setSuccessMessage('Notification settings updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // Reset form and show success message
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setSuccessMessage('Password changed successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
  };
  
  // Render appropriate tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* User Profile */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">User Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={userData.role}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={userData.department}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={userData.phone}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Last Login</label>
                  <input
                    type="text"
                    value={formatDate(userData.lastLogin)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={userData.language}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={userData.timezone}
                  >
                    <option value="Asia/Kolkata">India Standard Time (IST)</option>
                    <option value="UTC">Universal Time Coordinated (UTC)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                  Update Profile
                </button>
              </div>
            </div>
            
            {/* Change Password */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Alerts</h3>
                    <p className="text-sm text-gray-500">Receive important alerts via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('emailAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.emailAlerts ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`${
                        notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">SMS Alerts</h3>
                    <p className="text-sm text-gray-500">Receive urgent alerts via SMS</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('smsAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.smsAlerts ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`${
                        notifications.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Weekly Reports</h3>
                    <p className="text-sm text-gray-500">Receive weekly performance reports</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('weeklyReports')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.weeklyReports ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`${
                        notifications.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Event Reminders</h3>
                    <p className="text-sm text-gray-500">Receive reminders about upcoming events</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('eventReminders')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.eventReminders ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`${
                        notifications.eventReminders ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Security Alerts</h3>
                    <p className="text-sm text-gray-500">Receive alerts about security events</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('securityAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.securityAlerts ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`${
                        notifications.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Marketing Updates</h3>
                    <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('marketingUpdates')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.marketingUpdates ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`${
                        notifications.marketingUpdates ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'system':
        return (
          <div className="space-y-6">
            {/* System Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">System Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Data Retention Period</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={systemSettings.dataRetention}
                  >
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                    <option value="90 days">90 days</option>
                    <option value="180 days">180 days</option>
                    <option value="365 days">365 days</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={systemSettings.backupFrequency}
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Auto Logout</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={systemSettings.autoLogout}
                  >
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="Never">Never</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Maximum Login Attempts</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={systemSettings.maxLoginAttempts}
                  >
                    <option value="3">3 attempts</option>
                    <option value="5">5 attempts</option>
                    <option value="10">10 attempts</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Password Expiry</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={systemSettings.passwordExpiry}
                  >
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                    <option value="90 days">90 days</option>
                    <option value="180 days">180 days</option>
                    <option value="Never">Never</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Session Timeout</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={systemSettings.sessionTimeout}
                  >
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="4 hours">4 hours</option>
                    <option value="8 hours">8 hours</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Environment Mode</label>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    defaultValue={systemSettings.environmentMode}
                  >
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Staging">Staging</option>
                    <option value="Production">Production</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                  Save System Settings
                </button>
              </div>
            </div>
            
            {/* Database Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Database Configuration</h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Database Status</label>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Connected - 2 active instances</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Last Database Backup</label>
                  <div className="text-sm">Today, 05:30 AM</div>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Database Size</label>
                  <div className="text-sm">12.4 GB (48% of allocated space)</div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Server className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Database configuration should only be modified by qualified administrators. Incorrect settings may cause system instability.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Database Now
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Shield className="mr-2 h-4 w-4" />
                    Database Security Scan
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'api':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">API Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">API Key</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value={apiSettings.apiKey}
                      readOnly
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-sm"
                    />
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Webhook URL</label>
                  <input
                    type="text"
                    value={apiSettings.webhookUrl}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Maximum Requests per Minute</label>
                  <input
                    type="number"
                    value={apiSettings.maxRequestsPerMinute}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Allowed Origins (CORS)</label>
                  <div className="mt-1">
                    {apiSettings.allowedOrigins.map((origin, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={origin}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700"
                        >
                          <span className="sr-only">Remove</span>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Add Origin
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Enabled Services</label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="analytics"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={apiSettings.enabledServices.includes('analytics')}
                        readOnly
                      />
                      <label htmlFor="analytics" className="ml-2 block text-sm text-gray-900">
                        Analytics API
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="reservations"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={apiSettings.enabledServices.includes('reservations')}
                        readOnly
                      />
                      <label htmlFor="reservations" className="ml-2 block text-sm text-gray-900">
                        Reservations API
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="events"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={apiSettings.enabledServices.includes('events')}
                        readOnly
                      />
                      <label htmlFor="events" className="ml-2 block text-sm text-gray-900">
                        Events API
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="customers"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={apiSettings.enabledServices.includes('customers')}
                        readOnly
                      />
                      <label htmlFor="customers" className="ml-2 block text-sm text-gray-900">
                        Customers API
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-900">API Documentation</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Access the full API documentation for developers and integration partners.
                  </p>
                  <div className="mt-3">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      View API Documentation
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                  Save API Settings
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings (This Will be Role Based In the Future)</h1>
      
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-medium text-gray-900">Settings</h2>
            </div>
            <div className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeTab === 'profile' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className={`mr-3 h-5 w-5 ${activeTab === 'profile' ? 'text-indigo-500' : 'text-gray-400'}`} />
                User Profile
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeTab === 'notifications' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className={`mr-3 h-5 w-5 ${activeTab === 'notifications' ? 'text-indigo-500' : 'text-gray-400'}`} />
                Notifications
              </button>
              
              <button
                onClick={() => setActiveTab('system')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeTab === 'system' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Cpu className={`mr-3 h-5 w-5 ${activeTab === 'system' ? 'text-indigo-500' : 'text-gray-400'}`} />
                System Settings
              </button>
              
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeTab === 'api' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Globe className={`mr-3 h-5 w-5 ${activeTab === 'api' ? 'text-indigo-500' : 'text-gray-400'}`} />
                API Settings
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;