import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import bggif from '../../assets/images/cm.gif'; // Background GIF path

const CustomMenuScreen: React.FC = () => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri); // Safely access uri
    } else {
      console.error("No image selected or operation was canceled."); // Log error if no assets found
    }
  };

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground source={bggif} style={[styles.background, { height: screenHeight, width: screenWidth }]}>
      <View style={[styles.container, { height: screenHeight, width: screenWidth * 0.7, marginLeft: -10 }]}>
        <View style={styles.profileSection}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('./default-profile.png')}
            style={styles.profilePicture}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.lastLogin}>Last Login: 10/19/2024</Text>

          <TouchableOpacity onPress={pickImage} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigateToScreen('DashboardScreen')} style={styles.menuItem}>
            <MaterialIcons name="home" size={30} color="black" />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('DashboardScreen')} style={styles.menuItem}>
            <MaterialIcons name="dashboard" size={30} color="black" />
            <Text style={styles.menuText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('PersonalDetailsScreen')} style={styles.menuItem}>
            <MaterialIcons name="person" size={30} color="black" />
            <Text style={styles.menuText}>Personal Details</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('AutoChat')} style={styles.menuItem}>
            <MaterialIcons name="chat" size={30} color="black" />
            <Text style={styles.menuText}>Auto Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('ContactUsScreen')} style={styles.menuItem}>
            <MaterialIcons name="contact-mail" size={30} color="black" />
            <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('ServiceSupport')} style={styles.menuItem}>
            <MaterialIcons name="support" size={30} color="black" />
            <Text style={styles.menuText}>Service & Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the left
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very light transparent background color
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the left
    borderRadius: 20,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff', // White background for profile section
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    color: '#E60050',
    fontSize: 22, // Increased font size
    fontWeight: 'bold',
  },
  lastLogin: {
    color: '#E60050',
    fontSize: 14, // Increased font size
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#E60050',
    paddingVertical: 10, // Increased padding for a larger button
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  editButtonText: {
    color: 'white',
    fontSize: 16, // Increased font size for button text
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  menuText: {
    color: 'black', // Changed to black for better contrast
    fontSize: 20, // Increased font size for menu items
    marginLeft: 10,
    fontWeight: 'bold', // Bold text for menu items
  },
});

export default CustomMenuScreen;
