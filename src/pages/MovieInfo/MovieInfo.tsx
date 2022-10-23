import { useEffect, useContext, WheelEvent, ContextType } from 'react';
import { IconButton } from '@mui/material';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Link, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { Loader } from '../../components/Loader/Loader';
import {
  getMovie,
  getMovieCredits,
  getMovieReviews,
} from '../../store/movies.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import styles from './MovieInfo.module.css';
import { usePreventBodyScroll } from '../../hooks/scrollbar/usePreventBodyScroll';
import { MoviesPage } from '../../components/UI/MoviesPage/MoviesPage';
import { Footer } from '../../components/Footer/Footer';
import {
  MovieActors,
  MovieDetails,
  MovieReviews,
  MovieTrailers,
} from '../../components';

type ScrollVisibilityApiType = ContextType<typeof VisibilityContext>;

export const MovieInfo = () => {
  const { movieId } = useParams<string>();
  const dispatch = useAppDispatch();
  const { movie, credits, reviews, status, error } = useAppSelector(
    ({ movies }) => movies
  );

  const { disableScroll, enableScroll } = usePreventBodyScroll();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (movieId) {
      dispatch(getMovie({ movieId }));
      dispatch(getMovieCredits({ movieId }));
      dispatch(getMovieReviews({ movieId }));
    }
  }, [movieId]);

  if (!movie) {
    return null;
  }

  const leftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

    return (
      <IconButton
        disableRipple
        color="warning"
        onClick={() => scrollPrev()}
        disabled={isFirstItemVisible}
      >
        <ArrowBackRoundedIcon />
      </IconButton>
    );
  };

  const rightArrow = () => {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
      <IconButton
        disableRipple
        color="warning"
        onClick={() => scrollNext()}
        disabled={isLastItemVisible}
      >
        <ArrowForwardRoundedIcon />
      </IconButton>
    );
  };

  const onWheel = (
    apiObj: ScrollVisibilityApiType,
    event: WheelEvent
  ): void => {
    const isTouchPad =
      Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 15;

    if (isTouchPad) {
      event.stopPropagation();
      return;
    }

    if (event.deltaY > 0) {
      apiObj.scrollNext();
    } else if (event.deltaY < 0) {
      apiObj.scrollPrev();
    }
  };

  return (
    <>
      <MoviesPage>
        <Link className={styles.returnLink} to={'/'}>
          &#x21A9; Back to movies
        </Link>

        {error && <h2>{error}</h2>}

        {status === 'pending' ? (
          <div className="center">
            <Loader />
          </div>
        ) : (
          <div>
            <MovieDetails movie={movie} />
            <MovieActors
              credits={credits}
              disableScroll={disableScroll}
              enableScroll={enableScroll}
              leftArrow={leftArrow}
              rightArrow={rightArrow}
              onWheel={onWheel}
            />
            <MovieTrailers movie={movie} />
            <MovieReviews reviews={reviews} />
          </div>
        )}
      </MoviesPage>
      <Footer />
    </>
  );
};
