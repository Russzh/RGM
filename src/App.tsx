import React from "react";

import styles from "./App.module.scss";
import { MovieListPage } from "./pages";
import { MovieProvider } from "@context/MovieContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
