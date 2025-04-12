import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@shared/components";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description:
        "Content to be displayed inside the header. Type: jsx or text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderComponent: Story = {
  args: {
    children: "Header paragraph",
  },
};
