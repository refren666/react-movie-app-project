import React from 'react';
import {Routes, Route} from 'react-router-dom';


import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import MoviesList from "./pages/MoviesList/MoviesList";
import './App.css';
import SearchMoviesList from "./pages/SearchMoviesList/SearchMoviesList";

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MoviesPage/>}>
        <Route index element={<MoviesList/>}/>
        <Route path={'/movie/:movieId'} element={<MovieInfo/>}/>
        <Route path={'/search/:searchingWord'} element={<SearchMoviesList/>}/>
      </Route>
    </Routes>
  );
};

export default App;