import type { Meta, StoryObj } from "@storybook/react";

import { MovieDetails } from "@components/MovieDetails/MovieDetails";
import { MovieContext } from "@context/MovieContext";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { moviesList } from "@shared/constants";

const meta: Meta<typeof MovieDetails> = {
  title: "Components/MovieDetails",
  component: MovieDetails,
  tags: ["autodocs"],
  argTypes: {
    selectedMovie: {
      description: "The movie object to display. Might be null.",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MovieDetails>;

export const MovieDetailsComponent: Story = {
  render: (args: any) => (
    <MovieContext.Provider
      value={{
        selectedMovie: args.selectedMovie as IMovieInfo,
        setSelectedMovie: () => {},
      }}
    >
      <MovieDetails />
    </MovieContext.Provider>
  ),
  args: {
    selectedMovie: moviesList[0],
  },
};
