import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./MovieCard.module.scss";
import { IMovieCardProps } from "./MovieCard.types";
import { Button, ButtonTexts } from "@shared/components";
import { RoutePaths } from "../../../App.types";
import { commonImgUrl } from "@shared/constants";

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
  const [isImgUrlHasError, setIsImgUrlHasError] = React.useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { poster_path, genres, title, release_date, id } = movie;

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
      onClick={() =>
        navigate({
          pathname: `${RoutePaths.Home}${movie.id}`,
          search: searchParams.toString(),
        })
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="movie-card-wrapper"
    >
      <img
        src={isImgUrlHasError || !poster_path ? commonImgUrl : poster_path}
        alt={title}
        className={movieImage}
        onError={() => setIsImgUrlHasError(true)}
      />
      <div className={movieNameWrapper}>
        <h5 className={movieName}>{title}</h5>
        <span className={releaseYear}>
          {new Date(release_date).getFullYear()}
        </span>
      </div>
      <span>{genres.join(", ")}</span>

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
                  onDeleteClick(id);
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
