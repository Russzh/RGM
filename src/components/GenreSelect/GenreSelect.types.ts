export interface IGenreSelectProps {
  onGenreSelect: (genre: string) => void;
  genresList: IGenreItem[];
  activeGenre: string;
}

export interface IGenreItem {
  id: string;
  name: string;
}
