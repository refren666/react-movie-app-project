import React from 'react';

import styles from './Credit.module.css'

const Credit = ({credit}) => {
  const {profile_path, character, name} = credit;

  return (
    <div>
      <p className={styles.actorName}>{name}</p>
      <img className={styles.actorPhoto} src={profile_path
        ? `https://image.tmdb.org/t/p/w200${profile_path}`
        : 'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'} alt={character}/>
    </div>
  );
};

export default Credit;