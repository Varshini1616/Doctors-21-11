import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

// Define the props type
interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Button;
