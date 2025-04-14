import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GenreSelect } from "./GenreSelect";
import { genresList } from "@shared/constants";

describe("GenreSelect", () => {
  it("renders all genres as buttons", () => {
    render(
      <GenreSelect
        activeGenre={genresList[0].name}
        genresList={genresList}
        onGenreSelect={jest.fn()}
      />,
    );

    genresList.forEach((genre) => {
      expect(screen.getByText(genre.name.toUpperCase())).toBeInTheDocument();
    });
  });

  it("calls onGenreSelect with the correct genre name when a button is clicked", async () => {
    const mockOnGenreSelect = jest.fn();
    render(
      <GenreSelect
        activeGenre={genresList[0].name}
        genresList={genresList}
        onGenreSelect={mockOnGenreSelect}
      />,
    );

    const firstGenreButton = screen.getByText(genresList[0].name.toUpperCase());

    await userEvent.click(firstGenreButton);

    expect(mockOnGenreSelect).toHaveBeenCalledTimes(1);
    expect(mockOnGenreSelect).toHaveBeenCalledWith(genresList[0].name);
  });

  it("renders buttons with the correct class name", () => {
    render(
      <GenreSelect
        activeGenre={genresList[0].name}
        genresList={genresList}
        onGenreSelect={jest.fn()}
      />,
    );

    const buttons = screen.getAllByRole("button");

    buttons.forEach((button) => {
      expect(button).toHaveClass("genreButton");
    });
  });
});
