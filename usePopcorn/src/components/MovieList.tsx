import type { Movie } from "../lib/types";
import MovieItem from "./MovieItem";

type MovieListProps = {
  movies: Movie[];
  onSelectMovie: (id: string) => void;
};

export default function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => {
        return (
          <MovieItem
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        );
      })}
    </ul>
  );
}
