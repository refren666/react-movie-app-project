import {axiosService} from "./axios.service";
import {urls} from "../config/urls";

export const genresService = {
  getAll: () => axiosService.get(urls.genre).then(response => response.data)
}