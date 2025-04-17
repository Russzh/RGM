import React from "react";

import styles from "./GenreSelect.module.scss";
import { Button } from "@shared/components";
import { IGenreItem, IGenreSelectProps } from "./GenreSelect.types";

const { genreSelectContainer, genreButton, activeGenreButton } = styles;

const GenreSelect: React.FC<IGenreSelectProps> = ({
  onGenreSelect,
  genresList,
  activeGenre,
}) => (
  <div className={genreSelectContainer}>
    {genresList.map((genre: IGenreItem) => (
      <Button
        key={genre.id}
        onClick={() => onGenreSelect(genre.name)}
        buttonText={genre.name}
        className={`${genreButton} ${
          activeGenre === genre.name ? activeGenreButton : ""
        }`}
      />
    ))}
  </div>
);

export { GenreSelect };
