import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface ChatOption {
  response: string;
}

const ChatScreen: React.FC = () => {
  const [options, setOptions] = useState<ChatOption[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  useEffect(() => {
    // Fetch predefined chat options from the backend
    axios.get('http://your-backend-url/chat/getOptions')
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleOptionSelect = (id: number) => {
    // Fetch response for the selected option
    axios.get(`http://your-backend-url/chat/getResponse/${id}`)
      .then(response => setSelectedResponse(response.data))
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predefined Chat</Text>

      <FlatList
        data={options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleOptionSelect(index)}>
            <Text style={styles.option}>{item.response}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Response: {selectedResponse}</Text>
        </View>
      )}

      <Button title="Back" onPress={() => {}} />  {/* Add navigation back if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    fontSize: 18,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  responseContainer: {
    marginTop: 20,
  },
  responseText: {
    fontSize: 20,
    color: 'blue',
  },
});

export default ChatScreen;
