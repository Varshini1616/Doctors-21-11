import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  WelcomeScreen: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('WelcomeScreen'); 
    }, 2000);

   
    return () => clearTimeout(timer);
  }, [navigation]); 

  return (
    <View style={styles.container}>
      <Image source={require('./Splashscreen.jpg')} style={styles.logo} />
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
    height: 200, 
  },
});

export default SplashScreen;
