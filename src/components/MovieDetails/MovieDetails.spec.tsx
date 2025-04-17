import React from "react";
import { render, screen } from "@testing-library/react";

import { MovieDetails } from "./MovieDetails";
import { IMovieContextType, MovieContext } from "@context/MovieContext";
import { moviesList } from "@shared/constants";

describe("MovieDetails", () => {
  it("should be rendered correctly when a movie is selected", () => {
    render(
      <MovieContext.Provider
        value={{ selectedMovie: moviesList[0] } as IMovieContextType}
      >
        <MovieDetails selectedMovieData={moviesList[0]} />
      </MovieContext.Provider>,
    );

    const movieImage = screen.getByAltText(moviesList[0].title);
    expect(movieImage).toBeInTheDocument();
    expect(movieImage).toHaveAttribute("src", moviesList[0].poster_path);

    const movieName = screen.getByRole("heading", { level: 3 });
    expect(movieName).toBeInTheDocument();
    expect(movieName).toHaveTextContent(moviesList[0].title.toUpperCase());
  });
});
