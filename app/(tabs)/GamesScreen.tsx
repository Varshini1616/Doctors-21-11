import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  HealthGameOne: undefined;
  HealthGameTwo: undefined;
  HealthGameThree: undefined;
};

type GamesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const GamesScreen: React.FC = () => {
  const navigation = useNavigation<GamesScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Health Game</Text>
      <TouchableOpacity
        style={styles.gameButton}
        onPress={() => navigation.navigate('HealthGameOne')}
      >
        <Text style={styles.buttonText}>Health Game 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gameButton}
        onPress={() => navigation.navigate('HealthGameTwo')}
      >
        <Text style={styles.buttonText}>Health Game 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gameButton}
        onPress={() => navigation.navigate('HealthGameThree')}
      >
        <Text style={styles.buttonText}>Health Game 3</Text>
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
  gameButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GamesScreen;
