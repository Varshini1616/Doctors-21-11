import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Text, Modal, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date Picker
import { MaterialIcons } from '@expo/vector-icons'; // For calendar icon
import { saveBeneficiaryDetails, postBeneficiaryDetails } from './AddBeneficiaryApi'; // Import API
import bggif from '../../assets/images/bp.gif'; // Ensure the GIF path is correct

// Define the types for the navigation and route parameters
type RootStackParamList = {
  BeneficiaryDetailsScreen: { newBeneficiary: Beneficiary; isEditing: boolean };
  AddBeneficiaryScreen: { beneficiary?: Beneficiary; isEditing: boolean } | undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AddBeneficiaryScreen'>;

// Define the Beneficiary type
interface Beneficiary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
  addressLine1: string;
  addressLine2: string;
  insuranceName: string;
  medicalHistory: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

const AddBeneficiaryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Correct way to use navigation

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [gender, setGender] = useState<string>(''); // To store selected gender
  const [showGenderModal, setShowGenderModal] = useState<boolean>(false); // To toggle gender dropdown
  const [dob, setDob] = useState<string>(''); // Store DOB as string
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false); // To toggle date picker
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [insuranceName, setInsuranceName] = useState<string>('');
  const [medicalHistory, setMedicalHistory] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // To manage loading state

  // Fetch existing beneficiary details by ID if required (Edit mode)
  useEffect(() => {
    const beneficiaryId = 'some-id'; // Replace this with actual logic to get the ID if editing
    if (beneficiaryId) {
      fetchBeneficiaryDetails(beneficiaryId);
    }
  }, []);

  const fetchBeneficiaryDetails = async (id: string) => {
    try {
      const data = await postBeneficiaryDetails(id);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setMobile(data.mobile);
      setGender(data.gender);
      setDob(data.dob);
      setAddressLine1(data.addressLine1);
      setAddressLine2(data.addressLine2);
      setInsuranceName(data.insuranceName);
      setMedicalHistory(data.medicalHistory);
      setCountry(data.country);
      setState(data.state);
      setCity(data.city);
      setZip(data.zip);
    } catch (error) {
      console.error('Error fetching beneficiary details:', error);
      Alert.alert('Error', 'Failed to fetch beneficiary details.');
    }
  };

  // Handle Save or Update
  const handleSave = async () => {
    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(), // Assign a unique id
      firstName,
      lastName,
      email,
      mobile,
      gender,
      dob,
      addressLine1,
      addressLine2,
      insuranceName,
      medicalHistory,
      country,
      state,
      city,
      zip,
    };

    setIsLoading(true); // Disable button while saving

    try {
      const savedBeneficiary = await saveBeneficiaryDetails(newBeneficiary);
      console.log('Beneficiary saved:', savedBeneficiary);
      Alert.alert('Success', 'Beneficiary details saved successfully!');

      // Navigate back with the new beneficiary data
      navigation.navigate('BeneficiaryDetailsScreen', { newBeneficiary: savedBeneficiary, isEditing: false });
    } catch (error) {
      console.error('Error saving beneficiary details:', error);
      Alert.alert('Error', 'Failed to save beneficiary details.');
    } finally {
      setIsLoading(false); // Re-enable button after save
    }
  };

  // Handle Date Picker
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false); // Close date picker
    setDob(currentDate.toDateString()); // Set DOB to formatted string
  };

  // Handle gender selection from modal
  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    setShowGenderModal(false); // Close modal after selection
  };

  return (
    <ImageBackground source={bggif} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        {/* First Name and Last Name */}
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

        {/* Email and Mobile */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Email"
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

        {/* Gender and Date of Birth */}
        <View style={styles.row}>
          {/* Gender Dropdown */}
          <TouchableOpacity
            style={[styles.input, styles.halfInput]}
            onPress={() => setShowGenderModal(true)}
          >
            <Text style={[styles.genderText]}>{gender || 'Select Gender'}</Text>
          </TouchableOpacity>

          {/* Date of Birth Input with Calendar */}
          <View style={[styles.input, styles.halfInput, styles.dateInputContainer]}>
            <TextInput
              style={[styles.dateInput]}
              placeholder="Date of Birth"
              value={dob}
              editable={false} // Disable direct editing, use date picker
              placeholderTextColor="#fff"
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <MaterialIcons name="calendar-today" size={24} color="#fff" style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Address Line 1 and Address Line 2 */}
        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          value={addressLine1}
          onChangeText={setAddressLine1}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Address Line 2"
          value={addressLine2}
          onChangeText={setAddressLine2}
          placeholderTextColor="#fff"
        />

        {/* Other Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Insurance Name"
          value={insuranceName}
          onChangeText={setInsuranceName}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Medical History"
          value={medicalHistory}
          onChangeText={setMedicalHistory}
          placeholderTextColor="#fff"
        />

        {/* Country, State, City, Zip */}
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

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.7} // Hover-like effect with transparency on press
          onPress={handleSave}
          disabled={isLoading} // Disable button while saving
        >
          <Text style={styles.saveButtonText}>{isLoading ? 'Saving...' : 'Save Beneficiary'}</Text>
        </TouchableOpacity>

        {/* Show Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Gender Modal for Dropdown */}
        <Modal
          transparent={true}
          visible={showGenderModal}
          animationType="slide"
          onRequestClose={() => setShowGenderModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <Pressable onPress={() => handleGenderSelect('Male')} style={styles.modalOption}>
                <Text>Male</Text>
              </Pressable>
              <Pressable onPress={() => handleGenderSelect('Female')} style={styles.modalOption}>
                <Text>Female</Text>
              </Pressable>
              <Pressable onPress={() => handleGenderSelect('Other')} style={styles.modalOption}>
                <Text>Other</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
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
    paddingHorizontal: 20,
    zIndex: 1, // Ensure content is above the background
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent border color
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 10, // Rounded edges
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
  },
  halfInput: {
    width: '48%', // For two inputs in one row
  },
  pickerContainer: {
    justifyContent: 'center',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
    color: '#fff',
  },
  calendarIcon: {
    marginLeft: 10,
  },
  genderText: {
    color: '#fff',
    fontSize: 17,  // Adjusted font size for better visibility
    marginTop: 10, // Added margin to position the text slightly below
  },
  saveButton: {
    backgroundColor: '#1E90FF', // Button color
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default AddBeneficiaryScreen;
