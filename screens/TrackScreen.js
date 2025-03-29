import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { getToken } from '../authService';

const TrackScreen = ({ navigation }) => {
  const [location1, setLocation1] = useState('Jaipur'); // Pre-filled Starting Point
  const [location2, setLocation2] = useState('Udaipur'); // Pre-filled Destination
  const [busNumber, setBusNumber] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [status, setStatus] = useState('');
  const [showBusInfo, setShowBusInfo] = useState(false);

  const handleSearch = async () => {
    if (!location1 || !location2) {
      Alert.alert('Error', 'Please enter both locations');
      return;
    }

    // Check if the locations match the sample route (Jaipur to Udaipur)
    if (location1.toLowerCase() !== 'jaipur' || location2.toLowerCase() !== 'udaipur') {
      Alert.alert('Error', 'Only Jaipur to Udaipur route is available for testing');
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Error', 'You need to log in to track a bus');
        navigation.navigate('Login');
        return;
      }

      // Sample data for Jaipur to Udaipur route
      const sampleData = {
        busNumber: 'RJ-1234',
        arrivalTime: '10:30 AM',
        currentLocation: 'Jaipur',
        status: 'On Time',
      };

      setBusNumber(sampleData.busNumber);
      setArrivalTime(sampleData.arrivalTime);
      setCurrentLocation(sampleData.currentLocation);
      setStatus(sampleData.status);
      setShowBusInfo(true);

      // Navigate to Map screen with parameters
      navigation.navigate('Map', {
        source: location1,
        destination: location2,
        busNumber: sampleData.busNumber,
      });
    } catch (err) {
      console.error('❌ Track Bus Error:', err.message);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track</Text>
        <View style={{ width: 30 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.locationContainer}>
            <View style={styles.locationDot}>
              <Text style={styles.locationNumber}>1</Text>
            </View>
            <TextInput
              style={styles.locationInput}
              placeholder="Starting Point"
              value={location1}
              onChangeText={setLocation1}
            />
          </View>
          
          <View style={styles.locationContainer}>
            <View style={styles.locationDot}>
              <Text style={styles.locationNumber}>2</Text>
            </View>
            <TextInput
              style={styles.locationInput}
              placeholder="Destination"
              value={location2}
              onChangeText={setLocation2}
            />
          </View>
          
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        
        {showBusInfo && (
          <View style={styles.busInfoContainer}>
            <Text style={styles.busInfoTitle}>Bus Information</Text>
            
            <View style={styles.busInfoRow}>
              <Text style={styles.busInfoLabel}>Bus Number:</Text>
              <Text style={styles.busInfoValue}>{busNumber}</Text>
            </View>
            
            <View style={styles.busInfoRow}>
              <Text style={styles.busInfoLabel}>Current Location:</Text>
              <Text style={styles.busInfoValue}>{currentLocation}</Text>
            </View>
            
            <View style={styles.busInfoRow}>
              <Text style={styles.busInfoLabel}>Arrival Time:</Text>
              <Text style={styles.busInfoValue}>{arrivalTime}</Text>
            </View>
            
            <View style={styles.busInfoRow}>
              <Text style={styles.busInfoLabel}>Status:</Text>
              <Text style={styles.busInfoValue}>{status}</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationNumber: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  locationInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 5,
  },
  searchButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  busInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  busInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  busInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  busInfoLabel: {
    fontSize: 16,
    color: '#666666',
  },
  busInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default TrackScreen;