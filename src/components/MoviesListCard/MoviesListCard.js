import React from 'react';
import {Link} from "react-router-dom";

import poster from '../../images/default_poster.jpg';
import styles from './MoviesListCard.module.css'

const MoviesListCard = ({movieInfo}) => {
  const {
    id, original_title, vote_average, vote_count, poster_path
  } = movieInfo;

  return (
    <div className={styles.movieCard}>
      <Link to={`/movie/${id}`} className={styles.moviePoster}>
        <img src={
          poster_path
            ? `https://image.tmdb.org/t/p/w300${poster_path}`
            : poster
        } alt={`${original_title} poster`}/>
      </Link>
      <h2 className={styles.movieTitle}>{original_title}</h2>
      <p>Average rating: {vote_average} <span style={{color: 'gold'}}>&#9733;</span> </p>
      <p>Votes: {vote_count}</p>
    </div>
  );
};

export default MoviesListCard;