import {configureStore} from "@reduxjs/toolkit";

import moviesReducer from "./movies.slice";
import genresReducer from "./genres.slice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genresReducer
  }
})

export default store;