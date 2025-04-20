import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal as RNModal, Pressable, TextInput } from 'react-native';
import { useTodos } from './TodoConext';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ visible, onClose }) => {
  const { addTodo } = useTodos();
  const [text, setText] = useState('');

  const addTodoItem = () => {
    addTodo(text);
    setText('');
    onClose();
  };

  const closeModal = () => {
    onClose();
    setText('');
  };
  return (
    <RNModal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Pressable onPress={closeModal}>
            <Text>Close</Text>
          </Pressable>

          <TextInput
            style={styles.textInput}
            placeholder='Enter todo'
            value={text}
            onChangeText={setText}
          />
          <Pressable style={styles.add} onPress={addTodoItem}>
            <Text>Add</Text>
          </Pressable>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
  },
  add: {
    alignSelf: 'flex-end',
    margin: 5,
  },
});
