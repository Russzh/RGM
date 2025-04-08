export interface IMovieInfo {
  imageUrl: string;
  name: string;
  releaseDate: string;
  genres: Genre[];
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

export enum Genre {
  Action = "Action",
  Comedy = "Comedy",
  Drama = "Drama",
  Horror = "Horror",
  SciFi = "Sci-Fi",
  OscarWinningMovie = "Oscar winning Movie",
  Biography = "Biography",
  Music = "Music",
  ActionAndAdventure = "Action and Adventure",
}

export const movieGenres: Genre[] = Object.values(Genre);
