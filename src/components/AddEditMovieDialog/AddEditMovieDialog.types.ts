import {
  Genre,
  IMovieInfo,
} from "@components/MovieList/MovieCard/MovieCard.types";

export interface IAddEditMovieDialogProps {
  isEditModal?: boolean;
  onSubmit: (movie: IMovieInfo) => void;
  onCancel: () => void;
  movieData?: IMovieInfo;
}

export interface FormState {
  title: string;
  releaseDate: string;
  imageUrl: string;
  rating: string;
  description: string;
  genres: Genre[];
  runtime: string;
}

export type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_RELEASE_DATE"; payload: string }
  | { type: "SET_IMAGE_URL"; payload: string }
  | { type: "SET_RATING"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_GENRES"; payload: Genre[] }
  | { type: "SET_RUNTIME"; payload: string };
