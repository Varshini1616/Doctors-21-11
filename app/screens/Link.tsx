import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

// Define the types for props
interface LinkProps {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
}

const Link: React.FC<LinkProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} accessibilityRole="link">
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: '#007BFF', // Customize color as needed
    textDecorationLine: 'underline',
  },
});

export default Link;
