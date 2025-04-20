// 1. State for:
// - full list of users
// - filtered list based on search
// - search input text

// 2. Fetch user data from API on mount using useEffect

// 3. Filter the user list whenever the search text changes

// 5. Render:
// - TextInput for search
// - Empty state if nothing matches

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';

type Country = {
  name: {
    common: string;
  };
};

export default function SearchableList() {
  const [searchValue, setSearchValue] = useState('');

  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country[]>([]);

  console.log('country ', country);

  const getCountries = async () => {
    try {
      const { data } = await axios.get('https://restcountries.com/v3.1/all');
      console.log('countries ', data);
      setCountries(data);
    } catch (e) {
      console.log(e);
    }
  };

  const searchCountries = () => {
    const filtered = countries.filter((item: any) =>
      item.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log('filtered', filtered);
    setCountry(filtered);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder='Search'
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Pressable onPress={() => searchCountries()}>
        <Text style={{ color: 'blue', marginBottom: 10 }}>Search</Text>
      </Pressable>

      {country.length > 0 ? (
        country.map((item: any, index: any) => (
          <View key={index}>
            <Text>{item.name?.common}</Text>
          </View>
        ))
      ) : (
        <Text>No Country searched</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: 'gray',
    padding: 5,
  },
});
