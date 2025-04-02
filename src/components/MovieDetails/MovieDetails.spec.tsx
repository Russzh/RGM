import React from "react";
import { render, screen } from "@testing-library/react";

import { MovieDetails } from "./MovieDetails";
import { MovieContext } from "@context/MovieContext";
import { moviesList } from "@shared/constants";

describe("MovieDetails", () => {
  it("should be rendered correctly when a movie is selected", () => {
    render(
      <MovieContext.Provider value={{ selectedMovie: moviesList[0] } as any}>
        <MovieDetails />
      </MovieContext.Provider>,
    );

    const movieImage = screen.getByAltText(moviesList[0].name);
    expect(movieImage).toBeInTheDocument();
    expect(movieImage).toHaveAttribute("src", moviesList[0].imageUrl);

    const movieName = screen.getByRole("heading", { level: 3 });
    expect(movieName).toBeInTheDocument();
    expect(movieName).toHaveTextContent(moviesList[0].name.toUpperCase());

    const movieRating = screen.getByText(moviesList[0].rating.toString());
    expect(movieRating).toBeInTheDocument();

    const movieGenres = screen.getByText(moviesList[0].genres.join(", "));
    expect(movieGenres).toBeInTheDocument();

    const movieReleaseYear = screen.getByText(
      moviesList[0].releaseYear.toString(),
    );
    const movieDuration = screen.getByText(moviesList[0].duration);
    expect(movieReleaseYear).toBeInTheDocument();
    expect(movieDuration).toBeInTheDocument();

    const movieDescription = screen.getByText(moviesList[0].description);
    expect(movieDescription).toBeInTheDocument();
  });

  it("shouldn`t render anything when no movie is selected", () => {
    render(
      <MovieContext.Provider value={{ selectedMovie: null } as any}>
        <MovieDetails />
      </MovieContext.Provider>,
    );

    const movieDetailsWrapper = screen.queryByTestId("movie-details-wrapper");
    expect(movieDetailsWrapper).not.toBeInTheDocument();
  });
});
