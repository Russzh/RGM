import React, { useState } from "react";
import "./App.css";

import Counter from "./components/Counter/Counter";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { GenreSelect } from "./components/GenreSelect/GenreSelect";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string>();
  const handleGenreClick = (genre: string): void => {
    console.log(`Selected genre: ${genre}`);
    setSelectedGenre(genre);
  };

  const handleSearchClick = (query: string) => {
    console.log("Search triggered with query:", query);
  };

  return (
    <div className="app" id="main-page">
      <Counter initialValue={10}></Counter>
      <SearchForm initialSearchQuery="" onSearchClick={handleSearchClick} />
      <GenreSelect onGenreSelect={handleGenreClick} />
      {selectedGenre && (
        <div id="for-cypress">Selected genre: {selectedGenre}</div>
      )}
    </div>
  );
}

export default App;
