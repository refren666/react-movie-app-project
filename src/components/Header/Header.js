import React, {useEffect, useRef} from 'react';
import {Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import UserInfo from "../UserInfo/UserInfo";
import {getGenres, setMovieGenre} from "../../store/genres.slice";
import {getMovies, resetMoviesAndPage} from "../../store/movies.slice";
import {setSearchWord} from "../../store/searchMovie.slice";
import styles from './Header.module.css'

const Header = ({theme, switchTheme}) => {
  const {movieGenres} = useSelector(state => state.genres)
  const {searchWord} = useSelector(state => state.moviesBySearch)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectBox = useRef(null);

  useEffect(() => {
    dispatch(getGenres())
  }, [])

  const search = (e) => {
    e.preventDefault();

    navigate(`/search/${e.target.keyword.value}`)
    dispatch(setSearchWord(''))
  }

  const onSearchInput = (e) => {
    dispatch(setSearchWord(e.target.value))
    console.log(searchWord)
  }

  return (
    <div className={styles.header}>
      <div>
        <Link to={'/'} onClick={() => {
          dispatch(setMovieGenre(''))
          dispatch(resetMoviesAndPage())
          dispatch(getMovies())
          selectBox.current.value = ''
        }}>
          <svg className={'logo'} viewBox="0 0 512 512">
            <path
              d="M463.1 32h-416C21.49 32-.0001 53.49-.0001 80v352c0 26.51 21.49 48 47.1 48h416c26.51 0 48-21.49 48-48v-352C511.1 53.49 490.5 32 463.1 32zM111.1 408c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 408zM111.1 280c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM111.1 152c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 152zM351.1 400c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V400zM351.1 208c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V208zM463.1 408c0 4.418-3.582 8-8 8h-47.1c-4.418 0-7.1-3.582-7.1-8l0-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V408zM463.1 280c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM463.1 152c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8l0-48c0-4.418 3.582-8 7.1-8h47.1c4.418 0 8 3.582 8 8V152z"/>
          </svg>
        </Link>
      </div>

      <div className={styles.searchWrap}>
        <form className={styles.search} onSubmit={search}>
          <input
            type="text"
            name='keyword'
            className={styles.searchTerm}
            placeholder="What are you looking for?"
            value={searchWord}
            onChange={onSearchInput}
          />
            <button className={styles.searchButton}>
              <svg className={styles.searchIcon} viewBox="0 0 512 512">
                <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
              </svg>
            </button>
        </form>
      </div>

      <button className={'switchButton'} onClick={switchTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      <div>
        <label>Genre: &nbsp;
          <select name="Genres" ref={selectBox} onChange={(e) => {
            navigate('/');
            dispatch(setMovieGenre(''))
            dispatch(resetMoviesAndPage());
            dispatch(setMovieGenre(e.target.value))
            dispatch(getMovies(e.target.value));
          }}>
            <option value="">All</option>
            {movieGenres.map(
              genre => {
                return <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              }
            )}
          </select>
        </label>
      </div>

      <UserInfo/>

    </div>
  );
};

export default Header;