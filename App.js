import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import TrackScreen from './screens/TrackScreen';
import PlanTripScreen from './screens/PlanTripScreen';
import SafetyScreen from './screens/SafetyScreen';
import MapScreen from './screens/MapScreen';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Track'); // Set initial route to Track for testing

  // Temporarily bypass token check for testing
  /*
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setInitialRoute('Home');
      }
    };
    checkToken();
  }, []);
  */

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Track" component={TrackScreen} />
        <Stack.Screen name="PlanTrip" component={PlanTripScreen} />
        <Stack.Screen name="Safety" component={SafetyScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;