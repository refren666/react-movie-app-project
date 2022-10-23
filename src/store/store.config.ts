import { combineReducers, configureStore } from '@reduxjs/toolkit';

import moviesReducer from './movies.slice';
import genresReducer from './genres.slice';
import searchMovieReducer from './searchMovie.slice';

const reducer = combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  moviesBySearch: searchMovieReducer,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;