import axios, { AxiosRequestConfig } from "axios";

import { FetchMoviesParams, FetchMoviesResponse } from "./fetchData.types";
import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

const baseURL = "http://localhost:4000";

export const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axios.get(`${baseURL}/${url}`, config);
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

export const createMovie = async (
  moviePayload: IMovieInfo,
): Promise<IMovieInfo> => {
  const response = await axios.post(`${baseURL}/movies`, moviePayload);

  return response.data;
};
