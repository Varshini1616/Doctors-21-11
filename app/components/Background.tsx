import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

// Define the props type
interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return <View style={styles.background}>{children}</View>;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center',
  },
});

export default Background;
