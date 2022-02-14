import React from 'react';

import styles from './Review.module.css'

const Review = ({review}) => {
  const {
    author, author_details: {avatar_path, rating}, content, created_at
  } = review;

  const reviewDate = new Date(created_at).toDateString();

  return (
    <div className={styles.reviewBlock}>
      <div>
        <img className={styles.userPhoto} src={
        !avatar_path ? 'https://pbs.twimg.com/media/E8aGDSHXMA4fOBR.jpg'
          : avatar_path.includes('secure') ? `${avatar_path.slice(1)}`
            : `https://image.tmdb.org/t/p/w100_and_h100_face${avatar_path}`
      }
                alt={'user_pfp'}/>
      </div>

      <div>
        <h3>A review by {author} {
          rating ? <span className={styles.rating}>&#10032; {rating}</span>
          : null
        }
        </h3>
        <p className={styles.reviewIntro}>Written by <em>{author}</em> on {reviewDate}</p>
        <p className={styles.reviewContent}>{content}</p>
      </div>

    </div>
  );
};

export default Review;