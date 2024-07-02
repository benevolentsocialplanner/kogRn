import { SafeAreaView, StyleSheet, Text } from "react-native";

const CharacterDetailScreen = ({ route }) => {
  const character = route.params.character;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Character Detail Screen</Text>
      <Text style={styles.item}>{character.name}</Text>
      <Text style={styles.item}>{character.status}</Text>
      <Text style={styles.item}>{character.species}</Text>
      <Text style={styles.item}>{character.type}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});
export default CharacterDetailScreen;