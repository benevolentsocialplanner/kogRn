import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  addFavoriteCharacter,
  removeFavoriteCharacter,
  addFavoriteEpisode,
  removeFavoriteEpisode,
} from '../utils/store';
import { NAVIGATIONROUTES } from '../constants/navigationRoutes';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [type, setType] = useState<'characters' | 'episodes'>('characters');
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const favoriteCharacters = useSelector(
    state => state.favoriteCharactersSlice.favoriteCharacters,
  );
  const favoriteEpisodes = useSelector(
    state => state.favoriteEpisodesSlice.favoriteEpisodes,
  );

  const handleTypeChange = (newType: 'characters' | 'episodes') => {
    setType(newType);
  };

  const handleRemoveFavorite = itemId => {
    setItemToRemove(itemId);
    setRemoveModalVisible(true);
  };

  const confirmRemoveFavorite = () => {
    if (type === 'characters') {
      dispatch(removeFavoriteCharacter(itemToRemove));
    } else {
      dispatch(removeFavoriteEpisode(itemToRemove));
    }
    setRemoveModalVisible(false);
  };

  const handleCancelRemove = () => {
    setRemoveModalVisible(false);
    setItemToRemove(null);
  };

  const handleCharNavigation = id => {
    navigation.navigate(NAVIGATIONROUTES.charDetailScreen, { id: id });
  };

  const handleEpNavigation = episode => {
    navigation.navigate(NAVIGATIONROUTES.epDetailScreen, { id: episode.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Characters"
          onPress={() => handleTypeChange('characters')}
          color={type === 'characters' ? '#923e5a' : '#aaa'}
        />
        <Button
          title="Episodes"
          onPress={() => handleTypeChange('episodes')}
          color={type === 'episodes' ? '#923e5a' : '#aaa'}
        />
      </View>

      <View style={styles.listContainer}>
        {type === 'characters' && (
          <ScrollView style={[styles.list, styles.listBackground]}>
            <Text style={styles.listTitle}>Favorite Characters</Text>
            {favoriteCharacters.length > 0 &&
              favoriteCharacters.map((character, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCharNavigation(character.id)}
                  style={styles.itemTouch}>
                  <Text style={styles.item}>{character.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveFavorite(character.id)}>
                    <Image
                      source={require('../assets/images/trash.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}

        {type === 'episodes' && (
          <ScrollView style={[styles.list, styles.listBackground]}>
            <Text style={styles.listTitle}>Favorite Episodes</Text>
            {favoriteEpisodes.map((episode, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleEpNavigation(episode)}
                style={styles.itemTouch}>
                <Text style={styles.item}>{episode.name}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveFavorite(episode.id)}>
                  <Image
                    source={require('../assets/images/trash.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={removeModalVisible}
        onRequestClose={() => setRemoveModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Silmek istediginize emin misiniz?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Evet"
                onPress={confirmRemoveFavorite}
                color="#923e5a"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemTouch: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#FF7F7F',
    borderRadius: 5,
  },
  list: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listBackground: {
    backgroundColor: '#f9f9f9',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default FavoritesScreen;
