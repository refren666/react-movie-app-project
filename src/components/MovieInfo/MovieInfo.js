import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getMovie, getMovieCredits, getMovieReviews} from "../../store/movies.slice";
import Review from "../Review/Review";
import Credit from "../Credit/Credit";
import Trailer from "../Trailer/Trailer";
import Loader from "../Loader/Loader";
import GenreBadge from "../GenreBadge/GenreBadge";
import styles from './MovieInfo.module.css'
import poster from '../../images/default_poster.jpg'

const MovieInfo = () => {
  const movieId = useParams();
  const {movie, credits, reviews, status, error} = useSelector(state => state.movies);
  const dispatch = useDispatch();
  const {
    poster_path, genres, original_title, overview, release_date, runtime, tagline, title, vote_average, vote_count,
    videos
  } = movie;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getMovie(movieId))
    dispatch(getMovieCredits(movieId))
    dispatch(getMovieReviews(movieId))
  }, [])

  return (
    <div className={styles.movieContainer}>
      <Link className={'returnLink'} to={'/'}>&#x21A9; Back to movies</Link>

      {error && <h2>{error}</h2>}

      {status === 'pending'
        ? <Loader/>
        : <div className={styles.movieBlock}>
          <div>
            <h2 className={styles.movieHeading}>{title}</h2>
            <img src={
              poster_path
                ? `https://image.tmdb.org/t/p/w400${poster_path}`
                : poster
            }
                 alt={`${original_title} poster`}/>
          </div>

          <div className={styles.movieData}>
            <h4>Original title: {original_title}</h4>
            <h4 className={styles.genresBlock}>Genres: {genres && genres.map(
              (genre, index) => <GenreBadge key={genre.id} index={index} genre={genre}/>
            )}</h4> {/*GenreBadge*/}
            <h4>Runtime: {runtime} min</h4>
            <h4>Tagline: {tagline}</h4>
            <h4>Released: {release_date}</h4>
            <h4>Vote average: {vote_average} <span className={styles.star}>&#9733;</span></h4>
            <h4>Votes: {vote_count}</h4>
            <div>
              <h4>Overview: </h4>
              <p className={styles.overview}><em>{overview}</em></p>
            </div>
          </div>
        </div>
      }


      <h2 className={styles.actorsHeading}>Actors:</h2>

      <div className={styles.creditsBlock}>
        {credits.length > 0 ? credits.map(
          credit => <Credit key={credit.id} credit={credit}/>
        ) : 'No Actors 😥'}
      </div>

      {/*trailers*/}
      <h2 className={styles.trailersHeading}>Trailers:</h2>
      <div className={styles.trailerBlock}>
        {videos?.length > 0 ? videos?.results.map(
          video => <Trailer key={video.id} video={video}/>
        ) : <div className={styles.trailerText}>No videos 😥</div>

        }
      </div>

      <h2 className={styles.reviewsHeading}>Reviews: </h2>
      <div className={styles.reviewBlock}>
        {reviews.length !== 0 ? reviews.map(
          review => <Review key={review.id} review={review}/>
        ) : 'No reviews 😥'}
      </div>

    </div>
  );
};

export default MovieInfo;