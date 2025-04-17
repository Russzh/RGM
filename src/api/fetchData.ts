import axios, { AxiosRequestConfig } from "axios";

import { FetchMoviesParams, FetchMoviesResponse } from "./fetchData.types";

export const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axios.get(url, config);
  return response.data;
};

export const fetchMovies = async (
  params: FetchMoviesParams,
): Promise<FetchMoviesResponse> => {
  return fetchData<FetchMoviesResponse>("http://localhost:4000/movies", {
    params,
  });
};
