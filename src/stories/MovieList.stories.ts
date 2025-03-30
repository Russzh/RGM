import type { Meta, StoryObj } from "@storybook/react";

import { MovieList } from "../components/MovieList/MovieList";

const meta: Meta<typeof MovieList> = {
  title: "Components/MovieList",
  component: MovieList,
};

export default meta;
type Story = StoryObj<typeof MovieList>;

export const MovieListComponent: Story = {};
