import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../services/movies.service";

const initialState = {
  movies: [],
  moviesBySearchQuery: [],
  credits: [],
  movie: {},
  reviews: [],
  currentPage: 1,
  status: null,
  error: null,
  fetching: true
}

export const getMovies = createAsyncThunk(
  'moviesSlice/getMovies',
  async (id, {getState, rejectWithValue}) => {
    try {
      const {currentPage} = getState().movies;
      const {results} = await moviesService.getByGenreId(id, currentPage);

      return results;
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const getMovie = createAsyncThunk(
  'moviesSlice/getMovie',
  async ({movieId}, {dispatch, rejectWithValue}) => {
    try {
      const data = await moviesService.getById(movieId)
      dispatch(setMovie(data))
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const getMovieCredits = createAsyncThunk(
  'moviesSlice/getMovieCredits',
  async ({movieId}, {dispatch, rejectWithValue}) => {
    try {
      const {cast} = await moviesService.getCredits(movieId)
      dispatch(setMovieCredits(cast))
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const getMovieReviews = createAsyncThunk(
  'moviesSlice/getMovieReviews',
  async ({movieId}, {dispatch, rejectWithValue}) => {
    try {
      const {results} = await moviesService.getReviews(movieId)
      dispatch(setMovieReviews(results))
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setMovieCredits: (state, action) => {
      state.credits = action.payload;
    },
    setMovieReviews: (state, action) => {
      state.reviews = action.payload;
    },
    resetMoviesAndPage: (state) => {
      state.movies.length = 0;
      state.currentPage = 1;
    },
    setFetchingTrue: (state) => {
      state.fetching = true;
    }
  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.movies.push(...action.payload);
      state.currentPage+=1;
      state.fetching = false;
    },
    [getMovies.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      state.fetching = false;
    },
    [getMovie.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [getMovie.fulfilled]: (state, action) => {
      state.status = 'fulfilled';

    },
    [getMovie.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
})

const moviesReducer = moviesSlice.reducer;

export const {
   setMovie, setMovieCredits, setMovieReviews, resetMoviesAndPage, setFetchingTrue
} = moviesSlice.actions;

export default moviesReducer;