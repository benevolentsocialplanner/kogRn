import { APIROUTES } from "../constants/apiRoutes";
import axios from "axios";
import { CharacterType, EpisodesType } from "./types";

export const apiProvider = {
  getEpisodes: async (): Promise<EpisodesType | unknown> => {
    try {
      const res = await axios.get(APIROUTES.getEpisodes);
      return res.data;
    } catch (error) {
      console.error(error, "err in getEpisodes")
      return error;
    }
  },
  getEpisodeDetail: async (id: number): Promise<unknown> => {
    try {
      console.log(2)
      const res = await axios.get(APIROUTES.getEpisodeById(id));
      return res.data;
    } catch (error) {
      console.error(error, "err in getEpisodeDetail")
      return error;
    }
  },
  getCharacters: async (ids: Array<String>): Promise<unknown> => {
    try {
      let characters = [];
      for (const id of ids) {
        const res = await axios.get(APIROUTES.getCharacterById(id));
        characters.push(res.data);
      }
      return characters;
    } catch (error) {
      console.error(error, "err in getCharacters")
      return error;
    }
  }
};