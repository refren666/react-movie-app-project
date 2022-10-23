import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGenre } from "../interfaces";
import { genresService } from "../services/genres.service";

interface IGenresState {
  movieGenres: IGenre[],
  movieGenre: string
}

const initialState: IGenresState = {
  movieGenres: [],
  movieGenre: 'all',
};

export const getGenres = createAsyncThunk(
  "genresSlice/getGenres",
  async (_, { dispatch }) => {
    const { data: { genres } } = await genresService.getAll();
    dispatch(setGenres(genres));
  }
);

const genresSlice = createSlice({
  name: 'genresSlice',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<IGenre[]>) => {
      state.movieGenres = action.payload;
    },
    setMovieGenre: (state, action: PayloadAction<string>) => {
      state.movieGenre = action.payload;
    },
  },
});

const genresReducer = genresSlice.reducer;

export const { setGenres, setMovieGenre } = genresSlice.actions;

export default genresReducer;
