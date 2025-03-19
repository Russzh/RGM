import React from "react";

import styles from "./GenreSelect.module.scss";
import { Button } from "../../shared/components";
import { genresList } from "../../shared/constants";
import { IGenreItem, IGenreSelectProps } from "./GenreSelect.types";

const { genreSelectContainer, genreButton } = styles;

const GenreSelect: React.FC<IGenreSelectProps> = ({ onGenreSelect }) => (
  <div className={genreSelectContainer}>
    {genresList.map((genre: IGenreItem) => (
      <Button
        key={genre.id}
        onClick={() => onGenreSelect(genre.name)}
        buttonText={genre.name}
        className={genreButton}
      />
    ))}
  </div>
);

export { GenreSelect };
