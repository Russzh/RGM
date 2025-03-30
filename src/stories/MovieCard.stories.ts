import type { Meta, StoryObj } from "@storybook/react";

import { MovieCard } from "../components/MovieList/MovieCard/MovieCard";
import { moviesList } from "../shared/constants";

const meta: Meta<typeof MovieCard> = {
  title: "Components/MovieCard",
  component: MovieCard,
  tags: ["autodocs"],
  argTypes: {
    movie: {
      description: "The movie object to display",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const MovieCardComponent: Story = {
  args: {
    movie: moviesList[1],
  },
};
