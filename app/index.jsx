import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Picker, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListDetail from './listDetail/ListDetail';
import Counter from './Counter';
import TodoApp from './TodoApp';
import FormWithValidation from './FormWithValidation';
import PullToRefresh from './PullToRefresh';

export default function App() {
  const [selected, setSelected] = useState(null);
  const [isReady, setIsReady] = useState(false);

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
        return <TodoApp />;
      case 'FormWithValidation':
        return <FormWithValidation />;
      case 'PullToRefresh':
        return <PullToRefresh />;
      default:
        return <Text>Select a component</Text>;
    }
  };

  if (!isReady) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Problems</Text>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label='List Detail' value='ListDetail' />
          <Picker.Item label='Counter' value='Counter' />
          <Picker.Item label='Todo App' value='TodoApp' />
          <Picker.Item label='Form with Validation' value='FormWithValidation' />
          <Picker.Item label='Pull to Refresh' value='PullToRefresh' />
        </Picker>
      </View>
      <ScrollView contentContainerStyle={styles.content}>{renderComponent()}</ScrollView>
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
  picker: {
    height: 50,
    width: 200,
    marginTop: 4,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
