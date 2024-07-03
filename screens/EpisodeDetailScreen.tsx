import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { apiProvider } from "../utils/apiProvider";
import { CharacterType, Episode } from "../utils/types";
import { addFavoriteCharacter } from "../utils/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATIONROUTES } from "../constants/navigationRoutes";

const EpisodeDetailScreen = ({ route }) => {
  const { id } = route.params;

  const [episodeDetail, setEpisodeDetail] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All"); // Default filter is "All"

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.favoriteCharactersSlice.favoriteCharacters);

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        const res = await apiProvider.getEpisodeDetail(id);
        if (res) {
          setEpisodeDetail(res as Episode);
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

  const handleAddFavorite = (char: CharacterType) => {
    const favoriteCharacters = selector;
    if (favoriteCharacters.length >= 10) {
      Alert.alert("10'dan fazla karakteri favoriye ekleyemezsiniz.");
      return;
    } else {
      dispatch(addFavoriteCharacter(char));
    }
  }

  const handleNavigationCharacter = (char: CharacterType) => {
    navigation.navigate(NAVIGATIONROUTES.charDetailScreen, { id: char.id })
  }

  const handleBackNavigation = () => {
    navigation.canGoBack() && navigation.goBack();
  }

  const filteredCharacters = characters.filter(char =>
    (char.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "") &&
    (statusFilter === "All" || char.status === statusFilter)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.row, {justifyContent: "space-between", gap: 15}]}>
        <TouchableOpacity onPress={handleBackNavigation} style={styles.icon}>
          <Image source={require("../assets/images/arrow.png")} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.title}>Episode Detail Screen</Text>
        <View style={styles.icon}></View>
      </View>
      
      {episodeDetail && (
        <View style={styles.container}>
          <Text style={styles.detailText}>{episodeDetail.name}</Text>
          <Text style={styles.detailText}>Air Date: {episodeDetail.air_date}</Text>
          <Text style={styles.detailText}>Episode: {episodeDetail.episode}</Text>
          <Text style={styles.subTitle}>Characters Partaking in the Episode:</Text>
          
          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search characters by name"
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />

          {/* Status Filter */}
          <View style={styles.statusFilter}>
            <TouchableOpacity
              style={[styles.filterOption, statusFilter === "All" && styles.activeFilter]}
              onPress={() => setStatusFilter("All")}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, statusFilter === "Alive" && styles.activeFilter]}
              onPress={() => setStatusFilter("Alive")}
            >
              <Text style={styles.filterText}>Alive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, statusFilter === "Dead" && styles.activeFilter]}
              onPress={() => setStatusFilter("Dead")}
            >
              <Text style={styles.filterText}>Dead</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.charContainer}>
            {filteredCharacters.length > 0 ? (
              filteredCharacters.map((char, index) => (
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
              ))
            ) : (
              <Text style={styles.noResultsText}>No characters found.</Text>
            )}
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
    fontSize: 20,
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
    width: "95%",
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
  searchInput: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  statusFilter: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  filterOption: {
    padding: 5,
  },
  activeFilter: {
    backgroundColor: "#923e5a",
    borderRadius: 5,
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
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
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
  },
  icon: {
    width: 30,
    height: 30,
  }
});

export default EpisodeDetailScreen;
