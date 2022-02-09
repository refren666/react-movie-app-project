import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovies, moveToNextPage, moveToPrevPage, setMovies} from "../../store/movies.slice";
import MoviesListCard from "../MoviesListCard/MoviesListCard";
import styles from './MoviesList.module.css'
import {getGenres} from "../../store/genres.slice";

const MoviesList = () => {
  const {movies, currentPage} = useSelector(state => state.movies)
  const {movieGenres} = useSelector(state => state.genres)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies())
    dispatch(getGenres())
  }, [currentPage])

  const toNextPage = () => {
    dispatch(moveToNextPage())
  }

  const toPrevPage = () => {
    dispatch(moveToPrevPage())
  }

  const combineMoviesWithGenres = movies.map(movie => {
      const {genre_ids} = movie; // [id, id, id]
      const movieGenresList = genre_ids.map(genreId => movieGenres.find(item => item.id === genreId))

      return {...movie, movieGenresList}
    }
  )

  // dispatch(setMovies(combineMoviesWithGenres))

  console.log(combineMoviesWithGenres)

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        margin: '50px 0'
      }}>
        {combineMoviesWithGenres.map(
          movie => <MoviesListCard key={movie.id} movieInfo={movie}/>
        )}
      </div>

      <div className={styles.buttonsBlock}>
        <button className={styles.arrowButton} onClick={toPrevPage}>
          <svg viewBox="0 0 448 512">
            <path
              d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/>
          </svg>
        </button>
        <button className={styles.arrowButton} onClick={toNextPage}>
          <svg viewBox="0 0 448 512">
            <path
              d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default MoviesList;