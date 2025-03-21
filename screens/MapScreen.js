import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const MapScreen = ({ navigation, route }) => {
  const { source, destination, busNumber } = route.params || {};
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busLocation, setBusLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  // Initial region - centered on Rajasthan
  const initialRegion = {
    latitude: 26.9124, 
    longitude: 75.7873, // Jaipur coordinates
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        
        // Simulate fetching bus location from API
        // In a real app, you would fetch this from your backend
        simulateBusLocation();
      } catch (error) {
        setErrorMsg('Could not get your location');
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Simulate bus location updates - in a real app, this would be replaced with an API call
  const simulateBusLocation = () => {
    // Simulate a bus location near Jaipur
    const simulatedBusLocation = {
      latitude: 26.9154, // Slightly offset from Jaipur center
      longitude: 75.7973,
      heading: 45, // Heading in degrees
      speed: 40, // Speed in km/h
      timestamp: new Date().toISOString(),
      busNumber: busNumber || 'RJ-14-1234',
      route: `${source || 'Jaipur'} to ${destination || 'Ajmer'}`,
      eta: '30 mins',
    };
    
    setBusLocation(simulatedBusLocation);
    
    // Simulate movement every 10 seconds
    setInterval(() => {
      setBusLocation(prevLocation => {
        if (!prevLocation) return simulatedBusLocation;
        
        // Simulate movement in a small random direction
        return {
          ...prevLocation,
          latitude: prevLocation.latitude + (Math.random() - 0.5) * 0.001,
          longitude: prevLocation.longitude + (Math.random() - 0.5) * 0.001,
          timestamp: new Date().toISOString(),
          eta: Math.floor(Math.random() * 30 + 5) + ' mins', // Random ETA between 5-35 mins
        };
      });
    }, 10000);
  };

  const centerMap = () => {
    if (mapRef.current && busLocation) {
      mapRef.current.animateToRegion({
        latitude: busLocation.latitude,
        longitude: busLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Bus Tracking</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {busLocation && (
            <Marker
              coordinate={{
                latitude: busLocation.latitude,
                longitude: busLocation.longitude,
              }}
              title={`Bus ${busLocation.busNumber}`}
              description={`${busLocation.route} - ETA: ${busLocation.eta}`}
            >
              <View style={styles.busMarker}>
                <Ionicons name="bus" size={24} color="#FFFFFF" />
              </View>
            </Marker>
          )}
          
          {/* Display a route line (in a real app, this would be the actual route) */}
          {currentLocation && busLocation && (
            <Polyline
              coordinates={[
                currentLocation,
                {
                  latitude: busLocation.latitude,
                  longitude: busLocation.longitude,
                }
              ]}
              strokeColor="#FF8C00"
              strokeWidth={3}
              lineDashPattern={[1, 3]}
            />
          )}
        </MapView>
        
        <TouchableOpacity style={styles.centerButton} onPress={centerMap}>
          <Ionicons name="locate" size={24} color="#FF8C00" />
        </TouchableOpacity>
      </View>
      
      {busLocation && (
        <View style={styles.busInfoPanel}>
          <View style={styles.busInfoHeader}>
            <Text style={styles.busNumber}>Bus {busLocation.busNumber}</Text>
            <Text style={styles.busRoute}>{busLocation.route}</Text>
          </View>
          
          <View style={styles.busInfoDetails}>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color="#333" />
              <Text style={styles.infoText}>ETA: {busLocation.eta}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="speedometer-outline" size={20} color="#333" />
              <Text style={styles.infoText}>Speed: {busLocation.speed} km/h</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="compass-outline" size={20} color="#333" />
              <Text style={styles.infoText}>Heading: {busLocation.heading}°</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => Alert.alert('Share', 'Sharing bus location is not implemented in this demo')}
          >
            <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
            <Text style={styles.shareButtonText}>Share Location</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  busMarker: {
    backgroundColor: '#FF8C00',
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  busInfoPanel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -20,
  },
  busInfoHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 15,
    marginBottom: 15,
  },
  busNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  busRoute: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  busInfoDetails: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333333',
  },
  shareButton: {
    backgroundColor: '#FF8C00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MapScreen; 