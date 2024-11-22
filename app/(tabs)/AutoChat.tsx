import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';

// Define the User type
type User = {
  _id: string;
  name: string;
};

// Define the Message type
type Message = IMessage & {
  user: User;
};

const AutoChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState<string>(''); // Store user's name
  const [showNameInput, setShowNameInput] = useState(true); // Show name input initially
  const [options, setOptions] = useState<{ id: string; text: string }[]>([]); // Dynamic options

  // Initial predefined responses
  const initialOptions = [
    { id: '1', text: 'What are your symptoms?' },
    { id: '2', text: 'Do you want to book an appointment?' },
    { id: '3', text: 'Do you need emergency assistance?' },
  ];

  // Predefined responses based on selected options
  const responses: Record<'1' | '2' | '3', string> = {
    '1': 'Please describe your symptoms in detail.',
    '2': 'You can book an appointment by calling 123-456-7890.',
    '3': 'For emergencies, please call 911 immediately.',
  };

  useEffect(() => {
    // Initial message when the chat starts
    setMessages([
      {
        _id: '1',
        text: 'Welcome! Please enter your name to continue.',
        createdAt: new Date(),
        user: {
          _id: '2',
          name: 'Chatbot',
        },
      },
    ]);
  }, []);

  // Function to handle sending a message
  const onSend = (newMessages: Message[]) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  // Handle the user entering their name
  const handleNameSubmit = () => {
    if (name.trim()) {
      // Add message that greets the user
      onSend([
        {
          _id: Math.round(Math.random() * 1000000).toString(),
          text: `Hello ${name}, how can I assist you today? Please select one of the options below.`,
          createdAt: new Date(),
          user: {
            _id: '2',
            name: 'Chatbot',
          },
        },
      ]);
      setShowNameInput(false); // Hide the name input once the name is entered
      setOptions(initialOptions); // Show initial options
    }
  };

  // Handle option selection (button clicks)
  const handleOptionSelect = (optionId: '1' | '2' | '3') => {
    const responseText = responses[optionId];
    onSend([
      {
        _id: Math.round(Math.random() * 1000000).toString(),
        text: responseText,
        createdAt: new Date(),
        user: {
          _id: '2',
          name: 'Chatbot',
        },
      },
    ]);

    // Example of dynamic options based on previous selection
    if (optionId === '1') {
      setOptions([{ id: '4', text: 'Please enter more details about your symptoms.' }]);
    } else if (optionId === '2') {
      setOptions([{ id: '5', text: 'Would you like to select a doctor?' }]);
    } else if (optionId === '3') {
      setOptions([]); // After emergency response, no more options are provided
    }
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages as Message[])}
        user={{
          _id: '1', // Assuming the user has id 1
          name: name,
        }}
        renderInputToolbar={() => null} // Remove the input toolbar after the name is submitted
      />

      {/* Show name input only if the user has not submitted their name */}
      {showNameInput && (
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleNameSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Show buttons with options after the name is submitted */}
      {!showNameInput && options.length > 0 && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option.id as '1' | '2' | '3')}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Styles for the updated chat UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  nameInputContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  nameInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    width: '70%',
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionsContainer: {
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column', // Change to column for vertical alignment
    backgroundColor: '#F0F0F0',
  },
  optionButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 15,
    marginVertical: 5, // Add margin for vertical space between buttons
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AutoChat;
