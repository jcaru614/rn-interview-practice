// This screen should:
// - Show a list of todos the user can add to and remove
// - Include an input field and a submit action
// - Display a message if no todos exist
// - Use basic layout styling with padding and background

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TodoApp() {
  return (
    <View style={styles.container}>
      <Text>Hello from TodoApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
