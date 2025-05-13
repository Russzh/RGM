import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddEditMovieDialog } from "./AddEditMovieDialog";
import {
  ButtonTexts,
  DialogTitles,
  InputPlaceholders,
} from "@shared/components";
import { moviesList } from "@shared/constants";
import { formatMinutes } from "@shared/helpers";
import { movieGenres } from "@components/MovieList/MovieCard/MovieCard.types";

const mockOnCancel = jest.fn();
const mockOnSubmit = jest.fn();
const addEditModalSetup = (isEditModal = false): void => {
  render(<AddEditMovieDialog isEditModal={isEditModal} />);
};

describe("AddEditMovieDialog", () => {
  it("should render the dialog with initial values for edit mode", () => {
    addEditModalSetup(true);

    expect(screen.getByText(DialogTitles.Edit)).toBeInTheDocument();

    expect(screen.getByDisplayValue(moviesList[0].title)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(moviesList[0].release_date),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(formatMinutes(+moviesList[0].runtime)),
    ).toBeInTheDocument();
  });

  it("should render the dialog with empty values for add mode", () => {
    addEditModalSetup();

    expect(screen.getByText(DialogTitles.Add)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(InputPlaceholders.MovieTitle),
    ).toHaveValue("");
    expect(
      screen.getByPlaceholderText(InputPlaceholders.MovieRunTime),
    ).toHaveValue("");
  });

  it("should update form values correctly for all fields except select", async () => {
    addEditModalSetup();

    const titleInput = screen.getByPlaceholderText(
      InputPlaceholders.MovieTitle,
    );
    await userEvent.type(titleInput, "The Matrix");
    expect(titleInput).toHaveValue("The Matrix");

    const movieUrlInput = screen.getByPlaceholderText(
      InputPlaceholders.MovieUrl,
    );
    await userEvent.type(movieUrlInput, "https://example.com/the-matrix-post");
    expect(movieUrlInput).toHaveValue("https://example.com/the-matrix-post");

    const movieRatingInput = screen.getByPlaceholderText(
      InputPlaceholders.MovieRating,
    );
    await userEvent.type(movieRatingInput, "9.9");
    expect(movieRatingInput).toHaveValue("9.9");

    const runtimeInput = screen.getByPlaceholderText(
      InputPlaceholders.MovieRunTime,
    );
    await userEvent.type(runtimeInput, "120");
    expect(runtimeInput).toHaveValue("120");

    const datepickerInput = screen.getByPlaceholderText(
      InputPlaceholders.MovieReleaseDate,
    );
    await userEvent.type(datepickerInput, "2023-10-10");
    expect(datepickerInput).toHaveValue("2023-10-10");

    const descriptionInput = screen.getByPlaceholderText(
      InputPlaceholders.MovieDescription,
    );
    await userEvent.type(descriptionInput, "Test description");
    expect(descriptionInput).toHaveValue("Test description");
  });

  it("should have correct behavior for Select", async () => {
    addEditModalSetup();

    await userEvent.click(screen.getByRole("combobox"));

    const firstGenreFromOpenedList = screen.getByText(movieGenres[0]);
    await userEvent.click(firstGenreFromOpenedList);
    expect(
      screen.getByText(movieGenres[0], {
        selector: ".ant-select-selection-item-content",
      }),
    ).toBeInTheDocument();

    const secondGenreFromOpenedList = screen.getByText(movieGenres[1]);
    await userEvent.click(secondGenreFromOpenedList);
    expect(
      screen.getByText(movieGenres[1], {
        selector: ".ant-select-selection-item-content",
      }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText(ButtonTexts.Submit));
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        genres: [movieGenres[0], movieGenres[1]],
      }),
    );

    //Uncheck checkbox and submit
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(
      screen.getByText(movieGenres[0], {
        selector: ".ant-checkbox-label",
      }),
    );
    expect(
      screen.queryByText(movieGenres[0], {
        selector: ".ant-select-selection-item-content",
      }),
    ).not.toBeInTheDocument();
    await userEvent.click(screen.getByText(ButtonTexts.Submit));
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        genres: [movieGenres[1]],
      }),
    );

    //Click on cross button of selected genre in input to call onChange of Select
    await userEvent.click(screen.getAllByLabelText("close")[1]);
    expect(
      screen.queryByText(movieGenres[1], {
        selector: ".ant-select-selection-item-content",
      }),
    ).not.toBeInTheDocument();
  });

  it("should call onSubmit with correct data when Submit button is clicked", async () => {
    jest.clearAllMocks();
    addEditModalSetup();

    await userEvent.type(
      screen.getByPlaceholderText(InputPlaceholders.MovieTitle),
      "The Matrix",
    );
    await userEvent.type(
      screen.getByPlaceholderText(InputPlaceholders.MovieRunTime),
      "120",
    );

    await userEvent.click(screen.getByText(ButtonTexts.Submit));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: "The Matrix",
      release_date: "",
      poster_path: "",
      vote_average: "",
      overview: "",
      genres: [],
      runtime: 120,
    });
  });

  it("should call onCancel when Reset button is clicked", async () => {
    addEditModalSetup();

    await userEvent.click(screen.getByText(ButtonTexts.Reset));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should format runtime value on blur", async () => {
    addEditModalSetup();

    const runtimeInput = screen.getByPlaceholderText(
      InputPlaceholders.MovieRunTime,
    );
    await userEvent.type(runtimeInput, "120");

    await userEvent.tab();

    expect(runtimeInput).toHaveValue("2h 00min");
  });

  describe("Form with onKeyDown", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      addEditModalSetup(true);
      screen.getByPlaceholderText(InputPlaceholders.MovieTitle).focus();
    });

    it("should call handleSubmit when Enter is pressed", async () => {
      await userEvent.keyboard("{Enter}");

      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("should not call handleSubmit for other keys", async () => {
      await userEvent.keyboard("{Escape}");

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
