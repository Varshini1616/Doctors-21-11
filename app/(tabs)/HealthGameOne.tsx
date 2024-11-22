import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HealthGameOne: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Ready to start?');

  const startBreathingExercise = () => {
    setIsBreathing(true);
    let phase = 0;
    const phases = ['Breathe In', 'Hold', 'Breathe Out'];
    setBreathPhase(phases[phase]);

    const interval = setInterval(() => {
      phase = (phase + 1) % 3;
      setBreathPhase(phases[phase]);
    }, 4000); // 4 seconds for each phase

    setTimeout(() => {
      clearInterval(interval);
      setIsBreathing(false);
      setBreathPhase('Exercise Complete');
    }, 12000); // 3 cycles of breathing
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>
      <Text style={styles.phaseText}>{breathPhase}</Text>
      {!isBreathing && (
        <TouchableOpacity style={styles.startButton} onPress={startBreathingExercise}>
          <Text style={styles.buttonText}>Start Exercise</Text>
        </TouchableOpacity>
      )}
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
  phaseText: {
    fontSize: 20,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default HealthGameOne;
