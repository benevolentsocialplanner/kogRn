import { APIROUTES } from "../constants/apiRoutes";
import axios from "axios";

export const apiProvider = {
  getEpisodes: async () => {
    const res = await axios.get(APIROUTES.getEpisodes());
  }
}