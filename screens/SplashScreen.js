// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        // Navigate to Home if token exists, otherwise go to Login
        navigation.reset({
          index: 0,
          routes: [{ name: token ? 'Home' : 'Login' }],
        });
      } catch (err) {
        console.log('Error checking token:', err);
        // If an error occurs, navigate to Login as a fallback
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    // Add a small delay to show the splash screen for a better UX
    const timer = setTimeout(() => {
      checkToken();
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bus_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Rajasthan Bus Tracking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SplashScreen;