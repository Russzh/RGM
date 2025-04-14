import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  SearchForm,
  GenreSelect,
  MovieList,
  MovieDetails,
  SortControl,
  AddEditMovieDialog,
} from "../../components";
import { MovieContext } from "@context/MovieContext";
import { SortByOptions } from "@components/SortControl/SortControl.types";
import { Button, ButtonTexts, Header } from "@shared/components";
import styles from "./MovieListPage.module.scss";
import { genresList } from "@shared/constants";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

const { addMovieButton, genreSortControls, mainContent, moviesNumber } = styles;

const MovieListPage: React.FC = () => {
  const [searchFormQuery, setSearchFormQuery] = useState<string>("");
  const [activeGenre, setActiveGenre] = useState<string>(genresList[0].name);
  const [sortCriterion, setSortCriterion] = useState<string>(
    Object.keys(SortByOptions)[1],
  );
  const [movieList, setMovieList] = useState<IMovieInfo[]>([]);
  const [isAddMovieModalOpened, setIsAddMovieModalOpened] =
    useState<boolean>(false);
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);

  const fetchMovies = async (
    params: Record<string, string | number>,
  ): Promise<{
    data: IMovieInfo[];
    limit: number;
    offset: number;
    totalAmount: number;
  }> => {
    const response = await axios.get("http://localhost:4000/movies", {
      params,
    });

    return response.data;
  };

  const { data: responseMovies } = useQuery({
    queryKey: ["responseMovies", searchFormQuery, sortCriterion, activeGenre],
    queryFn: () =>
      fetchMovies({
        searchBy: "title",
        search: searchFormQuery,
        sortBy: sortCriterion,
        sortOrder: "asc",
        filter: activeGenre === genresList[0].name ? "" : activeGenre,
        limit: 10,
        offset: 0,
      }),
  });

  useEffect(() => {
    if (responseMovies) {
      setMovieList(responseMovies.data);
      setSelectedMovie(null);
    }
  }, [responseMovies, setSelectedMovie]);

  const handleAddMovie = (moviePayload: IMovieInfo): void => {
    console.log("New movie added:", moviePayload);
    setIsAddMovieModalOpened(false);
  };

  return (
    <>
      {selectedMovie ? (
        <MovieDetails selectedMovieData={selectedMovie} />
      ) : (
        <Header>
          <SearchForm onSearchClick={(query) => setSearchFormQuery(query)} />
          <Button
            className={addMovieButton}
            buttonText={ButtonTexts.AddMovie}
            onClick={() => setIsAddMovieModalOpened(true)}
          />
        </Header>
      )}

      <main className={mainContent}>
        <section className={genreSortControls}>
          <GenreSelect
            activeGenre={activeGenre}
            genresList={genresList}
            onGenreSelect={(selectedGenre) => setActiveGenre(selectedGenre)}
          />
          <SortControl
            currentSelection={sortCriterion}
            onSelectionChange={(selectedOption) =>
              setSortCriterion(selectedOption)
            }
          />
        </section>

        <p
          className={moviesNumber}
        >{`${responseMovies?.totalAmount} movies found`}</p>
        {movieList && <MovieList movieList={movieList} />}
      </main>

      {isAddMovieModalOpened && (
        <AddEditMovieDialog
          onSubmit={handleAddMovie}
          onCancel={() => setIsAddMovieModalOpened(false)}
        />
      )}
    </>
  );
};

export { MovieListPage };
