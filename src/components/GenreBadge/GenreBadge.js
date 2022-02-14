import React from 'react';

import styles from './GenreBadge.module.css'

const GenreBadge = ({genre}) => {
  return (
    <div className={styles.genreItem}>
      {genre.name}
    </div>
  );
};

export default GenreBadge;