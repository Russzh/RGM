import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

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
  render: (args) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
      setKey((prevKey) => prevKey + 1);
    }, [args.initialValue]);

    return <Counter key={key} {...args} />;
  },
  args: {
    initialValue: 10,
  },
};
