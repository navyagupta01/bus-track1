// utils/constants.js

// App theme colors
export const COLORS = {
    primary: '#FF8C00',
    secondary: '#FFD700',
    background: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    inactive: '#CCCCCC',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
  };
  
  // App text styles
  export const FONTS = {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    body: {
      fontSize: 16,
      color: COLORS.text,
    },
    bodyLight: {
      fontSize: 16,
      color: COLORS.textLight,
    },
    caption: {
      fontSize: 14,
      color: COLORS.textLight,
    },
  };
  
  // App constants
  export const APP_CONSTANTS = {
    API_BASE_URL: 'https://sxdiknihhuvfvzgsacez.supabase.co/auth/v1/token?grant_type=password',
    LOCATION_TRACKING_INTERVAL: 30000, // 30 seconds
    BUS_TYPES: [
      { id: 'ac', label: 'AC' },
      { id: 'non-ac', label: 'Non-AC' },
      { id: 'sleeper', label: 'Sleeper' },
      { id: 'semi-sleeper', label: 'Semi-Sleeper' },
      { id: 'deluxe', label: 'Deluxe' },
    ],
  };
  
  // Helper functions
  export const formatDate = (date) => {
    if (!date) return '';
    
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  
  export const formatTime = (time) => {
    if (!time) return '';
    
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', options);
  };
  
  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };