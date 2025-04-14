import React, { createContext, ReactNode, useState } from "react";

import { IMovieInfo } from "@components/MovieList/MovieCard/MovieCard.types";

export interface IMovieContextType {
  selectedMovie: IMovieInfo | null;
  setSelectedMovie: (movie: IMovieInfo | null) => void;
}

export const MovieContext = createContext<IMovieContextType>({
  selectedMovie: null,
  setSelectedMovie: () => {},
});

export const MovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<IMovieInfo | null>(null);

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
