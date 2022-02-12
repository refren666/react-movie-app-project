import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovies, resetMoviesAndPage} from "../../store/movies.slice";
import MoviesListCard from "../MoviesListCard/MoviesListCard";
import styles from './MoviesList.module.css'

const MoviesList = () => {
  const {movies} = useSelector(state => state.movies)
  const dispatch = useDispatch();

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight >= scrollHeight) {
      dispatch(getMovies())
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetMoviesAndPage())
    dispatch(getMovies())
    window.addEventListener('scroll', handleScroll)
  }, [])

  console.log(movies)

  // const combineMoviesWithGenres = movies.map(movie => {
  //     const {genre_ids} = movie; // [id, id, id]
  //     const movieGenresList = genre_ids.map(genreId => movieGenres.find(item => item.id === genreId))
  //
  //     return {...movie, movieGenresList}
  //   }
  // )

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '10px',
      margin: '50px 0'
    }}>
      {movies.map(
        (movie, index) => <MoviesListCard key={index} movieInfo={movie}/>
      )}
    </div>
  );
};

export default MoviesList;