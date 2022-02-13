import {configureStore} from "@reduxjs/toolkit";

import moviesReducer from "./movies.slice";
import genresReducer from "./genres.slice";
import searchMovieReducer from "./searchMovie.slice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genresReducer,
    moviesBySearch: searchMovieReducer
  }
})

export default store;