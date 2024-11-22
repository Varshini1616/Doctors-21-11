import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';

// Define the props type
interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <Text style={styles.header}>{children}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
    color: '#333', // Customize as per your design
    textAlign: 'center',
  },
});

export default Header;
