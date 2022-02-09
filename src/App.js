import React from 'react';
import {Routes, Route} from 'react-router-dom';

import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MoviesPage />}>
        <Route path={':movieId'} element={<MovieInfo />}/>
      </Route>
    </Routes>
  );
};

export default App;