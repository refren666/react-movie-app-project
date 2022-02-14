import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {moviesService} from "../services/movies.service";

const initialState = {
  foundMovies: [],
  currentPage: 1,
  searchWord: '',
  error: null,
  status: null
}

export const getMoviesByInput = createAsyncThunk(
  'searchMovieSlice/getMoviesByInput',
  async (input, {getState, rejectWithValue}) => {
    // debugger
    try {
      const {currentPage} = getState().moviesBySearch;
      const data = await moviesService.getBySearchInput(input, currentPage)

      return data;
    } catch (e) {
      rejectWithValue(e.message)
    }
  }
)

const searchMovieSlice = createSlice({
  name: 'searchMovieSlice',
  initialState,
  reducers: {
    moveToNextPage: (state) => {
      state.currentPage += 1;
    },
    moveToPreviousPage: (state) => {
      state.currentPage -= 1;
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1;
}
  },
  extraReducers: {
    [getMoviesByInput.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [getMoviesByInput.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.foundMovies = action.payload;
    },
    [getMoviesByInput.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
})

const searchMovieReducer = searchMovieSlice.reducer;

export const {setSearchWord, moveToNextPage, moveToPreviousPage, resetCurrentPage} = searchMovieSlice.actions;

export default searchMovieReducer;