import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  disabled = false, 
  loading = false,
  style = {},
}) => {
  const getButtonStyle = () => {
    if (type === 'secondary') {
      return styles.secondaryButton;
    } else if (type === 'outline') {
      return styles.outlineButton;
    }
    return styles.primaryButton;
  };

  const getTextStyle = () => {
    if (type === 'secondary') {
      return styles.secondaryText;
    } else if (type === 'outline') {
      return styles.outlineText;
    }
    return styles.primaryText;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={type === 'primary' ? '#FFFFFF' : '#FF8C00'} />
      ) : (
        <Text style={[styles.text, getTextStyle(), disabled && styles.disabledText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF8C00',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FF8C00',
  },
  outlineText: {
    color: '#FF8C00',
  },
  disabledText: {
    color: '#888888',
  },
});

export default Button;