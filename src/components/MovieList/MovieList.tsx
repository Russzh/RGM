import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

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

const { movieListWrapper } = styles;

const MovieList: React.FC<IMovieListProps> = ({ movieList }) => {
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleEditClick = (editedMovieData: IMovieInfo): void => {
    navigate({
      pathname: `${RoutePaths.Home}${editedMovieData.id}/${RoutePaths.EditMovie}`,
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <div className={movieListWrapper} data-testid="movie-list-wrapper">
        {movieList.map((movie: IMovieInfo) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDeleteClick={() => setIsConfirmDialogOpened(true)}
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
          onOkClick={() => setIsConfirmDialogOpened(false)}
          onCancelClick={() => setIsConfirmDialogOpened(false)}
        >
          {DialogConfirmTexts.Delete}
        </Dialog>
      )}
    </>
  );
};

export { MovieList };
