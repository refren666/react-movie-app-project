import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { genresService } from "../services/genres.service";

const initialState = {
  movieGenres: [],
  movieGenre: "",
};

export const getGenres = createAsyncThunk(
  "genresSlice/getGenres",
  async (_, { dispatch }) => {
    const { genres } = await genresService.getAll();
    dispatch(setGenres(genres));
  }
);

const genresSlice = createSlice({
  name: "genresSlice",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.movieGenres = action.payload;
    },
    setMovieGenre: (state, action) => {
      state.movieGenre = action.payload;
    },
  },
});

const genresReducer = genresSlice.reducer;

export const { setGenres, setMovieGenre } = genresSlice.actions;

export default genresReducer;
