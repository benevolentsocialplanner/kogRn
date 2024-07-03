import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import { NAVIGATIONROUTES } from '../constants/navigationRoutes';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Storage from '../utils/storage';
import { addFavoriteCharacter, addFavoriteEpisode } from '../utils/store';

const Stack = createNativeStackNavigator();

const NavigationStack = (): React.JSX.Element => {
  const favoriteCharacters = useSelector(
    state => state.favoriteCharactersSlice.favoriteCharacters,
  );
  const favoriteEpisodes = useSelector(
    state => state.favoriteEpisodesSlice.favoriteEpisodes,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const setEpisodes = async () => {
      favoriteEpisodes && favoriteEpisodes.length > 0 && await Storage.setItem('favoriteEpisodes', favoriteEpisodes);
    };
    setEpisodes();
  }, [favoriteEpisodes]);

  useEffect(() => {
    const setCharacters = async () => {
      favoriteCharacters && favoriteCharacters.length > 0 && await Storage.setItem('favoriteCharacters', favoriteCharacters);
    };
    setCharacters();
  }, [favoriteCharacters]);

  useEffect(() => {
    const initalStateUpdate = async () => {
      const episodesString = await Storage.getItem('favoriteEpisodes');
      const charactersString = await Storage.getItem('favoriteCharacters');
      if (episodesString) {
        episodesString.map((item, index) => {
          dispatch(addFavoriteEpisode(item));
        });
      }
      if (charactersString) {
        charactersString.map((item, index) => {
          dispatch(addFavoriteCharacter(item));
        });
      }
    };
    initalStateUpdate();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={NAVIGATIONROUTES.bottomTabNavigation}
          component={BottomTabNavigation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={NAVIGATIONROUTES.epDetailScreen}
          component={EpisodeDetailScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={NAVIGATIONROUTES.charDetailScreen}
          component={CharacterDetailScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationStack;