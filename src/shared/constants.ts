import { IGenreItem } from "@components/GenreSelect/GenreSelect.types";
import {
  Genre,
  IMovieInfo,
} from "@components/MovieList/MovieCard/MovieCard.types";

export const genresList: IGenreItem[] = [
  {
    id: "27cc3006-e93a-4748-8ca8-73d06aa93b6d",
    name: "All",
  },
  {
    id: "f762978b-61eb-4096-812b-ebde22838167",
    name: "Documentary",
  },
  {
    id: "df32994e-b23d-497c-9e4d-84e4dc02882f",
    name: "Comedy",
  },
  {
    id: "095a1817-d45b-4ed7-9cf7-b2417bcbf748",
    name: "Horror",
  },
  {
    id: "295a1817-d45b-4ed7-9cf7-b2417bcbf748",
    name: "Crime",
  },
];

export const moviesList: IMovieInfo[] = [
  {
    poster_path: "/movie-images/pulp-fiction.png",
    title: "Pulp Fiction",
    release_date: "2004-10-14",
    genres: [Genre.ActionAndAdventure],
    id: 4797748,
    overview:
      "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra.",
    vote_average: 8.9,
    runtime: 135,
  },
  {
    poster_path: "/movie-images/bohemian-rhapsody.png",
    title: "Bohemian Rhapsody",
    release_date: "2002-11-11",
    genres: [Genre.Drama, Genre.Biography, Genre.Music],
    id: 2417748,
    overview:
      "A biographical drama about the legendary British rock band Queen, focusing on the life of their lead singer Freddie Mercury (Rami Malek). The film traces the band's rise to fame, their iconic performance at Live Aid (1985), and Mercury's personal struggles with identity, relationships, and his AIDS diagnosis. The title references Queen's groundbreaking 1975 hit song, which became a defining anthem of their career.",
    vote_average: 7.9,
    runtime: 94,
  },
  {
    poster_path: "/movie-images/kill-bill-vol2.png",
    title: "Bill: Vol 2",
    release_date: "1994-12-12",
    genres: [Genre.OscarWinningMovie],
    id: 29518154,
    overview:
      "The second installment of Quentin Tarantino's two-part crime saga, 'Kill Bill: Vol 2' continues the Bride's (Uma Thurman) quest for revenge against her former allies in the Deadly Viper Assassination Squad. This volume delves deeper into her training under the ruthless Pai Mei and her final confrontations with Bill (David Carradine) and Elle Driver (Daryl Hannah). A masterful blend of martial arts, spaghetti western influences, and Tarantino's signature dialogue.",
    vote_average: 9.9,
    runtime: 134,
  },
];
