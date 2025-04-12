import type { Meta, StoryObj } from "@storybook/react";

import { AddEditMovieDialog } from "@components/AddEditMovieDialog/AddEditMovieDialog";
import { useEffect, useState } from "react";
import { moviesList } from "@shared/constants";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

const meta: Meta<typeof AddEditMovieDialog> = {
  title: "Components/AddEditMovieDialog",
  component: AddEditMovieDialog,
  tags: ["autodocs"],
  argTypes: {
    isEditModal: {
      control: { type: "boolean" },
      description: "Determines if the dialog is in edit mode",
    },
    movieData: {
      control: { type: "object" },
      description: "Movie data to edit (used when isEditModal is true)",
    },
    onCancel: {
      description: "Callback function for reset button",
      action: "Reset/Cross button clicked",
    },
    onSubmit: {
      description: "Callback function for submit button",
      action: "Submit button clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddEditMovieDialog>;

export const AddMovieDialog: Story = {
  render: (args) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieData, setMovieData] = useState(args.movieData);
    const [key, setKey] = useState(0);

    useEffect(() => {
      setIsModalOpen(false);
      if (args.isEditModal) {
        setMovieData(moviesList[0]);
      } else {
        setMovieData({} as IMovieInfo);
      }
      if (key) {
        setIsModalOpen(true);
      }
    }, [args.isEditModal, key]);

    useEffect(() => {
      setKey((prevKey) => prevKey + 1);
    }, [args.movieData]);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
      <div>
        <button onClick={handleOpenModal}>
          {args.isEditModal ? "Open Edit Modal" : "Open Add Modal"}
        </button>

        {isModalOpen && (
          <AddEditMovieDialog
            key={key}
            {...args}
            movieData={movieData}
            onCancel={() => {
              args.onCancel();
              handleCloseModal();
            }}
            onSubmit={(movieData) => {
              args.onSubmit(movieData);
              handleCloseModal();
            }}
          />
        )}
      </div>
    );
  },
  args: {
    isEditModal: false,
    movieData: {} as IMovieInfo,
  },
};

export const EditMovieDialog: Story = {
  render: (args) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
      setKey((prevKey) => prevKey + 1);
    }, [args.movieData]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
      <div>
        <button onClick={handleOpenModal}>Open Edit Modal</button>

        {isModalOpen && (
          <AddEditMovieDialog
            key={key}
            {...args}
            onCancel={() => {
              args.onCancel();
              handleCloseModal();
            }}
            onSubmit={(movieData) => {
              args.onSubmit(movieData);
              handleCloseModal();
            }}
          />
        )}
      </div>
    );
  },
  args: {
    isEditModal: true,
    movieData: moviesList[0],
  },
};
