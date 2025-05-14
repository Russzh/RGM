import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { MovieDetails } from "./MovieDetails";
import {
  Genre,
  IMovieInfo,
} from "@components/MovieList/MovieCard/MovieCard.types";
import { getMovieById } from "../../api/fetchData";
import { commonImgUrl } from "@shared/constants";

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
jest.mock("../../api/fetchData", () => ({
  getMovieById: jest.fn(),
}));

describe("MovieDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getMovieById as jest.Mock).mockResolvedValue(mockMovie);
  });

  it("should be rendered correctly when a movie is selected", async () => {
    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>,
    );

    const movieImage = await waitFor(() =>
      screen.getByAltText(mockMovie.title),
    );
    expect(movieImage).toBeInTheDocument();
    expect(movieImage).toHaveAttribute("src", mockMovie.poster_path);

    const movieName = screen.getByRole("heading", { level: 3 });
    expect(movieName).toBeInTheDocument();
    expect(movieName).toHaveTextContent(mockMovie.title.toUpperCase());
  });

  it("should render fallback image if poster_path is missing or invalid", async () => {
    (getMovieById as jest.Mock).mockResolvedValue({
      ...mockMovie,
      poster_path: null,
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>,
    );

    const fallbackImage = await waitFor(() =>
      screen.getByAltText(mockMovie.title),
    );

    expect(fallbackImage).toBeInTheDocument();
    expect(fallbackImage).toHaveAttribute("src", commonImgUrl);
  });
});
