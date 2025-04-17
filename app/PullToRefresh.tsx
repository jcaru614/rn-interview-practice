// Build a scrollable list that supports pull-to-refresh.
// The screen should show a list of items.
// When the user pulls down, trigger a simulated refresh.
// After a short delay, update or replace the data.
// Show a loading indicator while refreshing.
//
// Bonus (optional):
// - Show an empty state if the list is cleared

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import axios from 'axios';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export default function PullToRefresh() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const limit = 10;

  const fetchList = async () => {
    setRefreshing(true);
    setSkip(0);
    try {
      const { data } = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=0`);
      setProducts(data.products);
      setSkip(limit);
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
  };

  const fetchMore = async () => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      setProducts((prev) => [...prev, ...data.products]);
      setSkip(skip + limit);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndReached = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    await fetchMore();
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Data</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          setProducts([]);
          setSkip(0);
        }}
      >
        <Text style={styles.btnText}>Clear</Text>
      </Pressable>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchList} />}
        contentContainerStyle={styles.listContent}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={{ marginVertical: 12 }} /> : null
        }
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.text}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 400,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 40,
  },
  itemContainer: {
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginVertical: 4,
  },
  btnText: {
    color: 'white',
  },
});
