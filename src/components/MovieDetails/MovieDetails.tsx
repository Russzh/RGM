import React from "react";

import styles from "./MovieDetails.module.scss";
import { MovieContext } from "../../context/MovieContext";

const {
  movieDetailsWrapper,
  movieNameWrapper,
  movieDescriptionWrapper,
  movieRating,
  movieReleaseWrapper,
} = styles;

const MovieDetails: React.FC = () => {
  const { selectedMovie } = React.useContext(MovieContext);

  if (!selectedMovie) {
    return null;
  }

  return (
    <div className={movieDetailsWrapper}>
      <img src={selectedMovie.imageUrl} alt={selectedMovie.name} />
      <div className={movieDescriptionWrapper}>
        <div className={movieNameWrapper}>
          <h3>{selectedMovie.name.toUpperCase()}</h3>
          <div className={movieRating}>{selectedMovie.rating}</div>
        </div>
        <span>{selectedMovie.genres.join(", ")}</span>
        <div className={movieReleaseWrapper}>
          <p>{selectedMovie.releaseYear}</p>
          <p>{selectedMovie.duration}</p>
        </div>
        <span>{selectedMovie.description}</span>
      </div>
    </div>
  );
};

export { MovieDetails };
