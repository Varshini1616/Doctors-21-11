import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  PersonalDetailsScreen: undefined;
  PackageDetailsScreen: undefined;
  BeneficiaryDetailsScreen: undefined;
  SubscriptionScreen: undefined;
  PaymentScreen: undefined;
  HistoryScreen: undefined;
  TakeCareScreen: undefined;
  ProxyCareScreen: undefined;
  Elite360PackScreen: undefined;
  OurTeamScreen: undefined;
  TestsScreen: undefined;
  HealthCalculatorScreen: undefined;
  PartnersScreen: undefined;
  MarketingCountScreen: undefined;
  ReviewsScreen: undefined;
  SupportCallScreen: undefined;
  ChatSupportScreen: undefined;
  LoginScreen: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Button definitions
  const buttons = {
    WESTAYCLOSE: [
      { title: 'Personal Details', icon: 'user', screen: 'LoginScreen' },
      { title: 'Beneficiary Details', icon: 'users', screen: 'LoginScreen' },
      { title: 'Add Beneficiary', icon: 'plus', screen: 'LoginScreen' },
      { title: 'Subscription', icon: 'bell', screen: 'LoginScreen' },
      { title: 'Payment', icon: 'credit-card', screen: 'LoginScreen' },
      { title: 'History', icon: 'history', screen: 'LoginScreen' },
    ],
    PACKAGES: [
      { title: 'Take Care', icon: 'medkit', screen: 'Takecare' },
      { title: 'Proxy Care', icon: 'user-shield', screen: 'Proxycare' },
      { title: 'Elite360 Pack', icon: 'star', screen: 'Elite360' },
    ],
    DOCTORS: [
      { title: 'Our Team', icon: 'user-md', screen: 'OurTeamScreen' },
      { title: 'Tests', icon: 'vial', screen: 'TestsScreen' },
      { title: 'Dummy', icon: 'question', screen: 'TestsScreen' },
    ],
    HEALTH: [
      { title: 'Health Calculator', icon: 'calculator', screen: 'BMICalculatorScreen' },
      { title: 'Games', icon: 'gamepad', screen: 'GamesScreen' },
      { title: 'HealthTips', icon: 'bullhorn', screen: 'HealthcareTipsScreen' },
    ],
    MARKETING: [
      { title: 'Count', icon: 'chart-bar', screen: 'MarketingCountScreen' },
      { title: 'Reviews', icon: 'comments', screen: 'ReviewsScreen' },
      { title: 'Dummy', icon: 'bullhorn', screen: 'ReviewsScreen' },
    ],
    SUPPORT: [
      { title: 'Call Our Team', icon: 'phone', screen: 'SupportCallScreen' },
      { title: 'Chat With Us', icon: 'comments', screen: 'ChatSupportScreen' },
      { title: 'Dummy', icon: 'info-circle', screen: 'ChatSupportScreen' },
    ],
  };

  // Function to render buttons for WESTAYCLOSE in a 3x2 layout
  const renderWestaycloseButtons = () => (
    <View style={styles.gridWrapper}>
      <View style={styles.row}>
        {buttons.WESTAYCLOSE.slice(0, 3).map((button, index) => (
          <Animated.View
            key={index}
            style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}
          >
            <TouchableOpacity
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate(button.screen)}
            >
              <View style={styles.iconTextBox}>
                <FontAwesome name={button.icon} size={24} color="#000" />
                <Text style={styles.buttonText}>{button.title}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <View style={styles.row}>
        {buttons.WESTAYCLOSE.slice(3).map((button, index) => (
          <Animated.View
            key={index}
            style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}
          >
            <TouchableOpacity
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate(button.screen)}
            >
              <View style={styles.iconTextBox}>
                <FontAwesome name={button.icon} size={24} color="#000" />
                <Text style={styles.buttonText}>{button.title}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );

  // Function to render other sections in a single row
  const renderSingleRowButtons = (section: string) => (
    <View style={styles.rowWrapper}>
      {buttons[section].map((button, index) => (
        <Animated.View
          key={index}
          style={[styles.buttonContainerSingleRow, { transform: [{ scale: scaleValue }] }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate(button.screen)}
          >
            <View style={styles.iconTextBox}>
              <FontAwesome name={button.icon} size={24} color="#000" />
              <Text style={styles.buttonText}>{button.title}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <AppHeader username="John Doe" lastLogin="10/18/2024" />

      <View style={styles.content}>
        {/* WESTAYCLOSE Section */}
        <Text style={styles.sectionTitle}>WESTAYCLOSE</Text>
        {renderWestaycloseButtons()}

        {/* PACKAGES Section */}
        <Text style={styles.sectionTitle}>PACKAGES</Text>
        {renderSingleRowButtons('PACKAGES')}

        {/* DOCTORS Section */}
        <Text style={styles.sectionTitle}>DOCTORS</Text>
        {renderSingleRowButtons('DOCTORS')}

        {/* HEALTH Section */}
        <Text style={styles.sectionTitle}>HEALTH</Text>
        {renderSingleRowButtons('HEALTH')}

        {/* MARKETING Section */}
        <Text style={styles.sectionTitle}>MARKETING</Text>
        {renderSingleRowButtons('MARKETING')}

        {/* SUPPORT Section */}
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        {renderSingleRowButtons('SUPPORT')}
      </View>

      <AppFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  gridWrapper: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '30%',
    height: height * 0.12,
    marginBottom: 10,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  buttonContainerSingleRow: {
    width: '30%',
    height: height * 0.1,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  iconTextBox: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 3,
  },
});

export default DashboardScreen;
