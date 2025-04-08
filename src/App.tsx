import React, { useState } from "react";

import "./App.module.scss";
import {
  SearchForm,
  GenreSelect,
  MovieList,
  MovieDetails,
  SortControl,
  AddEditMovieDialog,
} from "./components";
import { MovieProvider } from "@context/MovieContext";
import { SortByOptions } from "@components/SortControl/SortControl.types";
import { Button, ButtonTexts, Header } from "@shared/components";
import styles from "./App.module.scss";

const { app, addMovieButton } = styles;

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string>();
  const [sortByValue, setSortByValue] = useState<string>(
    Object.keys(SortByOptions)[0],
  );
  const [isAddMovieModalOpened, setIsAddMovieModalOpened] =
    useState<boolean>(false);

  const handleSortChange = (newValue: string): void => {
    console.log("Selected sort option:", newValue);
    setSortByValue(newValue);
  };

  const handleGenreClick = (genre: string): void => {
    console.log(`Selected genre: ${genre}`);
    setSelectedGenre(genre);
  };

  const handleSearchClick = (query: string): void => {
    console.log("Search triggered with query:", query);
  };

  return (
    <div className={app} id="main-page">
      <Header>
        <SearchForm onSearchClick={handleSearchClick} />
        <Button
          className={addMovieButton}
          buttonText={ButtonTexts.AddMovie}
          onClick={() => setIsAddMovieModalOpened(true)}
        />
      </Header>
      <GenreSelect onGenreSelect={handleGenreClick} />

      <MovieProvider>
        <MovieList />
        <MovieDetails />
      </MovieProvider>

      <SortControl
        currentSelection={sortByValue}
        onSelectionChange={handleSortChange}
      />

      {isAddMovieModalOpened && (
        <AddEditMovieDialog
          onSubmit={() => void 0}
          onCancel={() => setIsAddMovieModalOpened(false)}
        />
      )}

      {selectedGenre && (
        <div id="for-cypress">Selected genre: {selectedGenre}</div>
      )}
    </div>
  );
}

export default App;
