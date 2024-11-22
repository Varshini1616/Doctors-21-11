import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // FontAwesome for icons

const ContactUsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Contact Information</Text>

      {/* Address Information */}
      <View style={styles.infoRow}>
        <FontAwesome name="map-marker" size={28} color="black" />
        <Text style={styles.infoText}>
          Tamil Nadu Rural Incubator Startup Enabler, 
          1st Floor, A-28, Thiru.Vi.Ka Industrial Estate, 
          Guindy, Chennai, Tamil Nadu 600032.
        </Text>
      </View>

      {/* Social Media Icons */}
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
          <FontAwesome name="facebook" size={40} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com')}>
          <FontAwesome name="instagram" size={40} color="#C13584" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/livmo-pvt-ltd')}>
          <FontAwesome name="linkedin" size={40} color="#0077B5" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/@westayclose')}>
          <FontAwesome name="youtube" size={40} color="#FF0000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/your-twitter-handle')}>
          <FontAwesome name="twitter" size={40} color="#1DA1F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    lineHeight: 22,
    flex: 1,
    color: '#333',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 40, // Add padding for better space between icons
  },
});

export default ContactUsScreen;
