import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import bggif from '../../assets/images/signbg.gif'; // Ensure the GIF path is correct

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSaveChanges = async () => {
    const Signup = {
      firstName,
      lastName,
      email,
      mobileNumber: mobile,
      password,
      confirmpassword,
    };

    setIsLoading(true); // Disable the button while loading

    try {
      const savedDetails = await saveSignUp(Signup);
      console.log("Data saved:", savedDetails); // Debugging log
      console.log("Data SignUp:", Signup); // Debugging log
      Alert.alert('Success', 'Signup saved successfully!', [{ text: 'OK' }]);

      // Navigate to LoginScreen after saving
      router.push({
        pathname: '/LoginScreen',
        params: {
          beneficiary: JSON.stringify(savedDetails), // Pass the saved details
          isEditing: 'true',
        },
      });
    } catch (error) {
      console.error('Error saving signup details:', error);
      Alert.alert('Error', 'Failed to save signup details.', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false); // Re-enable the button
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <Image source={bggif} style={styles.background} resizeMode="cover" />
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="First Name" 
          value={firstName} 
          onChangeText={setFirstName} 
          placeholderTextColor="#fff" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Last Name" 
          value={lastName} 
          onChangeText={setLastName} 
          placeholderTextColor="#fff" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
          placeholderTextColor="#fff" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Mobile Number" 
          value={mobile} 
          onChangeText={setMobile} 
          keyboardType="phone-pad" 
          placeholderTextColor="#fff" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          placeholderTextColor="#fff" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Password" 
          value={confirmpassword} 
          onChangeText={setConfirmpassword} 
          secureTextEntry 
          placeholderTextColor="#fff" 
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? "Registering..." : "Register"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
          <Text style={styles.loginText}>Already have an account? Login here</Text>
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
    backgroundColor: '#007BFF', // Button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#FFD700', // Gold color for the login link
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
