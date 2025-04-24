import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { MovieDetails } from "./MovieDetails";
import { moviesList } from "@shared/constants";
import {
  Genre,
  IMovieInfo,
} from "@components/MovieList/MovieCard/MovieCard.types";

const mockMovie: IMovieInfo = {
  poster_path: "/movie-images/pulp-fiction.png",
  title: "Pulp Fiction",
  release_date: "2004-10-14",
  genres: [Genre.ActionAndAdventure],
  id: 4797748,
  overview:
    "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra.",
  vote_average: 8.9,
  runtime: 135,
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(() => mockMovie),
}));

describe("MovieDetails", () => {
  it("should be rendered correctly when a movie is selected", () => {
    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>,
    );

    const movieImage = screen.getByAltText(moviesList[0].title);
    expect(movieImage).toBeInTheDocument();
    expect(movieImage).toHaveAttribute("src", moviesList[0].poster_path);

    const movieName = screen.getByRole("heading", { level: 3 });
    expect(movieName).toBeInTheDocument();
    expect(movieName).toHaveTextContent(moviesList[0].title.toUpperCase());
  });
});
