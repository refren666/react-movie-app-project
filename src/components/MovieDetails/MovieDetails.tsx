import { FC, memo } from 'react';
import { Rating } from '@mui/material';

import { IMovieFull } from '../../interfaces';
import poster from '../../images/default_poster.jpg';
import { GenreBadge } from '../GenreBadge/GenreBadge';
import { getAvgRating, getMovieTimeInHrs } from '../../helpers/helpers';
import styles from './MovieDetails.module.css';

interface IMovieDetailsProps {
  movie: IMovieFull
}

export const MovieDetails: FC<IMovieDetailsProps> = memo(({ movie }) => {
  const {
    poster_path,
    genres,
    original_title,
    overview,
    release_date,
    runtime,
    tagline,
    title,
    vote_average,
    vote_count,
  } = movie;

  return (
    <div className={styles.movieBlock}>
      <div>
        <h2 className={styles.movieHeading}>{title}</h2>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w400${poster_path}`
              : poster
          }
          alt={`${original_title} poster`}
        />
      </div>

      <div className={styles.movieData}>
        <h4>Original title: {original_title}</h4>
        <h4 className={styles.genresBlock}>
          Genres:
          {genres &&
            genres.map((genre) => <GenreBadge key={genre.id} genre={genre} />)}
        </h4>
        <h4>Runtime: {getMovieTimeInHrs(runtime)}</h4>
        <h4>Tagline: {tagline}</h4>
        <h4>Released: {release_date}</h4>
        <h4 className={styles.star}>
          Vote average: {getAvgRating(vote_average)}
          <Rating
            defaultValue={getAvgRating(vote_average)}
            precision={0.5}
            readOnly
          />
        </h4>
        <h4>Votes: {vote_count}</h4>
        <div>
          <h4>Overview: </h4>
          <p className={styles.overview}>
            <em>{overview}</em>
          </p>
        </div>
      </div>
    </div>
  );
});
