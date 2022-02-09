import React from 'react';

import styles from './MoviesListCard.module.css'
import GenreBadge from "../GenreBadge/GenreBadge";

const MoviesListCard = ({movieInfo}) => {
  const {
    id, original_title, overview, vote_average, vote_count, release_date, poster_path, movieGenresList
  } = movieInfo;

  return (
    <div className={styles.movieCard}>
      <div className={styles.moviePoster}>
        <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={`${original_title} poster`}/>
      </div>
      <h2 className={styles.movieTitle}>{original_title}</h2>
      <p style={{
        maxHeight: '90px',
        overflow: 'hidden'
      }}>{overview}</p>
      {movieGenresList.map(
        (movieGenre, index) => <GenreBadge key={index} genre={movieGenre}/>
      )}
      <p>Average rating: {vote_average}</p>
      <p>Votes: {vote_count}</p>
      <p>Release: {release_date}</p>
    </div>
  );
};

export default MoviesListCard;