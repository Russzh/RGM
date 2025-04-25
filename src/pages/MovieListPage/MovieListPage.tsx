import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import { GenreSelect, MovieList, SortControl } from "../../components";
import { SortByOptions } from "@components/SortControl/SortControl.types";
import styles from "./MovieListPage.module.scss";
import { genresList } from "@shared/constants";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { getMovies } from "../../api/fetchData";
import { RoutePaths } from "../../App.types";

const { genreSortControls, mainContent, moviesNumber, moviesNumberContainer } =
  styles;

const MovieListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState<IMovieInfo[]>([]);
  const navigate = useNavigate();

  const searchFormQuery = searchParams.get("query") || "";
  const activeGenre = searchParams.get("genre") || genresList[0].name;
  const sortCriterion =
    searchParams.get("sort") || Object.keys(SortByOptions)[1];

  const { data: responseMovies } = useQuery({
    queryKey: ["responseMovies", searchFormQuery, sortCriterion, activeGenre],
    queryFn: () =>
      getMovies({
        searchBy: "title",
        search: searchFormQuery,
        sortBy: sortCriterion,
        sortOrder: "asc",
        filter: activeGenre === genresList[0].name ? "" : activeGenre,
        limit: -1,
      }),
  });

  useEffect(() => {
    if (responseMovies) {
      setMovieList(responseMovies.data);
    }
  }, [responseMovies]);

  const updateSearchParams = (params: Record<string, string>) => {
    navigate({
      pathname: RoutePaths.Home,
      search: searchParams.toString(),
    });
    setSearchParams((currentParams) => {
      const [key, value] = Object.entries(params)[0];
      const newParams = new URLSearchParams(currentParams);
      value ? newParams.set(key, value) : newParams.delete(key);
      return newParams;
    });
  };

  return (
    <>
      <Outlet context={{ updateSearchParams, searchFormQuery }} />

      <main className={mainContent}>
        <section className={genreSortControls}>
          <GenreSelect
            activeGenre={activeGenre}
            genresList={genresList}
            onGenreSelect={(selectedGenre) => {
              updateSearchParams({ genre: selectedGenre });
            }}
          />
          <SortControl
            currentSelection={sortCriterion}
            onSelectionChange={(selectedOption) => {
              updateSearchParams({ sort: selectedOption });
            }}
          />
        </section>

        <section className={moviesNumberContainer}>
          <p className={moviesNumber}>
            {responseMovies ? responseMovies.data.length : "Loading..."}
          </p>{" "}
          movies found
        </section>

        {movieList && <MovieList movieList={movieList} />}
      </main>
    </>
  );
};

export { MovieListPage };
