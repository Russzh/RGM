import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";

import styles from "./MovieDetails.module.scss";
import { formatMinutes } from "@shared/helpers";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { RoutePaths } from "../../App.types";
import { commonImgUrl } from "@shared/constants";

const {
  movieDetailsWrapper,
  movieNameWrapper,
  movieDescriptionWrapper,
  movieRating,
  movieReleaseWrapper,
  searchIcon,
} = styles;

const MovieDetails: React.FC = () => {
  const [isImgUrlHasError, setIsImgUrlHasError] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedMovie = useLoaderData() as IMovieInfo;

  const {
    poster_path,
    title,
    genres,
    vote_average,
    runtime,
    overview,
    release_date,
  } = selectedMovie;

  useEffect(() => {
    setIsImgUrlHasError(false);
  }, [selectedMovie]);

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
      <img
        src={isImgUrlHasError || !poster_path ? commonImgUrl : poster_path}
        alt={title}
        onError={() => setIsImgUrlHasError(true)}
      />
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

      <Outlet context={selectedMovie} />
    </div>
  );
};

export { MovieDetails };
