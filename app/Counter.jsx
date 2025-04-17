// Create a component to keep track of a count
//    - "Increment" → increases count by 1
//    - "Decrement" → decreases count by 1
//    - "Reset" → sets count back to 0
// Display the current count in a Text element
// (Optional Bonus): Disable the "Decrement" button when count is 0 to avoid negatives

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  const onPressIncrement = () => setCount(count + 1);
  const onPressDecrement = () => setCount(count - 1);
  const onPressReset = () => setCount(0);

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>The Count: {count}</Text>

      <Pressable onPress={onPressIncrement} style={styles.button}>
        <Text style={styles.buttonText}>Increment</Text>
      </Pressable>

      <Pressable
        onPress={onPressDecrement}
        disabled={count === 0}
        style={[styles.button, count === 0 && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Decrement</Text>
      </Pressable>

      <Pressable onPress={onPressReset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  countText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
