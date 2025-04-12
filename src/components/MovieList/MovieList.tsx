import React, { useState } from "react";

import styles from "./MovieList.module.scss";
import {
  Dialog,
  ButtonTexts,
  DialogConfirmTexts,
  DialogTitles,
} from "@shared/components";
import { moviesList } from "@shared/constants";
import { MovieCard } from "./MovieCard/MovieCard";
import { IMovieInfo } from "./MovieCard/MovieCard.types";
import { AddEditMovieDialog } from "@components/AddEditMovieDialog/AddEditMovieDialog";

const { movieListWrapper } = styles;

const MovieList: React.FC = () => {
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [editedMovie, setEditedMovie] = useState<IMovieInfo | null>(null);

  const handleEditClick = (editedMovieData: IMovieInfo): void => {
    setIsEditDialogOpened(true);
    setEditedMovie(editedMovieData);
  };

  return (
    <>
      <div className={movieListWrapper} data-testid="movie-list-wrapper">
        {moviesList.map((movie: IMovieInfo) => (
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

      {isEditDialogOpened && (
        <AddEditMovieDialog
          isEditModal
          movieData={editedMovie as IMovieInfo}
          onSubmit={(moviePayload) => console.log(moviePayload)}
          onCancel={() => setIsEditDialogOpened(false)}
        />
      )}

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
