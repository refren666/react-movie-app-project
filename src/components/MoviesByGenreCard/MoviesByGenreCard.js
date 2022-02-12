import React from 'react';
import {Link} from "react-router-dom";

import styles from "../MoviesListCard/MoviesListCard.module.css";

const MoviesByGenreCard = ({movieInfo}) => {
  const {
    id, original_title, vote_average, vote_count, poster_path
  } = movieInfo;


  return (
    <div>
      <Link to={`/movie/${id}`} className={styles.moviePoster}>
        <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={`${original_title} poster`}/>
      </Link>
      <h2 className={styles.movieTitle}>{original_title}</h2>
      <p>Average rating: {vote_average}</p>
      <p>Votes: {vote_count}</p>
    </div>
  );
};

export default MoviesByGenreCard;