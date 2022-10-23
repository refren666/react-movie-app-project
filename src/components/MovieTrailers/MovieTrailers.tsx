import { FC, memo } from 'react';

import { IMovieFull } from '../../interfaces';
import { Trailer } from '../Trailer/Trailer';
import styles from './MovieTrailers.module.css';

interface IMovieTrailersProps {
  movie: IMovieFull;
}

export const MovieTrailers: FC<IMovieTrailersProps> = memo(({ movie }) => {
  return (
    <div>
      <h2 className={styles.trailersHeading}>Trailers:</h2>

      <div className={styles.trailerBlock}>
        {movie?.videos?.results?.length! > 0 ? (
          movie?.videos?.results.map((video) => (
            <Trailer key={video.id} video={video} />
          ))
        ) : (
          <div className={styles.trailerText}>No videos 😥</div>
        )}
      </div>
    </div>
  );
});
