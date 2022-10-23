import { FC } from 'react';

import { ICredit } from '../../interfaces';
import styles from './Credit.module.css';

interface ICreditProps {
  credit: ICredit;
}

export const Credit: FC<ICreditProps> = ({ credit }) => {
  const { profile_path, character, name } = credit;

  return (
    <div>
      <img
        className={styles.actorPhoto}
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w300${profile_path}`
            : 'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
        }
        width="200"
        alt={character}
      />

      <p className={styles.actorName}>{name}</p>
    </div>
  );
};
