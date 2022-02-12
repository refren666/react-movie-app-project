import React from 'react';
import {Outlet} from 'react-router-dom';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import MoviesList from "../../components/MoviesList/MoviesList";

const MoviesPage = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default MoviesPage;