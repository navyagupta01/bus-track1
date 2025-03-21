import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

const PlanTripScreen = ({ navigation }) => {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [date, setDate] = useState('');
  const [busType, setBusType] = useState('');

  const handleSearch = () => {
    // Here you would implement logic to search for available buses
    alert('Searching for buses...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan your Trip</Text>
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
              placeholder="Location 1"
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
              placeholder="Location 2"
              value={location2}
              onChangeText={setLocation2}
            />
          </View>
          
          <View style={styles.optionsContainer}>
            <View style={styles.optionRow}>
              <TouchableOpacity 
                style={[styles.optionButton, busType === 'AC' && styles.selectedOption]}
                onPress={() => setBusType('AC')}
              >
                <Text style={styles.optionText}>AC</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.optionButton, busType === 'Non-AC' && styles.selectedOption]}
                onPress={() => setBusType('Non-AC')}
              >
                <Text style={styles.optionText}>Non-AC</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.optionButton, busType === 'Sleeper' && styles.selectedOption]}
                onPress={() => setBusType('Sleeper')}
              >
                <Text style={styles.optionText}>Sleeper</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.dateSelector}
              onPress={() => setDate('Sun 14 Jul 2024')}
            >
              <Text style={styles.dateText}>
                {date || 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🎟️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>ℹ️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>👤</Text>
        </TouchableOpacity>
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
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
  optionsContainer: {
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#FFE0B2',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  optionText: {
    fontWeight: 'bold',
    color: '#333333',
  },
  dateSelector: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  dateText: {
    color: '#333333',
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabIcon: {
    fontSize: 24,
  },
});

export default PlanTripScreen;