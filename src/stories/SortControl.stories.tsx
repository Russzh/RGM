import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { SortControl } from "@components/SortControl/SortControl";
import { SortByOptions } from "@components/SortControl/SortControl.types";

const meta: Meta<typeof SortControl> = {
  title: "Components/SortControl",
  component: SortControl,
  tags: ["autodocs"],
  argTypes: {
    onSelectionChange: {
      description: "Callback function for selection change",
      action: "Selected option changed to",
    },
    currentSelection: {
      control: { type: "select" },
      options: Object.keys(SortByOptions),
      description: "Current selected option",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SortControl>;

export const SortControlComponent: Story = {
  render: (args) => {
    const [currentSelection, setCurrentSelection] = useState(
      args.currentSelection,
    );

    useEffect(() => {
      setCurrentSelection(args.currentSelection);
    }, [args.currentSelection]);

    return (
      <SortControl
        currentSelection={currentSelection}
        onSelectionChange={(newValue) => {
          setCurrentSelection(newValue);
          args.onSelectionChange(newValue);
        }}
      />
    );
  },
  args: {
    currentSelection: Object.keys(SortByOptions)[0],
  },
};
