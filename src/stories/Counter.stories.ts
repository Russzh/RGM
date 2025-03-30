import type { Meta, StoryObj } from "@storybook/react";

import Counter from "../components/Counter/Counter";

const meta: Meta<typeof Counter> = {
  title: "Components/Counter",
  component: Counter,
  tags: ["autodocs"],
  argTypes: {
    initialValue: {
      control: { type: "number" },
      description: "Counter default value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const CounterComponent: Story = {
  args: {
    initialValue: 10,
  },
};
