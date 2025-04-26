import axios, { AxiosRequestConfig } from "axios";

import { FetchMoviesParams, FetchMoviesResponse } from "./fetchData.types";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

export const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axios.get(`http://localhost:4000/${url}`, config);
  return response.data;
};

export const getMovies = async (
  params: FetchMoviesParams,
): Promise<FetchMoviesResponse> => {
  return fetchData<FetchMoviesResponse>("movies", {
    params,
  });
};

export const getMovieById = async (movieId: string): Promise<IMovieInfo> => {
  return fetchData<IMovieInfo>(`movies/${movieId}`);
};
