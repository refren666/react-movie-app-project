import { FC, memo } from 'react';

import { IReview } from '../../interfaces';
import { Review } from '../Review/Review';
import styles from './MovieReviews.module.css';

interface IMovieReviewsProps {
  reviews: IReview[];
}

export const MovieReviews: FC<IMovieReviewsProps> = memo(({ reviews }) => {
  return (
    <div>
      <h2 className={styles.reviewsHeading}>Reviews: </h2>
      <div className={styles.reviewBlock}>
        {reviews.length !== 0
          ? reviews.map((review) => <Review key={review.id} review={review} />)
          : 'No reviews 😥'}
      </div>
    </div>
  );
});
