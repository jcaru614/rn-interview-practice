// Build a list + detail view using React Native components.
//
// The screen should display a list of users.
// Each user should show their name and other data).
//
// When a user is tapped, navigate to a detail screen.
// The detail screen should show that user's full name and id.
//
// Use mock data — either hardcoded in the file or fetched from a simulated API.
//
// Bonus (optional):
// - Use useState + useEffect to simulate fetching data with a delay.
// - Add a loading spinner while the data is being "fetched".
// - Handle empty state (e.g. "No users found").

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ListDetail() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => {
        console.log('dater ', data);
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUser = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/listDetail/UserInfo',
            params: { name: item.name, id: item.id },
          })
        }
        style={styles.itemContainer}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bio}>{item.address.city}</Text>
        <Text style={styles.bio}>{item.address.street}</Text>
        <Text style={styles.bio}>{item.address.zipcode}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={loading} />
      <FlatList data={users} renderItem={renderUser} keyExtractor={(item) => item.id} />
      {error === 404 ? <Text>No UsersFound</Text> : <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    margin: 4,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 4,
  },
});
