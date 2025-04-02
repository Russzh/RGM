import React from "react";
import { render, screen } from "@testing-library/react";

import { MovieList } from "@components/MovieList/MovieList";

describe("MovieList", () => {
  it("should render movieListWrapper with correct number of MovieCard", () => {
    render(<MovieList />);

    const movieListWrapper = screen.queryByTestId("movie-list-wrapper");

    expect(movieListWrapper).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });
});
