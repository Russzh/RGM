import type { Meta, StoryObj } from "@storybook/react";

import { GenreSelect } from "@components/GenreSelect/GenreSelect";

const meta: Meta<typeof GenreSelect> = {
  title: "Components/GenreSelect",
  component: GenreSelect,
  tags: ["autodocs"],
  argTypes: {
    onGenreSelect: {
      description: "Callback function for genre selection",
      action: "New genre selected",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GenreSelect>;

export const GenreSelectComponent: Story = {
  args: {},
};
