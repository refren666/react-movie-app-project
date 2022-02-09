import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../services/movies.service";

const initialState = {
  movies: [],
  currentPage: 1
}

export const getMovies = createAsyncThunk(
  'moviesSlice/getMovies',
  async (_, {dispatch, getState}) => {
    const {currentPage} = getState().movies
    const {results} = await moviesService.getAll(currentPage)
    dispatch(setMovies(results))
  }
)

const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    moveToNextPage: (state) => {
      if (state.currentPage !== 7) {
        state.currentPage+=1
      }
    },
    moveToPrevPage: (state) => {
      if (state.currentPage !== 1) {
        state.currentPage-=1
      }
    }
  }
})

const moviesReducer = moviesSlice.reducer;

export const {setMovies, moveToNextPage, moveToPrevPage} = moviesSlice.actions;

export default moviesReducer;