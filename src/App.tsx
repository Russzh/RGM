import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import styles from "./App.module.scss";
import { MovieListPage } from "./pages";
import { MovieDetails } from "@components/MovieDetails/MovieDetails";
import { SearchForm } from "@components/SearchForm/SearchForm";
import { Button, ButtonTexts, Header } from "@shared/components";
import { AddEditMovieDialog } from "@components/AddEditMovieDialog/AddEditMovieDialog";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { RoutePaths } from "./App.types";
import { getMovieById } from "./api/fetchData";

const { appContainer, addMovieButton } = styles;

const queryClient = new QueryClient();

const App = () => {
  const [isAddMovieModalOpened, setIsAddMovieModalOpened] =
    useState<boolean>(false);

  const router = createBrowserRouter([
    {
      path: RoutePaths.Home,
      element: <MovieListPage />,
      children: [
        {
          index: true,
          element: (
            <Header>
              <SearchForm />
              <Button
                className={addMovieButton}
                buttonText={ButtonTexts.AddMovie}
                onClick={() => setIsAddMovieModalOpened(true)}
              />
            </Header>
          ),
        },
        {
          path: ":movieId",
          element: <MovieDetails />,
          loader: async ({ params }): Promise<IMovieInfo> =>
            getMovieById(params.movieId as string),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={RoutePaths.Home} replace />,
    },
  ]);

  const handleAddMovie = (moviePayload: IMovieInfo): void => {
    console.log("New movie added:", moviePayload);
    setIsAddMovieModalOpened(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={appContainer} id="main-page">
        <RouterProvider router={router} />
      </div>

      {isAddMovieModalOpened && (
        <AddEditMovieDialog
          onSubmit={handleAddMovie}
          onCancel={() => setIsAddMovieModalOpened(false)}
        />
      )}
    </QueryClientProvider>
  );
};

export default App;
