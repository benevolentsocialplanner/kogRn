import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { apiProvider } from "../utils/apiProvider";
import { EpisodesType } from "../utils/types";
import { useDispatch } from 'react-redux';
import { addFavoriteEpisode } from '../utils/store'; 
import { useNavigation } from '@react-navigation/native';
import Pagination from "../components/Pagination"; 
import { NAVIGATIONROUTES } from "../constants/navigationRoutes";

const ITEMS_PER_PAGE = 7;

const HomeScreen = () => {
  const [items, setItems] = useState<EpisodesType>({ results: [], info: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await apiProvider.getEpisodes();
      setItems(res as EpisodesType);
    };

    fetchItems();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddFavorite = (item) => {
    dispatch(addFavoriteEpisode(item));
  };

  const handleNavigation = (id) => {
    navigation.navigate(NAVIGATIONROUTES.epDetailScreen, { id: id });
  };

  const filteredItems = items.results.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.episode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.air_date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, episode, or air date"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <ScrollView style={styles.container}>
        {currentItems.map((item, index) => (
          <TouchableOpacity onPress={() => { handleNavigation(item.id) }} key={index} style={styles.itemContainer}>
            <View style={[styles.row, {justifyContent: "space-between"}]}>
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={[styles.row, {alignItems: "center", gap: 5}]}>
                <Text style={styles.itemText}>{item.episode}</Text>
                <TouchableOpacity onPress={() => { handleAddFavorite(item) }}>
                  <Image style={styles.icon} source={require("../assets/images/favoriteNavBar.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <Text>{item.air_date}</Text>
            <Text>{item.characters.length} characters</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 120,
  },
  container: {
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "column",
  },
  itemContainer: {
    backgroundColor: "lightblue",
    padding: 20,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },
  searchBarContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  }
});

export default HomeScreen;
