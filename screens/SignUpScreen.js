import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const SUPABASE_URL = 'https://sxdiknihhuvfvzgsacez.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZGlrbmloaHV2ZnZ6Z3NhY2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODg1MjIsImV4cCI6MjA1ODE2NDUyMn0.JWP1lWwVaDIcNkfQClHVL_dDr2rjAHhg_1aEOi3mGRc';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    // Validate password length (Supabase Auth requires at least 6 characters)
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Validate username for email construction
    const usernameRegex = /^[a-zA-Z0-9._-]+$/; // Allow alphanumeric, dots, underscores, hyphens
    if (!usernameRegex.test(username)) {
      Alert.alert('Error', 'Username can only contain letters, numbers, dots, underscores, or hyphens');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Construct a dummy email from the username
      const email = `${username}@yourapp.com`; // Use a custom domain for your app
      console.log('🚀 Attempting signup with email:', email);

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { username: username }, // Store username in user metadata
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Store the session token
        await AsyncStorage.setItem('userToken', data.session?.access_token || '');
        console.log('✅ Sign-up successful, user:', data.user);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        throw new Error('User signup failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Sign Up Error:', err.message);
      setError(err.message);
      Alert.alert('Sign Up Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/bus_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Rajasthan Bus Tracking</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Already Have An Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  loader: {
    marginVertical: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  signUpButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  accountText: {
    marginRight: 5,
    color: '#333333',
  },
  loginText: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;