import { urls } from '../config/urls';
import { AxiosRes, axiosService } from './axios.service';
import { ICreditResponse, IMovieFull, IMoviesResponse, IReviewResponse } from '../interfaces';

export const moviesService = {
  getByGenreId: (genreId: string, page: number): AxiosRes<IMoviesResponse> =>
    axiosService
      .get(`${urls.discover}?page=${page}&with_genres=${genreId}`)
      .then((response) => response),
  getBySearchInput: (input: string, page: number): AxiosRes<IMoviesResponse> =>
    axiosService
      .get(`${urls.search}${urls.movie}?query=${input}&page=${page}`)
      .then((response) => response),
  getById: (id: string): AxiosRes<IMovieFull> =>
    axiosService
      .get(`${urls.movie}/${id}?append_to_response=videos`)
      .then((response) => response),
  getCredits: (id: string): AxiosRes<ICreditResponse> =>
    axiosService
      .get(`${urls.movie}/${id}/credits`)
      .then((response) => response),
  getReviews: (id: string): AxiosRes<IReviewResponse> =>
    axiosService
      .get(`${urls.movie}/${id}/reviews`)
      .then((response) => response),
};
