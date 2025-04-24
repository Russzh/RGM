import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import styles from "./MovieDetails.module.scss";
import { formatMinutes } from "@shared/helpers";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { RoutePaths } from "../../App.types";

const {
  movieDetailsWrapper,
  movieNameWrapper,
  movieDescriptionWrapper,
  movieRating,
  movieReleaseWrapper,
  searchIcon,
} = styles;

const MovieDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    poster_path,
    title,
    genres,
    vote_average,
    runtime,
    overview,
    release_date,
  } = useLoaderData() as IMovieInfo;

  return (
    <div className={movieDetailsWrapper} data-testid="movie-details-wrapper">
      <SearchOutlined
        className={searchIcon}
        onClick={() =>
          navigate({
            pathname: RoutePaths.Home,
            search: searchParams.toString(),
          })
        }
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
