import { AnyAction } from "@reduxjs/toolkit";

const getAvgRating = (rating: number): number => {
  if (rating === 0) {
    return 0;
  }

  if (rating % 1 === 0) {
    return rating / 2
  }

  return Number((rating / 2).toFixed(1))
}

const isFetching = (action: AnyAction) => {
  return action.type.endsWith('pending');
}

const getMovieTimeInHrs = (minutes: number): string => {
  const remainder = minutes % 60;
  const isNoRemainder = remainder === 0;
  const hours = Math.floor(minutes / 60);

  if (isNoRemainder) {
    return `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
  }

  if (minutes > 60) {
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ${remainder} minutes`
  }

  return `${minutes} minutes`
}

export { getAvgRating, isFetching, getMovieTimeInHrs };