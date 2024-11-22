import React, { useState } from 'react';
import { Alert } from 'react-native'; // Using Alert for pop-up feedback
import { saveLogin } from '../(tabs)/LoginApi'; // Assuming similar API setup as SignUp

// Define the shape of the login details object
interface LoginData {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state to prevent multiple submissions

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);  // Disable the button while the request is in progress

    try {
      // Sending login data using the POST request
      const response = await saveLogin(loginData);
      setIsLoading(false);
      
      if (response) {
        Alert.alert('Success', 'Login successful!', [{ text: 'OK' }]);
        // Navigate to dashboard or other page if login is successful
      } else {
        Alert.alert('Error', 'Invalid login credentials. Please try again.', [{ text: 'OK' }]);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to complete login.', [{ text: 'OK' }]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>Login</button>
    </form>
  );
};

export default LoginScreen;