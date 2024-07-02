export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type EpisodesType = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
};

export type CharacterType = {
  id: number;
  name: string;
  status?: string;
  species?: string;
  type?: string;
};

export type FavoriteCharactersStateType = {
  favoriteCharacters: CharacterType[];
};

export type FavoriteEpisodesStateType = {
  favoriteEpisodes: Episode[];
};

