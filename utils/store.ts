import {configureStore, createSlice} from '@reduxjs/toolkit';
import {FavoriteCharactersStateType, FavoriteEpisodesStateType} from './types';

const initialStateCharacters: FavoriteCharactersStateType = {
  favoriteCharacters: [],
};

const initialStateEpisodes: FavoriteEpisodesStateType = {
  favoriteEpisodes: [],
};

const favoriteCharactersSlice = createSlice({
  name: 'favoriteCharacters',
  initialState: initialStateCharacters,
  reducers: {
    addFavoriteCharacter: (state, action) => {
      state.favoriteCharacters.push(action.payload);
    },
    removeFavoriteCharacter: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

const favoriteEpisodesSlice = createSlice({
  name: 'favoriteEpisodes',
  initialState: initialStateEpisodes,
  reducers: {
    addFavoriteEpisode: (state, action) => {
      state.favoriteEpisodes.push(action.payload);
    },
    removeFavoriteEpisode: (state, action) => {
      state.favoriteEpisodes = state.favoriteEpisodes.filter(
        item => item.id !== action.payload,
      );
    },
  },
});


export const {
  addFavoriteCharacter,
  removeFavoriteCharacter,
} = favoriteCharactersSlice.actions;

export const {
  addFavoriteEpisode,
  removeFavoriteEpisode,
} = favoriteEpisodesSlice.actions;

const store = configureStore({
  reducer: {
    favoriteCharactersSlice: favoriteCharactersSlice.reducer,
    favoriteEpisodesSlice: favoriteEpisodesSlice.reducer,
  },
});

export default store;
