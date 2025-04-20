import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTodos } from './TodoConext';

type Props = {
  text: string;
  index: number;
};

const TodoItem: React.FC<Props> = ({ text, index }) => {
  const { deleteTodo } = useTodos();
  return (
    <View style={styles.container} key={text}>
      <Text style={styles.text}>{text}</Text>
      <Pressable style={styles.delete} onPress={() => deleteTodo(text, index)}>
        <Text>X</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  delete: {
    alignSelf: 'flex-end',
  },
});

export default TodoItem;
