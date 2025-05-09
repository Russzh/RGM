import { Genre } from "@components/MovieList/MovieCard/MovieCard.types";

export interface IAddEditMovieDialogProps {
  isEditModal?: boolean;
}

export type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_RELEASE_DATE"; payload: string }
  | { type: "SET_IMAGE_URL"; payload: string }
  | { type: "SET_RATING"; payload: number }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_GENRES"; payload: Genre[] }
  | { type: "SET_RUNTIME"; payload: number };
