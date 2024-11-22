import React, { FC } from 'react';
import { TextInput as RNTextInput, Text, StyleSheet, View, TextInputProps } from 'react-native';

// Define the props type
interface CustomTextInputProps extends TextInputProps {
  label?: string;
  errorText?: string;
}

const TextInput: FC<CustomTextInputProps> = ({ label, errorText, ...props }) => (
  <View style={styles.container}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <RNTextInput
      style={[styles.input, errorText ? styles.inputError : null]} // Add error styling if needed
      {...props}
      accessible={true} // Enables accessibility
      accessibilityLabel={label} // Provides a label for accessibility
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: 'black', 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  inputError: {
    borderColor: 'red', 
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default TextInput;
