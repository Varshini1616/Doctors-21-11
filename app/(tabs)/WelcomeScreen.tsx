import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation type for your stack
type RootStackParamList = {
  LoginScreen: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DashboardScreen'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  // State to hold the "typed" text as it's being animated
  const [typedText, setTypedText] = useState<string>('');
  const fullText = 'WeStayClose'; // Full text to display

  // Animated values for opacity and scale
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  // Automatically navigate to the LoginScreen after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DashboardScreen');
    }, 6000); // 6 seconds delay

    // Start the animations for the image and the opacity
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Start typing the text one letter at a time
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prevText) => prevText + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300); // Delay between each letter

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo with scaling animation */}
      <Animated.Image
        source={require('./Welcome.jpg')}
        style={[styles.logo, { opacity, transform: [{ scale }] }]}
      />

      {/* Animated typing content */}
      <Text style={styles.content}>{typedText}</Text>
      <Text style={styles.description}>
        Care for Your Loved Ones, Wherever You Are
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200, // Adjust logo size as needed
    marginBottom: 20,
  },
  content: {
    fontSize: 32, // Make the font size larger
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', // Text color
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    color: '#007BFF',
  },
});

export default WelcomeScreen;
