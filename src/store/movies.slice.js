import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../services/movies.service";

const initialState = {
  movies: [],
  credits: [],
  movie: {},
  reviews: [],
  currentPage: 1
}

export const getMovies = createAsyncThunk(
  'moviesSlice/getMovies',
  async (_, {dispatch, getState}) => {
    const newMovies = [];
    const {currentPage} = getState().movies
    const {results} = await moviesService.getAll(currentPage)
    results.forEach(result => newMovies.push(result))
    dispatch(setMovies(newMovies))
    dispatch(showNextPage());
  }
)

export const getMovie = createAsyncThunk(
  'moviesSlice/getMovie',
  async ({movieId}, {dispatch}) => {
    const data = await moviesService.getById(movieId)
    dispatch(setMovie(data))
  }
)

export const getMovieCredits = createAsyncThunk(
  'moviesSlice/getMovieCredits',
  async ({movieId}, {dispatch}) => {
    const {cast} = await moviesService.getCredits(movieId)
    dispatch(setMovieCredits(cast))
  }
)

export const getMovieReviews = createAsyncThunk(
  'moviesSlice/getMovieReviews',
  async ({movieId}, {dispatch}) => {
    const {results} = await moviesService.getReviews(movieId)
    dispatch(setMovieReviews(results))
  }
)

const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies.push(...action.payload)
    },
    setMovie: (state, action) => {
      state.movie = action.payload
    },
    setMovieCredits: (state, action) => {
      state.credits = action.payload
    },
    setMovieReviews: (state, action) => {
      state.reviews = action.payload
    },
    showNextPage: (state) => {
        state.currentPage+=1
    },
    resetMoviesAndPage: (state) => {
      state.movies.length = 0;
      state.currentPage = 1;
    }
  }
})

const moviesReducer = moviesSlice.reducer;

export const {
  setMovies, setMovie, setMovieCredits, setMovieReviews, showNextPage, resetMoviesAndPage
} = moviesSlice.actions;

export default moviesReducer;