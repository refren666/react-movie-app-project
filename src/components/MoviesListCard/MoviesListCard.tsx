import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getAvgRating } from '../../helpers/helpers';
import { useAppSelector } from '../../hooks/redux/hooks';

import poster from '../../images/default_poster.jpg';
import { IMovie } from '../../interfaces';
import { GenreBadge } from '../GenreBadge/GenreBadge';
import styles from './MoviesListCard.module.css';

interface IMovieListCardProps {
  movieInfo: IMovie;
}

export const MoviesListCard: FC<IMovieListCardProps> = ({ movieInfo }) => {
  const { movieGenres } = useAppSelector(({ genres }) => genres);

  const {
    id,
    original_title,
    vote_average,
    vote_count,
    poster_path,
    genre_ids,
  } = movieInfo;

  const genres = movieGenres.filter((genre) => genre_ids.includes(genre.id));

  return (
    <div className={styles.movieCard}>
      <Link to={`/movie/${id}`} className={styles.moviePoster}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : poster
          }
          width="300"
          height="350"
          alt={`${original_title} poster`}
        />
      </Link>

      <h3 className={styles.movieTitle}>{original_title}</h3>

      <div className={styles.genresWrapper}>
        {genres.map((genre) => (
          <GenreBadge key={`${genre.id}-${new Date().getTime()}`} genre={genre} />
        ))}
      </div>

      <p className={styles.text}>
        Average rating: {getAvgRating(vote_average)}{' '}
        <span style={{ color: 'gold' }}>&#9733;</span>{' '}
      </p>

      <p className={styles.text}>Votes: {vote_count}</p>
    </div>
  );
};
