// services/api.js
import { Alert } from 'react-native';

// Base URL for the API - using the backend server URL
const BASE_URL = 'http://192.168.29.167:3000/api';

// Function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  
  let errorMessage = 'Something went wrong. Please try again later.';
  
  if (error.response) {
    // Server responded with an error
    console.error('Error data:', error.response.data);
    errorMessage = error.response.data.message || error.response.data.error || errorMessage;
  } else if (error.request) {
    // Request was made but no response
    errorMessage = 'Unable to connect to server. Please check your internet connection.';
  }
  
  Alert.alert('Error', errorMessage);
  return null;
};

// Get all bus routes
export const getBusRoutes = async () => {
  try {
    // Replace with actual fetch implementation
    // const response = await fetch(`${BASE_URL}/routes`);
    // const data = await response.json();
    // return data;
    
    // Mock data for development
    return [
      { id: '1', name: 'Jaipur to Ajmer', distance: '130 km' },
      { id: '2', name: 'Jaipur to Udaipur', distance: '390 km' },
      { id: '3', name: 'Jaipur to Jodhpur', distance: '330 km' },
      { id: '4', name: 'Udaipur to Jaisalmer', distance: '500 km' },
    ];
  } catch (error) {
    return handleApiError(error);
  }
};

// Track bus by number
export const trackBusByNumber = async (busNumber) => {
  try {
    // Replace with actual fetch implementation
    // const response = await fetch(`${BASE_URL}/track/bus/${busNumber}`);
    // const data = await response.json();
    // return data;
    
    // Mock data for development
    return {
      busNumber: busNumber,
      currentLocation: {
        latitude: 26.9124,
        longitude: 75.7873,
        locationName: 'Sodala, Jaipur',
      },
      speed: '60 km/h',
      nextStop: 'Ajmer Road Bus Stand',
      estimatedArrival: '15:30',
      status: 'On Time',
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Track buses between locations
export const trackBusesBetweenLocations = async (fromLocation, toLocation) => {
  try {
    // Replace with actual fetch implementation
    // const response = await fetch(
    //   `${BASE_URL}/track/route?from=${fromLocation}&to=${toLocation}`
    // );
    // const data = await response.json();
    // return data;
    
    // Mock data for development
    return [
      {
        busNumber: 'RJ-14-1234',
        busType: 'AC Sleeper',
        currentLocation: {
          latitude: 26.9124,
          longitude: 75.7873,
          locationName: 'Sodala, Jaipur',
        },
        distanceToDestination: '45 km',
        estimatedArrival: '15:30',
        status: 'On Time',
      },
      {
        busNumber: 'RJ-14-5678',
        busType: 'Non-AC Seater',
        currentLocation: {
          latitude: 26.8764,
          longitude: 75.8144,
          locationName: 'Durgapura, Jaipur',
        },
        distanceToDestination: '52 km',
        estimatedArrival: '16:15',
        status: 'Delayed',
      },
    ];
  } catch (error) {
    return handleApiError(error);
  }
};

// Search available buses for trip planning
export const searchAvailableBuses = async (fromLocation, toLocation, date, busType = null) => {
  try {
    // Replace with actual fetch implementation
    // let url = `${BASE_URL}/trips/search?from=${fromLocation}&to=${toLocation}&date=${date}`;
    // if (busType) url += `&type=${busType}`;
    // const response = await fetch(url);
    // const data = await response.json();
    // return data;
    
    // Mock data for development
    return [
      {
        id: '101',
        busNumber: 'RJ-14-1234',
        busType: 'AC Sleeper',
        departureTime: '08:30',
        arrivalTime: '11:30',
        duration: '3h 0m',
        fare: '₹450',
        availableSeats: 24,
      },
      {
        id: '102',
        busNumber: 'RJ-14-5678',
        busType: 'Non-AC Seater',
        departureTime: '09:15',
        arrivalTime: '12:30',
        duration: '3h 15m',
        fare: '₹300',
        availableSeats: 12,
      },
      {
        id: '103',
        busNumber: 'RJ-14-9012',
        busType: 'AC Seater',
        departureTime: '10:00',
        arrivalTime: '13:00',
        duration: '3h 0m',
        fare: '₹350',
        availableSeats: 18,
      },
    ];
  } catch (error) {
    return handleApiError(error);
  }
};

// Get safety information
export const getSafetyInformation = async () => {
  try {
    // Replace with actual fetch implementation
    // const response = await fetch(`${BASE_URL}/safety/info`);
    // const data = await response.json();
    // return data;
    
    // Mock data for development
    return {
      emergencyContacts: [
        { id: '1', name: 'Bus Help Desk', number: '1800-123-4567' },
        { id: '2', name: 'Traffic Control', number: '1800-987-6543' },
        { id: '3', name: 'Police', number: '100' },
      ],
      safetyTips: [
        'Always keep your belongings secure during travel.',
        'Use official bus stops and stations for boarding and alighting.',
        'Share your trip details with family or friends.',
        'Be aware of emergency exits on the bus.',
        'Report any suspicious activity to authorities.',
      ],
    };
  } catch (error) {
    return handleApiError(error);
  }
};