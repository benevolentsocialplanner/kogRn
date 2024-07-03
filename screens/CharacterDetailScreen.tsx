import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { apiProvider } from "../utils/apiProvider";
import { CharacterDetailsType } from "../utils/types";
import { useNavigation } from "@react-navigation/native";

const CharacterDetailScreen = ({ route }) => {
  const id = route.params.id;

  const [character, setCharacter] = useState<CharacterDetailsType | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCharDetails = async () => {
      try {
        const res = await apiProvider.getCharacterDetail(id);
        if (res) {
          setCharacter(res as CharacterDetailsType);
        }
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };
    fetchCharDetails();
  }, [id]);

  if (!character) {
    return null;
  }

  const handleNavigationBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={{justifyContent: "space-between", display: "flex", flexDirection: "row"}}>
            <TouchableOpacity onPress={handleNavigationBack}>
              <Image source={require("../assets/images/arrow.png")} style={[styles.icon, {left: -20}]}/>
            </TouchableOpacity>
            <Image
              source={{ uri: character.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.icon}></View>
          </View>
          <Text style={styles.title}>{character.name}</Text>
          <Text style={styles.item}>Status: {character.status}</Text>
          <Text style={styles.item}>Species: {character.species}</Text>
          <Text style={styles.item}>
            Origin: {character.origin.name}
          </Text>
          <Text style={styles.item}>
            Location: {character.location.name}
          </Text>
          <Text style={styles.item}>Gender: {character.gender}</Text>
          <Text style={styles.item}>Type: {character.type || "unkown"}</Text>
          <Text style={styles.item}>Episode Count: {character.episode.length}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  container: {
    width: "90%",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
});

export default CharacterDetailScreen;
