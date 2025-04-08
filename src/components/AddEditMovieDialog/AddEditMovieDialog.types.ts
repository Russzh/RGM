import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

export interface IAddEditMovieDialogProps {
  isEditModal?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  movieData?: IMovieInfo;
}
