import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

export interface FetchMoviesParams {
  searchBy: string;
  search: string;
  sortBy: string;
  sortOrder: string;
  filter: string | undefined;
  limit: number;
}

export interface FetchMoviesResponse {
  data: IMovieInfo[];
  limit: number;
  offset: number;
  totalAmount: number;
}
