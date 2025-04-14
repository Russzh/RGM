import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MovieContext, MovieProvider } from "./MovieContext";
import { MovieDetails } from "@components/MovieDetails/MovieDetails";
import { MovieList } from "@components/MovieList/MovieList";
import { moviesList } from "@shared/constants";

describe("MovieContext", () => {
  it("should provide context values to children if MovieCard is clicked", async () => {
    render(
      <MovieProvider>
        <MovieList movieList={moviesList} />
        <MovieDetails selectedMovieData={moviesList[0]} />
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
        <MovieList movieList={moviesList} />
        <MovieDetails selectedMovieData={moviesList[0]} />
      </MovieProvider>,
    );

    const movieDetailsWrapper = screen.queryByTestId("movie-details-wrapper");
    expect(movieDetailsWrapper).not.toBeInTheDocument();
  });

  it("should call setSelectedMovie and update context value", async () => {
    const TestComponent = () => {
      const { selectedMovie, setSelectedMovie } = useContext(MovieContext);

      return (
        <div>
          <button
            onClick={() => setSelectedMovie(moviesList[0])}
            data-testid="set-movie-button"
          ></button>
          <span data-testid="selected-movie">
            {selectedMovie ? selectedMovie.title : "No movie selected"}
          </span>
        </div>
      );
    };

    render(
      <MovieProvider>
        <TestComponent />
      </MovieProvider>,
    );

    expect(screen.getByTestId("selected-movie").textContent).toBe(
      "No movie selected",
    );

    await userEvent.click(screen.getByTestId("set-movie-button"));

    expect(screen.getByTestId("selected-movie").textContent).toBe(
      moviesList[0].title,
    );
  });
});
