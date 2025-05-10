import React, { useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router";

import styles from "./MovieList.module.scss";
import {
  Dialog,
  ButtonTexts,
  DialogConfirmTexts,
  DialogTitles,
} from "@shared/components";
import { MovieCard } from "./MovieCard/MovieCard";
import { IMovieInfo } from "./MovieCard/MovieCard.types";
import { IMovieListProps } from "@components/MovieList/MovieList.types";
import { RoutePaths } from "../../App.types";
import { deleteMovie } from "../../api/fetchData";

const { movieListWrapper } = styles;

const MovieList: React.FC<IMovieListProps> = ({
  movieList,
  refetchMovieList,
}) => {
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);
  const [deleteMovieId, setDeleteMovieId] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const handleEditClick = (editedMovieData: IMovieInfo): void => {
    navigate({
      pathname: `${RoutePaths.Home}${editedMovieData.id}/${RoutePaths.EditMovie}`,
      search: searchParams.toString(),
    });
  };

  const handleDeleteMovie = async () => {
    await deleteMovie(deleteMovieId as number);

    setIsConfirmDialogOpened(false);
    if (location.pathname !== RoutePaths.Home) {
      navigate({ pathname: RoutePaths.Home, search: searchParams.toString() });
    }
    refetchMovieList();
  };

  return (
    <>
      <div className={movieListWrapper} data-testid="movie-list-wrapper">
        {movieList.map((movie: IMovieInfo) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDeleteClick={() => {
              setIsConfirmDialogOpened(true);
              setDeleteMovieId(movie.id as number);
            }}
            onEditClick={(editedMovieData) => {
              handleEditClick(editedMovieData);
            }}
          />
        ))}
      </div>

      {isConfirmDialogOpened && (
        <Dialog
          title={DialogTitles.Delete}
          isConfirmModal
          buttonsText={{
            okText: ButtonTexts.Confirm,
          }}
          onOkClick={() => handleDeleteMovie()}
          onCancelClick={() => setIsConfirmDialogOpened(false)}
        >
          {DialogConfirmTexts.Delete}
        </Dialog>
      )}
    </>
  );
};

export { MovieList };
