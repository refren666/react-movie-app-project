import { Routes, Route } from 'react-router-dom';

import { MoviesList, MoviesPage, MovieInfo } from './pages';
import './index.css';

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MoviesPage />}>
        <Route index element={<MoviesList />} />
        <Route path={'/movie/:movieId'} element={<MovieInfo />} />
        <Route path={'/search/:searchingWord'} element={<MoviesList />} />
      </Route>
    </Routes>
  );
};

export default App;
