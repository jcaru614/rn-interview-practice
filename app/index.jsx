import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoProvider } from './todoApp/TodoConext';

import ListDetail from './listDetail/ListDetail';
import Counter from './Counter';
import TodoApp from './todoApp/TodoApp';
import FormWithValidation from './FormWithValidation';
import PullToRefresh from './PullToRefresh';
import SearchableList from './SearchList';

export default function App() {
  const [selected, setSelected] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    { label: 'List Detail', value: 'ListDetail' },
    { label: 'Counter', value: 'Counter' },
    { label: 'Todo App', value: 'TodoApp' },
    { label: 'Form with Validation', value: 'FormWithValidation' },
    { label: 'Pull to Refresh', value: 'PullToRefresh' },
    { label: 'SearchableList', value: 'SearchableList' },
  ];

  useEffect(() => {
    const loadSelection = async () => {
      const stored = await AsyncStorage.getItem('selectedComponent');
      setSelected(stored || 'ListDetail');
      setIsReady(true);
    };
    loadSelection();
  }, []);

  useEffect(() => {
    if (selected) {
      AsyncStorage.setItem('selectedComponent', selected);
    }
  }, [selected]);

  const renderComponent = () => {
    switch (selected) {
      case 'ListDetail':
        return <ListDetail />;
      case 'Counter':
        return <Counter />;
      case 'TodoApp':
        return (
          <TodoProvider>
            <TodoApp />
          </TodoProvider>
        );
      case 'FormWithValidation':
        return <FormWithValidation />;
      case 'PullToRefresh':
        return <PullToRefresh />;
      case 'SearchableList':
        return <SearchableList />;
      default:
        return <Text>Select a component</Text>;
    }
  };

  if (!isReady) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Problems</Text>

        <Pressable onPress={() => setModalVisible(true)} style={styles.fakePicker}>
          <Text>{options.find((o) => o.value === selected)?.label || 'Select Component'}</Text>
        </Pressable>

        <Modal visible={modalVisible} transparent animationType='slide'>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setSelected(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>

      {renderComponent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  fakePicker: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginTop: 8,
    width: '100%',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
