import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../authService'; // Import from authService.js

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const success = await logoutUser(); // Use authService logout
    if (success) {
      console.log('✅ Logout Successful');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      console.log('❌ Logout Failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bus Booking App</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Track')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚌</Text>
          </View>
          <Text style={styles.menuText}>Track</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('PlanTrip')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🗺️</Text>
          </View>
          <Text style={styles.menuText}>Plan your Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Safety')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🛡️</Text>
          </View>
          <Text style={styles.menuText}>Safety</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
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
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;