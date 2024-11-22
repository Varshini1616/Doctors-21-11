import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import bggif from '../../assets/images/fp.gif'; // Ensure the GIF path is correct

const ForgotPasswordScreen: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  return (
    <View style={styles.backgroundContainer}>
      <Image source={bggif} style={styles.background} resizeMode="cover" />
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email or phone number"
          placeholderTextColor="#fff"
          value={emailOrPhone}
          onChangeText={text => setEmailOrPhone(text)}
        />

        <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]} // Apply hover styles conditionally
          onPress={() => alert('Reset link sent')}
          onPressIn={() => setIsHovered(true)} // Set hover state
          onPressOut={() => setIsHovered(false)} // Reset hover state
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for contrast
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    borderRadius: 20,
    alignItems: 'center',
    zIndex: 1, // Ensures content is above background
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Translucent input background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonHovered: {
    backgroundColor: '#0056b3', // Darker blue for hover effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
