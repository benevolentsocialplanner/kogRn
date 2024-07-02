import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { apiProvider } from "../utils/apiProvider";
import { CharacterType, Episode } from "../utils/types";
import { addFavoriteCharacter } from "../utils/store";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATIONROUTES } from "../constants/navigationRoutes";

const EpisodeDetailScreen = ({ route }) => {
  const { id } = route.params;

  const [episodeDetail, setEpisodeDetail] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        const res = await apiProvider.getEpisodeDetail(id);
        if (res) {
          setEpisodeDetail(res as EpisodesType);
        }
      } catch (error) {
        console.error("Error fetching episode detail:", error);
      }
    };
    fetchEpisodeDetail();
  }, [id]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let charIds = [];

        episodeDetail?.characters?.forEach(character => {
          const numbersOnly = character.replace(/\D/g, "");
          charIds.push(numbersOnly);
        });

        const characters = await apiProvider.getCharacters(charIds);
        characters && setCharacters(characters as CharacterType[]);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, [episodeDetail]);

  const handleAddFavorite = (char) => {
    dispatch(addFavoriteCharacter(char));
  }

  const handleNavigationCharacter = (char) => {
    navigation.navigate(NAVIGATIONROUTES.charDetailScreen, { character: char })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Episode Detail Screen</Text>
      {episodeDetail && (
        <View style={styles.container}>
          <Text style={styles.detailText}>{episodeDetail.name}</Text>
          <Text style={styles.detailText}>Air Date: {episodeDetail.air_date}</Text>
          <Text style={styles.detailText}>Episode: {episodeDetail.episode}</Text>
          <Text style={styles.subTitle}>Characters Partaking in the Episode:</Text>
          <ScrollView style={styles.charContainer}>
            {characters.length > 0 && characters.map((char, index) => (
              <TouchableOpacity onPress={() => {handleNavigationCharacter(char)}} key={index} style={styles.charItem}>
                <View style={[styles.row, {justifyContent: "space-between"}]}>
                  <View style={styles.icon}></View>
                  <Text style={styles.charName}>{char.name || "Name unknown"}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleAddFavorite(char);
                      }}>
                    <Image source={require("../assets/images/favoriteNavBar.png")} style={styles.icon}/>
                  </TouchableOpacity>
                </View>
                <Text style={styles.charInfo}>
                  Status: {char.status || "Status unknown"} | 
                  Species: {char.species || "Species unknown"} | 
                  Type: {char.type || "Type unknown"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  charContainer: {
    marginTop: 10,
    maxHeight: 400,
  },
  charItem: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  charName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  charInfo: {
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default EpisodeDetailScreen;
