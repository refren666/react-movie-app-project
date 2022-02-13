import {axiosService} from "./axios.service";
import {urls} from "../config/urls";

export const moviesService = {
  getByGenreId: (genreId, page) => axiosService.get(`${urls.discover}?page=${page}&with_genres=${genreId}`)
    .then(response => response.data),
  getBySearchInput: (input, page) => axiosService.get(`${urls.search}${urls.movie}?query=${input}&page=${page}`)
    .then(response => response.data),
  getById: (id) => axiosService.get(`${urls.movie}/${id}?append_to_response=videos`).then(response => response.data),
  getCredits: (id) => axiosService.get(`${urls.movie}/${id}/credits`).then(response => response.data),
  getReviews: (id) => axiosService.get(`${urls.movie}/${id}/reviews`).then(response => response.data)
}