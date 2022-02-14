import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Loader from "../../components/Loader/Loader";
import MoviesListCard from "../../components/MoviesListCard/MoviesListCard";
import {getMoviesByInput, moveToNextPage, moveToPreviousPage} from "../../store/searchMovie.slice";
import styles from "../MoviesList/MoviesList.module.css";


const SearchMoviesList = () => {
  const {
    currentPage, foundMovies: {total_pages, results}, error, status
  } = useSelector(state => state.moviesBySearch);
  const {searchingWord} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesByInput(searchingWord))
  }, [currentPage, searchingWord])

  const moveNext = () => {
    window.scrollTo(0, 0)
    if (currentPage !== total_pages) {
      dispatch(moveToNextPage())
    }
  }

  const moveBack = () => {
    window.scrollTo(0, 0)
    if (currentPage !== 1) {
      dispatch(moveToPreviousPage())
    }
  }

  console.log(results)

  return (
    <div className={styles.moviesContainer}>
      {status === 'pending' && <Loader/>}
      {error && <h2>{error}</h2>}
      {results?.length > 0 ? <div>
        <div className={styles.moviesCardContainer}>
          {results && results.map(
            (movie, index) => <MoviesListCard key={index} movieInfo={movie}/>
          )}
        </div>
        <div className={styles.btnBlock}>
          <button className={styles.button} onClick={moveBack}>Back</button>
          <button className={styles.button} onClick={moveNext}>Next</button>
        </div>
      </div> : <h2>No movies found 😥</h2>}
    </div>
  );
};

export default SearchMoviesList;