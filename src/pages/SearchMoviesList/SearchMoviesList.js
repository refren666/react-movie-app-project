import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Loader from "../../components/Loader/Loader";
import MoviesListCard from "../../components/MoviesListCard/MoviesListCard";
import {getMoviesByInput} from "../../store/searchMovie.slice";
import styles from "../MoviesList/MoviesList.module.css";


const SearchMoviesList = () => {
  const {foundMovies, currentPage, searchWord, status, error} = useSelector(state => state.moviesBySearch);
  const {searchingWord} = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesByInput(searchingWord))
  }, [currentPage, searchingWord])

  return (
    <div>
      <div>
        {status === 'pending' && <Loader/>}
        {error && <h2>{error}</h2>}
        <div className={styles.moviesCardContainer}>
          {foundMovies.map(
            (movie, index) => <MoviesListCard key={index} movieInfo={movie}/>
          )}
        </div>
        <div className={styles.btnBlock}>
          <button className={styles.button}>Back</button>
          <button className={styles.button}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SearchMoviesList;