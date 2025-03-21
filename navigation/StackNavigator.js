// navigation/StackNavigator.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MapScreen from '../screens/MapScreen';
import PlanTripScreen from '../screens/PlanTripScreen';
import SafetyScreen from '../screens/SafetyScreen';
import SplashScreen from '../screens/SplashScreen';
import TrackScreen from '../screens/TrackScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setInitialRoute(token ? 'Home' : 'Login');
      } catch (err) {
        console.log('Error checking token:', err);
        setInitialRoute('Login');
      }
    };
    checkToken();
  }, []);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlanTrip" component={PlanTripScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Safety" component={SafetyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Track" component={TrackScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}