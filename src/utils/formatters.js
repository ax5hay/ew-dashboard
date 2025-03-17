// Format currency values (in INR)
export const formatCurrency = (value) => {
    if (value === null || value === undefined) return '—';
    
    // Format to Indian currency style (e.g., ₹1,23,456.00)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format large numbers with thousand separators
  export const formatNumber = (value) => {
    if (value === null || value === undefined) return '—';
    
    // For values over 1 million, format as XM
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    
    // For values over 1 thousand, format as XK
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    
    // Otherwise just use thousand separators
    return new Intl.NumberFormat('en-IN').format(value);
  };
  
  // Format percentage values
  export const formatPercent = (value) => {
    if (value === null || value === undefined) return '—';
    
    return `${value.toFixed(1)}%`;
  };
  
  // Format date values
  export const formatDate = (dateString, format = 'short') => {
    if (!dateString) return '—';
    
    const date = new Date(dateString);
    
    switch (format) {
      case 'full':
        // e.g., "Monday, January 1, 2025"
        return date.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
      case 'medium':
        // e.g., "Jan 1, 2025"
        return date.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        
      case 'short':
      default:
        // e.g., "01/01/2025"
        return date.toLocaleDateString('en-IN');
    }
  };
  
  // Format time values
  export const formatTime = (timeString, format = 'short') => {
    if (!timeString) return '—';
    
    const date = new Date(timeString);
    
    switch (format) {
      case 'full':
        // e.g., "1:30:45 PM"
        return date.toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        
      case 'short':
      default:
        // e.g., "1:30 PM"
        return date.toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
    }
  };
  
  // Format datetime values
  export const formatDateTime = (dateTimeString, format = 'short') => {
    if (!dateTimeString) return '—';
    
    const date = new Date(dateTimeString);
    
    switch (format) {
      case 'full':
        // e.g., "Monday, January 1, 2025, 1:30 PM"
        return `${formatDate(date, 'full')}, ${formatTime(date, 'short')}`;
        
      case 'medium':
        // e.g., "Jan 1, 2025, 1:30 PM"
        return `${formatDate(date, 'medium')}, ${formatTime(date, 'short')}`;
        
      case 'short':
      default:
        // e.g., "01/01/2025, 1:30 PM"
        return `${formatDate(date)}, ${formatTime(date)}`;
    }
  };
  
  // Format relative time (e.g., "2 hours ago")
  export const formatRelativeTime = (dateTimeString) => {
    if (!dateTimeString) return '—';
    
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
    
    // If more than a week ago, show the actual date
    return formatDate(date, 'medium');
  };