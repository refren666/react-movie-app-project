import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { Header } from '../../components';
import { useMatchMedia } from '../../hooks/matchMedia/useMatchMedia';
import { useScrollbar } from '../../hooks/scrollbar/useScrollbar';

export const MoviesPage = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme): dark').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );

  const { isMobile } = useMatchMedia();
  const hasScroll = !isMobile;

  const moviesWrapper = useRef(window.document.body);
  useScrollbar(moviesWrapper, hasScroll);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className={'app'} data-theme={theme}>
      <Header switchTheme={switchTheme} theme={theme} />
      <Outlet />
    </div>
  );
};
