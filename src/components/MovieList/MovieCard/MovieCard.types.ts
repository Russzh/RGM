export interface IMovieInfo {
  poster_path: string;
  title: string;
  release_date: string;
  genres: Genre[];
  id?: number;
  overview: string;
  vote_average: string | number;
  runtime: string | number;
}

export interface IMovieCardProps {
  movie: IMovieInfo;
  onDeleteClick: (movieId: number) => void;
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
