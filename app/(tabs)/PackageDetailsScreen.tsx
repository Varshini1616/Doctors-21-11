import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons for symbols
import bggif from '../../assets/images/pd.gif';  // Ensure the path is correct

const PackageDetailsScreen: React.FC = () => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const toggleShowMore = (plan: string) => {
    setExpandedPackage(prev => (prev === plan ? null : plan));
  };

  return (
    <ImageBackground source={bggif} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Take Care Card */}
        <View style={[styles.packageCard, expandedPackage === 'takeCare' && styles.expandedPackageCard]}>
          <Text style={styles.packageTitle}>TAKE CARE</Text>
          <Text style={styles.priceText}>9.99$ per month</Text>
          <Text style={styles.beneficiaryText}></Text>

          {expandedPackage === 'takeCare' ? (
            <>
              <View style={styles.contextRow}>
                <MaterialIcons name="check-circle" size={24} color="green" />
                <Text style={styles.descriptionText}>24/7 Health care assistant</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="home" size={24} color="green" />
                <Text style={styles.descriptionText}>One home visit by field executive</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="video-call" size={24} color="green" />
                <Text style={styles.descriptionText}>One zoom session with a general consultant (max 20 mins)</Text>
              </View>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() => toggleShowMore('takeCare')}>
                <Text style={styles.buttonText}>LESS</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.learnMoreButton} onPress={() => toggleShowMore('takeCare')}>
              <Text style={styles.buttonText}>LEARN MORE</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Proxy Care Card */}
        <View style={[styles.packageCard, expandedPackage === 'proxyCare' && styles.expandedPackageCard]}>
          <Text style={styles.packageTitle}>PROXY CARE</Text>
          <Text style={styles.priceText}>42$ per month</Text>
          <Text style={styles.beneficiaryText}></Text>

          {expandedPackage === 'proxyCare' ? (
            <>
              <View style={styles.contextRow}>
                <MaterialIcons name="check-circle" size={24} color="green" />
                <Text style={styles.descriptionText}>24/7 Health care assistant</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="home" size={24} color="green" />
                <Text style={styles.descriptionText}>One home visit by field executive</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="science" size={24} color="green" />
                <Text style={styles.descriptionText}>Lab investigations</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="bloodtype" size={24} color="green" />
                <Text style={styles.descriptionText}>Complete blood count, urine routine, TSH, HBA1C</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="video-call" size={24} color="green" />
                <Text style={styles.descriptionText}>One zoom session with a general consultant (max 20 mins)</Text>
              </View>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() => toggleShowMore('proxyCare')}>
                <Text style={styles.buttonText}>LESS</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.learnMoreButton} onPress={() => toggleShowMore('proxyCare')}>
              <Text style={styles.buttonText}>LEARN MORE</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Elite 360 Card */}
        <View style={[styles.packageCard, expandedPackage === 'elite360' && styles.expandedPackageCard]}>
          <Text style={styles.packageTitle}>ELITE 360</Text>
          <Text style={styles.priceText}>199$ per month</Text>
          <Text style={styles.beneficiaryText}></Text>

          {expandedPackage === 'elite360' ? (
            <>
              <View style={styles.contextRow}>
                <MaterialIcons name="check-circle" size={24} color="green" />
                <Text style={styles.descriptionText}>24/7 Health care assistant</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="home" size={24} color="green" />
                <Text style={styles.descriptionText}>One home visit by field executive</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="science" size={24} color="green" />
                <Text style={styles.descriptionText}>Lab investigations</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="bloodtype" size={24} color="green" />
                <Text style={styles.descriptionText}>Complete blood count, urine routine, TSH, HBA1C, Random blood sugar</Text>
              </View>
              <View style={styles.contextRow}>
                <MaterialIcons name="video-call" size={24} color="green" />
                <Text style={styles.descriptionText}>One zoom session with a general consultant (max 20 mins)</Text>
              </View>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() => toggleShowMore('elite360')}>
                <Text style={styles.buttonText}>LESS</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.learnMoreButton} onPress={() => toggleShowMore('elite360')}>
              <Text style={styles.buttonText}>LEARN MORE</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for text readability
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1,  // Ensure content is above the background
    flexGrow: 1, // Allow the container to grow
  },
  packageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency for the card background
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 40,
    marginBottom: 20,
    borderRadius: 15,
    width: '95%', // Default size for non-expanded card
    alignSelf: 'center',
    overflow: 'hidden', // Prevent content overflow when card is smaller
  },
  expandedPackageCard: {
    padding: 40,  // Increased padding for expanded card
    width: '100%',  // Expanded card takes the full width
    alignSelf: 'center',
  },
  packageTitle: { 
    fontSize: 22,  // Increased font size for title
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#333' 
  },
  priceText: { 
    fontSize: 20,  // Increased font size for price
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#333' 
  },
  beneficiaryText: { 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#333' 
  },
  descriptionText: { 
    marginBottom: 5, 
    fontSize: 16,  // Larger text for descriptions
    color: '#555' 
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  learnMoreButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 15,  // Increased padding for button size
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,  // Increased font size for button text
    fontWeight: 'bold',
  },
});

export default PackageDetailsScreen;
