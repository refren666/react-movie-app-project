import React from 'react';
import {Outlet} from 'react-router-dom';
import useLocalStorage from "use-local-storage";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


const MoviesPage = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme): dark').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  return (
    <div className={'app'} data-theme={theme}>
      <Header switchTheme={switchTheme} theme={theme}/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default MoviesPage;