import React, { useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";

import styles from "./MovieDetails.module.scss";
import { formatMinutes } from "@shared/helpers";
import { IMovieDetailsProps } from "@components/MovieDetails/MovieDetails.types";
import { MovieContext } from "@context/MovieContext";

const {
  movieDetailsWrapper,
  movieNameWrapper,
  movieDescriptionWrapper,
  movieRating,
  movieReleaseWrapper,
  searchIcon,
} = styles;

const MovieDetails: React.FC<IMovieDetailsProps> = ({ selectedMovieData }) => {
  const { setSelectedMovie } = useContext(MovieContext);

  return (
    <div className={movieDetailsWrapper} data-testid="movie-details-wrapper">
      <SearchOutlined
        className={searchIcon}
        onClick={() => setSelectedMovie(null)}
      />
      <img src={selectedMovieData.poster_path} alt={selectedMovieData.title} />
      <div className={movieDescriptionWrapper}>
        <div className={movieNameWrapper}>
          <h3>{selectedMovieData.title.toUpperCase()}</h3>
          <div className={movieRating}>{selectedMovieData.vote_average}</div>
        </div>
        <span>{selectedMovieData.genres.join(", ")}</span>
        <div className={movieReleaseWrapper}>
          <p>{new Date(selectedMovieData.release_date).getFullYear()}</p>
          <p>{formatMinutes(selectedMovieData.runtime)}</p>
        </div>
        <span>{selectedMovieData.overview}</span>
      </div>
    </div>
  );
};

export { MovieDetails };
