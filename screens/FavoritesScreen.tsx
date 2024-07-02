import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavoriteCharacter,
  removeFavoriteCharacter,
  addFavoriteEpisode,
  removeFavoriteEpisode,
} from '../utils/store';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState<'characters' | 'episodes'>('characters');

  const favoriteCharacters = useSelector(
    state => state.favoriteCharactersSlice.favoriteCharacters,
  );
  const favoriteEpisodes = useSelector(
    state => state.favoriteEpisodesSlice.favoriteEpisodes,
  );

  const handleTypeChange = (newType: 'characters' | 'episodes') => {
    setType(newType);
  };

  const handleAddFavorite = item => {
    if (type === 'characters') {
      dispatch(addFavoriteCharacter(item));
    } else {
      dispatch(addFavoriteEpisode(item));
    }
  };

  const handleRemoveFavorite = itemId => {
    if (type === 'characters') {
      dispatch(removeFavoriteCharacter(itemId));
    } else {
      dispatch(removeFavoriteEpisode(itemId));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites Screen</Text>

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
          <View style={[styles.list, styles.listBackground]}>
            <Text style={styles.listTitle}>Favorite Characters:</Text>
            {favoriteCharacters.map((character, index) => (
              <Text key={index} style={styles.item}>
                {character.name}
              </Text>
            ))}
          </View>
        )}

        {type === 'episodes' && (
          <View style={[styles.list, styles.listBackground]}>
            <Text style={styles.listTitle}>Favorite Episodes:</Text>
            {favoriteEpisodes.map((episode, index) => (
              <Text key={index} style={styles.item}>
                {episode.name}
              </Text>
            ))}
          </View>
        )}
      </View>
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
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default FavoritesScreen;
