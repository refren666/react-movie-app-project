import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getMovies } from '../../store/movies.slice';
import { getMoviesByInput } from '../../store/searchMovie.slice';
import { Loader, MoviesListCard, MoviesPage } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import styles from './MoviesList.module.css';

export const MoviesList = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { movieGenre, movieGenres } = useAppSelector(({ genres }) => genres);
  const { movies, status: moviesStatus, error: moviesError } = useAppSelector(({ movies }) => movies);
  const { foundMovies, status: foundMoviesStatus, error: foundMoviesError } = useAppSelector(
    ({ moviesBySearch }) => moviesBySearch
  );

  const { searchingWord } = useParams<{ searchingWord: string }>();

  const isOnSearchPage = pathname.includes('search');

  const areMoviesLoading = !isOnSearchPage && moviesStatus === 'pending';
  const areSearchMoviesLoading = isOnSearchPage && foundMoviesStatus === 'pending';

  const isMoviesError = !isOnSearchPage && moviesError;
  const isFoundMoviesError = isOnSearchPage && foundMoviesError;

  const fetchMovies = useCallback(() => {
    dispatch(getMovies(movieGenre));
  }, [movieGenre]);

  const fetchSearchedMovies = useCallback(() => {
    if (searchingWord) dispatch(getMoviesByInput(searchingWord));
  }, [searchingWord]);

  useEffect(() => {
    if (movies.length === 0) fetchMovies();
  }, [dispatch]);

  useEffect(() => {
    if (searchingWord) dispatch(getMoviesByInput(searchingWord));
  }, [searchingWord]);

  const moviesArray = isOnSearchPage ? foundMovies : movies;

  const getTitle = (): string => {
    if (isOnSearchPage) {
      return `"${searchingWord}" movies`;
    } else if (movieGenre) {
      const genreName = movieGenres.find(
        (genre) => Number(genre.id) === Number(movieGenre)
      )?.name;

      return genreName ? genreName : 'All movies';
    } else {
      return 'All movies';
    }
  };

  return (
    <MoviesPage>
      {moviesError && (
        <div className="center">
          {isMoviesError && <h2>{moviesError}</h2>}
          {isFoundMoviesError && <h2>{foundMoviesError}</h2>}
        </div>
      )}

      {(areMoviesLoading || areSearchMoviesLoading) && (
        <div className="center">
          <Loader />
        </div>
      )}

      <div>
        <Typography variant="h2" align="center" mb={2}>
          {getTitle()}
        </Typography>

        <InfiniteScroll
          dataLength={
            isOnSearchPage ? fetchSearchedMovies.length : movies.length
          }
          next={isOnSearchPage ? fetchSearchedMovies : fetchMovies}
          className={styles.moviesCardContainer}
          hasMore={true}
          loader={<></>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {moviesArray.map((movie, index) => (
            <MoviesListCard key={`${movie.id}-${index}`} movieInfo={movie} />
          ))}
        </InfiniteScroll>
      </div>
    </MoviesPage>
  );
};
