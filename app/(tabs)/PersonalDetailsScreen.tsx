import { Platform, KeyboardAvoidingView, ScrollView, View, TextInput, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import bggif from '../../assets/images/pp.gif'; // Ensure the GIF path is correct

const PersonalDetailsScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const router = useRouter(); // Using the router from expo-router

  const handleSaveChanges = () => {
    if (!firstName || !lastName || !email || !mobile || !gender || !dob) {
      alert('Please fill in all required fields.');
      return;
    }

    router.push({
      pathname: '/AddBeneficiaryScreen',
      params: {
        beneficiary: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile,
          gender,
          dob,
          address1,
          address2,
          country,
          state,
          city,
          zip,
        }), 
        isEditing: true,
      },
    });
  };

  return (
    <ImageBackground source={bggif} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>Personal Details</Text>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#fff"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#fff"
            />
          </View>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#fff"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              placeholderTextColor="#fff"
            />
          </View>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Gender"
              value={gender}
              onChangeText={setGender}
              placeholderTextColor="#fff"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Date of Birth"
              value={dob}
              onChangeText={setDob}
              placeholderTextColor="#fff"
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            value={address1}
            onChangeText={setAddress1}
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Address Line 2"
            value={address2}
            onChangeText={setAddress2}
            placeholderTextColor="#fff"
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
              placeholderTextColor="#fff"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              value={state}
              onChangeText={setState}
              placeholderTextColor="#fff"
            />
          </View>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#fff"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Zip Code"
              value={zip}
              onChangeText={setZip}
              keyboardType="numeric"
              placeholderTextColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  halfInput: {
    width: '48%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalDetailsScreen;
