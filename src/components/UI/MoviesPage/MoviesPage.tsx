import { FC, ReactNode } from 'react';

import styles from './MoviesPage.module.css';

interface IMoviesPageProps {
  children: ReactNode
}

export const MoviesPage: FC<IMoviesPageProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
