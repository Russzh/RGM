import React, { useContext } from "react";

import styles from "./MovieCard.module.scss";
import { IMovieCardProps } from "./MovieCard.types";
import { Button, ButtonTexts } from "@shared/components";
import { MovieContext } from "@context/MovieContext";

const {
  movieCardWrapper,
  movieImage,
  movieNameWrapper,
  movieName,
  releaseYear,
  contextMenuButton,
  contextMenuPopupButton,
  contextMenuPopup,
} = styles;

const MovieCard: React.FC<IMovieCardProps> = ({
  movie,
  onDeleteClick,
  onEditClick,
}) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = React.useState(false);

  const { setSelectedMovie } = useContext(MovieContext);

  const handleContextMenuToggle = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setIsContextMenuOpen((prev) => !prev);
  };

  const handleMouseEnter = (): void => {
    setIsContextMenuVisible(true);
  };

  const handleMouseLeave = (): void => {
    setIsContextMenuVisible(false);
    setIsContextMenuOpen(false);
  };

  return (
    <div
      className={movieCardWrapper}
      onClick={() => setSelectedMovie(movie)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="movie-card-wrapper"
    >
      <img src={movie.imageUrl} alt={movie.name} className={movieImage} />
      <div className={movieNameWrapper}>
        <h5 className={movieName}>{movie.name}</h5>
        <span className={releaseYear}>
          {new Date(movie.releaseDate).getFullYear()}
        </span>
      </div>
      <span>{movie.genres.join(", ")}</span>

      {isContextMenuVisible && (
        <>
          <Button
            className={contextMenuButton}
            buttonText={ButtonTexts.ContextMenu}
            onClick={handleContextMenuToggle}
          />

          {isContextMenuOpen && (
            <div className={contextMenuPopup}>
              <Button
                className={contextMenuPopupButton}
                buttonText={ButtonTexts.Edit}
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  onEditClick(movie);
                }}
              />

              <Button
                className={contextMenuPopupButton}
                buttonText={ButtonTexts.Delete}
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  onDeleteClick(movie.id);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { MovieCard };
