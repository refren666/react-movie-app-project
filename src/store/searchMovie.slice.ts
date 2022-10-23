import type { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store.config';
import { IMovie, IMoviesResponse, IValidationErrors } from '../interfaces';
import { moviesService } from '../services/movies.service';

interface ISearchMovieState {
  foundMovies: IMovie[];
  currentPage: number;
  totalPages: number;
  searchWord: string;
  error: string | null | undefined;
  status: string | null;
}

const initialState: ISearchMovieState = {
  foundMovies: [],
  totalPages: 0,
  currentPage: 1,
  searchWord: '',
  error: null,
  status: null,
};

export const getMoviesByInput = createAsyncThunk<
  IMoviesResponse,
  string,
  { state: RootState; rejectValue: IValidationErrors }
>(
  'searchMovieSlice/getMoviesByInput',
  async (input, { getState, rejectWithValue }) => {
    try {
      const { currentPage } = getState().moviesBySearch;
      const { data } = await moviesService.getBySearchInput(input, currentPage);

      return data;
    } catch (err: any) {
      let error: AxiosError<IValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

const searchMovieSlice = createSlice({
  name: 'searchMovieSlice',
  initialState,
  reducers: {
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1;
    },
    resetFoundMovies: (state) => {
      state.foundMovies = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesByInput.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getMoviesByInput.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.foundMovies.push(...action.payload.results);
        state.currentPage += 1;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getMoviesByInput.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

const searchMovieReducer = searchMovieSlice.reducer;

export const { setSearchWord, resetCurrentPage, resetFoundMovies } =
  searchMovieSlice.actions;

export default searchMovieReducer;
