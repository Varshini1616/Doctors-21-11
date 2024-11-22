import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HealthGameThree: React.FC = () => {
  const [steps, setSteps] = useState(0);

  const simulateSteps = () => {
    const randomSteps = Math.floor(Math.random() * 100) + 1; // Simulate 1-100 steps
    setSteps((prevSteps) => prevSteps + randomSteps);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Counter Simulation</Text>
      <Text style={styles.stepsText}>Steps: {steps}</Text>
      <TouchableOpacity style={styles.stepButton} onPress={simulateSteps}>
        <Text style={styles.buttonText}>Simulate Steps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stepsText: {
    fontSize: 20,
    marginBottom: 30,
  },
  stepButton: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default HealthGameThree;
