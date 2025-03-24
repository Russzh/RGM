import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { GenreSelect } from "./GenreSelect";
import { genresList } from "../../shared/constants";

describe("GenreSelect", () => {
  it("renders all genres as buttons", () => {
    render(<GenreSelect onGenreSelect={jest.fn()} />);

    genresList.forEach((genre) => {
      expect(screen.getByText(genre.name.toUpperCase())).toBeInTheDocument();
    });
  });

  it("calls onGenreSelect with the correct genre name when a button is clicked", () => {
    const mockOnGenreSelect = jest.fn();
    render(<GenreSelect onGenreSelect={mockOnGenreSelect} />);

    const firstGenreButton = screen.getByText(genresList[0].name.toUpperCase());

    fireEvent.click(firstGenreButton);

    expect(mockOnGenreSelect).toHaveBeenCalledTimes(1);
    expect(mockOnGenreSelect).toHaveBeenCalledWith(genresList[0].name);
  });

  it("renders buttons with the correct class name", () => {
    render(<GenreSelect onGenreSelect={jest.fn()} />);

    const buttons = screen.getAllByRole("button");

    buttons.forEach((button) => {
      expect(button).toHaveClass("genreButton");
    });
  });
});
