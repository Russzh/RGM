import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

export interface IAddEditMovieDialogProps {
  isEditModal?: boolean;
  onOkClick: () => void;
  onCancelClick: () => void;
  movieData?: IMovieInfo;
}
