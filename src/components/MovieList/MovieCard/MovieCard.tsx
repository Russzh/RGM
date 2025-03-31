import React, { useContext } from "react";

import styles from "./MovieCard.module.scss";
import { IMovieTileProps } from "./MovieCard.types";
import { Button, ButtonTexts } from "@shared/components";
import { MovieContext } from "@context/MovieContext";

const {
  movieTile,
  movieImage,
  movieNameWrapper,
  movieName,
  releaseYear,
  contextMenuButton,
  contextMenuPopupButton,
  contextMenuPopup,
} = styles;

const MovieCard: React.FC<IMovieTileProps> = ({ movie }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = React.useState(false);

  const { setSelectedMovie } = useContext(MovieContext);

  const handleContextMenuToggle = (): void => {
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
      className={movieTile}
      onClick={() => setSelectedMovie(movie)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={movie.imageUrl} alt={movie.name} className={movieImage} />
      <div className={movieNameWrapper}>
        <h5 className={movieName}>{movie.name}</h5>
        <span className={releaseYear}>{movie.releaseYear}</span>
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
              />

              <Button
                className={contextMenuPopupButton}
                buttonText={ButtonTexts.Delete}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { MovieCard };
