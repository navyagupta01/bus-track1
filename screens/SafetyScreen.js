import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const SafetyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety</Text>
        <View style={{ width: 30 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.safetyContainer}>
          <TouchableOpacity style={styles.safetyItem}>
            <View style={styles.safetyIcon}>
              <Text>📞</Text>
            </View>
            <Text style={styles.safetyText}>Help Line Number</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.safetyItem}>
            <View style={styles.safetyIcon}>
              <Text>📞</Text>
            </View>
            <Text style={styles.safetyText}>Help Line Number</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.safetyItem}>
            <View style={styles.safetyIcon}>
              <Text>📞</Text>
            </View>
            <Text style={styles.safetyText}>Help Line Number</Text>
          </TouchableOpacity>
          
          <View style={styles.safetyInfoBox}>
            <Text style={styles.safetyInfoTitle}>Safety Tips</Text>
            <Text style={styles.safetyInfoText}>
              1. Always keep your belongings secure during travel.
              {'\n\n'}
              2. Use official bus stops and stations for boarding and alighting.
              {'\n\n'}
              3. Share your trip details with family or friends.
              {'\n\n'}
              4. Be aware of emergency exits on the bus.
              {'\n\n'}
              5. Report any suspicious activity to authorities.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🎟️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Safety')}>
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
  safetyContainer: {
    marginBottom: 20,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  safetyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  safetyText: {
    fontSize: 16,
    color: '#333333',
  },
  safetyInfoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  safetyInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  safetyInfoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
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

export default SafetyScreen;