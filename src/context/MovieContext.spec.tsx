import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MovieProvider } from "./MovieContext";
import { MovieDetails } from "@components/MovieDetails/MovieDetails";
import { MovieList } from "@components/MovieList/MovieList";

describe("MovieContext", () => {
  it("should provide context values to children if MovieCard is clicked", async () => {
    render(
      <MovieProvider>
        <MovieList />
        <MovieDetails />
      </MovieProvider>,
    );

    const movieCardWrapperElements =
      screen.queryAllByTestId("movie-card-wrapper");
    await userEvent.click(movieCardWrapperElements[0]);
    const updatedMovieDetailsWrapper = screen.queryByTestId(
      "movie-details-wrapper",
    );
    expect(updatedMovieDetailsWrapper).toBeInTheDocument();
  });

  it("should not provide any context values to children if MovieCard is not clicked", async () => {
    render(
      <MovieProvider>
        <MovieList />
        <MovieDetails />
      </MovieProvider>,
    );

    const movieDetailsWrapper = screen.queryByTestId("movie-details-wrapper");
    expect(movieDetailsWrapper).not.toBeInTheDocument();
  });
});
