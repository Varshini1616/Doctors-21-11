import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<string | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert height from cm to m

    // Validate numeric input
    if (!isNaN(weightNum) && weightNum > 0 && !isNaN(heightNum) && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum);
      setBmi(bmiValue.toFixed(2)); // Round to 2 decimal places
      determineBMICategory(bmiValue);
    } else {
      setBmi(null);
      setBmiCategory('Please enter valid numeric values');
    }
  };

  const determineBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <Button title="Calculate BMI" onPress={calculateBMI} />
      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>BMI: {bmi}</Text>
          <Text style={styles.resultText}>Category: {bmiCategory}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BMICalculator;
