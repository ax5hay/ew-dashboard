// Mock data for the dashboard

// Revenue data for all businesses
export const revenueData = [
    { month: 'Jan', ztech: 3200000, larisa: 4500000, ewgroup: 2800000, total: 10500000 },
    { month: 'Feb', ztech: 3500000, larisa: 4200000, ewgroup: 3100000, total: 10800000 },
    { month: 'Mar', ztech: 3800000, larisa: 4800000, ewgroup: 3300000, total: 11900000 },
    { month: 'Apr', ztech: 4200000, larisa: 5100000, ewgroup: 3500000, total: 12800000 },
    { month: 'May', ztech: 4800000, larisa: 5500000, ewgroup: 3800000, total: 14100000 },
    { month: 'Jun', ztech: 5200000, larisa: 5800000, ewgroup: 4100000, total: 15100000 },
  ];
  
  // Z-Tech visitor data
  export const visitorData = [
    { month: 'Jan', visitors: 28500, onlineEngagement: 48000, wifiSignups: 18200, ticketSales: 32400 },
    { month: 'Feb', visitors: 31200, onlineEngagement: 52000, wifiSignups: 20500, ticketSales: 35800 },
    { month: 'Mar', visitors: 35800, onlineEngagement: 61000, wifiSignups: 24600, ticketSales: 41200 },
    { month: 'Apr', visitors: 42000, onlineEngagement: 68000, wifiSignups: 29400, ticketSales: 48500 },
    { month: 'May', visitors: 48500, onlineEngagement: 72000, wifiSignups: 34800, ticketSales: 56200 },
    { month: 'Jun', visitors: 52100, onlineEngagement: 78000, wifiSignups: 38900, ticketSales: 61500 },
  ];
  
  // Park-wise visitor distribution
  export const parkVisitorData = [
    { park: 'Central Park', visitors: 28400, revenue: 2800000, satisfaction: 4.2 },
    { park: 'Adventure Park', visitors: 12500, revenue: 1400000, satisfaction: 4.5 },
    { park: 'Water Park', visitors: 8200, revenue: 980000, satisfaction: 4.1 },
    { park: 'Garden Park', visitors: 3000, revenue: 380000, satisfaction: 3.9 },
  ];
  
  // Visitor demographics
  export const visitorDemographics = [
    { ageGroup: '0-12', percentage: 25 },
    { ageGroup: '13-18', percentage: 15 },
    { ageGroup: '19-25', percentage: 20 },
    { ageGroup: '26-35', percentage: 18 },
    { ageGroup: '36-50', percentage: 15 },
    { ageGroup: '51+', percentage: 7 },
  ];
  
  // Larisa Resort data
  export const resortData = {
    occupancyRate: [
      { month: 'Jan', occupancy: 68, averageRate: 8500 },
      { month: 'Feb', occupancy: 72, averageRate: 8800 },
      { month: 'Mar', occupancy: 75, averageRate: 9200 },
      { month: 'Apr', occupancy: 82, averageRate: 9800 },
      { month: 'May', occupancy: 88, averageRate: 10500 },
      { month: 'Jun', occupancy: 92, averageRate: 11200 },
    ],
    roomTypeDistribution: [
      { type: 'Standard', count: 120, occupancy: 85 },
      { type: 'Deluxe', count: 80, occupancy: 92 },
      { type: 'Suite', count: 30, occupancy: 78 },
      { type: 'Villa', count: 15, occupancy: 65 },
    ],
    guestSatisfaction: [
      { category: 'Room Cleanliness', score: 4.7 },
      { category: 'Staff Service', score: 4.5 },
      { category: 'Food Quality', score: 4.2 },
      { category: 'Amenities', score: 4.3 },
      { category: 'Value for Money', score: 4.0 },
      { category: 'Overall Experience', score: 4.5 },
    ],
    bookingChannels: [
      { channel: 'Direct Website', percentage: 35 },
      { channel: 'Online Travel Agencies', percentage: 40 },
      { channel: 'Corporate Bookings', percentage: 15 },
      { channel: 'Travel Agents', percentage: 7 },
      { channel: 'Walk-ins', percentage: 3 },
    ]
  };
  
  // Customer segmentation data
  export const customerSegmentData = [
    { name: 'Families', value: 45, growth: 8 },
    { name: 'Corporate', value: 25, growth: 12 },
    { name: 'Tourists', value: 20, growth: 5 },
    { name: 'Others', value: 10, growth: -2 },
  ];
  
  // Business unit performance data
  export const performanceData = [
    { name: 'Z-Tech Parks', revenue: 5200000, growth: 12.5, satisfaction: 4.2, expenses: 3100000, profit: 2100000 },
    { name: 'Larisa Resort', revenue: 5800000, growth: 8.2, satisfaction: 4.5, expenses: 3400000, profit: 2400000 },
    { name: 'EW Group', revenue: 4100000, growth: 9.8, satisfaction: 4.0, expenses: 2200000, profit: 1900000 },
  ];
  
  // Upcoming events data
  export const upcomingEventsData = [
    { 
      id: 1,
      name: 'Summer Festival', 
      location: 'Z-Tech Central Park', 
      date: '2025-07-15', 
      expected: 12000, 
      type: 'Public',
      status: 'Confirmed',
      revenue: 1500000
    },
    { 
      id: 2,
      name: 'Corporate Retreat', 
      location: 'Larisa Resort', 
      date: '2025-07-22', 
      expected: 350, 
      type: 'Private',
      status: 'Confirmed',
      revenue: 2800000
    },
    { 
      id: 3,
      name: 'Weekend Concert', 
      location: 'Z-Tech Garden Park', 
      date: '2025-07-28', 
      expected: 8500, 
      type: 'Public',
      status: 'Planning',
      revenue: 850000
    },
    { 
      id: 4,
      name: 'Business Summit', 
      location: 'EW Convention Center', 
      date: '2025-08-05', 
      expected: 1200, 
      type: 'Corporate',
      status: 'Confirmed',
      revenue: 3500000
    },
    { 
      id: 5,
      name: 'Food Festival', 
      location: 'Z-Tech Central Park', 
      date: '2025-08-12', 
      expected: 15000, 
      type: 'Public',
      status: 'Planning',
      revenue: 1800000
    },
    { 
      id: 6,
      name: 'Wedding Exhibition', 
      location: 'Larisa Resort', 
      date: '2025-08-18', 
      expected: 2500, 
      type: 'Public',
      status: 'Planning',
      revenue: 1200000
    },
  ];
  
  // AI-generated insights
  export const insightsData = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Revenue Opportunity Detected',
      description: 'Z-Tech Central Park visitor data shows peak usage between 4-7pm. Consider adding evening-only ticket options to increase capacity utilization.',
      impact: 'Potential 8-12% revenue increase',
      priority: 'High'
    },
    {
      id: 2,
      type: 'issue',
      title: 'Potential Issue Detected',
      description: 'Larisa Resort seeing 12% decrease in corporate bookings for August. Competitor analysis suggests this is due to new corporate packages at Taj Resort.',
      impact: 'Estimated 5% revenue impact',
      priority: 'High'
    },
    {
      id: 3,
      type: 'information',
      title: 'Cross-Business Opportunity',
      description: 'Data shows 32% of Z-Tech visitors come from areas near Larisa Resort. Consider creating combined ticket packages to drive cross-business revenue.',
      impact: 'Potential 15% cross-selling increase',
      priority: 'Medium'
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'WiFi Data Collection Enhancement',
      description: 'Current WiFi sign-up process has 62% completion rate. A/B testing shows simplified form could increase this to 85%, providing more customer data.',
      impact: 'Additional data on 12,000+ monthly visitors',
      priority: 'Medium'
    },
    {
      id: 5,
      type: 'issue',
      title: 'Staff Efficiency Gap',
      description: 'Z-Tech Garden Park shows 22% higher staffing costs relative to visitor numbers compared to other parks. Consider staff optimization.',
      impact: 'Potential ₹250,000 monthly savings',
      priority: 'Medium'
    },
    {
      id: 6,
      type: 'information',
      title: 'Seasonal Trend Detected',
      description: 'Historical analysis shows July-August has highest family visits. Consider family-focused marketing and events during this period.',
      impact: 'Potential 18% increase in family bookings',
      priority: 'Low'
    }
  ];