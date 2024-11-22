import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Animated, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import bggif from '../../assets/images/loginbg.gif'; // Background GIF

type RootStackParamList = {
  ForgotPasswordScreen: undefined;
  SignUpScreen: undefined;
  DashboardScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPasswordScreen'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<{ value: string; error: string }>({ value: '', error: '' });
  const [password, setPassword] = useState<{ value: string; error: string }>({ value: '', error: '' });
  const [scaleValue] = useState(new Animated.Value(1));

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    if (!email.value) {
      setEmail({ ...email, error: 'Email is required.' });
      return;
    }
    if (!password.value) {
      setPassword({ ...password, error: 'Password is required.' });
      return;
    }
    // Navigate to DashboardScreen
    navigation.navigate('DashboardScreen'); 
  };

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

  return (
    <ImageBackground source={bggif} style={styles.backgroundContainer}>
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.headerText}>Sign Into Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email.value}
          onChangeText={(text: string) => setEmail({ value: text, error: '' })}
          placeholderTextColor="#fff"
          keyboardType="email-address"
        />
        {email.error ? <Text style={styles.errorText}>{email.error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password.value}
          onChangeText={(text: string) => setPassword({ value: text, error: '' })}
          placeholderTextColor="#fff"
          secureTextEntry
        />
        {password.error ? <Text style={styles.errorText}>{password.error}</Text> : null}

        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.row}>
          <Text style={styles.accountText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  accountText: {
    color: '#fff',
    fontSize: 14,
  },
  signUpText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default memo(LoginScreen);
