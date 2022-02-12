import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {genresService} from "../services/genres.service";
import {moviesService} from "../services/movies.service";

const initialState = {
  movieGenres: [],
  moviesByGenre: [],
  currentPage: 1
}

export const getGenres = createAsyncThunk(
  'genresSlice/getGenres',
  async (_, {dispatch}) => {
    const {genres} = await genresService.getAll();
    dispatch(setGenres(genres))
  }
)

export const getMoviesByGenreId = createAsyncThunk(
  'moviesSlice/getMoviesByGenre',
  async (id, {dispatch, getState}) => {
    const newMoviesByGenre = [];
    const {currentPage} = getState().genres
    const {results} = await moviesService.getByGenreId(id, currentPage)
    results.forEach(result => newMoviesByGenre.push(result))
    dispatch(setMoviesByGenre(newMoviesByGenre))
    dispatch(moveToNextPage());
  }
)

const genresSlice = createSlice({
  name: 'genresSlice',
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.movieGenres = action.payload;
    },
    setMoviesByGenre: (state, action) => {
      state.moviesByGenre.push(...action.payload);
    },
    moveToNextPage: (state) => {
      state.currentPage += 1;
    },
    resetMoviesByGenreAndPage: (state) => {
      state.currentPage = 1;
      state.moviesByGenre = [];
    }
  }
})

const genresReducer = genresSlice.reducer;

export const {setGenres, setMoviesByGenre, moveToNextPage, resetMoviesByGenreAndPage} = genresSlice.actions;

export default genresReducer;