import React from 'react';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MoviesList from "../../components/MoviesList/MoviesList";

const MoviesPage = () => {
  return (
    <div>
      <Header/>
      <MoviesList />
      <Footer/>
    </div>
  );
};

export default MoviesPage;