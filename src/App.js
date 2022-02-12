import React from 'react';
import {Routes, Route} from 'react-router-dom';

import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import './App.css';
import MovieByGenrePage from "./pages/MovieByGenrePage/MovieByGenrePage";
import MoviesList from "./components/MoviesList/MoviesList";

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MoviesPage/>}>
        <Route index element={<MoviesList/>}/>
        <Route path={'/movie/:movieId'} element={<MovieInfo/>}/>
        <Route path={'/movie/genre/:genreId'} element={<MovieByGenrePage/>}/>
      </Route>
    </Routes>
  );
};

export default App;