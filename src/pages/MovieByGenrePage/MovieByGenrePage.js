import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getMoviesByGenreId, resetMoviesByGenreAndPage} from "../../store/genres.slice";
import MoviesByGenreCard from "../../components/MoviesByGenreCard/MoviesByGenreCard";

const MovieByGenrePage = () => {
  const {genreId} = useParams();
  const dispatch = useDispatch();
  const {moviesByGenre} = useSelector(state => state.genres)

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight >= scrollHeight) {
      dispatch(getMoviesByGenreId(genreId))
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetMoviesByGenreAndPage())
    dispatch(getMoviesByGenreId(genreId))
    window.addEventListener('scroll', handleScroll)
  }, [genreId])

  console.log(moviesByGenre)

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        margin: '50px 0'
      }}>
        {moviesByGenre.map(
          (movie, index) => <MoviesByGenreCard key={index} movieInfo={movie}/>
        )}
      </div>
    </div>
  );
};

export default MovieByGenrePage;