import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MovieCard } from "@components/MovieList/MovieCard/MovieCard";
import { moviesList } from "@shared/constants";
import { IMovieContextType, MovieContext } from "@context/MovieContext";
import { ButtonTexts } from "@shared/components";

describe("MovieCard", () => {
  it("should render movieCardWrapper correctly", () => {
    render(
      <MovieCard
        movie={moviesList[0]}
        onDeleteClick={jest.fn}
        onEditClick={jest.fn}
      />,
    );

    const movieCardWrapper = screen.queryByTestId("movie-card-wrapper");
    expect(movieCardWrapper).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);

    const movieImage = screen.getByAltText(moviesList[0].title);
    expect(movieImage).toBeInTheDocument();
    expect(movieImage).toHaveAttribute("src", moviesList[0].poster_path);
  });

  it("should call setSelectedMovie with correct value when MovieCard is clicked", async () => {
    const mockSetSelectedMovie = jest.fn();

    render(
      <MovieContext.Provider
        value={
          {
            setSelectedMovie: mockSetSelectedMovie,
          } as unknown as IMovieContextType
        }
      >
        <MovieCard
          movie={moviesList[0]}
          onDeleteClick={jest.fn}
          onEditClick={jest.fn}
        />
      </MovieContext.Provider>,
    );

    const movieCardWrapper = screen.queryByTestId("movie-card-wrapper");
    await userEvent.click(movieCardWrapper as HTMLElement);

    expect(mockSetSelectedMovie).toHaveBeenCalledWith(moviesList[0]);
  });

  it("should handle mouse enter/leave and click events correctly", async () => {
    render(
      <MovieCard
        movie={moviesList[0]}
        onDeleteClick={jest.fn}
        onEditClick={jest.fn}
      />,
    );

    const movieNameElement = screen.getByText(moviesList[0].title);
    await userEvent.hover(movieNameElement);
    const contextMenuButton = screen.getByText(ButtonTexts.ContextMenu);
    expect(contextMenuButton).toBeInTheDocument();

    await userEvent.click(contextMenuButton);
    const contextMenuPopupButtons = screen.queryAllByText((content, element) =>
      (element as HTMLElement).classList.contains("contextMenuPopupButton"),
    );
    expect(contextMenuPopupButtons).toHaveLength(2);

    await userEvent.click(contextMenuButton);
    expect(screen.queryByText(ButtonTexts.Edit)).not.toBeInTheDocument();

    await userEvent.unhover(movieNameElement as HTMLElement);
    expect(contextMenuButton).not.toBeInTheDocument();
  });
});
