// Build a simple form with 2 fields:
// - Email (must be a valid email format)
// - Password (minimum 6 characters)

// On submit:
// - Validate all fields
// - Display error messages inline under each input if invalid
// - If valid, show a success message or console.log the data

// Bonus (optional):
// - Disable the Submit button unless all fields are valid
// - Add a toggle to show/hide password input

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function FormWithValidation() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };

  const onSubmit = () => {
    let isValid = true;

    if (!isValidEmail(emailValue)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (passwordValue.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      console.log('Form submitted', { emailValue, passwordValue });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={emailValue}
        onChangeText={setEmailValue}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder='Password'
        value={passwordValue}
        onChangeText={setPasswordValue}
        secureTextEntry={!showPassword}
      />
      {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

      <Pressable onPress={() => setShowPassword((prev) => !prev)}>
        <Text style={{ color: 'blue', marginBottom: 10 }}>
          {showPassword ? 'Hide' : 'Show'} Password
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          (!emailValue.length || !passwordValue.length) && styles.disabledButton,
        ]}
        onPress={onSubmit}
        disabled={!emailValue.length || !passwordValue.length}
      >
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '30%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'purple',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginLeft: 4,
    marginBottom: 8,
  },
});
