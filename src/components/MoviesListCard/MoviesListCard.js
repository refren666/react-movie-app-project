import React from 'react';

import styles from './MoviesListCard.module.css'
import {Link} from "react-router-dom";

const MoviesListCard = ({movieInfo}) => {
  const {
    id, original_title, vote_average, vote_count, poster_path
  } = movieInfo;

  return (
    <div className={styles.movieCard}>
      <Link to={`/movie/${id}`} className={styles.moviePoster}>
        <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={`${original_title} poster`}/>
      </Link>
      <h2 className={styles.movieTitle}>{original_title}</h2>
      <p>Average rating: {vote_average} &#10032;</p>
      <p>Votes: {vote_count}</p>
    </div>
  );
};

export default MoviesListCard;