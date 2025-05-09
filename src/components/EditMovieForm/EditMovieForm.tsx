import React from "react";
import { useNavigate, useSearchParams, useOutletContext } from "react-router";

import { AddEditMovieDialog } from "@components/AddEditMovieDialog/AddEditMovieDialog";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";
import { RoutePaths } from "../../App.types";
import { updateMovie } from "../../api/fetchData";

const EditMovieForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editedMovie = useOutletContext<IMovieInfo>();

  const handleUpdateMovie = async (moviePayload: IMovieInfo): Promise<void> => {
    const response = await updateMovie(moviePayload);

    navigate({
      pathname: `${RoutePaths.Home}${response.id}`,
      search: searchParams.toString(),
    });
  };

  return (
    <AddEditMovieDialog
      isEditModal
      movieData={editedMovie}
      onSubmit={(moviePayload) => handleUpdateMovie(moviePayload)}
      onCancel={() =>
        navigate({
          pathname: `${RoutePaths.Home}${editedMovie.id}`,
          search: searchParams.toString(),
        })
      }
    />
  );
};

export { EditMovieForm };
