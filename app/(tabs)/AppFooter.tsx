import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

// Define your RootStackParamList
type RootStackParamList = {
  PackageDetailsScreen: undefined;
  BeneficiaryDetailsScreen: undefined;
  ContactUsScreen: undefined;
};

const AppFooter: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      {/* Package Details Button with shopping bag icon */}
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('PackageDetailsScreen')}>
        <FontAwesome5 name="shopping-bag" size={24} color="black" />
      </TouchableOpacity>

      {/* Beneficiary Details Button with account circle icon */}
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('BeneficiaryDetailsScreen')}>
        <MaterialIcons name="account-circle" size={24} color="black" />
      </TouchableOpacity>

      {/* Contact Us Button with phone icon */}
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ContactUsScreen')}>
        <MaterialIcons name="phone" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: screenWidth, // Use screen width
    position: 'absolute',
    bottom: 10,  // Fixed to bottom of the screen
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  iconButton: {
    alignItems: 'center',
    flex: 1, 
    justifyContent: 'center',
  },
});

export default AppFooter;
