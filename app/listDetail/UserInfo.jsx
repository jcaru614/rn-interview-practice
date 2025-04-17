import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
export default function UserInfo() {
  const { name, id } = useLocalSearchParams();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: '/',
          })
        }
      >
        <Text style={styles.text}>Go Back</Text>
      </Pressable>
      <Text>Name: {name}</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
});
