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
  const {
    poster_path,
    title,
    genres,
    vote_average,
    runtime,
    overview,
    release_date,
  } = selectedMovieData;

  return (
    <div className={movieDetailsWrapper} data-testid="movie-details-wrapper">
      <SearchOutlined
        className={searchIcon}
        onClick={() => setSelectedMovie(null)}
      />
      <img src={poster_path} alt={title} />
      <div className={movieDescriptionWrapper}>
        <div className={movieNameWrapper}>
          <h3>{title.toUpperCase()}</h3>
          <div className={movieRating}>{vote_average}</div>
        </div>
        <span>{genres.join(", ")}</span>
        <div className={movieReleaseWrapper}>
          <p>{new Date(release_date).getFullYear()}</p>
          <p>{formatMinutes(runtime)}</p>
        </div>
        <span>{overview}</span>
      </div>
    </div>
  );
};

export { MovieDetails };
