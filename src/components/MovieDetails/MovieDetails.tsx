import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Outlet,
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";

import styles from "./MovieDetails.module.scss";
import { formatMinutes } from "@shared/helpers";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { RoutePaths } from "../../App.types";
import { commonImgUrl } from "@shared/constants";
import { getMovieById } from "../../api/fetchData";

const {
  movieDetailsWrapper,
  movieNameWrapper,
  movieDescriptionWrapper,
  movieRating,
  movieReleaseWrapper,
  searchIcon,
} = styles;

const MovieDetails: React.FC = () => {
  const [isImgUrlHasError, setIsImgUrlHasError] = useState<boolean>(false);
  const [isShouldRenderOutlet, setIsShouldRenderOutlet] =
    useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovieInfo>(
    {} as IMovieInfo,
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();

  useEffect(() => {
    setIsImgUrlHasError(false);
  }, [selectedMovie]);

  useEffect(() => {
    setIsShouldRenderOutlet(false);
    getMovieById(movieId as string).then((selectedMovieData) => {
      setSelectedMovie(selectedMovieData);
      setTimeout(() => setIsShouldRenderOutlet(true));
    });
  }, [movieId]);

  useEffect(() => {
    if (location.state?.updatedMovie) {
      setSelectedMovie(location.state.updatedMovie);
    }
  }, [location.state]);

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
        src={
          isImgUrlHasError || !selectedMovie?.poster_path
            ? commonImgUrl
            : selectedMovie?.poster_path
        }
        alt={selectedMovie?.title}
        onError={() => setIsImgUrlHasError(true)}
      />
      <div className={movieDescriptionWrapper}>
        <div className={movieNameWrapper}>
          <h3>{selectedMovie?.title?.toUpperCase()}</h3>
          <div className={movieRating}>{selectedMovie?.vote_average}</div>
        </div>
        <span>{selectedMovie?.genres?.join(", ")}</span>
        <div className={movieReleaseWrapper}>
          <p>{new Date(selectedMovie?.release_date).getFullYear()}</p>
          <p>{formatMinutes(selectedMovie?.runtime as number)}</p>
        </div>
        <span>{selectedMovie?.overview}</span>
      </div>

      {isShouldRenderOutlet && <Outlet context={selectedMovie} />}
    </div>
  );
};

export { MovieDetails };
