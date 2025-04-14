import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styles from "./App.module.scss";
import { MovieListPage } from "./pages";
import { MovieProvider } from "@context/MovieContext";

const { appContainer } = styles;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className={appContainer} id="main-page">
      <MovieProvider>
        <MovieListPage />
      </MovieProvider>
    </div>
  </QueryClientProvider>
);

export default App;
