import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

export interface IMovieListProps {
  movieList: IMovieInfo[];
  refetchMovieList: () => void;
}
