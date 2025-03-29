const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const dns = require('dns').promises;

// Load environment variables
require('dotenv').config();

console.log('Environment Variables Loaded:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Polyfill fetch with node-fetch
const fetch = require('node-fetch');
global.fetch = fetch;

const app = express();
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type', 'Authorization'] }));

app.use((req, res, next) => {
  console.log(`📡 Request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Test DNS resolution
(async () => {
  try {
    const addresses = await dns.lookup('sxdiknihhuvfvzgsacez.supabase.co');
    console.log('✅ DNS Resolution Successful:', addresses);
  } catch (err) {
    console.error('❌ DNS Resolution Failed:', err);
  }
})();

// Test fetch independently (jsonplaceholder)
(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    console.log('✅ Fetch Test Successful:', data);
  } catch (err) {
    console.error('❌ Fetch Test Failed:', err);
  }
})();

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || 'https://sxdiknihhuvfvzgsacez.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZGlrbmloaHV2ZnZ6Z3NhY2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODg1MjIsImV4cCI6MjA1ODE2NDUyMn0.JWP1lWwVaDIcNkfQClHVL_dDr2rjAHhg_1aEOi3mGRc';
console.log('Using Supabase URL:', supabaseUrl);
console.log('Using Supabase Anon Key:', supabaseAnonKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test fetch to Supabase API directly
(async () => {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    });
    const data = await response.json();
    console.log('✅ Supabase Fetch Test Successful:', data);
  } catch (err) {
    console.error('❌ Supabase Fetch Test Failed:', err);
  }
})();

// Test Supabase Connection
(async () => {
  try {
    const { data, error } = await supabase.from('bustrack').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Connected to Supabase:', data);
  } catch (err) {
    console.error('❌ Supabase Connection Failed:', err);
  }
})();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  console.log('✅ Health Check Accessed');
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
  console.log('✅ /api/signup Route Hit');
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const { data: existingUsers, error: fetchError } = await supabase
      .from('bustrack')
      .select('*')
      .eq('users', username);
    if (fetchError) {
      console.error('❌ Fetch Existing Users Error:', fetchError);
      throw fetchError;
    }
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('bustrack')
      .insert([{ users: username, password: hashedPassword }])
      .select();
    if (error) {
      console.error('❌ Insert User Error:', error);
      throw error;
    }

    const token = jwt.sign({ userId: data[0].id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    console.log('✅ Signup Successful:', { userId: data[0].id, token });
    return res.status(201).json({ token });
  } catch (err) {
    console.error('❌ Signup Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  console.log('✅ /api/login Route Hit');
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const { data: users, error: fetchError } = await supabase
      .from('bustrack')
      .select('*')
      .eq('users', username);
    if (fetchError) {
      console.error('❌ Fetch Users Error:', fetchError);
      throw fetchError;
    }
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    console.log('✅ Login Successful:', { userId: user.id, token });
    return res.status(200).json({ token });
  } catch (err) {
    console.error('❌ Login Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Track Bus Endpoint
app.post('/api/track-bus', authenticateToken, async (req, res) => {
  console.log('✅ /api/track-bus Route Hit');
  try {
    const { source, destination } = req.body;
    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required' });
    }

    const { data: buses, error } = await supabase
      .from('buses')
      .select('*')
      .eq('source', source)
      .eq('destination', destination);

    if (error) {
      console.error('❌ Fetch Buses Error:', error);
      throw error;
    }
    if (buses.length === 0) {
      return res.status(404).json({ error: 'No buses found for the specified route' });
    }

    const busInfo = {
      busNumber: buses[0].bus_number,
      currentLocation: buses[0].current_location,
      arrivalTime: buses[0].arrival_time,
      status: buses[0].status,
      source: buses[0].source,
      destination: buses[0].destination,
    };

    console.log('✅ Bus Info Fetched:', busInfo);
    return res.status(200).json(busInfo);
  } catch (err) {
    console.error('❌ Track Bus Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404 Errors
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.url}`);
  return res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));