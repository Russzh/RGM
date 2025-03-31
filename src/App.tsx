import React, { useState } from "react";

import "./App.css";
import Counter from "@components/Counter/Counter";
import {
  SearchForm,
  GenreSelect,
  MovieList,
  MovieDetails,
  SortControl,
} from "@components/index";
import { MovieProvider } from "@context/MovieContext";
import { SortByOptions } from "@components/SortControl/SortControl.types";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string>();
  const [sortByValue, setSortByValue] = useState<string>(
    Object.keys(SortByOptions)[0],
  );

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
    <div className="app" id="main-page">
      <Counter initialValue={10}></Counter>
      <SearchForm initialSearchQuery="" onSearchClick={handleSearchClick} />
      <GenreSelect onGenreSelect={handleGenreClick} />

      <MovieProvider>
        <MovieList />
        <MovieDetails />
      </MovieProvider>

      <SortControl
        currentSelection={sortByValue}
        onSelectionChange={handleSortChange}
      />

      {selectedGenre && (
        <div id="for-cypress">Selected genre: {selectedGenre}</div>
      )}
    </div>
  );
}

export default App;
