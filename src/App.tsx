import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import styles from "./App.module.scss";
import { MovieListPage } from "./pages";
import { MovieDetails } from "@components/MovieDetails/MovieDetails";
import { SearchForm } from "@components/SearchForm/SearchForm";
import { ButtonTexts, Header } from "@shared/components";
import { RoutePaths } from "./App.types";
import { AddEditMovieDialog } from "@components/AddEditMovieDialog/AddEditMovieDialog";

const { appContainer } = styles;

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: RoutePaths.Home,
      element: <MovieListPage />,
      children: [
        {
          path: "",
          element: (
            <Header buttonText={ButtonTexts.AddMovie}>
              <SearchForm />
            </Header>
          ),
          children: [
            {
              path: RoutePaths.AddMovie,
              element: <AddEditMovieDialog />,
            },
          ],
        },
        {
          path: ":movieId",
          element: <MovieDetails />,
          children: [
            {
              path: RoutePaths.EditMovie,
              element: <AddEditMovieDialog isEditModal />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={RoutePaths.Home} replace />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={appContainer} id="main-page">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
