import type { Meta, StoryObj } from "@storybook/react";

import { SortControl } from "@components/SortControl/SortControl";
import { SortByOptions } from "@components/SortControl/SortControl.types";

const meta: Meta<typeof SortControl> = {
  title: "Components/SortControl",
  component: SortControl,
  tags: ["autodocs"],
  argTypes: {
    onSelectionChange: {
      description: "Callback function for selection change",
    },
    currentSelection: {
      control: { type: "text" },
      description: "Current selected option",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SortControl>;

export const SortControlComponent: Story = {
  args: {
    onSelectionChange: () => {},
    currentSelection: Object.keys(SortByOptions)[0],
  },
};
