import {axiosService} from "./axios.service";
import {urls} from "../config/urls";

export const moviesService = {
  getAll: (page) => axiosService.get(`${urls.discover}?page=${page}`).then(response => response.data),
  getById: (id) => axiosService.get(`${urls.movie}/${id}`).then(response => response.data)
}