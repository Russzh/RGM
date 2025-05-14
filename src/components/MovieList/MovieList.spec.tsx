import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import { MovieList } from "@components/MovieList/MovieList";
import {
  ButtonTexts,
  DialogConfirmTexts,
  DialogTitles,
} from "@shared/components";
import { moviesList } from "@shared/constants";
import { RoutePaths } from "../../App.types";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
jest.mock("../../api/fetchData", () => ({
  deleteMovie: jest.fn().mockResolvedValue({}),
}));

const setupToSeeContextMenuBtns = async (): Promise<void> => {
  render(
    <MemoryRouter>
      <MovieList movieList={moviesList} refetchMovieList={jest.fn} />
    </MemoryRouter>,
  );

  await userEvent.hover(screen.getByText(moviesList[0].title));
  await userEvent.click(screen.getByText(ButtonTexts.ContextMenu));
};

describe("MovieList", () => {
  it("should render movieListWrapper with correct number of MovieCard", () => {
    render(
      <MemoryRouter>
        <MovieList movieList={moviesList} refetchMovieList={jest.fn} />
      </MemoryRouter>,
    );

    const movieListWrapper = screen.queryByTestId("movie-list-wrapper");

    expect(movieListWrapper).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("should not show any dialogs initially", () => {
    render(
      <MemoryRouter>
        <MovieList movieList={moviesList} refetchMovieList={jest.fn} />
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

    it("should navigate to the correct route after clicking on EDIT btn", async () => {
      await userEvent.click(screen.getByText(ButtonTexts.Edit.toUpperCase()));

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: `${RoutePaths.Home}${moviesList[0].id}/${RoutePaths.EditMovie}`,
        search: "",
      });
    });

    it("should open Delete confirm modal with correct message when DELETE btn is clicked and be closed by CONFIRM btn", async () => {
      await userEvent.click(screen.getByText(ButtonTexts.Delete.toUpperCase()));
      expect(screen.getByText(DialogTitles.Delete)).toBeInTheDocument();

      expect(screen.getByText(DialogConfirmTexts.Delete)).toBeInTheDocument();
      expect(screen.getByText(DialogTitles.Delete)).toBeInTheDocument();
      expect(screen.getByText(ButtonTexts.Confirm)).toBeInTheDocument();

      await userEvent.click(screen.getByText(ButtonTexts.Confirm));

      expect(screen.queryByText(DialogTitles.Delete)).not.toBeInTheDocument();
    });
  });
});
