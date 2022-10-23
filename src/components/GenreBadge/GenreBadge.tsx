import { FC } from 'react';

import { IGenre } from '../../interfaces';
import styles from './GenreBadge.module.css';

interface IGenreBadgeProps {
  genre: IGenre;
}

export const GenreBadge: FC<IGenreBadgeProps> = ({ genre }) => {
  return <div className={styles.genreItem}>{genre.name}</div>;
};
