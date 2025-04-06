export interface IInputProps {
  inputId: string;
  type?: string;
  invalid: boolean;
  currentValue?: string | number;
  defaultValue?: string | number;
  inputPlaceholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
}

export enum InputPlaceholders {
  Default = "Please enter a search query",
  WhatDoYouWantToWatch = "What do you want to watch?",
  MovieTitle = "Movie title",
  MovieReleaseDate = "Select Date",
  MovieUrl = "https://",
  MovieRating = "7.8",
  MovieRunTime = "Minutes",
  MovieGenres = "Select Genre",
  MovieDescription = "Movie description",
}

export enum InputLabels {
  Title = "TITLE",
  ReleaseDate = "RELEASE DATE",
  MovieUrl = "MOVIE URL",
  RATING = "RATING",
  RUNTIME = "RUNTIME",
  Overview = "OVERVIEW",
  SelectGenre = "SELECT GENRE",
}
