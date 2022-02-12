import {axiosService} from "./axios.service";
import {urls} from "../config/urls";

export const moviesService = {
  getAll: (page) => axiosService.get(`${urls.discover}?page=${page}`).then(response => response.data),
  getById: (id) => axiosService.get(`${urls.movie}/${id}?append_to_response=videos`).then(response => response.data),
  getByGenreId: (genreId, page) => axiosService.get(`${urls.discover}?with_genres=${genreId}&page=${page}`)
    .then(response => response.data),
  getCredits: (id) => axiosService.get(`${urls.movie}/${id}/credits`).then(response => response.data),
  getReviews: (id) => axiosService.get(`${urls.movie}/${id}/reviews`).then(response => response.data)
}