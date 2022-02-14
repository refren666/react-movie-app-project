import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovies, setFetchingTrue} from "../../store/movies.slice";
import MoviesListCard from "../../components/MoviesListCard/MoviesListCard";
import Loader from "../../components/Loader/Loader";
import styles from './MoviesList.module.css'

const MoviesList = () => {
  const {movies, status, error, fetching} = useSelector(state => state.movies)
  const {movieGenre} = useSelector(state => state.genres)
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      console.log('fetching')
      dispatch(getMovies(movieGenre))
    }
  }, [fetching, movies])

  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = e.target.documentElement.scrollTop + window.innerHeight

    if (scrollHeight - currentHeight < 100) {
      dispatch(setFetchingTrue())
    }
  }

  // const combineMoviesWithGenres = movies.map(movie => {
  //     const {genre_ids} = movie; // [id, id, id]
  //     const movieGenresList = genre_ids.map(genreId => movieGenres.find(item => item.id === genreId))
  //
  //     return {...movie, movieGenresList}
  //   }
  // )

  return (
    <div>
      {status === 'pending' && <Loader/>}
      {error && <h2>{error}</h2>}
      <div className={styles.moviesCardContainer}>
        {movies.map(
          (movie, index) => <MoviesListCard key={index} movieInfo={movie}/>
        )}
      </div>
    </div>
  );
};

export default MoviesList;