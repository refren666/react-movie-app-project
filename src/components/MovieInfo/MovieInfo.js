import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getMovie, getMovieCredits, getMovieReviews} from "../../store/movies.slice";
import Review from "../Review/Review";
import Credit from "../Credit/Credit";
import styles from './MovieInfo.module.css'
import Trailer from "../Trailer/Trailer";

const MovieInfo = () => {
  const movieId = useParams();
  const {movie, credits, reviews} = useSelector(state => state.movies);
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
    <div>
      <Link to={'/'}>Back to movies</Link>

      <div className={styles.movieBlock}>
        <div>
          <h2 className={styles.movieHeading}>{title}</h2>
          <img src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt={`${original_title} poster`} />
        </div>

        <div className={styles.movieData}>
          <h4>Original title: {original_title}</h4>
          <h4>Genres: {genres && genres.map(
            (genre, index) => <span key={genre.id}>{genre.name}{index !== genres.length - 1 ? ',' : ''} </span>
          )}</h4> {/*GenreBadge*/}
          <h4>Runtime: {runtime} min</h4>
          <h4>Tagline: {tagline}</h4>
          <h4>Released: {release_date}</h4>
          <h4>Vote average: {vote_average}</h4>
          <h4>Votes: {vote_count}</h4>
          <div>
            <h4>Overview: </h4>
            <p>{overview}</p>
          </div>
        </div>
      </div>

      <h2>Actors:</h2>

      <div style={{display: 'flex', overflowY: 'auto', columnGap: '10px'}}>
        {credits.map(
          credit => <Credit key={credit.id} credit={credit}/>
        )}
      </div>

      {/*trailers*/}
      <h2>Trailers:</h2>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {videos?.results.map(
          video => <Trailer key={video.id} video={video}/>
        )}
      </div>

      <h2>Reviews: </h2>
      <div style={{display: 'flex', flexDirection: 'column', rowGap: '35px'}}>
        { reviews.length !== 0 ? reviews.map(
          review => <Review key={review.id} review={review}/>
        ) : 'No reviews'}
      </div>

    </div>
  );
};

export default MovieInfo;