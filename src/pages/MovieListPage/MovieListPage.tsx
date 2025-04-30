import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { Pagination } from "antd";

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
  let currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const { data: responseMovies } = useQuery({
    queryKey: [
      "responseMovies",
      searchFormQuery,
      sortCriterion,
      activeGenre,
      currentPage,
      currentPageSize,
    ],
    queryFn: () =>
      getMovies({
        searchBy: "title",
        search: searchFormQuery,
        sortBy: sortCriterion,
        sortOrder: "asc",
        filter: activeGenre === genresList[0].name ? "" : activeGenre,
        limit: currentPageSize,
        offset: (currentPage - 1) * currentPageSize,
      }),
  });

  const maxPossibleCurrentPage: number = responseMovies
    ? Math.ceil(responseMovies?.totalAmount / currentPageSize)
    : 1;
  if (currentPage > maxPossibleCurrentPage) {
    currentPage = maxPossibleCurrentPage;
  }

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
      const newParams = new URLSearchParams(currentParams);
      Object.entries(params).forEach(([key, value]) => {
        value ? newParams.set(key, value) : newParams.delete(key);
      });
      return newParams;
    });
  };

  const handlePaginationChange = (pageNumber: number, pageSize: number) => {
    const isPageSizeChanged = pageSize !== currentPageSize;

    updateSearchParams(
      isPageSizeChanged
        ? { pageSize: pageSize.toString(), page: "1" }
        : { page: pageNumber.toString() },
    );
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
              updateSearchParams({ genre: selectedGenre, page: "1" });
            }}
          />
          <SortControl
            currentSelection={sortCriterion}
            onSelectionChange={(selectedOption) => {
              updateSearchParams({ sort: selectedOption, page: "1" });
            }}
          />
        </section>

        <section className={moviesNumberContainer}>
          <p className={moviesNumber}>
            {responseMovies ? responseMovies.totalAmount : "Loading..."}
          </p>{" "}
          movies found
        </section>

        {movieList && <MovieList movieList={movieList} />}

        {!!responseMovies?.totalAmount && (
          <Pagination
            current={currentPage}
            total={responseMovies.totalAmount}
            pageSize={currentPageSize}
            showSizeChanger
            onChange={handlePaginationChange}
          />
        )}
      </main>
    </>
  );
};

export { MovieListPage };
