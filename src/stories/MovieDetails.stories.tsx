import type { Meta, StoryObj } from "@storybook/react";

import { MovieDetails } from "@components/MovieDetails/MovieDetails";
import { moviesList } from "@shared/constants";

const meta: Meta<typeof MovieDetails> = {
  title: "Components/MovieDetails",
  component: MovieDetails,
  tags: ["autodocs"],
  argTypes: {
    selectedMovieData: {
      description: "The movie object to display. Might be null.",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MovieDetails>;

export const MovieDetailsComponent: Story = {
  args: {
    selectedMovieData: moviesList[0],
  },
};
