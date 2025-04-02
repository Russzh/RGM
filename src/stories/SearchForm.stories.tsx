import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { SearchForm } from "@components/SearchForm/SearchForm";

const meta: Meta<typeof SearchForm> = {
  title: "Components/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
  argTypes: {
    onSearchClick: {
      description: "Callback function for search click",
      action: "Search button clicked with value",
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
  render: (args) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
      setKey((prevKey) => prevKey + 1);
    }, [args.initialSearchQuery]);

    return (
      <SearchForm
        key={key}
        {...args}
        onSearchClick={(query) => {
          args.onSearchClick(query);
        }}
      />
    );
  },
  args: {
    initialSearchQuery: "INITIAL QUERY",
  },
};
