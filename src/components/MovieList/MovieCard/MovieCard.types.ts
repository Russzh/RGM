export interface IMovieInfo {
  imageUrl: string;
  name: string;
  releaseDate: string;
  genres: string[];
  id: string;
  description: string;
  rating: number;
  duration: number;
}

export interface IMovieCardProps {
  movie: IMovieInfo;
  onDeleteClick: (movieId: string) => void;
  onEditClick: (movie: IMovieInfo) => void;
}

export const movieGenres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Oscar winning Movie",
  "Biography",
  "Music",
  "Action and Adventure",
];
