import React from "react";

import styles from "./MovieList.module.scss";
import { moviesList } from "../../shared/constants";
import { MovieCard } from "./MovieCard/MovieCard";
import { IMovieInfo } from "./MovieCard/MovieCard.types";

const { movieListWrapper } = styles;

const MovieList: React.FC = () => {
  return (
    <div className={movieListWrapper}>
      {moviesList.map((movie: IMovieInfo) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export { MovieList };
