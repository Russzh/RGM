import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { AddEditMovieDialog } from "@components/AddEditMovieDialog/AddEditMovieDialog";

const meta: Meta<typeof AddEditMovieDialog> = {
  title: "Components/AddEditMovieDialog",
  component: AddEditMovieDialog,
  tags: ["autodocs"],
  argTypes: {
    isEditModal: {
      control: { type: "boolean" },
      description: "Determines if the dialog is in edit mode",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddEditMovieDialog>;

export const AddMovieDialog: Story = {
  render: (args) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
      setIsModalOpen(false);
      if (key) {
        setIsModalOpen(true);
      }
    }, [args.isEditModal, key]);

    const handleOpenModal = () => setIsModalOpen(true);

    return (
      <div>
        <button onClick={handleOpenModal}>
          {args.isEditModal ? "Open Edit Modal" : "Open Add Modal"}
        </button>

        {isModalOpen && <AddEditMovieDialog key={key} {...args} />}
      </div>
    );
  },
  args: {
    isEditModal: false,
  },
};

export const EditMovieDialog: Story = {
  render: (args) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    return (
      <div>
        <button onClick={handleOpenModal}>Open Edit Modal</button>

        {isModalOpen && <AddEditMovieDialog {...args} />}
      </div>
    );
  },
  args: {
    isEditModal: true,
  },
};
