import axios, { AxiosResponse } from "axios";

import baseURL from "../config/urls";

export const axiosService = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGIzODhjYjMyZWFlNGVlZmViMzc0YWRjM2YyOGI1ZiIsInN1YiI6IjYyMDE3YmYyYWUzNjY4MDA0MTYyYWY3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zIhUOkpVtAtajye1VLEE9e4ep2Z2DFzaZCYCW97LnR0`,
  },
});

export type AxiosRes<T> = Promise<AxiosResponse<T>>