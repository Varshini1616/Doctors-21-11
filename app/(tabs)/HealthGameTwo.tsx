import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const foodItems = ['Apple', 'Carrot', 'Broccoli', 'Banana', 'Orange', 'Spinach'];

const HealthGameTwo: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    const randomSequence = [...foodItems].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSequence(randomSequence);
    setUserInput([]);
    setGameStarted(true);

    Alert.alert('Memorize this sequence:', randomSequence.join(', '), [{ text: 'OK' }]);
  };

  const handleFoodClick = (food: string) => {
    if (!gameStarted) return;
    setUserInput((prev) => {
      const updatedInput = [...prev, food];
      if (updatedInput.length === sequence.length) {
        if (JSON.stringify(updatedInput) === JSON.stringify(sequence)) {
          Alert.alert('Success!', 'You remembered the sequence correctly!');
        } else {
          Alert.alert('Try Again', 'The sequence was incorrect.');
        }
        setGameStarted(false);
      }
      return updatedInput;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Challenge</Text>
      {!gameStarted && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      )}
      <View style={styles.foodContainer}>
        {foodItems.map((food) => (
          <TouchableOpacity
            key={food}
            style={styles.foodButton}
            onPress={() => handleFoodClick(food)}
          >
            <Text style={styles.foodText}>{food}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  startButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  foodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  foodButton: {
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  foodText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default HealthGameTwo;
