// This screen should:
// - Show a list of todos the user can add to and remove
// - Include an input field and a submit action
// - Display a message if no todos exist
// - Use basic layout styling with padding and background

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Modal from './Modal';
import { useTodos } from './TodoConext';
import TodoItem from './TodoItem';

export default function TodoApp() {
  const { todoList } = useTodos();
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log('todolist ', todoList);
  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </Pressable>
      <ScrollView>
        {todoList
          ? todoList.map((text: string, index: number) => <TodoItem text={text} index={index} />)
          : null}
      </ScrollView>
      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
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
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 4,
    maxWidth: 100,
  },
  addButtonText: {
    color: 'white',
  },
});
