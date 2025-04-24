import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { MovieList } from "@components/MovieList/MovieList";
import {
  ButtonTexts,
  DialogConfirmTexts,
  DialogTitles,
} from "@shared/components";
import { moviesList } from "@shared/constants";

const setupToSeeContextMenuBtns = async (): Promise<void> => {
  render(
    <MemoryRouter>
      <MovieList movieList={moviesList} />
    </MemoryRouter>,
  );

  await userEvent.hover(screen.getByText(moviesList[0].title));
  await userEvent.click(screen.getByText(ButtonTexts.ContextMenu));
};

describe("MovieList", () => {
  it("should render movieListWrapper with correct number of MovieCard", () => {
    render(
      <MemoryRouter>
        <MovieList movieList={moviesList} />
      </MemoryRouter>,
    );

    const movieListWrapper = screen.queryByTestId("movie-list-wrapper");

    expect(movieListWrapper).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("should not show any dialogs initially", () => {
    render(
      <MemoryRouter>
        <MovieList movieList={moviesList} />
      </MemoryRouter>,
    );

    expect(screen.queryByText(DialogTitles.Edit)).not.toBeInTheDocument();

    expect(
      screen.queryByText(DialogConfirmTexts.Delete),
    ).not.toBeInTheDocument();
  });

  describe("by context menu", () => {
    beforeEach(async () => {
      await setupToSeeContextMenuBtns();
    });

    describe("Edit modal", () => {
      beforeEach(async () => {
        await userEvent.click(screen.getByText(ButtonTexts.Edit.toUpperCase()));
      });

      it("should be opened with correct movie data when EDIT btn is clicked and be closed by RESET btn", async () => {
        expect(screen.getByText(DialogTitles.Edit)).toBeInTheDocument();

        expect(
          screen.getByDisplayValue(moviesList[0].poster_path),
        ).toBeInTheDocument();
        expect(
          screen.getByDisplayValue(moviesList[0].vote_average),
        ).toBeInTheDocument();
        expect(
          screen.getByDisplayValue(moviesList[0].overview),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText(ButtonTexts.Reset));

        expect(screen.queryByText(DialogTitles.Edit)).not.toBeInTheDocument();
      });

      it("should be closed by SUBMIT btn", async () => {
        jest.spyOn(console, "log");

        expect(screen.getByText(DialogTitles.Edit)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ButtonTexts.Submit));

        expect(console.log).toHaveBeenCalled();
      });
    });

    describe("Delete confirm modal", () => {
      beforeEach(async () => {
        await userEvent.click(
          screen.getByText(ButtonTexts.Delete.toUpperCase()),
        );
      });

      it("should be opened with correct message when DELETE btn is clicked and be closed by CONFIRM btn", async () => {
        expect(screen.getByText(DialogTitles.Delete)).toBeInTheDocument();

        expect(screen.getByText(DialogConfirmTexts.Delete)).toBeInTheDocument();
        expect(screen.getByText(DialogTitles.Delete)).toBeInTheDocument();
        expect(screen.getByText(ButtonTexts.Confirm)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ButtonTexts.Confirm));

        expect(screen.queryByText(DialogTitles.Delete)).not.toBeInTheDocument();
      });

      it("should be closed by Cross btn", async () => {
        expect(screen.getByText(DialogTitles.Delete)).toBeInTheDocument();

        await userEvent.click(screen.getByLabelText("Close"));

        expect(screen.queryByText(DialogTitles.Delete)).not.toBeInTheDocument();
      });
    });
  });
});
