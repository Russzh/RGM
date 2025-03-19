import React from "react";
import "./App.css";

import Counter from "./components/Counter/Counter";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { GenreSelect } from "./components/GenreSelect/GenreSelect";

function App() {
  const handleGenreClick = (genre: string): void => {
    console.log(`Selected genre: ${genre}`);
  };

  const handleSearchClick = (query: string) => {
    console.log("Search triggered with query:", query);
  };

  return (
    <div className="app" id="main-page">
      <Counter initialValue={10}></Counter>
      <SearchForm initialSearchQuery="" onSearchClick={handleSearchClick} />
      <GenreSelect onGenreSelect={handleGenreClick} />
    </div>
  );
}

export default App;
