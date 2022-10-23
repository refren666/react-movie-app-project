import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from './store.config';
import { moviesService } from '../services/movies.service';
import {
  ICredit,
  IMovie,
  IMovieFull,
  IReview,
  IValidationErrors,
} from '../interfaces';
import { isFetching } from '../helpers/helpers';

interface IMoviesState {
  movies: IMovie[];
  moviesCount: number;
  credits: ICredit[];
  movie: IMovieFull | null;
  currentPage: number;
  reviews: IReview[];
  status: null | string;
  error: string | null | undefined;
}

const initialState: IMoviesState = {
  movies: [],
  credits: [],
  reviews: [],
  movie: null,
  status: null,
  error: null,
  currentPage: 1,
  moviesCount: 0,
};

// 1st param in generic - what thunk returns, 2nd - what parameter accepts, 3rd - types for dispatch/rejectWithValue/getState
export const getMovies = createAsyncThunk<
  IMovie[],
  string,
  {
    state: RootState;
    rejectValue: IValidationErrors;
  }
>('moviesSlice/getMovies', async (id, { getState, rejectWithValue }) => {
  try {
    const { currentPage } = getState().movies;
    const {
      data: { results },
    } = await moviesService.getByGenreId(id, currentPage);

    return results;
  } catch (err: any) {
    let error: AxiosError<IValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data);
  }
});

export const getMovie = createAsyncThunk<
  void,
  { movieId: string },
  {
    dispatch: AppDispatch;
    rejectValue: IValidationErrors;
  }
>(
  'moviesSlice/getMovie',
  async ({ movieId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await moviesService.getById(movieId);
      dispatch(setMovie(data));
    } catch (err: any) {
      let error: AxiosError<IValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMovieCredits = createAsyncThunk<
  void,
  { movieId: string },
  {
    dispatch: AppDispatch;
    rejectValue: IValidationErrors;
  }
>(
  'moviesSlice/getMovieCredits',
  async ({ movieId }, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { cast },
      } = await moviesService.getCredits(movieId);
      dispatch(setMovieCredits(cast));
    } catch (err: any) {
      let error: AxiosError<IValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMovieReviews = createAsyncThunk<
  void,
  { movieId: string },
  {
    dispatch: AppDispatch;
    rejectValue: IValidationErrors;
  }
>(
  'moviesSlice/getMovieReviews',
  async ({ movieId }, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { results },
      } = await moviesService.getReviews(movieId);
      dispatch(setMovieReviews(results));
    } catch (err: any) {
      let error: AxiosError<IValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const moviesSlice = createSlice({
  name: 'moviesSlice',

  initialState,

  reducers: {
    setMovie: (state, action: PayloadAction<IMovieFull>) => {
      state.movie = action.payload;
    },
    setMovieCredits: (state, action: PayloadAction<ICredit[]>) => {
      state.credits = action.payload;
    },
    setMovieReviews: (state, action: PayloadAction<IReview[]>) => {
      state.reviews = action.payload;
    },
    resetMoviesAndPage: (state) => {
      state.movies.length = 0;
      state.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.movies.push(...action.payload);
        state.currentPage += 1;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(getMovie.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })

      // will work for every pending statuses
      .addMatcher(isFetching, (state) => {
        state.status = 'pending';
        state.error = null;
      });
  },
});

const moviesReducer = moviesSlice.reducer;

export const {
  setMovie,
  setMovieCredits,
  setMovieReviews,
  resetMoviesAndPage,
} = moviesSlice.actions;

export default moviesReducer;
