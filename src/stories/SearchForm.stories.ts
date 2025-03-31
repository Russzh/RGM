import type { Meta, StoryObj } from "@storybook/react";

import { SearchForm } from "@components/SearchForm/SearchForm";

const meta: Meta<typeof SearchForm> = {
  title: "Components/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
  argTypes: {
    onSearchClick: {
      description: "Callback function for search click",
    },
    initialSearchQuery: {
      control: { type: "text" },
      description: "Initial search query",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const SearchFormComponent: Story = {
  args: {
    onSearchClick: () => {
      console.log("Search clicked");
    },
    initialSearchQuery: "INITIAL QUERY",
  },
};
