import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import bggif from '../../assets/images/sp.gif'; // Ensure the GIF file is correctly located in this path

// Define your RootStackParamList
type RootStackParamList = {
  SubscriptionScreen: { totalPrice: number; beneficiaryCount: number };
  BeneficiaryDetailsScreen: undefined;
};

// Define the navigation type for your root stack
type SubscriptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SubscriptionScreen'>;
type SubscriptionScreenRouteProp = RouteProp<RootStackParamList, 'SubscriptionScreen'>;

interface RouteParams {
  totalPrice?: number;  // Marked as optional with fallback value
  beneficiaryCount?: number;  // Marked as optional with fallback value
}

const SubscriptionScreen: React.FC = () => {
  const route = useRoute<SubscriptionScreenRouteProp>();
  const navigation = useNavigation<SubscriptionScreenNavigationProp>();

  // Add safe fallback in case params are not passed correctly
  const { totalPrice = 0, beneficiaryCount = 0 } = route.params as RouteParams || {};

  // Function to navigate back to BeneficiaryDetailsScreen
  const navigateToBeneficiaryDetails = () => {
    navigation.navigate('BeneficiaryDetailsScreen');
  };

  // State for button hover effects
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Hover styles
  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Darker shade for hover effect
    opacity: 0.9,
  };

  const renderPaymentButton = (title: string, onPress: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setHoveredButton(title)}
      onPressOut={() => setHoveredButton(null)}
      style={[styles.button, hoveredButton === title ? buttonHoverStyle : {}]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={bggif} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Order Summary</Text>

        <View style={styles.packageCard}>
          <Text style={styles.packageTitle}>Select Beneficiary</Text>

          {/* Make the "Selected Beneficiaries" link clickable */}
          <TouchableOpacity onPress={navigateToBeneficiaryDetails}>
            <Text style={styles.linkText}>Selected Beneficiaries: {beneficiaryCount}</Text>
          </TouchableOpacity>

          {/* Display the total price */}
          <Text style={styles.priceText}>${totalPrice}</Text>

          {/* Payment buttons */}
          {renderPaymentButton("Pay with PayPal", () => alert('PayPal payment'))}
          {renderPaymentButton("Pay Later", () => alert('Pay Later selected'))}
          {renderPaymentButton("Debit or Credit Card", () => alert('Debit or Credit card payment'))}
          {renderPaymentButton("Payoneer", () => alert('Pay payment'))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start', // Start from the top
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better contrast
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1, // Ensures content is above the background
    marginTop: '30%', // Start from the middle of the screen
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white', // Changed to white for contrast against the background
  },
  packageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Slightly transparent background for the card
    padding: 40, // Increased padding for a larger card
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '90%', // Set width to 90% of the screen
    alignSelf: 'center', // Center the card horizontally
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',  // Dark text for readability against the lighter background of the card
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',  // Dark text for readability
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF', // Default button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10, // Space between buttons
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SubscriptionScreen;
