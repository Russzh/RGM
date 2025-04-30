import React from "react";
import { useNavigate, useSearchParams } from "react-router";

import { AddEditMovieDialog } from "@components/AddEditMovieDialog/AddEditMovieDialog";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { RoutePaths } from "../../App.types";
import { createMovie } from "../../api/fetchData";

const AddMovieForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleAddMovie = async (moviePayload: IMovieInfo): Promise<void> => {
    const response = await createMovie(moviePayload);
    navigate({
      pathname: `${RoutePaths.Home}${response.id}`,
      search: searchParams.toString(),
    });
  };

  return (
    <AddEditMovieDialog
      onSubmit={handleAddMovie}
      onCancel={() =>
        navigate({ pathname: RoutePaths.Home, search: searchParams.toString() })
      }
    />
  );
};

export { AddMovieForm };
