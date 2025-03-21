import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

const LocationInput = ({ 
  number, 
  placeholder, 
  value, 
  onChangeText, 
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        editable={!onPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  number: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default LocationInput;