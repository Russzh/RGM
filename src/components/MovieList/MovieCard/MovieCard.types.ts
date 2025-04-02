export interface IMovieInfo {
  imageUrl: string;
  name: string;
  releaseYear: number;
  genres: string[];
  id: string;
  description: string;
  rating: number;
  duration: string;
}

export interface IMovieTileProps {
  movie: IMovieInfo;
}
