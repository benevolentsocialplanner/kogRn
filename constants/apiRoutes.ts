export const APIROUTES = {
  getCharacterById: (id: number) => `https://rickandmortyapi.com/api/character/${id}`,
  getEpisodeById: (id: number) => `https://rickandmortyapi.com/api/episode/${id}`,
  getEpisodes: () => `https://rickandmortyapi.com/api/episode`,
  getCharacters: () => `https://rickandmortyapi.com/api/character`,
};